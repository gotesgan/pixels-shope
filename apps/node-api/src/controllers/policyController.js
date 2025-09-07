import { prisma } from '../db/db.js';
// Create Legal Document with sections
export const createLegalDocument = async (req, res) => {
  const userId = req.user.userid;
  const storeId = req.user.storeId;
  const { type, title, sections } = req.body;

  try {
    // 1. Validate document type
    if (!['PRIVACY', 'TERMS', 'RETURN'].includes(type)) {
      return res.status(400).json({
        message: 'Invalid document type',
        success: false,
      });
    }

    // 2. Check user access
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { stores: { select: { id: true } } },
    });

    if (!user?.stores.some((store) => store.id === storeId)) {
      return res.status(403).json({
        message: 'Invalid store access',
        success: false,
      });
    }

    // 3. Filter and validate sections
    const validSections = (sections || []).filter(
      (section) => section.heading && section.content,
    );

    // Optional: Return an error if no valid sections provided
    if (validSections.length === 0) {
      return res.status(400).json({
        message:
          'At least one valid section with heading and content is required',
        success: false,
      });
    }

    // 4. Create document and sections transactionally
    const result = await prisma.$transaction(async (tx) => {
      const newDocument = await tx.legalDocument.create({
        data: {
          storeId,
          type,
          title,
          lastUpdated: new Date(),
        },
      });

      await tx.section.createMany({
        data: validSections.map((section) => ({
          documentId: newDocument.id,
          heading: section.heading,
          content: section.content,
          isOrdered: section.isOrdered || false,
          listItems: section.listItems || [],
        })),
      });

      return newDocument;
    });

    // 5. Fetch created document with sections
    const createdDocument = await prisma.legalDocument.findUnique({
      where: { id: result.id },
      include: { sections: true },
    });

    return res.status(201).json({
      message: 'Legal document created successfully',
      success: true,
      data: createdDocument,
    });
  } catch (error) {
    console.error('Error in createLegalDocument:', error);
    return res.status(500).json({
      message: 'Failed to create legal document',
      success: false,
    });
  }
};

// Get Legal Document by type
export const getLegalDocument = async (req, res) => {
  const storeId = req.store.Id;
  const { type } = req.params;

  try {
    const document = await prisma.legalDocument.findFirst({
      where: {
        storeId,
        type: type.toUpperCase(),
      },
      include: {
        sections,
      },
    });

    if (!document) {
      return res.status(404).json({
        message: 'Document not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Document fetched successfully',
      success: true,
      data: document,
    });
  } catch (error) {
    console.error('Error in getLegalDocument:', error);
    res.status(500).json({
      message: 'Failed to fetch document',
      success: false,
    });
  }
};

// Update Legal Document and sections
export const updateLegalDocument = async (req, res) => {
  const userId = req.user.userid;
  const storeId = req.user.storeId;
  const documentId = req.params.id;
  const { title, sections } = req.body;

  try {
    // Verify document ownership
    const existingDoc = await prisma.legalDocument.findFirst({
      where: {
        id: documentId,
        storeId,
      },
    });

    if (!existingDoc) {
      return res.status(404).json({
        message: 'Document not found',
        success: false,
      });
    }

    await prisma.$transaction(async (tx) => {
      // Update document
      await tx.legalDocument.update({
        where: { id: documentId },
        data: {
          title,
          lastUpdated: new Date(),
        },
      });

      // Delete existing sections
      await tx.section.deleteMany({
        where: { documentId },
      });

      // Create new sections
      if (sections?.length > 0) {
        await tx.section.createMany({
          data: sections.map((section) => ({
            documentId,
            heading: section.heading,
            content: section.content,
            isOrdered: section.isOrdered || false,
            listItems: section.listItems || [],
          })),
        });
      }
    });

    // Fetch updated document
    const updatedDocument = await prisma.legalDocument.findUnique({
      where: { id: documentId },
      include: { sections: true },
    });

    res.status(200).json({
      message: 'Document updated successfully',
      success: true,
      data: updatedDocument,
    });
  } catch (error) {
    console.error('Error in updateLegalDocument:', error);
    res.status(500).json({
      message: 'Failed to update document',
      success: false,
    });
  }
};

// Delete Legal Document
export const deleteLegalDocument = async (req, res) => {
  const userId = req.user.userid;
  const storeId = req.user.storeId;
  const documentId = req.params.id;

  try {
    // Verify document ownership
    const document = await prisma.legalDocument.findFirst({
      where: {
        id: documentId,
        storeId,
      },
    });

    if (!document) {
      return res.status(404).json({
        message: 'Document not found',
        success: false,
      });
    }

    await prisma.$transaction([
      prisma.section.deleteMany({ where: { documentId } }),
      prisma.legalDocument.delete({ where: { id: documentId } }),
    ]);

    res.status(200).json({
      message: 'Document deleted successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error in deleteLegalDocument:', error);
    res.status(500).json({
      message: 'Failed to delete document',
      success: false,
    });
  }
};

// List all Legal Documents for store
export const listLegalDocuments = async (req, res) => {
  const storeId = req.store.Id;

  try {
    const documents = await prisma.legalDocument.findMany({
      where: { storeId },
      include: {
        sections: {},
      },
      orderBy: { type: 'asc' },
    });

    res.status(200).json({
      message: 'Documents fetched successfully',
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error('Error in listLegalDocuments:', error);
    res.status(500).json({
      message: 'Failed to fetch documents',
      success: false,
    });
  }
};
