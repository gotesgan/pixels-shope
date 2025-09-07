import { prisma } from '../db/db.js';

// Create PhonePe Config
export const createPhonePe = async (req, res) => {
  const { storeId } = req.user;
  const { clientId, clientSecret, clientVersion } = req.body;

  try {
    // Check if a config already exists for this store
    const existingConfig = await prisma.phonePe.findUnique({
      where: { storeId },
    });

    if (existingConfig) {
      return res.status(400).json({
        message: 'PhonePe configuration already exists for this store',
        success: false,
      });
    }

    const phonePeConfig = await prisma.phonePe.create({
      data: {
        storeId,
        clientId,
        clientSecret,
        clientVersion,
        isActive: true, // Default to inactive until manually activated
      },
    });

    res.status(201).json({
      message: 'PhonePe configuration created successfully',
      success: true,
      data: phonePeConfig,
    });
  } catch (error) {
    console.error('Error creating PhonePe configuration:', error);
    res.status(500).json({
      message: 'Failed to create PhonePe configuration',
      success: false,
      error: error.message,
    });
  }
};

// Get PhonePe Config for Store
export const getPhonePe = async (req, res) => {
  const { storeId } = req.user;

  try {
    const phonePeConfig = await prisma.phonePe.findUnique({
      where: { storeId },
    });

    if (!phonePeConfig) {
      return res.status(404).json({
        message: 'PhonePe configuration not found for this store',
        success: false,
      });
    }

    res.status(200).json({
      message: 'PhonePe configuration fetched successfully',
      success: true,
      data: phonePeConfig,
    });
  } catch (error) {
    console.error('Error fetching PhonePe configuration:', error);
    res.status(500).json({
      message: 'Failed to fetch PhonePe configuration',
      success: false,
      error: error.message,
    });
  }
};

// Update PhonePe Config
export const updatePhonePe = async (req, res) => {
  const { storeId } = req.user;
  const { clientId, clientSecret, clientVersion, isActive } = req.body;

  try {
    // Check if the config exists
    const existingConfig = await prisma.phonePe.findUnique({
      where: { storeId },
    });

    if (!existingConfig) {
      return res.status(404).json({
        message: 'PhonePe configuration not found for this store',
        success: false,
      });
    }

    const updatedConfig = await prisma.phonePe.update({
      where: { storeId },
      data: {
        clientId,
        clientSecret,
        clientVersion,
        isActive: isActive !== undefined ? isActive : existingConfig.isActive,
      },
    });

    res.status(200).json({
      message: 'PhonePe configuration updated successfully',
      success: true,
      data: updatedConfig,
    });
  } catch (error) {
    console.error('Error updating PhonePe configuration:', error);
    res.status(500).json({
      message: 'Failed to update PhonePe configuration',
      success: false,
      error: error.message,
    });
  }
};

// Delete PhonePe Config
export const deletePhonePe = async (req, res) => {
  const { storeId } = req.user;

  try {
    // Check if the config exists
    const existingConfig = await prisma.phonePe.findUnique({
      where: { storeId },
    });

    if (!existingConfig) {
      return res.status(404).json({
        message: 'PhonePe configuration not found for this store',
        success: false,
      });
    }

    await prisma.phonePe.delete({
      where: { storeId },
    });

    res.status(200).json({
      message: 'PhonePe configuration deleted successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error deleting PhonePe configuration:', error);
    res.status(500).json({
      message: 'Failed to delete PhonePe configuration',
      success: false,
      error: error.message,
    });
  }
};

// Toggle PhonePe Config Active Status
export const togglePhonePeStatus = async (req, res) => {
  const { storeId } = req.user;

  try {
    const existingConfig = await prisma.phonePe.findUnique({
      where: { storeId },
    });

    if (!existingConfig) {
      return res.status(404).json({
        message: 'PhonePe configuration not found for this store',
        success: false,
      });
    }

    const updatedConfig = await prisma.phonePe.update({
      where: { storeId },
      data: {
        isActive: !existingConfig.isActive,
      },
    });

    res.status(200).json({
      message: `PhonePe configuration ${
        updatedConfig.isActive ? 'activated' : 'deactivated'
      } successfully`,
      success: true,
      data: updatedConfig,
    });
  } catch (error) {
    console.error('Error toggling PhonePe configuration status:', error);
    res.status(500).json({
      message: 'Failed to toggle PhonePe status',
      success: false,
      error: error.message,
    });
  }
};
