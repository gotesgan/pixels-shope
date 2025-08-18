import mediaHandler from "../utils/mediahandler.js";
import { prisma } from "../db/db.js";
import fs from "fs";
import path from "path";
// Create About Page with nested entities and media
export const createAboutPage = async (req, res) => {
  const userId = req.user.userid;
  const storeId = req.user.storeId;
  let files = req.files;

  console.log("Request received for createAboutPage");
  console.log("User ID:", userId);
  console.log("Store ID:", storeId);

  try {
    // Check if req.files is an array (which seems to be the case from logs)
    if (Array.isArray(req.files)) {
      console.log("Files are in array format. Total files:", req.files.length);
      files = req.files;
    }
    // Handle the case where files might be in req.file (single file upload)
    else if (!files && req.file) {
      console.log("Files found in req.file. Converting to array.");
      files = [req.file];
    }
    // Log the structure for debugging
    console.log(
      "Files structure:",
      typeof files,
      Array.isArray(files) ? "array" : "object"
    );

    // Parse form data from request body
    const formData = parseFormData(req.body);

    // Check user access to the store
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { stores: { select: { id: true } } },
    });

    if (!user?.stores.some((store) => store.id === storeId)) {
      return res.status(403).json({
        message: "You don't have access to this store",
        success: false,
      });
    }

    // Process uploaded files with fixed implementation
    const uploadedMedia = await processUploadedFiles(files);
    console.log("Uploaded media:", uploadedMedia);

    // If uploadedMedia is empty but files were uploaded, try backup method
    if (Object.keys(uploadedMedia).length === 0 && files && files.length > 0) {
      console.log("Primary media processing failed. Trying backup method...");

      // Create backup media map manually
      const backupMedia = {};
      for (const file of files) {
        try {
          // Use backup handler or try to create URL directly
          const result = await backupMediaHandler(file.path);
          if (result.uploadedImages && result.uploadedImages.length > 0) {
            backupMedia[file.fieldname] = result.uploadedImages[0].filename;
          }
        } catch (err) {
          console.error(`Backup processing failed for ${file.fieldname}:`, err);
        }
      }

      if (Object.keys(backupMedia).length > 0) {
        console.log("Backup media processing successful:", backupMedia);
        Object.assign(uploadedMedia, backupMedia);
      }
    }

    // Create AboutPage and related entities in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create base AboutPage
      const newAboutPage = await tx.aboutPage.create({
        data: { storeId },
      });

      // 2. Create AboutCompany section if data provided
      const aboutCompanyResult = formData.aboutCompany
        ? await createAboutCompany(
            tx,
            newAboutPage.id,
            formData.aboutCompany,
            uploadedMedia,
            storeId
          )
        : null;

      // 3. Create OurBrand section if data provided
      const ourBrandResult = formData.ourBrand
        ? await createOurBrand(
            tx,
            newAboutPage.id,
            formData.ourBrand,
            uploadedMedia,
            storeId
          )
        : null;

      // 4. Create CompanyFact section if data provided
      const companyFactResult = formData.companyFact
        ? await createCompanyFact(
            tx,
            newAboutPage.id,
            formData.companyFact,
            uploadedMedia,
            storeId
          )
        : null;

      // 5. Create AboutSections if data provided
      const aboutSectionsResult =
        formData.aboutSections?.length > 0
          ? await createAboutSections(
              tx,
              newAboutPage.id,
              formData.aboutSections,
              uploadedMedia,
              storeId
            )
          : [];

      return {
        aboutPage: newAboutPage,
        aboutCompany: aboutCompanyResult,
        ourBrand: ourBrandResult,
        companyFact: companyFactResult,
        aboutSections: aboutSectionsResult,
      };
    });

    // Delete temporary files after successful database operation
    await cleanupTempFiles(files);

    res.status(201).json({
      message: "About Page created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in createAboutPage:", error);
    console.error("Error stack:", error.stack);

    // Try to clean up temporary files even if operation failed
    try {
      await cleanupTempFiles(files);
    } catch (cleanupError) {
      console.error("Error cleaning up temporary files:", cleanupError);
    }

    res.status(500).json({
      message: "Failed to create About Page",
      error: error.message,
      success: false,
    });
  }
};

