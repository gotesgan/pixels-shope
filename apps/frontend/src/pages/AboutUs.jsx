import { useState, useEffect } from 'react'
import {  ShieldCheck, Users, Leaf, ThumbsUp, Globe, Recycle, Palette } from 'lucide-react'
import {fetchGraphQL} from "../lib/fetchGrap"
import {
  Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle,
  Anchor, Aperture, Archive, ArrowDown, ArrowUp,
  ArrowLeft, ArrowRight, AtSign, Award, Battery,
  Bell, Book, Bookmark, Box, Briefcase,
  Calendar, Camera, Check, CheckCircle, ChevronDown,
  ChevronUp, ChevronLeft, ChevronRight, ChevronsDown, ChevronsUp,
  ChevronsLeft, ChevronsRight, Chrome, Circle, Clipboard,
  Clock, Cloud, Code, Coffee, Columns,
  Command, Compass, Copy, CornerUpLeft, CornerUpRight,
  CreditCard, Crop, Crosshair, Database, Delete
} from "lucide-react"







// Adjust the import path as needed
const iconMap = {
  activity: Activity,
  airplay: Airplay,
  alertCircle: AlertCircle,
  alertOctagon: AlertOctagon,
  alertTriangle: AlertTriangle,
  anchor: Anchor,
  aperture: Aperture,
  archive: Archive,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  atSign: AtSign,
  award: Award,
  battery: Battery,
  bell: Bell,
  book: Book,
  bookmark: Bookmark,
  box: Box,
  briefcase: Briefcase,
  calendar: Calendar,
  camera: Camera,
  check: Check,
  checkCircle: CheckCircle,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsDown: ChevronsDown,
  chevronsUp: ChevronsUp,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  chrome: Chrome,
  circle: Circle,
  clipboard: Clipboard,
  clock: Clock,
  cloud: Cloud,
  code: Code,
  coffee: Coffee,
  columns: Columns,
  command: Command,
  compass: Compass,
  copy: Copy,
  cornerUpLeft: CornerUpLeft,
  cornerUpRight: CornerUpRight,
  creditCard: CreditCard,
  crop: Crop,
  crosshair: Crosshair,
  database: Database,
  delete: Delete,
  users: Users,
  shieldCheck: ShieldCheck,
  leaf: Leaf,
  thumbsUp: ThumbsUp,
  globe: Globe,
  recycle: Recycle,
  palette: Palette
};

// Helper function to get icon
const getIconComponent = (name) => {
  // Convert to lowercase to make it case-insensitive
  if (!name) return Leaf; // fallback
  return iconMap[name] || Leaf;
}

// Fetch GraphQL data

