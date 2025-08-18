import { prisma } from "../db/db.js";

// Updated createContactPage function with improved debugging and request body parsing
export const createContactPage = async (req, res) => {
  const userId = req.user.userid;
  const storeId = req.user.storeId;
  
  // Better body parsing and debugging
  console.log("Request headers:", req.headers['content-type']);
  console.log("Original request body:", JSON.stringify(req.body, null, 2));
  
  let body = req.body || {};
  
  // Handle potential x-www-form-urlencoded or multipart/form-data parsing issues
  // by checking if the body might be a JSON string
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
      console.log("Parsed body from string:", body);
    } catch (e) {
      console.log("Body is a string but not valid JSON:", body);
    }
  }
  
  // Helper function to extract data from both array notation and dot notation
  const extractNestedData = () => {
    // Case 1: Direct arrays in the request body (from JSON)
    if (body.information && Array.isArray(body.information)) {
      console.log("Found direct array data in request");
      return {
        information: body.information || [],
        hours: body.hours || [],
        socialLinks: body.socialLinks || [],
        locations: body.locations || []
      };
    }
    
    // Case 2: Form-data with array notation (information[0][type])
    const extractFromArrayNotation = () => {
      const result = {
        information: [],
        hours: [],
        socialLinks: [],
        locations: []
      };
      
      // Extract indices for each section
      const indices = {
        information: new Set(),
        hours: new Set(),
        socialLinks: new Set(),
        locations: new Set()
      };
      
      // Find all keys and their indices
      Object.keys(body).forEach(key => {
        // Check form-data array notation: e.g., information[0][type]
        const arrayMatch = key.match(/^(\w+)\[(\d+)\]\[(\w+)\]$/);
        if (arrayMatch) {
          const [_, section, index, field] = arrayMatch;
          if (section in indices) {
            indices[section].add(index);
          }
        }
      });
      
      // Process each section with found indices
      for (const section of Object.keys(indices)) {
        const indexArray = Array.from(indices[section]).sort();
        for (const idx of indexArray) {
          const item = {};
          let hasData = false;
          
          // Extract all fields for this index
          Object.keys(body).forEach(key => {
            const match = key.match(new RegExp(`^${section}\\[${idx}\\]\\[(\\w+)\\]$`));
            if (match) {
              const [_, field] = match;
              item[field] = body[key];
              hasData = true;
            }
          });
          
          if (hasData) {
            result[section].push(item);
          }
        }
      }
      
      return result;
    };
    
    // Case 3: Traditional form fields with dot notation or underscore
    const extractFromFlatFields = () => {
      const result = {
        information: [],
        hours: [],
        socialLinks: [],
        locations: []
      };
      
      const patterns = [
        { regex: /^information_(\d+)_(\w+)$/, section: 'information' },
        { regex: /^information\.(\d+)\.(\w+)$/, section: 'information' },
        { regex: /^hours_(\d+)_(\w+)$/, section: 'hours' },
        { regex: /^hours\.(\d+)\.(\w+)$/, section: 'hours' },
        { regex: /^socialLinks_(\d+)_(\w+)$/, section: 'socialLinks' },
        { regex: /^socialLinks\.(\d+)\.(\w+)$/, section: 'socialLinks' },
        { regex: /^locations_(\d+)_(\w+)$/, section: 'locations' },
        { regex: /^locations\.(\d+)\.(\w+)$/, section: 'locations' }
      ];
      
      // Group data by indices
      const grouped = {
        information: {},
        hours: {},
        socialLinks: {},
        locations: {}
      };
      
      Object.keys(body).forEach(key => {
        for (const pattern of patterns) {
          const match = key.match(pattern.regex);
          if (match) {
            const [_, index, field] = match;
            if (!grouped[pattern.section][index]) {
              grouped[pattern.section][index] = {};
            }
            grouped[pattern.section][index][field] = body[key];
            break;
          }
        }
      });
      
      // Convert grouped objects to arrays
      for (const section of Object.keys(grouped)) {
        for (const index of Object.keys(grouped[section])) {
          if (Object.keys(grouped[section][index]).length > 0) {
            result[section].push(grouped[section][index]);
          }
        }
      }
      
      return result;
    };
    
    // Try both methods and use the one that yields more data
    const arrayData = extractFromArrayNotation();
    const flatData = extractFromFlatFields();
    
    const totalArrayItems = arrayData.information.length + arrayData.hours.length + 
                          arrayData.socialLinks.length + arrayData.locations.length;
    const totalFlatItems = flatData.information.length + flatData.hours.length + 
                         flatData.socialLinks.length + flatData.locations.length;
    
    console.log(`Array notation items: ${totalArrayItems}, Flat notation items: ${totalFlatItems}`);
    
    return totalArrayItems >= totalFlatItems ? arrayData : flatData;
  };
  
  // Extract all data
  const extractedData = extractNestedData();
  
  const information = extractedData.information;
  const hours = extractedData.hours;
  const socialLinks = extractedData.socialLinks;
  const locations = extractedData.locations;
  
  console.log("Final parsed information:", information);
  console.log("Final parsed hours:", hours);
  console.log("Final parsed socialLinks:", socialLinks);
  console.log("Final parsed locations:", locations);
  
  // Check if we have any data
  const hasNoData = information.length === 0 && hours.length === 0 && 
                   socialLinks.length === 0 && locations.length === 0;
  
  if (hasNoData) {
    console.log("WARNING: No nested data found in the request. Request format may be incorrect.");
    console.log("Expected formats:");
    console.log("1. JSON with arrays: information: [{type: 'email', ...}]");
    console.log("2. Form-data with array notation: information[0][type]=email");
    console.log("3. Form-data with underscore: information_0_type=email");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { stores: { select: { id: true } } },
    });

    if (!user?.stores.some((store) => store.id === storeId)) {
      return res.status(400).json({ message: "Invalid store access", success: false });
    }

    const existingPage = await prisma.contactPage.findUnique({
      where: { storeId },
    });

    if (existingPage) {
      return res.status(400).json({
        message: "Contact Page already exists for this store",
        success: false,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const newContactPage = await tx.contactPage.create({
        data: { storeId },
      });

      const createdContactInfo = await Promise.all(
        information.map((info) =>
          tx.contactInfo.create({
            data: {
              pageId: newContactPage.id,
              type: info.type,
              value: info.value,
              label: info.label,
              icon: info.icon,
              isPrimary: info.isPrimary === "true" || info.isPrimary === true,
            },
          })
        )
      );

      const createdBusinessHours = await Promise.all(
        hours.map((hour) =>
          tx.businessHours.create({
            data: {
              pageId: newContactPage.id,
              days: hour.days,
              hours: hour.hours,
              isActive: hour.isActive === "true" || hour.isActive === true,
              sortOrder: parseInt(hour.sortOrder || "0"),
            },
          })
        )
      );

      const createdSocialLinks = await Promise.all(
        socialLinks.map((link) =>
          tx.socialLink.create({
            data: {
              pageId: newContactPage.id,
              platform: link.platform,
              url: link.url,
              icon: link.icon,
              isActive: link.isActive === "true" || link.isActive === true,
            },
          })
        )
      );

      const createdLocations = await Promise.all(
        locations.map((location) =>
          tx.location.create({
            data: {
              pageId: newContactPage.id,
              name: location.name,
              address: location.address,
              city: location.city,
              state: location.state,
              country: location.country || "India",
              postalCode: location.postalCode,
              mapEmbedUrl: location.mapEmbedUrl,
              isPrimary: location.isPrimary === "true" || location.isPrimary === true,
            },
          })
        )
      );

      return {
        contactPage: newContactPage,
        contactInfo: createdContactInfo,
        businessHours: createdBusinessHours,
        socialLinks: createdSocialLinks,
        locations: createdLocations,
      };
    });

    res.status(201).json({
      message: "Contact Page created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in createContactPage:", error);
    res.status(500).json({ message: "Failed to create Contact Page", success: false });
  }
};

