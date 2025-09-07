import mediaHandler from '../utils/mediahandler.js';
import { prisma } from '../db/db.js';
import fs from 'fs';
import path from 'path';

// Main Upsert Function
// Enhanced upsertAboutPage with robust handling for optional image fields
export const upsertAboutPage = async (req, res) => {
  const userId = req.user.userid;
  const storeId = req.user.storeId;

  try {
    // Parse incoming JSON/form data
    const formData = parseFormData(req.body);

    // Initialize content if not present
    const content = formData.content || {};

    // Handle uploaded media (images) safely
    // Handle uploaded media (images) safely
    if (req.files?.length) {
      req.files.forEach((file) => {
        const path = file.fieldname.split(/[.\[\]]+/).filter(Boolean); // splits nested paths like team[0].image
        let current = content;

        // Special case: storyImage should map to story.image
        if (file.fieldname === 'storyImage') {
          if (!current.story) current.story = {};
          current.story.image = file.key || file.location;
          return;
        }

        // Default case (nested paths)
        for (let i = 0; i < path.length - 1; i++) {
          if (!current[path[i]]) current[path[i]] = {};
          current = current[path[i]];
        }
        current[path[path.length - 1]] = file.key || file.location; // S3 or local path
      });
    }

    console.log('Parsed Form Data:', content, req.files);

    // ✅ Upsert AboutPage while preserving existing images if no new file uploaded
    // Assume prisma is available and aboutPage may already exist
    // Fetch existing record first
    const existingAboutPage = await prisma.aboutPage.findUnique({
      where: { storeId },
    });

    const mergedContent = {
      ...existingAboutPage?.content,
      ...content,
      // merge arrays like team without overwriting existing images if not provided
      team: (content.team || []).map((item, idx) => ({
        ...existingAboutPage?.content?.team?.[idx],
        ...item,
        image: item.image || existingAboutPage?.content?.team?.[idx]?.image,
      })),
      story: {
        ...existingAboutPage?.content?.story,
        ...content.story,
        image: content.story?.image || existingAboutPage?.content?.story?.image,
      },
    };

    const aboutPage = await prisma.aboutPage.upsert({
      where: { storeId },
      update: { content: mergedContent },
      create: { storeId, content: mergedContent },
    });

    res.status(200).json({
      success: true,
      message: 'About Page upserted successfully',
      data: aboutPage,
    });
  } catch (err) {
    console.error('Upsert error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Parse Form Data Helper
function parseFormData(body) {
  try {
    return {
      content: {
        story: body.story ? JSON.parse(body.story) : {},
        milestones: body.milestones ? JSON.parse(body.milestones) : [],
        team: body.team ? JSON.parse(body.team) : [],
      },
    };
  } catch (e) {
    console.error('FormData parse error:', e);
    return { content: {} };
  }
}

// Fetch About Page with all media
export const fetchAboutPage = async (req, res) => {
  const storeId = req.store.id;
  console.log('Fetching About Page for Store ID:', storeId);

  try {
    // Fetch the AboutPage record
    const aboutPage = await prisma.aboutPage.findUnique({
      where: { storeId },
    });

    if (!aboutPage) {
      return res.status(404).json({
        message: 'About Page not found',
        success: false,
      });
    }

    // Parse the JSON content to return a structured object
    let content = {};
    try {
      content =
        typeof aboutPage.content === 'string'
          ? JSON.parse(aboutPage.content)
          : aboutPage.content;
    } catch (err) {
      console.warn('Failed to parse AboutPage content JSON:', err);
      content = aboutPage.content;
    }

    return res.status(200).json({
      message: 'About Page fetched successfully',
      success: true,
      data: {
        id: aboutPage.id,
        storeId: aboutPage.storeId,
        content,
        createdAt: aboutPage.createdAt,
        updatedAt: aboutPage.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error in fetchAboutPage:', error);
    res.status(500).json({
      message: 'Failed to fetch About Page',
      success: false,
    });
  }
};
