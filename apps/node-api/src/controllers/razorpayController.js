import { prisma } from '../db/db.js';

// Create Razorpay Config
export const createRazorpay = async (req, res) => {
  const { storeId } = req.user;
  const { keyId, keySecret } = req.body;

  try {
    const razorpayConfig = await prisma.razorpay.upsert({
      where: { storeId }, // assumes storeId is unique in Razorpay model
      update: {
        keyId,
        keySecret,
      },
      create: {
        storeId,
        keyId,
        keySecret,
        isActive: true, // default active when first created
      },
    });

    res.status(200).json({
      message: 'Razorpay configuration saved successfully',
      success: true,
      data: razorpayConfig,
    });
  } catch (error) {
    console.error('Error saving Razorpay configuration:', error);
    res.status(500).json({
      message: 'Failed to save Razorpay configuration',
      success: false,
      error: error.message,
    });
  }
};

// Get Razorpay Config
export const getRazorpay = async (req, res) => {
  const { storeId } = req.user;

  try {
    const razorpayConfig = await prisma.razorpay.findUnique({
      where: { storeId },
    });

    if (!razorpayConfig) {
      return res.status(404).json({
        message: 'Razorpay configuration not found for this store',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Razorpay configuration fetched successfully',
      success: true,
      data: razorpayConfig,
    });
  } catch (error) {
    console.error('Error fetching Razorpay configuration:', error);
    res.status(500).json({
      message: 'Failed to fetch Razorpay configuration',
      success: false,
      error: error.message,
    });
  }
};

// Update Razorpay Config
export const updateRazorpay = async (req, res) => {
  const { storeId } = req.user;
  const { keyId, keySecret, isActive } = req.body;

  try {
    const existingConfig = await prisma.razorpay.findUnique({
      where: { storeId },
    });

    if (!existingConfig) {
      return res.status(404).json({
        message: 'Razorpay configuration not found for this store',
        success: false,
      });
    }

    const updatedConfig = await prisma.razorpay.update({
      where: { storeId },
      data: {
        keyId,
        keySecret,
        isActive: isActive !== undefined ? isActive : existingConfig.isActive,
      },
    });

    res.status(200).json({
      message: 'Razorpay configuration updated successfully',
      success: true,
      data: updatedConfig,
    });
  } catch (error) {
    console.error('Error updating Razorpay configuration:', error);
    res.status(500).json({
      message: 'Failed to update Razorpay configuration',
      success: false,
      error: error.message,
    });
  }
};

// Delete Razorpay Config
export const deleteRazorpay = async (req, res) => {
  const { storeId } = req.user;

  try {
    const existingConfig = await prisma.razorpay.findUnique({
      where: { storeId },
    });

    if (!existingConfig) {
      return res.status(404).json({
        message: 'Razorpay configuration not found for this store',
        success: false,
      });
    }

    await prisma.razorpay.delete({
      where: { storeId },
    });

    res.status(200).json({
      message: 'Razorpay configuration deleted successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error deleting Razorpay configuration:', error);
    res.status(500).json({
      message: 'Failed to delete Razorpay configuration',
      success: false,
      error: error.message,
    });
  }
};

// Toggle Razorpay Config Active Status
export const toggleRazorpayStatus = async (req, res) => {
  const { storeId } = req.user;

  try {
    let existingConfig = await prisma.razorpay.findUnique({
      where: { storeId },
    });

    if (!existingConfig) {
      existingConfig = await prisma.razorpay.create({
        data: {
          storeId,
          keyId: '',
          keySecret: '',
          isActive: true,
        },
      });

      return res.status(201).json({
        message: 'Razorpay configuration created and activated successfully',
        success: true,
        data: existingConfig,
      });
    }

    const updatedConfig = await prisma.razorpay.update({
      where: { storeId },
      data: {
        isActive: !existingConfig.isActive,
      },
    });

    res.status(200).json({
      message: `Razorpay configuration ${
        updatedConfig.isActive ? 'activated' : 'deactivated'
      } successfully`,
      success: true,
      data: updatedConfig,
    });
  } catch (error) {
    console.error('Error toggling Razorpay configuration status:', error);
    res.status(500).json({
      message: 'Failed to toggle Razorpay status',
      success: false,
      error: error.message,
    });
  }
};
