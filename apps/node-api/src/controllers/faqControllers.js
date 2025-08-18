import { prisma } from "../db/db.js";

// Create FAQ
export const createFaq = async (req, res) => {
  const { storeId } = req.user;
  const { question, answer,category } = req.body;

  try {
    const faq = await prisma.faq.create({
      data: {
        storeId,
        question,
        category,
        answer,
      },
    });

    res.status(201).json({
      message: "FAQ created successfully",
      success: true,
      data: faq,
    });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({
      message: "Failed to create FAQ",
      success: false,
      error: error.message,
    });
  }
};

// Get FAQ for Store
export const getFaq = async (req, res) => {
  const { storeId } = req.user;

  try {
    const faq = await prisma.faq.findUnique({
      where: { storeId },
    });

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found for this store",
        success: false,
      });
    }

    res.status(200).json({
      message: "FAQ fetched successfully",
      success: true,
      data: faq,
    });
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    res.status(500).json({
      message: "Failed to fetch FAQ",
      success: false,
      error: error.message,
    });
  }
};

// Update FAQ
export const updateFaq = async (req, res) => {
  const { storeId } = req.user;
  const { question, answer } = req.body;

  try {
    const updatedFaq = await prisma.faq.update({
      where: { storeId },
      data: { question, answer },
    });

    res.status(200).json({
      message: "FAQ updated successfully",
      success: true,
      data: updatedFaq,
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({
      message: "Failed to update FAQ",
      success: false,
      error: error.message,
    });
  }
};

// Delete FAQ
export const deleteFaq = async (req, res) => {
  const { storeId } = req.user;

  try {
    await prisma.faq.delete({
      where: { storeId },
    });

    res.status(200).json({
      message: "FAQ deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.status(500).json({
      message: "Failed to delete FAQ",
      success: false,
      error: error.message,
    });
  }
};
