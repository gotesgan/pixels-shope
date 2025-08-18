import { useState, useEffect } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import { Clock, Calendar, Mail, MapPin, Phone } from 'lucide-react'
import { fetchGraphQL } from '../lib/fetchGrap'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  })
  
  const [contactData, setContactData] = useState({
    locations: [],
    socialLinks: [],
    hours: [],
    information: []
  })
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContactPageData = async () => {
      setLoading(true)
      try {
        const host = window.location.hostname
        const query = `
          query ContactPage {
            contactPage {
              id
              storeId
              submissions {
                id
                name
                email
                phone
                message
                status
                createdAt
              }
              locations {
                id
                name
                address
                city
                state
                country
                postalCode
                mapEmbedUrl
                isPrimary
              }
              socialLinks {
                id
                platform
                url
                icon
                isActive
              }
              hours {
                id
                days
                hours
                isActive
                sortOrder
              }
              information {
                id
                type
                value
                label
                icon
                isPrimary
              }
            }
          }
        `
        const data = await fetchGraphQL(host, query)
        setContactData(data.contactPage)
      } catch (err) {
        console.error(err)
        setError(err.message || "Failed to load contact information")
      } finally {
        setLoading(false)
      }
    }

    fetchContactPageData()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted:', formData)
    
    // Example mutation (not implemented)
    // const mutation = `
    //   mutation CreateSubmission($input: ContactSubmissionInput!) {
    //     createContactSubmission(input: $input) {
    //       id
    //       status
    //     }
    //   }
    // `
    // const variables = { input: formData }
    // await fetchGraphQL(window.location.hostname, mutation, variables)
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      mobile: '',
      message: ''
    })
    
    // Show success message to user
    alert('Your message has been sent. We will get back to you soon!')
  }

  // Get primary email and phone from information
  const getContactInfo = (type) => {
    const info = contactData.information?.find(item => item.type === type)
    return info ? info.value : ''
  }

  // Get primary location
  const getPrimaryLocation = () => {
    return contactData.locations?.find(location => location.isPrimary) || contactData.locations?.[0]
  }

  // Sort business hours by sortOrder
  const getSortedHours = () => {
    return contactData.hours?.sort((a, b) => a.sortOrder - b.sortOrder) || []
  }

  // Get active social links
  const getActiveSocialLinks = () => {
    return contactData.socialLinks?.filter(link => link.isActive) || []
  }

  // Map social platform to icon component
  const getSocialIcon = (platform) => {
    const icons = {
      'FACEBOOK': FaFacebook,
      'INSTAGRAM': FaInstagram,
      'LINKEDIN': FaLinkedin,
      'TWITTER': FaTwitter,
      'YOUTUBE': FaYoutube,
      'WHATSAPP': FaWhatsapp,
      'TELEGRAM': FaTelegram
    }
    
    const IconComponent = icons[platform]
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null
  }

  if (loading) {
    return (
      <div className="py-10 px-4 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>

  const primaryLocation = getPrimaryLocation()
  const businessHours = getSortedHours()
  const socialLinks = getActiveSocialLinks()
  const email = getContactInfo('EMAIL')
  const phone = getContactInfo('PHONE')

  // If no data is available, show a friendly message instead of empty sections
  if (!primaryLocation && !businessHours.length && !socialLinks.length && !email && !phone) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <div className="text-xl font-medium mb-4">Contact information is currently unavailable</div>
        <p className="text-gray-600">Please check back later or try refreshing the page.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1">
        {/* Heading Section */}
        <section className="py-10 bg-gradient-to-b from-gray-100 to-gray-50 px-4 md:px-6">
          <div className="container max-w-6xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're here to help! Reach out to our team with any questions, feedback, or inquiries.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-6 px-4 md:px-6 bg-gradient-to-b">
          <div className="container max-w-6xl mx-auto"> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phone Card */}
              {phone && (
                <div className="border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className="w-full"></div>
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 rounded-full bg-blue-100 mb-4 shadow-sm">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Phone</h3>
                      <p className="text-gray-600 mb-2">Call us directly for immediate assistance</p>
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-medium text-lg hover:text-blue-600 transition-colors">
                        {phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Card */}
              {email && (
                <div className="border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className="w-full"></div>
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 rounded-full bg-blue-100 mb-4 shadow-sm">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Email</h3>
                      <p className="text-gray-600 mb-2">Send us an email anytime</p>
                      <a 
                        href={`mailto:${email}`} 
                        className="font-medium text-lg text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Address Card */}
              {primaryLocation && (
                <div className="border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className="w-full"></div>
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 rounded-full bg-blue-100 mb-4 shadow-sm">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Address</h3>
                      <p className="text-gray-600 mb-2">Visit our office</p>
                      <address className="font-medium not-italic">
                        {primaryLocation.address && `${primaryLocation.address},`}<br />
                        {primaryLocation.city && `${primaryLocation.city}, `}
                        {primaryLocation.state && `${primaryLocation.state}, `}
                        {primaryLocation.country && `${primaryLocation.country}`}
                        {primaryLocation.postalCode && ` - ${primaryLocation.postalCode}`}
                      </address>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Business Hours */}
        {businessHours.length > 0 && (
          <section className="py-10 px-4 md:px-6">
            <div className="container max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Business Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {businessHours.map((hourEntry) => (
                  <div key={hourEntry.id} className="border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    <div className="w-full"></div>
                    <div className="p-6">
                      <div className="flex items-center gap-6 text-left">
                        <div className="p-4 rounded-full bg-blue-100 shadow-sm flex-shrink-0">
                          {hourEntry.days.toLowerCase().includes("saturday") || hourEntry.days.toLowerCase().includes("sunday") ? (
                            <Calendar className="h-6 w-6 text-blue-600" />
                          ) : (
                            <Clock className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{hourEntry.days}</h3>
                          <p className="text-gray-600">{hourEntry.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Map Section */}
        {primaryLocation && primaryLocation.mapEmbedUrl && (
          <section className="py-10 px-4 md:px-6 bg-gray-50">
            <div className="container max-w-3xl mx-auto">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-blue-100 mb-4 shadow-sm">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Our Map Location</h3>
                  
                  {/* Google Maps iframe with dynamic location */}
                  <div className="aspect-video w-full max-w-xl border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <iframe
                    src={primaryLocation.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Form */}
        <section className="py-10 bg-gradient-to-b from-gray-50 to-gray-100 px-4 md:px-6">
          <div className="container max-w-3xl mx-auto">
            <div className="border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden bg-white">
              <div className="w-full"></div>
              <div className="pt-6 px-8">
                <h2 className="text-2xl text-center font-bold">Send Us a Message</h2>
                <p className="text-center text-gray-600 mt-2">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <div className="pb-8 px-8 pt-6">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium block">Name</label>
                      <input 
                        id="name" 
                        placeholder="Enter your name" 
                        required 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all" 
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium block">Email Address</label>
                      <input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all" 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mobile" className="text-sm font-medium block">Mobile Number</label>
                    <input 
                      id="mobile" 
                      placeholder="Your phone number" 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all" 
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium block">Message</label>
                    <textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none transition-all"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base cursor-pointer font-medium"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        {socialLinks.length > 0 && (
          <section className="py-4 px-4 md:px-6">
            <div className="container max-w-6xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect with Us</h2>
              <p className="max-w-3xl mx-auto mb-2 text-lg">
                Follow us on social media for the latest updates, promotions, and more.
              </p>
              <div className="flex justify-center gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 transform shadow-sm"
                    aria-label={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}