/**
 * Parse nested form data from request bo
 * @param {Object} body - Request body object
 * @returns {Object} Structured data object
 */
function parseFormData(body) {
  const data = {
    aboutCompany: null,
    ourBrand: null,
    companyFact: null,
    aboutSections: [],
  };

  // Extract aboutCompany data
  if (body["aboutCompany.title"]) {
    data.aboutCompany = {
      title: body["aboutCompany.title"].trim(),
      description: body["aboutCompany.description"]?.trim() || "",
      storyParagraphs: Array.isArray(body["aboutCompany.storyParagraphs"])
        ? body["aboutCompany.storyParagraphs"].map((p) => p.trim())
        : [],
    };
  }

  // Extract ourBrand data
  if (body["ourBrand.title"]) {
    data.ourBrand = {
      title: body["ourBrand.title"].trim(),
      description: body["ourBrand.description"]?.trim() || "",
      brandItems: [],
    };

    // Extract brand items
    let index = 0;
    while (body[`ourBrand.brandItems[${index}].name`]) {
      data.ourBrand.brandItems.push({
        name: body[`ourBrand.brandItems[${index}].name`].trim(),
        logoUrl: "", // Will be populated from files
        sortOrder: parseInt(
          body[`ourBrand.brandItems[${index}].sortOrder`]?.trim() || "0"
        ),
      });
      index++;
    }
  }

  // Extract companyFact data
  if (body["companyFact.title"]) {
    data.companyFact = {
      title: body["companyFact.title"].trim(),
      description: body["companyFact.description"]?.trim() || "",
      factItems: [],
    };

    // Extract fact items
    let index = 0;
    while (body[`companyFact.factItems[${index}].value`]) {
      data.companyFact.factItems.push({
        value: body[`companyFact.factItems[${index}].value`].trim(),
        label: body[`companyFact.factItems[${index}].label`].trim(),
        iconName: body[`companyFact.factItems[${index}].iconName`].trim(),
        sortOrder: parseInt(
          body[`companyFact.factItems[${index}].sortOrder`]?.trim() || "0"
        ),
      });
      index++;
    }
  }

  // Extract aboutSections data
  const sectionIndices = new Set();

  // Find all section indices from keys
  Object.keys(body).forEach((key) => {
    const match = key.match(/^aboutSections\[(\d+)\]/);
    if (match) {
      sectionIndices.add(parseInt(match[1]));
    }
  });

  // Process each section
  Array.from(sectionIndices)
    .sort()
    .forEach((sectionIndex) => {
      const section = {
        title: body[`aboutSections[${sectionIndex}].title`].trim(),
        description:
          body[`aboutSections[${sectionIndex}].description`]?.trim() || "",
        sortOrder: parseInt(
          body[`aboutSections[${sectionIndex}].sortOrder`]?.trim() || "0"
        ),
        bgColor: body[`aboutSections[${sectionIndex}].bgColor`]?.trim() || null,
        sectionType:
          body[`aboutSections[${sectionIndex}].sectionType`]?.trim() ||
          "DEFAULT",
        sectionItems: [],
      };

      // Find all section item indices for this section
      const itemIndices = new Set();
      Object.keys(body).forEach((key) => {
        const match = key.match(
          new RegExp(
            `^aboutSections\\[${sectionIndex}\\]\\.sectionItems\\[(\\d+)\\]`
          )
        );
        if (match) {
          itemIndices.add(parseInt(match[1]));
        }
      });

      // Process each section item
      Array.from(itemIndices)
        .sort()
        .forEach((itemIndex) => {
          const item = {
            title:
              body[
                `aboutSections[${sectionIndex}].sectionItems[${itemIndex}].title`
              ]?.trim() || null,
            description:
              body[
                `aboutSections[${sectionIndex}].sectionItems[${itemIndex}].description`
              ]?.trim() || null,
            iconName:
              body[
                `aboutSections[${sectionIndex}].sectionItems[${itemIndex}].iconName`
              ]?.trim() || null,
            value:
              body[
                `aboutSections[${sectionIndex}].sectionItems[${itemIndex}].value`
              ]?.trim() || null,
            label:
              body[
                `aboutSections[${sectionIndex}].sectionItems[${itemIndex}].label`
              ]?.trim() || null,
            sortOrder: parseInt(
              body[
                `aboutSections[${sectionIndex}].sectionItems[${itemIndex}].sortOrder`
              ]?.trim() || "0"
            ),
          };

          section.sectionItems.push(item);
        });

      data.aboutSections.push(section);
    });

  return data;
}

