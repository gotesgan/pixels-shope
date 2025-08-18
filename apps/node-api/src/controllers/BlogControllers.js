import { prisma } from "../db/db.js";
import mediaHandler from "../utils/mediahandler.js";
import fs from "fs";

// Create Blog with Media
export const createBlog = async (req, res) => {
  const { storeId } = req.user;
  const { title, description } = req.body;
  const files = req.files;

  try {
    // Process uploaded media
    const uploadedMedia = files ? await processBlogMedia(files, storeId) : [];

    const blog = await prisma.blog.upsert({
      data: {
        storeId,
        title,
        description,
        media: {
          create: uploadedMedia.map((media) => ({
            image: media.filename,
            storeId,
          })),
        },
      },
      include: { media: true },
    });

    // Cleanup temp files
    if (files) await cleanupTempFiles(files);

    res.status(201).json({
      message: "Blog created successfully",
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    if (files) await cleanupTempFiles(files).catch(console.error);
    res.status(500).json({
      message: "Failed to create blog",
      success: false,
      error: error.message,
    });
  }
};

// Get Blog for Store
export const getBlog = async (req, res) => {
  const { storeId } = req.user;

  try {
    const blog = await prisma.blog.findUnique({
      where: { storeId },
      include: { media: true },
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found for this store",
        success: false,
      });
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      message: "Failed to fetch blog",
      success: false,
      error: error.message,
    });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  const { storeId } = req.user;
  const { title, description } = req.body;
  const files = req.files;

  try {
    // Process new media if any
    const uploadedMedia = files ? await processBlogMedia(files, storeId) : [];

    const updatedBlog = await prisma.blog.update({
      where: { storeId },
      data: {
        title,
        description,
        ...(uploadedMedia.length > 0 && {
          media: {
            create: uploadedMedia.map((media) => ({
              image: media.filename,
              storeId,
            })),
          },
        }),
      },
      include: { media: true },
    });

    // Cleanup temp files
    if (files) await cleanupTempFiles(files);

    res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    if (files) await cleanupTempFiles(files).catch(console.error);
    res.status(500).json({
      message: "Failed to update blog",
      success: false,
      error: error.message,
    });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  const { storeId } = req.user;

  try {
    // First get media to potentially delete files later
    const blog = await prisma.blog.findUnique({
      where: { storeId },
      include: { media: true },
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    // Delete blog (media will cascade delete due to relation)
    await prisma.blog.delete({
      where: { storeId },
    });

    // Here you would typically also delete the actual media files
    // from storage, but that would depend on your setup

    res.status(200).json({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      message: "Failed to delete blog",
      success: false,
      error: error.message,
    });
  }
};

// Helper function to process blog media
async function processBlogMedia(files, storeId) {
  const uploadedMedia = [];

  // Convert files to array if needed
  const fileArray = Array.isArray(files) ? files : Object.values(files);

  for (const file of fileArray) {
    try {
      const mediaData = await mediaHandler.upload(file.path);
      if (mediaData?.uploadedImages?.length > 0) {
        uploadedMedia.push({
          filename: mediaData.uploadedImages[0].filename,
          path: file.path,
        });
      }
    } catch (error) {
      console.error("Error processing media file:", error);
    }
  }

  return uploadedMedia;
}

// Helper function to cleanup temp files
async function cleanupTempFiles(files) {
  const fileArray = Array.isArray(files) ? files : Object.values(files);

  for (const file of fileArray) {
    if (file.path) {
      try {
        await fs.promises.unlink(file.path);
      } catch (error) {
        console.error("Error deleting temp file:", error);
      }
    }
  }
}
// Get Blog by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  const { storeId } = req.user;

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
        storeId,
      },
      include: { media: true },
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({
      message: "Failed to fetch blog",
      success: false,
      error: error.message,
    });
  }
};
