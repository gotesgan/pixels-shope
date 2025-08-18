import { prisma } from "../db/db.js";
import fs from "fs";
import path from "path";
import mediaHandler from "../utils/mediahandler.js";

export const CreateHeroSection = async (req, res) => {
  const userid = req.user.userid;
  const storeId = req.user.storeId;
  const file = req.file;
  console.log("File path:", file.path);

  try {
    const userExist = await prisma.user.findUnique({
      where: { id: userid },
      include: { stores: { select: { id: true } } },
    });

    const hasStoreAccess = userExist?.stores.some(
      (store) => store.id === storeId
    );

    if (!hasStoreAccess) {
      return res.status(400).json({
        message: "Store ID is invalid",
        success: false,
      });
    }

    if (!file) {
      return res.status(400).json({
        message: "No image file uploaded",
        success: false,
      });
    }

    // Process only the first file
    const mediaData = await mediaHandler.upload(file.path);
    const uploadedImage = mediaData.uploadedImages[0]?.filename;

    // Delete all uploaded temp files
    await fs.promises.unlink(file.path);

    const result = await prisma.$transaction(async (tx) => {
      const heroSection = await tx.heroSection.create({
        data: {
          storeId: storeId,
          // add other fields from req.body if needed
        },
      });

      const media = await tx.media.create({
        data: {
          storeId: storeId,
          heroSectionId: heroSection.id,
          image: uploadedImage,
        },
      });

      return { heroSection, media };
    });

    res.status(201).json({
      message: "Hero Section and Media Created Successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in CreateHeroSection:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const fetchHerosection = async (req, res) => {
  const storeId = res.store.id;
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
        message: "Hero Section not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Hero Section fetched successfully",
      success: true,
      data: heroSection,
    });
  } catch (error) {
    console.error("Error in fetchHerosection:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