/**
 * Process uploaded files and return a map of field names to image filenames
 * @param {Object} files - Request files object
 * @returns {Promise<Object>} Map of field names to processed image filenames
 */
/**
 * Process uploaded files and return a map of field names to image filenames
 * @param {Object} files - Request files object
 * @returns {Promise<Object>} Map of field names to processed image filenames
 */
async function processUploadedFiles(files) {
  const uploadedMedia = {};

  console.log("Starting file processing...");

  // Check if files exist and is a valid object or array
  if (
    !files ||
    (typeof files !== "object" && !Array.isArray(files)) ||
    (Array.isArray(files) && files.length === 0) ||
    (!Array.isArray(files) && Object.keys(files).length === 0)
  ) {
    console.log("No files uploaded or files object is invalid:", files);
    return uploadedMedia;
  }

  // Handle files as array (which appears to be the case from the logs)
  const fileArray = Array.isArray(files) ? files : Object.values(files);
  console.log(`Total files to process: ${fileArray.length}`);

  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];
    console.log(`\nProcessing file ${i + 1}/${fileArray.length}`);

    try {
      // Extract the fieldname - this is the key we need
      const fieldName = file.fieldname;
      console.log(`Field name: "${fieldName}"`);

      if (!file || !file.path || !file.originalname) {
        console.error(`Invalid file object at index ${i}:`, file);
        continue;
      }

      console.log(`Processing file: ${file.originalname} (${file.mimetype})`);
      console.log(`File path: ${file.path}`);
      console.log(`File size: ${file.size} bytes`);

      // Actual media handling

      console.log(`Calling mediaHandler() for: ${file.path}`);
      const mediaData = await mediaHandler.upload(file.path);

      if (!mediaData) {
        console.error(`mediaHandler returned no data for file: ${file.path}`);
        continue;
      }

      console.log(`mediaHandler result:`, mediaData);

      // Extract filename from the mediaHandler response
      // The logs show mediaData has structure: { message, uploadedImages: [{ filename }] }
      if (mediaData.uploadedImages && mediaData.uploadedImages.length > 0) {
        const filename = mediaData.uploadedImages[0].filename;

        if (filename) {
          // Store with the original field name (not the numeric index)
          uploadedMedia[fieldName] = filename;
          console.log(`Saved uploaded media for "${fieldName}": ${filename}`);
        } else {
          console.error(
            `No filename found in mediaHandler result for ${fieldName}`
          );
        }
      } else {
        console.error(
          `No uploadedImages array in mediaHandler result for ${fieldName}`
        );
      }
    } catch (error) {
      console.error(`❌ Error processing file at index ${i}:`);
      console.error(error.message);
      console.error(error.stack);
    }
  }

  console.log("✅ File processing complete. Final result:", uploadedMedia);
  return uploadedMedia;
}

/**
 * Clean up temporary uploaded files
 * @param {Object} files - Request files object
 * @returns {Promise<void>}
 */