export default function AboutUs() {
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Simple animation hook for scroll animations
  const useAnimation = () => {
    const [animated, setAnimated] = useState([])

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setAnimated(prev => [...prev, entry.target.id])
            }
          })
        },
        { threshold: 0.1 }
      )
      
      const elements = document.querySelectorAll('.animate-on-scroll')
      elements.forEach(el => {
        if (el) observer.observe(el)
      })
      
      return () => observer.disconnect()
    }, [pageData]) // Re-run when pageData changes to catch new elements

    return animated
  }

  const animated = useAnimation()

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const query = `query AboutPage {
          aboutPage {
            id
            storeId
            aboutCompany {
              id
              title
              description
              storyParagraphs
              media {
                id
                image
              }
            }
            ourBrand {
              id
              title
              description
              media {
                id
                image
              }
              brandItems {
                id
                name
                logoUrl
                sortOrder
              }
            }
            companyFact {
              id
              title
              description
              media {
                id
                image
              }
              factItems {
                id
                value
                label
                iconName
                sortOrder
              }
            }
            aboutSections {
              id
              title
              description
              sortOrder
              bgColor
              sectionType
              media {
                id
                image
              }
              sectionItems {
                id
                title
                description
                iconName
                value
                label
                sortOrder
                media {
                  id
                  image
                }
              }
            }
          }
        }`
        
        const host = window.location.hostname
        const response = await fetchGraphQL(host, query)
        
        if (!response || !response.aboutPage) {
          throw new Error('Invalid data structure returned from API')
        }
        
        console.log("About page data:", response.aboutPage)
        setPageData(response.aboutPage)
      } catch (err) {
        console.error("Error fetching about page data:", err)
        setError(err.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.svg"
    return `https://media.bizonance.in/api/v1/image/download/473d09b1-bd47-4297-9b0c-f79e6a7c9fc8/META/${imagePath}`
  }

  // Helper to safely access nested objects
  const safeGet = (obj, path, fallback = null) => {
    try {
      return path.split('.').reduce((o, key) => o && o[key], obj) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="py-10 px-4 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Error state
  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-lg">
          {error || 'Failed to load page data. Please try again later.'}
        </div>
      </div>
    )
  }

  // Extract sections with safe access
  const aboutCompany = pageData.aboutCompany || {}
  const ourBrand = pageData.ourBrand || {}
  const companyFact = pageData.companyFact || {}
  const aboutSections = pageData.aboutSections || []

  // Get services section if exists
  const servicesSection = aboutSections.find(section => 
    (section.title && section.title.toLowerCase().includes('service')) || 
    section.sectionType === 'SERVICES'
  )
  
  // Get updates/products section if exists
  const updatesSection = aboutSections.find(section => 
    (section.title && (
      section.title.toLowerCase().includes('update') || 
      section.title.toLowerCase().includes('product')
    )) ||
    section.sectionType === 'PRODUCTS'
  )
  
  // Get values section if exists
  const valuesSection = aboutSections.find(section => 
    (section.title && section.title.toLowerCase().includes('value')) || 
    section.sectionType === 'VALUES'
  )

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Our Story */}
        {aboutCompany && (
          <section className="py-12 px-4 md:px-6">
            <div className="container max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{aboutCompany.title || "Our Story"}</h2>
                  <div className="space-y-4 text-gray-600 text-justify">
                    {aboutCompany.storyParagraphs && aboutCompany.storyParagraphs.length > 0 ? (
                      aboutCompany.storyParagraphs.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))
                    ) : (
                      <p>{aboutCompany.description || "Founded with a passion for natural wellness..."}</p>
                    )}
                  </div>
                </div>
                <div className="relative h-[280px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={safeGet(aboutCompany, 'media.0.image') 
                      ? getImageUrl(aboutCompany.media[0].image) 
                      : "/placeholder.svg"}
                    alt={aboutCompany.title || "Company story"} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Our Services */}
        {servicesSection && servicesSection.sectionItems && servicesSection.sectionItems.length > 0 && (
          <section className="py-10 px-4 md:px-6 bg-gray-50" style={{ backgroundColor: servicesSection.bgColor || "#f9fafb" }}>
            <div className="container max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-3 text-center">{servicesSection.title || "Our Services"}</h2>
              <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                {servicesSection.description || "Discover our range of high-quality services"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...servicesSection.sectionItems]
                  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                  .map((service, index) => {
                    const IconComponent = service.iconName ? getIconComponent(service.iconName) : Leaf
                    
                    return (
                      <div
                        key={service.id || index}
                        id={`service-${service.id || index}`}
                        className={`animate-on-scroll flex transition-all duration-500 ${
                          animated.includes(`service-${service.id || index}`) 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="flex flex-col w-full border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden bg-white">
                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-center items-center text-center py-6 px-4">
                            <div className="p-4 rounded-full bg-blue-100 shadow-sm">
                              <IconComponent className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mt-4 mb-2">{service.title || `Service ${index + 1}`}</h3>
                            <p className="text-gray-600">{service.description || "Service description"}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </section>
        )}

        {/* Latest Updates / Products */}
        {updatesSection && updatesSection.sectionItems && updatesSection.sectionItems.length > 0 && (
          <section className="py-10 px-4 md:px-6" style={{ backgroundColor: updatesSection.bgColor || "#ffffff" }}>
            <div className="container max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">{updatesSection.title || "Latest Updates"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...updatesSection.sectionItems]
                  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                  .map((category, index) => (
                    <div 
                      key={category.id || index}
                      id={`category-${category.id || index}`}
                      className={`animate-on-scroll flex flex-col w-full border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white ${
                        animated.includes(`category-${category.id || index}`) 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="p-0">
                        <div className="flex flex-col">
                          <div className="relative w-full h-48">
                            <img 
                              src={safeGet(category, 'media.0.image') 
                                ? getImageUrl(category.media[0].image) 
                                : "/placeholder.svg"} 
                              alt={category.title || `Category ${index + 1}`} 
                              className="object-contain w-full h-full" 
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{category.title || `Category ${index + 1}`}</h3>
                            <p className="text-gray-600">{category.description || "Category description"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Our Values */}
        {valuesSection && valuesSection.sectionItems && valuesSection.sectionItems.length > 0 && (
          <section className="py-10 px-4 md:px-6 bg-gray-50" style={{ backgroundColor: valuesSection.bgColor || "#f9fafb" }}>
            <div className="container max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">{valuesSection.title || "Our Values"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...valuesSection.sectionItems]
                  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                  .map((value, index) => {
                    const IconComponent = value.iconName ? getIconComponent(value.iconName) : ThumbsUp
                    
                    return (
                      <div 
                        key={value.id || index}
                        id={`value-${value.id || index}`}
                        className={`animate-on-scroll flex flex-col w-full border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white ${
                          animated.includes(`value-${value.id || index}`) 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="p-6 flex flex-col items-center text-center">
                          <IconComponent className="h-12 w-12 text-blue-600 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">{value.title || `Value ${index + 1}`}</h3>
                          <p className="text-gray-600">{value.description || "Value description"}</p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </section>
        )}

        {/* Our Brands */}
        {ourBrand && ourBrand.brandItems && ourBrand.brandItems.length > 0 && (
          <section className="py-10 px-4 md:px-6">
            <div className="container max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">{ourBrand.title || "Our Brands"}</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {[...ourBrand.brandItems]
                  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                  .map((brand, index) => (
                    <div
                      key={brand.id || index}
                      id={`brand-${brand.id || index}`}
                      className={`animate-on-scroll w-36 h-22 relative flex items-center justify-center shadow rounded bg-white transition-all duration-500 hover:-translate-y-2 ${
                        animated.includes(`brand-${brand.id || index}`) 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <img
                        src={brand.logoUrl ? getImageUrl(brand.logoUrl) : "/placeholder.svg"}
                        alt={brand.name || `Brand ${index + 1}`}
                        className="object-contain p-2 w-full h-full"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Company Facts */}
        {companyFact && companyFact.factItems && companyFact.factItems.length > 0 && (
          <section className="py-10 px-4 md:px-6">
            <div className="container max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{companyFact.title || "Company Facts"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {[...companyFact.factItems]
                  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                  .map((fact, index) => {
                    const IconComponent = fact.iconName ? getIconComponent(fact.iconName) : Users
                    console.dir(IconComponent)
                    return (
                      <div 
                        key={fact.id || index}
                        id={`fact-${fact.id || index}`}
                        className={`animate-on-scroll flex flex-col items-center p-4 transition-all duration-500 hover:scale-105 ${
                          animated.includes(`fact-${fact.id || index}`) 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <IconComponent className="h-10 w-10 text-blue-600 mb-2" />
                        <h3 className="text-2xl font-bold">{fact.value || "0"}</h3>
                        <p className="text-gray-600">{fact.label || "Fact"}</p>
                      </div>
                    )
                  })}
              </div>
            </div>
          </section>
        )}

        {/* Other About Sections (dynamic rendering) */}
        {aboutSections
          .filter(section => 
            section && section.sectionItems && section.sectionItems.length > 0 &&
            (!section.title || (
              !section.title.toLowerCase().includes('service') && 
              !section.title.toLowerCase().includes('value') &&
              !section.title.toLowerCase().includes('update') &&
              !section.title.toLowerCase().includes('product')
            )) &&
            section.sectionType !== 'SERVICES' &&
            section.sectionType !== 'VALUES' &&
            section.sectionType !== 'PRODUCTS'
          )
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
          .map((section, sectionIndex) => (
            <section 
              key={section.id || `section-${sectionIndex}`} 
              className="py-10 px-4 md:px-6"
              style={{ backgroundColor: section.bgColor || (sectionIndex % 2 === 0 ? '#ffffff' : '#f9fafb') }}
            >
              <div className="container max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{section.title || `Section ${sectionIndex + 1}`}</h2>
                {section.description && (
                  <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">{section.description}</p>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...section.sectionItems]
                    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                    .map((item, index) => {
                      const IconComponent = item.iconName ? getIconComponent(item.iconName) : null
                      
                      return (
                        <div
                          key={item.id || `item-${sectionIndex}-${index}`}
                          id={`section-item-${item.id || `${sectionIndex}-${index}`}`}
                          className={`animate-on-scroll flex flex-col w-full border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white ${
                            animated.includes(`section-item-${item.id || `${sectionIndex}-${index}`}`) 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-8'
                          }`}
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <div className="p-6 flex flex-col items-center text-center">
                            {IconComponent && <IconComponent className="h-10 w-10 text-blue-600 mb-4" />}
                            
                            {safeGet(item, 'media.0.image') && (
                              <div className="w-full h-48 mb-4">
                                <img 
                                  src={getImageUrl(item.media[0].image)}
                                  alt={item.title || "Section image"} 
                                  className="object-cover w-full h-full rounded"
                                />
                              </div>
                            )}
                            
                            <h3 className="text-xl font-semibold mb-2">{item.title || `Item ${index + 1}`}</h3>
                            {item.description && <p className="text-gray-600 mb-2">{item.description}</p>}
                            
                            {item.value && item.label && (
                              <div className="mt-2">
                                <span className="block text-2xl font-bold">{item.value}</span>
                                <span className="text-gray-600">{item.label}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </section>
          ))
        }
      </main>
    </div>
  )
}