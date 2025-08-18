"use client"

import { useState, useEffect } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { fetchGraphQL } from "../lib/fetchGrap"

const HERO_QUERY = `
  query {
    heroSection {
      id
      storeId
      media {
        id
        image
      }
    }
  }
`

const buildImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.svg"
  return `https://media.bizonance.in/api/v1/image/download/473d09b1-bd47-4297-9b0c-f79e6a7c9fc8/META/${imagePath}`
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: null,
      alt: "Main image",
    },
  ])

  useEffect(() => {
    const loadHero = async () => {
      const hostname = window.location.hostname
      try {
        const res = await fetchGraphQL(hostname, HERO_QUERY)
        const heroMedia = res?.heroSection?.media || []
        console.log("Hero Media:", heroMedia)

        const slideImages = heroMedia.map((mediaItem, index) => ({
          id: mediaItem.id || index,
          image: mediaItem.image,
          alt: `Hero image ${index + 1}`,
        }))

        if (slideImages.length > 0) {
          setSlides(slideImages)
        }
      } catch (err) {
        console.error("Failed to fetch hero images", err)
      }
    }

    loadHero()

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="w-full">
      <div className="px-0">
        <div className="relative w-full h-[180px] md:h-[300px] lg:h-[350px] overflow-hidden">
          {/* Prev Button */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md bg-white/80"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md bg-white/80"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>

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
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
