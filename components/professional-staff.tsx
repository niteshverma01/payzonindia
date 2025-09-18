"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Zap, Database, Target, Sparkles, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

// Define TypeScript interfaces
interface Slide {
  image: string
  category: string
  title: string
  description: string
  bgColor: string
  accentColor: string
  stats: { number: string; label: string }
}

interface Service {
  title: string
  description: string
  icon: JSX.Element
  color: string
}

interface RightSideContent {
  title: string
  subtitle: string
  description: string
  services: Service[]
}

interface MousePosition {
  x: number
  y: number
}

export default function ProfessionalStaff() {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<boolean>(false)

  // Slide data
  const slides: Slide[] = [
    {
      image: "/business-consulting-meeting.png",
      category: "Case Studies",
      title: "Information Security Excellence",
      description: "Advanced cybersecurity solutions protecting Fortune 500 companies with 99.9% threat detection accuracy.",
      bgColor: "from-emerald-900/80 via-teal-900/60",
      accentColor: "emerald",
      stats: { number: "500+", label: "Secured Systems" },
    },
    {
      image: "/firewall-security-technology.jpg",
      category: "Our Services",
      title: "AI-Powered Cybersecurity",
      description: "Next-generation threat detection using machine learning algorithms to predict and prevent cyber attacks.",
      bgColor: "from-blue-900/80 via-indigo-900/60",
      accentColor: "blue",
      stats: { number: "24/7", label: "Monitoring" },
    },
    {
      image: "/internal-networking-infrastructure.jpg",
      category: "Technology",
      title: "Cloud Infrastructure Mastery",
      description: "Scalable cloud solutions powered by cutting-edge infrastructure that adapts to your business growth.",
      bgColor: "from-purple-900/80 via-violet-900/60",
      accentColor: "purple",
      stats: { number: "99.9%", label: "Uptime" },
    },
  ]

  // Right side content
  const rightSideContent: RightSideContent = {
    title: "Our penetration testing team uses industry-leading methodologies",
    subtitle: "Who We Are?",
    description: "We provide comprehensive IT solutions and cybersecurity consulting across multiple industries, delivering innovation at every step.",
    services: [
      {
        title: "Digital Security Expert",
        description: "Advanced threat intelligence and real-time monitoring to protect your digital assets from sophisticated cyber attacks.",
        icon: <Shield className="w-6 h-6" />,
        color: "from-blue-500 to-cyan-500",
      },
      {
        title: "Cloud Infrastructure Specialist",
        description: "Scalable cloud solutions with automated deployment and intelligent resource optimization for maximum efficiency.",
        icon: <Database className="w-6 h-6" />,
        color: "from-purple-500 to-pink-500",
      },
      // {
      //   title: "AI Solutions Architect",
      //   description: "Machine learning powered automation and intelligent systems that transform how your business operates.",
      //   icon: <Zap className="w-6 h-6" />,
      //   color: "from-orange-500 to-red-500",
      // },
      // {
      //   title: "Penetration Testing Lead",
      //   description: "Comprehensive security assessments and vulnerability testing to ensure your systems are impenetrable.",
      //   icon: <Target className="w-6 h-6" />,
      //   color: "from-green-500 to-emerald-500",
      // },
    ],
  }

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    setIsVisible(true)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-slide
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, slides.length])

  const handleDotClick = (index: number) => {
    setActiveSlide(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 15000)
  }

  // Handle button click in stats badge
  const handleStatsButtonClick = () => {
    // Add navigation or action here, e.g., open a case study or modal
    console.log("Stats button clicked for slide:", slides[activeSlide].title)
  }

  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Dynamic Mesh Gradient Background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, 
              rgba(236, 72, 153, 0.05) 0%, 
              rgba(59, 130, 246, 0.05) 25%, 
              rgba(16, 185, 129, 0.05) 50%, 
              rgba(245, 101, 101, 0.05) 75%, 
              rgba(139, 92, 246, 0.05) 100%
            )
          `,
        }}
      />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px] lg:bg-[size:60px_60px] animate-pulse"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left Side - Enhanced Image Section */}
          <div
            className={`relative transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Main Image Container with Advanced Effects */}
            <div className="relative group">
              {/* <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-700"></div> */}

              <div className="relative overflow-hidden rounded-3xl border border-white/20 backdrop-blur-sm">
                <Image
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].title}
                  width={800}
                  height={600}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-all duration-700 group-hover:scale-110"
                  priority={activeSlide === 0} // Optimize first slide
                />

                {/* Dynamic Overlay with Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${slides[activeSlide].bgColor} to-transparent opacity-50 transition-all duration-700 z-10`}
                ></div>

                {/* Animated Border */}
                <div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: "linear-gradient(white, white) padding-box, linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899) border-box",
                  }}
                ></div>

                {/* Enhanced Content Overlay */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 text-white z-20">
                  <div className="flex items-center space-x-2 sm:space-x-3 text-blue-300 text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                    <span>{slides[activeSlide].category}</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {slides[activeSlide].title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-gray-200 mb-3 sm:mb-4 md:mb-6 max-w-md leading-relaxed">
                    {slides[activeSlide].description}
                  </p>

                  {/* Stats Badge */}
                  <div className="inline-flex items-center space-x-3 sm:space-x-4 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{slides[activeSlide].stats.number}</div>
                      <div className="text-xs text-gray-300">{slides[activeSlide].stats.label}</div>
                    </div>
                    <Button
                      size="icon"
                      className="rounded-full bg-white/20 hover:bg-white/30 text-white border-none w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 backdrop-blur-sm"
                      onClick={handleStatsButtonClick}
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation Panel */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 md:-bottom-8 md:-right-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl border border-white/20 backdrop-blur-sm z-20">
              <div className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6">
                {/* Play Button with Pulse Effect */}
                <div className="relative">
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center animate-pulse"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1 text-blue-600" fill="currentColor" />
                  </button>
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-25"></div>
                </div>

                {/* Enhanced Navigation Dots */}
                <div className="flex flex-col space-y-3 sm:space-y-4">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500 cursor-pointer group ${
                        activeSlide === index
                          ? "bg-white text-blue-600 shadow-2xl scale-125"
                          : "bg-white/20 text-white hover:bg-white/40 hover:scale-110"
                      }`}
                    >
                      <span className="relative z-10">{index + 1}</span>
                      {activeSlide === index && (
                        <div
                          className="absolute inset-0 bg-white rounded-full animate-spin"
                          style={{
                            background: "conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
                          }}
                        ></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Content */}
          <div
            className={`space-y-6 sm:space-y-7 md:space-y-8 transform transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Header Section */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center space-x-1 sm:space-x-2 text-blue-600 text-xs sm:text-sm font-semibold">
                  <div className="w-6 h-0.5 sm:w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                  <span>{rightSideContent.subtitle}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  penetration testing
                </span>{" "}
                team uses industry-leading methodologies
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">{rightSideContent.description}</p>
            </div>

            {/* Enhanced Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {rightSideContent.services.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Animated background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-xl sm:rounded-2xl`}
                  ></div>

                  {/* Icon container with enhanced effects */}
                  <div className="relative z-10 text-center">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}
                    >
                      <span className="text-white">{service.icon}</span>
                    </div>

                    <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg md:text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h4>

                    <p className="text-xs sm:text-sm md:text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-blue-500 transition-all duration-500"></div>
                </div>
              ))}
            </div>

           
          </div>
        </div>
      </div>
    </section>
  )
}