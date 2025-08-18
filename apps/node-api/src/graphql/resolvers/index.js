// graphql/resolvers.js
import { prisma } from "../../db/db.js";

const resolvers = {
  Query: {
    // Contact Page
    contactPage: async (_, __, context) => {
      try {
        return await prisma.contactPage.findUnique({
          where: { storeId: context.req.store.id },
          include: {
            information: true,
            hours: { orderBy: { sortOrder: "asc" } },
            socialLinks: true,
            locations: { orderBy: { isPrimary: "desc" } },
            submissions: true,
          },
        });
      } catch (error) {
        console.error("ContactPage resolver error:", error);
        throw new Error("Failed to fetch contact page");
      }
    },

    // About Page
    aboutPage: async (_, __, context) => {
      try {
        return await prisma.aboutPage.findUnique({
          where: { storeId: context.req.store.id },
          include: {
            aboutCompany: { include: { media: true } },
            ourBrand: {
              include: {
                media: true,
                brandItems: { orderBy: { sortOrder: "asc" } },
              },
            },
            companyFact: {
              include: {
                media: true,
                factItems: { orderBy: { sortOrder: "asc" } },
              },
            },
            aboutSections: {
              include: {
                media: true,
                sectionItems: {
                  include: { media: true },
                  orderBy: { sortOrder: "asc" },
                },
              },
              orderBy: { sortOrder: "asc" },
            },
          },
        });
      } catch (error) {
        console.error("AboutPage resolver error:", error);
        throw new Error("Failed to fetch about page");
      }
    },

    // Hero Section
    heroSection: async (_, __, context) => {
      try {
        return await prisma.heroSection.findFirst({
          where: { storeId: context.req.store.id },
          include: { media: true },
        });
      } catch (error) {
        console.error("HeroSection resolver error:", error);
        return null;
      }
    },

    // Store Info
    storeInfo: async (_, __, context) => {
      try {
        return await prisma.storeInfo.findFirst({
          where: { storeId: context.req.store.id },
          include: { media: true },
        });
      } catch (error) {
        console.error("StoreInfo resolver error:", error);
        return null;
      }
    },

    // Legal Documents
    legalDocument: async (_, { type }, context) => {
      try {
        return await prisma.legalDocument.findFirst({
          where: {
            storeId: context.req.store.id,
            type,
          },
          include: { sections: true },
        });
      } catch (error) {
        console.error("LegalDocument resolver error:", error);
        throw new Error("Failed to fetch legal document");
      }
    },

    legalDocuments: async (_, __, context) => {
      try {
        return await prisma.legalDocument.findMany({
          where: { storeId: context.req.store.id },
          include: { sections: true },
          orderBy: { type: "asc" },
        });
      } catch (error) {
        console.error("LegalDocuments resolver error:", error);
        return [];
      }
    },

    // Contact Submissions with Pagination
    contactSubmissions: async (
      _,
      { page = 1, limit = 10, status },
      context
    ) => {
      try {
        const where = {
          page: { storeId: context.req.store.id },
          status: status || undefined,
        };

        const [submissions, total] = await Promise.all([
          prisma.contactSubmission.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
          }),
          prisma.contactSubmission.count({ where }),
        ]);

        return {
          submissions,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
          },
        };
      } catch (error) {
        console.error("ContactSubmissions resolver error:", error);
        throw new Error("Failed to fetch submissions");
      }
    },

    // Blog Resolver
    blog: async (_, __, context) => {
      try {
        return await prisma.blog.findMany({
          where: { storeId: context.req.store.id },
          include: { media: true },
        });
      } catch (error) {
        console.error("Blog resolver error:", error);
        throw new Error("Failed to fetch blog");
      }
    },

    // FAQ Resolver
    faq: async (_, __, context) => {
      try {
        const test = await prisma.faq.findMany({
          where: { storeId: context.req.store.id },
        });
        console.log(test);
        return await prisma.faq.findMany({
          where: { storeId: context.req.store.id },
        });
      } catch (error) {
        console.error("FAQ resolver error:", error);
        throw new Error("Failed to fetch FAQ");
      }
    },

    // PhonePe Status Resolver
    phonepeStatus: async (_, __, context) => {
      try {
        const phonePeConfig = await prisma.phonePe.findUnique({
          where: { storeId: context.req.store.id },
          select: { isActive: true }, // Only select the isActive field
        });

        // If no config exists, return inactive by default
        if (!phonePeConfig) {
          return { isActive: false };
        }

        return { isActive: phonePeConfig.isActive };
      } catch (error) {
        console.error("PhonePe status resolver error:", error);
        // Default to inactive if there's an error
        return { isActive: false };
      }
    },
  },
};

export default resolvers;
