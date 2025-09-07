import { prisma } from '../db/db.js';
import fs from 'fs';
import path from 'path';
import mediaHandler from '../utils/mediahandler.js';

export const CreateHeroSection = async (req, res) => {
  const userid = req.user.userid;
  const storeId = req.user.storeId;
  const { title, subtitle, buttonText, buttonLink } = req.body;
  const key = req.file.key;
  console.log('User Data:', req.user);
  console.log('Request Body:', req.body);

  try {
    const userExist = await prisma.user.findUnique({
      where: { id: userid },
      include: { stores: { select: { id: true } } },
    });

    const hasStoreAccess = userExist?.stores.some(
      (store) => store.id === storeId,
    );

    if (!hasStoreAccess) {
      return res.status(400).json({
        message: 'Store ID is invalid',
        success: false,
      });
    }

    const heroSection = await prisma.heroSection.create({
      data: {
        storeId: storeId,
        title: title,
        subtitle: subtitle,
        ctaText: buttonText,
        ctaLink: buttonLink,
        media: {
          create: {
            image: key,
            storeId: storeId,
          },
        },

        // add other fields from req.body if needed later
      },
    });
    console.log('Created Hero Section:', heroSection);
    res.status(201).json({
      message: 'Hero Section Created Successfully',
      success: true,
      data: heroSection,
    });
  } catch (error) {
    console.error('Error in CreateHeroSection:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

export const fetchHerosection = async (req, res) => {
  const storeId = req.user.storeId;
  try {
    const heroSection = await prisma.heroSection.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        media: true,
      },
    });

    if (!heroSection) {
      return res.status(404).json({
        message: 'Hero Section not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Hero Section fetched successfully',
      success: true,
      data: heroSection,
    });
  } catch (error) {
    console.error('Error in fetchHerosection:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

export const deleteHeroSection = async (req, res) => {
  const { id } = req.params; // id is already a string
  const storeId = req.user.storeId;

  console.log(
    `[deleteHeroSection] Request received for heroSection id: ${id}, storeId: ${storeId}`,
  );

  try {
    // Fetch hero section with its associated media
    const heroSection = await prisma.heroSection.findUnique({
      where: { id }, // use the string ID directly
      include: { media: true }, // single media object
    });

    console.log('[deleteHeroSection] Fetched heroSection:', heroSection);

    if (!heroSection || heroSection.storeId !== storeId) {
      console.warn(
        `[deleteHeroSection] Hero section not found or access denied for storeId: ${storeId}`,
      );
      return res.status(404).json({
        message: 'Hero Section not found or access denied',
        success: false,
      });
    }

    // Delete associated media if it exists
    if (heroSection.media) {
      console.log(
        `[deleteHeroSection] Deleting associated media id: ${heroSection.media.id}`,
      );
      await prisma.media.delete({
        where: { id: heroSection.media.id },
      });
      console.log('[deleteHeroSection] Media deleted successfully');
    } else {
      console.log('[deleteHeroSection] No associated media found');
    }

    // Delete the hero section itself
    console.log(
      `[deleteHeroSection] Deleting heroSection id: ${heroSection.id}`,
    );
    const deletedHeroSection = await prisma.heroSection.delete({
      where: { id }, // string ID
    });
    console.log(
      '[deleteHeroSection] Hero section deleted successfully:',
      deletedHeroSection,
    );

    res.json({
      message: 'Hero Section deleted successfully',
      success: true,
      deletedHeroSection,
    });
  } catch (error) {
    console.error('[deleteHeroSection] Error deleting hero section:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};

// delete hero section