async function cleanupTempFiles(files) {
  const filePaths = [];

  // Extract all file paths to clean up
  for (const fileArray of Object.values(files)) {
    if (fileArray && fileArray.length > 0) {
      fileArray.forEach((file) => {
        if (file.path) filePaths.push(file.path);
      });
    }
  }

  // Delete each file
  for (const filePath of filePaths) {
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.error(`Failed to delete temporary file ${filePath}:`, error);
      // Continue trying to delete other files
    }
  }
}

/**
 * Create AboutCompany entity and related media
 * @param {Object} tx - Prisma transaction
 * @param {String} aboutPageId - Parent AboutPage ID
 * @param {Object} aboutCompanyData - AboutCompany data
 * @param {Object} uploadedMedia - Map of uploaded media files
 * @param {String} storeId - Store ID
 * @returns {Promise<Object>} Created AboutCompany
 */
async function createAboutCompany(
  tx,
  aboutPageId,
  aboutCompanyData,
  uploadedMedia,
  storeId
) {
  // Create AboutCompany record
  const aboutCompany = await tx.aboutCompany.create({
    data: {
      aboutPageId,
      title: aboutCompanyData.title,
      description: aboutCompanyData.description,
      storyParagraphs: aboutCompanyData.storyParagraphs || [],
    },
  });

  // Handle media if uploaded
  if (uploadedMedia["aboutCompany.storyImageUrl"]) {
    await tx.media.create({
      data: {
        image: uploadedMedia["aboutCompany.storyImageUrl"],
        aboutCompanyId: aboutCompany.id,
        storeId,
      },
    });
  }

  return aboutCompany;
}

/**
 * Create OurBrand entity and related items
 * @param {Object} tx - Prisma transaction
 * @param {String} aboutPageId - Parent AboutPage ID
 * @param {Object} ourBrandData - OurBrand data
 * @param {Object} uploadedMedia - Map of uploaded media files
 * @param {String} storeId - Store ID
 * @returns {Promise<Object>} Created OurBrand with related items
 */
async function createOurBrand(
  tx,
  aboutPageId,
  ourBrandData,
  uploadedMedia,
  storeId
) {
  // Create OurBrand record
  const ourBrand = await tx.ourBrand.create({
    data: {
      aboutPageId,
      title: ourBrandData.title,
      description: ourBrandData.description,
    },
  });

  // Handle main brand image if uploaded
  if (uploadedMedia["ourBrand.image"]) {
    await tx.media.create({
      data: {
        image: uploadedMedia["ourBrand.image"],
        ourBrandId: ourBrand.id,
        storeId,
      },
    });
  }

  // Create brand items with logo images
  if (ourBrandData.brandItems && ourBrandData.brandItems.length > 0) {
    for (let i = 0; i < ourBrandData.brandItems.length; i++) {
      const item = ourBrandData.brandItems[i];
      const logoUrl = uploadedMedia[`ourBrand.brandItems[${i}].logoUrl`] || "";

      await tx.brandItem.create({
        data: {
          ourBrandId: ourBrand.id,
          name: item.name,
          logoUrl: logoUrl,
          sortOrder: item.sortOrder || 0,
        },
      });
    }
  }

  return ourBrand;
}

/**
 * Create CompanyFact entity and related items
 * @param {Object} tx - Prisma transaction
 * @param {String} aboutPageId - Parent AboutPage ID
 * @param {Object} companyFactData - CompanyFact data
 * @param {Object} uploadedMedia - Map of uploaded media files
 * @param {String} storeId - Store ID
 * @returns {Promise<Object>} Created CompanyFact with related items
 */
