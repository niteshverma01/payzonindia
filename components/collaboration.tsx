"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function AwardsAchievements() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Awards data
  const awards = [
    {
      id: 1,
      image: "/award-mobile-games.png",
      title: "Mobile Games Award Winner",
      category: "Rising Stars",
      bgColor: "bg-purple-600"
    },
    {
      id: 2,
      image: "/award-market-leaders.png", 
      title: "Market Leaders Award",
      category: "Excellence in Innovation",
      bgColor: "bg-orange-500"
    },
    {
      id: 3,
      image: "/award-clutch-2018.png",
      title: "Clutch Web Developers 2018",
      category: "Top Development Company",
      bgColor: "bg-gray-700"
    },
    {
      id: 4,
      image: "/award-mobile-app-developers.png",
      title: "Top Mobile App Developers",
      category: "Excellence Award",
      bgColor: "bg-yellow-500"
    },
    {
      id: 5,
      image: "/award-ai-stats.png",
      title: "Top AI Statistics Award",
      category: "Artificial Intelligence",
      bgColor: "bg-red-600"
    },
    {
      id: 6,
      image: "/award-tech-innovator.png",
      title: "Tech Innovator Award",
      category: "Innovation Excellence",
      bgColor: "bg-blue-600"
    }
  ]

  // Calculate visible slides (show 5 at a time)
  const slidesPerView = 5
  const maxSlide = Math.max(0, awards.length - slidesPerView)

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev >= maxSlide) {
            return 0 // Reset to beginning
          }
          return prev + 1
        })
      }, 3000) // Change every 3 seconds

      return () => clearInterval(interval)
    }
  }, [isAutoPlay, maxSlide])

  // Handle manual navigation
  const handlePrevious = () => {
    setIsAutoPlay(false)
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlide))
    
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlay(true), 8000)
  }

  const handleNext = () => {
    setIsAutoPlay(false)
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0))
    
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlay(true), 8000)
  }

  // Handle touch/drag
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragCurrentX, setDragCurrentX] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setIsAutoPlay(false)
    setDragStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    setDragCurrentX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const dragDistance = dragStartX - dragCurrentX
    const threshold = 100 // Minimum drag distance to trigger slide change
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentSlide < maxSlide) {
        setCurrentSlide(prev => prev + 1)
      } else if (dragDistance < 0 && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1)
      }
    }
    
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlay(true), 8000)
  }

  return (
    <section className="relative py-20 overflow-hidden max-w-7xl mx-auto">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/it-consultancy-professionals.jpg"
          alt="Technology Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-800/85 to-slate-900/90"></div>
        
        {/* Geometric Decorations */}
        <div className="absolute top-10 left-10 opacity-20">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`w-4 h-4 border-2 border-blue-400 ${i % 3 === 0 ? 'bg-blue-400' : ''}`}></div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-20 right-20 opacity-20">
          <div className="grid grid-cols-3 gap-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-6 h-6 border-2 border-blue-400"></div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-20 left-20 opacity-20">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-blue-500"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-blue-500"></div>
              <div className="w-4 h-1 bg-blue-400"></div>
            </div>
            <span className="text-blue-400 font-semibold uppercase tracking-wider">Awards</span>
            <div className="flex space-x-1">
              <div className="w-4 h-1 bg-blue-400"></div>
              <div className="w-8 h-1 bg-blue-500"></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            We are very proud of our
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Best <span className="text-blue-400">Achievements</span>
          </h2>
        </div>

        {/* Awards Swiper */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Swiper Container */}
          <div
            className="overflow-hidden mx-12"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
              }}
            >
              {awards.map((award, index) => (
                <div
                  key={award.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
                    <div className="flex flex-col items-center text-center">
                      {/* Award Badge */}
                      <div className={`w-24 h-24 ${award.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                          <div className="text-2xl font-bold text-gray-800">🏆</div>
                        </div>
                      </div>
                      
                      {/* Award Content */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {award.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {award.category}
                      </p>
                      
                      {/* Award Year/Status */}
                      <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(maxSlide + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoPlay(false)
                  setTimeout(() => setIsAutoPlay(true), 8000)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-blue-500 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}