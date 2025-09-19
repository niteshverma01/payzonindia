"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Define types for awards data
interface Award {
  id: number
  image: string
  title: string
  link: string
}

export default function AwardsAchievements() {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true)
  const [dragStartX, setDragStartX] = useState<number>(0)
  const [dragEndX, setDragEndX] = useState<number>(0)

  // Awards data
  const awards: Award[] = [
    {
      id: 1,
      image: "/images/payzonit.png",
      title: "Web Development & Solutions",
      link: "www.payzonitservices.com",
    },
    {
      id: 2,
      image: "/images/PAYZONINDIA-pngLogo.png",
      title: "Digital Marketing Services",
      link: "www.payzonmarketing.com",
    },
    {
      id: 3,
      image: "/images/logo.png",
      title: "Fintech & API Solutions",
      link: "www.payzonapi.com",
    },
    {
      id: 4,
      image: "/images/shoppy-logo.png",
      title: "E-commerce & Online Stores",
      link: "www.payzonshoppy.com",
    },
    {
      id: 5,
      image: "/images/Sadaiv MEDIA 1.png",
      title: "News & Media Services",
      link: "www.sadaivsatya.com",
    },
    {
      id: 6,
      image: "/images/Sadaiv_logo.png",
      title: "Non-Profit & Charity Foundation",
      link: "www.sadaivyuvafoundation.com",
    },
  ]

  // Responsive slides per view
  const getSlidesPerView = () => {
    if (typeof window === "undefined") return 3 // Default for SSR
    if (window.innerWidth < 640) return 1 // Mobile
    if (window.innerWidth < 1024) return 2 // Tablet
    return 3 // Desktop
  }

  const [slidesPerView, setSlidesPerView] = useState<number>(getSlidesPerView())

  // Update slidesPerView on window resize
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView())
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxSlide = Math.max(0, awards.length - slidesPerView)

  // Auto-play
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isAutoPlay, maxSlide])

  // Manual navigation
  const handlePrevious = () => {
    setIsAutoPlay(false)
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlide))
    setTimeout(() => setIsAutoPlay(true), 6000)
  }

  const handleNext = () => {
    setIsAutoPlay(false)
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0))
    setTimeout(() => setIsAutoPlay(true), 6000)
  }

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragStartX(e.touches[0].clientX)
    setIsAutoPlay(false)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragEndX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    const dragDistance = dragStartX - dragEndX
    const threshold = 50
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentSlide < maxSlide) {
        setCurrentSlide((prev) => prev + 1)
      } else if (dragDistance < 0 && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1)
      }
    }
    setTimeout(() => setIsAutoPlay(true), 6000)
  }

  return (
    <section className="bg-gradient-to-br from-black via-purple-950 to-blue-950 relative overflow-hidden">
      <div className="relative py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute inset-0 -z-10">
          <img
            src="/it-consultancy-professionals.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-800/90"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our Online Ventures
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            Innovating across multiple domains
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards */}
          <div
            className="overflow-x-hidden mx-4 sm:mx-8 md:mx-12"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}
            >
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="flex-shrink-0 px-2 sm:px-3 md:px-4"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <div className="relative bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl group hover:scale-105 hover:-translate-y-2 transition-all duration-500">
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 blur-2xl transition"></div>

                    <div className="relative flex flex-col items-center text-center">
                      <img
                        src={award.image}
                        alt={award.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mb-3 sm:mb-4 drop-shadow-lg"
                      />
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">
                        {award.title}
                      </h3>
                      <a
                        href={`https://${award.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm sm:text-base hover:underline"
                      >
                        {award.link}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
            {[...Array(maxSlide + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoPlay(false)
                  setTimeout(() => setIsAutoPlay(true), 6000)
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${currentSlide === index
                    ? "bg-blue-500 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div></div>
    </section>
  )
}