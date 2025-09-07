import { prisma } from '../../db/db.js';
import { GraphQLScalarType, Kind } from 'graphql';

// Recursive helper for parsing AST literals
function parseLiteral(ast) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
    case Kind.INT:
    case Kind.FLOAT:
      return ast.value;
    case Kind.OBJECT:
      const obj = Object.create(null);
      ast.fields.forEach((field) => {
        obj[field.name.value] = parseLiteral(field.value);
      });
      return obj;
    case Kind.LIST:
      return ast.values.map(parseLiteral);
    default:
      return null;
  }
}

const resolvers = {
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: 'Arbitrary JSON value',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      return parseLiteral(ast);
    },
  }),

  Query: {
    contactPage: async (_, __, context) => {
      try {
        return await prisma.contactPage.findUnique({
          where: { storeId: context.req.store.id },
          include: {
            information: true,
            hours: { orderBy: { sortOrder: 'asc' } },
            socialLinks: true,
            locations: { orderBy: { isPrimary: 'desc' } },
            submissions: true,
          },
        });
      } catch (error) {
        console.error('ContactPage resolver error:', error);
        throw new Error('Failed to fetch contact page');
      }
    },

    aboutPage: async (_, __, context) => {
      try {
        return await prisma.aboutPage.findUnique({
          where: { storeId: context.req.store.id },
          include: {
            media: true,
          },
        });
      } catch (error) {
        console.error('AboutPage resolver error:', error);
        throw new Error('Failed to fetch about page');
      }
    },

    heroSections: async (_, __, context) => {
      try {
        return await prisma.heroSection.findMany({
          where: { storeId: context.req.store.id },
          include: { media: true },
        });
      } catch (error) {
        console.error('HeroSections resolver error:', error);
        return [];
      }
    },

    storeInfo: async (_, __, context) => {
      try {
        return await prisma.storeInfo.findFirst({
          where: { storeId: context.req.store.id },
          include: { media: true },
        });
      } catch (error) {
        console.error('StoreInfo resolver error:', error);
        return null;
      }
    },

    legalDocument: async (_, { type }, context) => {
      try {
        return await prisma.legalDocument.findFirst({
          where: { storeId: context.req.store.id, type },
          include: { sections: true },
        });
      } catch (error) {
        console.error('LegalDocument resolver error:', error);
        throw new Error('Failed to fetch legal document');
      }
    },

    legalDocuments: async (_, __, context) => {
      try {
        return await prisma.legalDocument.findMany({
          where: { storeId: context.req.store.id },
          include: { sections: true },
          orderBy: { type: 'asc' },
        });
      } catch (error) {
        console.error('LegalDocuments resolver error:', error);
        return [];
      }
    },

    contactSubmissions: async (
      _,
      { page = 1, limit = 10, status },
      context
    ) => {
      try {
        const where = {
          storeId: context.req.store.id,
          status: status || undefined,
        };
        const [submissions, total] = await Promise.all([
          prisma.contactSubmission.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: 'desc' },
          }),
          prisma.contactSubmission.count({ where }),
        ]);

        return {
          submissions,
          pagination: { total, page, limit, pages: Math.ceil(total / limit) },
        };
      } catch (error) {
        console.error('ContactSubmissions resolver error:', error);
        throw new Error('Failed to fetch submissions');
      }
    },

    blog: async (_, __, context) => {
      try {
        return await prisma.blog.findMany({
          where: { storeId: context.req.store.id },
          include: { media: true },
        });
      } catch (error) {
        console.error('Blog resolver error:', error);
        throw new Error('Failed to fetch blog');
      }
    },

    faq: async (_, __, context) => {
      try {
        return await prisma.faq.findMany({
          where: { storeId: context.req.store.id },
        });
      } catch (error) {
        console.error('FAQ resolver error:', error);
        throw new Error('Failed to fetch FAQ');
      }
    },

    phonepeStatus: async (_, __, context) => {
      try {
        const phonePeConfig = await prisma.phonePe.findUnique({
          where: { storeId: context.req.store.id },
          select: { isActive: true },
        });
        return { isActive: phonePeConfig?.isActive || false };
      } catch (error) {
        console.error('PhonePe status resolver error:', error);
        return { isActive: false };
      }
    },
  },
};

export default resolvers;
