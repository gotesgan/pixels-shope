import { gql } from 'graphql-tag';

export const schema = gql`
  scalar JSON

  # Query Root
  type Query {
    contactPage: ContactPage
    aboutPage: AboutPage
    heroSections: [HeroSection!]!
    storeInfo: StoreInfo
    contactSubmissions(
      page: Int
      limit: Int
      status: String
    ): SubmissionResponse
    legalDocument(type: String!): LegalDocument
    legalDocuments: [LegalDocument]
    blog: [Blog]
    faq: [FAQ]
    razorpayStatus: RazorpayStatus
  }

  # Hero Section
  type HeroSection {
    id: ID!
    storeId: ID!
    title: String
    subtitle: String
    ctaText: String
    ctaLink: String
    media: Media
  }

  # Contact Page
  type ContactPage {
    id: ID!
    storeId: ID!
    information: [ContactInfo]
    hours: [BusinessHours]
    socialLinks: [SocialLink]
    locations: [Location]
    submissions: [ContactSubmission]
  }

  type ContactInfo {
    id: ID!
    type: String!
    value: String!
    label: String
    icon: String
    isPrimary: Boolean!
  }

  type BusinessHours {
    id: ID!
    days: String!
    hours: String!
    isActive: Boolean!
    sortOrder: Int!
  }

  type SocialLink {
    id: ID!
    platform: String!
    url: String!
    icon: String
    isActive: Boolean!
  }

  type Location {
    id: ID!
    name: String!
    address: String!
    city: String!
    state: String!
    country: String!
    postalCode: String!
    mapEmbedUrl: String
    isPrimary: Boolean!
  }

  type ContactSubmission {
    id: ID!
    name: String!
    email: String!
    phone: String!
    message: String!
    status: String!
    createdAt: String!
  }

  type SubmissionResponse {
    submissions: [ContactSubmission]
    pagination: Pagination
  }

  type Pagination {
    total: Int
    page: Int
    limit: Int
    pages: Int
  }

  # About Page
  type AboutPage {
    id: ID!
    storeId: ID!
    content: JSON
    media: [Media]
    createdAt: String!
    updatedAt: String!
  }

  # Store Info
  enum Show {
    logo
    name
    both
  }

  type StoreInfo {
    id: ID!
    storeId: String!
    name: String!
    media: Media
    displayMode: Show!
    colour: String!
    businessTypes: String
    tagline: String
    description: String
    address: String
    city: String
    state: String
    country: String
    postalCode: String
    phone: String
    createdAt: String!
    updatedAt: String!
  }

  # Legal Document
  type LegalDocument {
    id: ID!
    type: String!
    title: String!
    lastUpdated: String!
    sections: [DocumentSection]
  }

  type DocumentSection {
    id: ID!
    heading: String!
    content: String!
    isOrdered: Boolean!
    listItems: [String]
  }

  # Shared Media
  type Media {
    id: ID!
    image: String!
  }

  type Blog {
    id: ID!
    title: String!
    description: String!
    media: [Media]
    storeId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type FAQ {
    id: ID!
    question: String!
    answer: String!
    storeId: ID!
    category: String!
    createdAt: String!
    updatedAt: String!
  }

  type RazorpayStatus {
    isActive: Boolean!
  }
`;