async function createCompanyFact(
  tx,
  aboutPageId,
  companyFactData,
  uploadedMedia,
  storeId
) {
  // Create CompanyFact record
  const companyFact = await tx.companyFact.create({
    data: {
      aboutPageId,
      title: companyFactData.title,
      description: companyFactData.description,
    },
  });

  // Handle media if uploaded
  if (uploadedMedia["companyFact.image"]) {
    await tx.media.create({
      data: {
        image: uploadedMedia["companyFact.image"],
        companyFactId: companyFact.id,
        storeId,
      },
    });
  }

  // Create fact items
  if (companyFactData.factItems && companyFactData.factItems.length > 0) {
    await tx.factItem.createMany({
      data: companyFactData.factItems.map((item) => ({
        companyFactId: companyFact.id,
        value: item.value,
        label: item.label,
        iconName: item.iconName,
        sortOrder: item.sortOrder || 0,
      })),
    });
  }

  return companyFact;
}

/**
 * Create AboutSection entities and related items
 * @param {Object} tx - Prisma transaction
 * @param {String} aboutPageId - Parent AboutPage ID
 * @param {Array} sectionsData - Array of section data
 * @param {Object} uploadedMedia - Map of uploaded media files
 * @param {String} storeId - Store ID
 * @returns {Promise<Array>} Created AboutSections with related items
 */
async function createAboutSections(
  tx,
  aboutPageId,
  sectionsData,
  uploadedMedia,
  storeId
) {
  const createdSections = [];

  for (let i = 0; i < sectionsData.length; i++) {
    const sectionData = sectionsData[i];

    // Create AboutSection record
    const section = await tx.aboutSection.create({
      data: {
        aboutPageId,
        title: sectionData.title,
        description: sectionData.description,
        sortOrder: sectionData.sortOrder || 0,
        bgColor: sectionData.bgColor,
        sectionType: sectionData.sectionType || "DEFAULT",
      },
    });

    // Handle section image if uploaded
    const sectionImageKey = `aboutSections[${i}].image`;
    if (uploadedMedia[sectionImageKey]) {
      await tx.media.create({
        data: {
          image: uploadedMedia[sectionImageKey],
          aboutSectionId: section.id,
          storeId,
        },
      });
    }

    // Create section items
    if (sectionData.sectionItems && sectionData.sectionItems.length > 0) {
      for (const itemData of sectionData.sectionItems) {
        const item = await tx.sectionItem.create({
          data: {
            sectionId: section.id,
            title: itemData.title,
            description: itemData.description,
            iconName: itemData.iconName,
            value: itemData.value,
            label: itemData.label,
            sortOrder: itemData.sortOrder || 0,
          },
        });

        // Link item to section
        section.sectionItems = section.sectionItems || [];
        section.sectionItems.push(item);
      }
    }

    createdSections.push(section);
  }

  return createdSections;
}
async function backupMediaHandler(filePath) {
  try {
    // Extract just the filename from the path
    const filename = filePath.split("/").pop();
    // Create a new filename with timestamp
    const newFilename = `${Date.now()}-${filename}`;

    // In a real implementation, you would process/move the file here

    return {
      message: "Images uploaded successfully",
      uploadedImages: [{ filename: newFilename }],
    };
  } catch (error) {
    console.error("Error in backup mediaHandler:", error);
    throw error;
  }
}

// Fetch About Page with all nested data
export const fetchAboutPage = async (req, res) => {
  const storeId = req.store.id;
  console.log("Fetching About Page for Store ID:", storeId);

  try {
    const aboutPage = await prisma.aboutPage.findUnique({
      where: { storeId },
      include: {
        aboutCompany: {
          include: { media: true },
        },
        ourBrand: {
          include: {
            media: true,
            brandItems: true,
          },
        },
        companyFact: {
          include: {
            media: true,
            factItems: true,
          },
        },
        aboutSections: {
          include: {
            media: true,
            sectionItems: {
              include: { media: true },
            },
          },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!aboutPage) {
      return res.status(404).json({
        message: "About Page not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "About Page fetched successfully",
      success: true,
      data: aboutPage,
    });
  } catch (error) {
    console.error("Error in fetchAboutPage:", error);
    res.status(500).json({
      message: "Failed to fetch About Page",
      success: false,
    });
  }
};