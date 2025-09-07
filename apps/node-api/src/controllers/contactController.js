import { prisma } from '../db/db.js';

// Updated createContactPage function with improved debugging and request body parsing

export const createContactPage = async (req, res) => {
  const userId = req.user.userid;
  const storeId = req.user.storeId;

  console.log('Upserting contact page for user:', userId, 'store:', storeId);
  console.log('Request body:', req.body);

  try {
    const {
      information = [],
      businessHours = [],
      socialLinks = [],
      locations = [],
    } = req.body;

    // Validate user access to store
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { stores: { select: { id: true } } },
    });

    if (!user?.stores.some((store) => store.id === storeId)) {
      return res
        .status(400)
        .json({ message: 'Invalid store access', success: false });
    }

    // Upsert contact page
    const result = await prisma.$transaction(async (tx) => {
      // Upsert main contact page
      const contactPage = await tx.contactPage.upsert({
        where: { storeId },
        update: {}, // we just need it to exist; children handle actual data
        create: { storeId },
      });

      // Remove existing related data before re-inserting
      await Promise.all([
        tx.contactInfo.deleteMany({ where: { pageId: contactPage.id } }),
        tx.businessHours.deleteMany({ where: { pageId: contactPage.id } }),
        tx.socialLink.deleteMany({ where: { pageId: contactPage.id } }),
        tx.location.deleteMany({ where: { pageId: contactPage.id } }),
      ]);

      // Insert new related data
      const contactInfo =
        information.length > 0
          ? await tx.contactInfo.createMany({
              data: information.map((info) => ({
                pageId: contactPage.id,
                type: info.type,
                value: info.value,
                label: info.label || '',
                icon: info.icon || '',
                isPrimary: Boolean(info.isPrimary),
              })),
            })
          : { count: 0 };

      const businessHoursData =
        businessHours.length > 0
          ? await tx.businessHours.createMany({
              data: businessHours.map((hour, index) => ({
                pageId: contactPage.id,
                days: hour.days,
                hours: hour.hours,
                isActive: Boolean(hour.isActive),
                sortOrder: hour.sortOrder || index,
              })),
            })
          : { count: 0 };

      const socialLinksData =
        socialLinks.length > 0
          ? await tx.socialLink.createMany({
              data: socialLinks.map((link) => ({
                pageId: contactPage.id,
                platform: link.platform,
                url: link.url,
                icon: link.icon || '',
                isActive: Boolean(link.isActive),
              })),
            })
          : { count: 0 };

      const locationsData =
        locations.length > 0
          ? await tx.location.createMany({
              data: locations.map((location) => ({
                pageId: contactPage.id,
                name: location.name,
                address: location.address,
                city: location.city,
                state: location.state,
                country: location.country || 'India',
                postalCode: location.postalCode || '',
                mapEmbedUrl: location.mapEmbedUrl || '',
                isPrimary: Boolean(location.isPrimary),
              })),
            })
          : { count: 0 };

      return {
        contactPage,
        counts: {
          contactInfo: contactInfo.count,
          businessHours: businessHoursData.count,
          socialLinks: socialLinksData.count,
          locations: locationsData.count,
        },
      };
    });

    res.status(200).json({
      message: 'Contact Page upserted successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error upserting contact page:', error);
    res.status(500).json({
      message: 'Failed to upsert Contact Page',
      success: false,
      error: error.message,
    });
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
          orderBy: { type: 'asc' },
        },
        hours: {
          orderBy: { sortOrder: 'asc' },
        },
        socialLinks: true,
        locations: true,
        submissions: {
          where: { status: { not: 'SPAM' } },
          orderBy: { createdAt: 'desc' },
          take: 50, // Limit to most recent 50 submissions
        },
      },
    });

    if (!contactPage) {
      return res.status(404).json({
        message: 'Contact Page not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Contact Page fetched successfully',
      success: true,
      data: contactPage,
    });
  } catch (error) {
    console.error('Error in fetchContactPage:', error);
    res.status(500).json({
      message: 'Failed to fetch Contact Page',
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
        message: 'Missing required fields',
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
        message: 'Contact Page not found',
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
        status: 'PENDING',
      },
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      success: true,
      data: {
        id: submission.id,
        createdAt: submission.createdAt,
      },
    });
  } catch (error) {
    console.error('Error in createContactSubmission:', error);
    res.status(500).json({
      message: 'Failed to submit contact form',
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
        message: 'Submission not found',
        success: false,
      });
    }

    // Validate status enum
    if (!['PENDING', 'REVIEWED', 'RESPONDED', 'SPAM'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status value',
        success: false,
      });
    }

    // Update the submission status
    const updatedSubmission = await prisma.contactSubmission.update({
      where: { id: submissionId },
      data: { status },
    });

    res.status(200).json({
      message: 'Submission status updated successfully',
      success: true,
      data: updatedSubmission,
    });
  } catch (error) {
    console.error('Error in updateSubmissionStatus:', error);
    res.status(500).json({
      message: 'Failed to update submission status',
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
      ['PENDING', 'REVIEWED', 'RESPONDED', 'SPAM'].includes(status)
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
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: parseInt(limit),
    });

    res.status(200).json({
      message: 'Submissions fetched successfully',
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
    console.error('Error in fetchSubmissions:', error);
    res.status(500).json({
      message: 'Failed to fetch submissions',
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
        message: 'Contact Page not found',
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
              country: location.country || 'India',
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
        hours: { orderBy: { sortOrder: 'asc' } },
        socialLinks: true,
        locations: true,
      },
    });

    res.status(200).json({
      message: 'Contact Page updated successfully',
      success: true,
      data: updatedPage,
    });
  } catch (error) {
    console.error('Error in updateContactPage:', error);
    res.status(500).json({
      message: 'Failed to update Contact Page',
      success: false,
    });
  }
};