// Fetch Contact Page with all nested data
export const fetchContactPage = async (req, res) => {
  const storeId = req.store.Id;

  try {
    const contactPage = await prisma.contactPage.findUnique({
      where: { storeId },
      include: {
        information: {
          orderBy: { type: "asc" },
        },
        hours: {
          orderBy: { sortOrder: "asc" },
        },
        socialLinks: true,
        locations: true,
        submissions: {
          where: { status: { not: "SPAM" } },
          orderBy: { createdAt: "desc" },
          take: 50, // Limit to most recent 50 submissions
        },
      },
    });

    if (!contactPage) {
      return res.status(404).json({
        message: "Contact Page not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Contact Page fetched successfully",
      success: true,
      data: contactPage,
    });
  } catch (error) {
    console.error("Error in fetchContactPage:", error);
    res.status(500).json({
      message: "Failed to fetch Contact Page",
      success: false,
    });
  }
};

// Create a new contact submission
export const createContactSubmission = async (req, res) => {
  const storeId = req.store.Id;
  const { name, email, phone, message } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    // Find the contact page ID for this store
    const contactPage = await prisma.contactPage.findUnique({
      where: { storeId },
      select: { id: true },
    });

    if (!contactPage) {
      return res.status(404).json({
        message: "Contact Page not found",
        success: false,
      });
    }

    // Create the submission
    const submission = await prisma.contactSubmission.create({
      data: {
        pageId: contactPage.id,
        name,
        email,
        phone,
        message,
        status: "PENDING",
      },
    });

    res.status(201).json({
      message: "Contact form submitted successfully",
      success: true,
      data: {
        id: submission.id,
        createdAt: submission.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in createContactSubmission:", error);
    res.status(500).json({
      message: "Failed to submit contact form",
      success: false,
    });
  }
};

// Update submission status
export const updateSubmissionStatus = async (req, res) => {
  const userId = req.user.userid;
  const storeId = req.user.storeId;
  const submissionId = parseInt(req.params.id);
  const { status } = req.body;

  try {
    // Verify the submission belongs to this store
    const submission = await prisma.contactSubmission.findFirst({
      where: {
        id: submissionId,
        page: {
          storeId: storeId,
        },
      },
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
        success: false,
      });
    }

    // Validate status enum
    if (!["PENDING", "REVIEWED", "RESPONDED", "SPAM"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        success: false,
      });
    }

    // Update the submission status
    const updatedSubmission = await prisma.contactSubmission.update({
      where: { id: submissionId },
      data: { status },
    });

    res.status(200).json({
      message: "Submission status updated successfully",
      success: true,
      data: updatedSubmission,
    });
  } catch (error) {
    console.error("Error in updateSubmissionStatus:", error);
    res.status(500).json({
      message: "Failed to update submission status",
      success: false,
    });
  }
};

// Fetch all submissions for a store (with pagination and filtering)
export const fetchSubmissions = async (req, res) => {
  const storeId = req.user.storeId;
  const { page = 1, limit = 20, status } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    // Build where condition
    const whereCondition = {
      page: {
        storeId: storeId,
      },
    };

    // Add status filter if provided
    if (
      status &&
      ["PENDING", "REVIEWED", "RESPONDED", "SPAM"].includes(status)
    ) {
      whereCondition.status = status;
    }

    // Count total submissions
    const totalCount = await prisma.contactSubmission.count({
      where: whereCondition,
    });

    // Fetch submissions with pagination
    const submissions = await prisma.contactSubmission.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: parseInt(limit),
    });

    res.status(200).json({
      message: "Submissions fetched successfully",
      success: true,
      data: {
        submissions,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(totalCount / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error("Error in fetchSubmissions:", error);
    res.status(500).json({
      message: "Failed to fetch submissions",
      success: false,
    });
  }
};

// Update contact page information
export const updateContactPage = async (req, res) => {
  const userId = req.user.userid;
  const storeId = req.user.storeId;
  const { information, hours, socialLinks, locations } = req.body;

  try {
    // Check if contact page exists
    const existingPage = await prisma.contactPage.findUnique({
      where: { storeId },
    });

    if (!existingPage) {
      return res.status(404).json({
        message: "Contact Page not found",
        success: false,
      });
    }

    // Start transaction for all updates
    await prisma.$transaction(async (tx) => {
      // Update information if provided
      if (information) {
        // Delete existing information
        await tx.contactInfo.deleteMany({
          where: { pageId: existingPage.id },
        });

        // Create new information entries
        if (information.length > 0) {
          await tx.contactInfo.createMany({
            data: information.map((info) => ({
              pageId: existingPage.id,
              type: info.type,
              value: info.value,
              label: info.label,
              icon: info.icon,
              isPrimary: info.isPrimary || false,
            })),
          });
        }
      }

      // Update hours if provided
      if (hours) {
        // Delete existing hours
        await tx.businessHours.deleteMany({
          where: { pageId: existingPage.id },
        });

        // Create new hours entries
        if (hours.length > 0) {
          await tx.businessHours.createMany({
            data: hours.map((hour) => ({
              pageId: existingPage.id,
              days: hour.days,
              hours: hour.hours,
              isActive: hour.isActive !== false,
              sortOrder: hour.sortOrder || 0,
            })),
          });
        }
      }

      // Update social links if provided
      if (socialLinks) {
        // Delete existing social links
        await tx.socialLink.deleteMany({
          where: { pageId: existingPage.id },
        });

        // Create new social links
        if (socialLinks.length > 0) {
          await tx.socialLink.createMany({
            data: socialLinks.map((link) => ({
              pageId: existingPage.id,
              platform: link.platform,
              url: link.url,
              icon: link.icon,
              isActive: link.isActive !== false,
            })),
          });
        }
      }

      // Update locations if provided
      if (locations) {
        // Delete existing locations
        await tx.location.deleteMany({
          where: { pageId: existingPage.id },
        });

        // Create new locations
        if (locations.length > 0) {
          await tx.location.createMany({
            data: locations.map((location) => ({
              pageId: existingPage.id,
              name: location.name,
              address: location.address,
              city: location.city,
              state: location.state,
              country: location.country || "India",
              postalCode: location.postalCode,
              mapEmbedUrl: location.mapEmbedUrl,
              isPrimary: location.isPrimary || false,
            })),
          });
        }
      }
    });

    // Fetch updated contact page
    const updatedPage = await prisma.contactPage.findUnique({
      where: { storeId },
      include: {
        information: true,
        hours: { orderBy: { sortOrder: "asc" } },
        socialLinks: true,
        locations: true,
      },
    });

    res.status(200).json({
      message: "Contact Page updated successfully",
      success: true,
      data: updatedPage,
    });
  } catch (error) {
    console.error("Error in updateContactPage:", error);
    res.status(500).json({
      message: "Failed to update Contact Page",
      success: false,
    });
  }
};
