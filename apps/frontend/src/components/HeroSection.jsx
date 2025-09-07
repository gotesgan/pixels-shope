    "use client"

import { useState, useEffect } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { fetchGraphQL } from "../lib/fetchGrap"

const HERO_QUERY = `
  query {
    heroSections {
      id
      storeId
      title
      subtitle
      ctaText
      ctaLink
      media {
        id
        image
      }
    }
  }
`

const buildImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.svg"
  return `https://media.pixelperfects.in/${imagePath}`
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([])

  useEffect(() => {
    const loadHero = async () => {
      const hostname = window.location.hostname
      try {
        const res = await fetchGraphQL(hostname, HERO_QUERY)
        console.log("Hero Section Response:", res)

        const heroSections = res?.heroSections || []

        // Flatten media from all hero sections into slides
        const allSlides = heroSections
          .map((hero) => {
            if (!hero.media) return null
            return {
              id: hero.media.id,
              image: hero.media.image,
              title: hero.title,
              subtitle: hero.subtitle,
              ctaText: hero.ctaText,
              ctaLink: hero.ctaLink,
            }
          })
          .filter(Boolean)

        setSlides(allSlides)
      } catch (err) {
        console.error("Failed to fetch hero data", err)
      }
    }

    loadHero()

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  if (slides.length === 0) return null

  const current = slides[currentSlide]

  return (
    <div className="w-full">
      <div className="px-0">
        <div className="relative w-full h-[180px] md:h-[300px] lg:h-[350px] overflow-hidden">
          {/* Prev Button */}
          {slides.length > 1 && (
            <button
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md bg-white/80"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={24} />
            </button>
          )}

          {/* Next Button */}
          {slides.length > 1 && (
            <button
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md bg-white/80"
              aria-label="Next slide"
            >
              <FiChevronRight size={24} />
            </button>
          )}

          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
                }`}
              >
                <img
                  src={buildImageUrl(slide.image)}
                  alt={slide.title || "Hero image"}
                  className="w-full h-full object-cover object-center"
                />

                {/* Overlay Content (title + CTA) */}
                {(slide.title || slide.subtitle || slide.ctaText) && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/40 text-white px-4">
                    {slide.title && (
                      <h2 className="text-lg md:text-2xl font-bold mb-2 drop-shadow-lg">
                        {slide.title}
                      </h2>
                    )}
                    {slide.subtitle && (
                      <p className="text-sm md:text-base mb-4 drop-shadow-lg">
                        {slide.subtitle}
                      </p>
                    )}
                    {slide.ctaText && slide.ctaLink && (
                      <a
                        href={slide.ctaLink}
                        className="bg-white text-black font-medium px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
                      >
                        {slide.ctaText}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
 