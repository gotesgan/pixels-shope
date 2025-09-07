import { prisma } from '../db/db.js';

// Create FAQ
export const createFaq = async (req, res) => {
  const { storeId } = req.user;
  const { id, question, answer, category } = req.body; // id optional for new FAQ

  try {
    const faq = await prisma.faq.upsert({
      where: { id: id || '' }, // if id exists, it tries to update, else it will create
      update: {
        question,
        answer,
        category,
      },
      create: {
        storeId,
        question,
        answer,
        category,
      },
    });

    res.status(200).json({
      message: 'FAQ upserted successfully',
      success: true,
      data: faq,
    });
  } catch (error) {
    console.error('Error upserting FAQ:', error);
    res.status(500).json({
      message: 'Failed to upsert FAQ',
      success: false,
      error: error.message,
    });
  }
};

// Get FAQ for Store
export const getFaq = async (req, res) => {
  const storeId = req.user.storeId;

  try {
    const faq = await prisma.faq.findMany({
      where: { storeId },
    });
    console.log('Fetched FAQ:', faq);

    if (!faq) {
      return res.status(404).json({
        message: 'FAQ not found for this store',
        success: false,
      });
    }

    res.status(200).json({
      message: 'FAQ fetched successfully',
      success: true,
      data: faq,
    });
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({
      message: 'Failed to fetch FAQ',
      success: false,
      error: error.message,
    });
  }
};

// Update FAQ

// Delete FAQ
export const deleteFaq = async (req, res) => {
  const { storeId } = req.user;
  try {
    await prisma.faq.delete({
      where: { storeId, id: req.params.id },
    });

    res.status(200).json({
      message: 'FAQ deleted successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({
      message: 'Failed to delete FAQ',
      success: false,
      error: error.message,
    });
  }
};
