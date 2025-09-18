"use client"

import { Button } from "@/components/ui/button"
import {
  Shield,
  Settings,
  FileCheck,
  Cloud,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Star,
  ArrowRight,
  Play,
  Zap,
  Globe,
  Award,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Types
interface Slide {
  title: string
  subtitle?: string
  description: string
  buttonText: string
  accent: string
}

interface Service {
  icon: any
  title: string
  desc: string
  color: string
  delay: number
}

// Custom Hook for Intersection Observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isIntersecting]
}

// Data
const slides: Slide[] = [
  {
    title: "Think Big. We make IT",
    subtitle: "possible!",
    description: "Transform your digital presence with cutting-edge technology solutions that drive innovation and growth.",
    buttonText: "Start Your Journey",
    accent: "from-blue-400 via-purple-500 to-pink-500"
  },
  {
    title: "Innovate with",
    subtitle: "Confidence",
    description: "Leverage advanced AI and cloud technologies to stay ahead in the competitive digital landscape.",
    buttonText: "Explore Solutions",
    accent: "from-emerald-400 via-teal-500 to-cyan-500"
  },
  {
    title: "Scale Your",
    subtitle: "Business",
    description: "Enterprise-grade cloud services with military-level security for seamless operations worldwide.",
    buttonText: "Scale Now",
    accent: "from-orange-400 via-red-500 to-pink-500"
  },
]

const services: Service[] = [
  {
    icon: Settings,
    title: "Reliable & Secure Services",
    desc: "We provide reliable and secure services, ensuring peace of mind with every solution we deliver.",
    color: "from-blue-500 to-cyan-600",
    delay: 0
  },
  {
    icon: Shield,
    title: "Unmatched Support & Assistance",
    desc: "Dedicated to Excellence in Customer Support and Service Service Beyond Compare: World-Class Support & Experience",
    color: "from-purple-500 to-pink-600",
    delay: 200
  },
  {
    icon: Cloud,
    title: "Future-Focused Innovating Curvet",
    desc: "Future-driven technology solutions designed to meet evolving market demands and empower your business growth.",
    color: "from-emerald-500 to-teal-600",
    delay: 400
  },
  {
    icon: FileCheck,
    title: "Certified in Global Markets",
    desc: "Equipped with all the necessary global certifications and documentation to conduct business seamlessly worldwide.",
    color: "from-orange-500 to-red-600",
    delay: 600
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [servicesRef, servicesInView] = useIntersectionObserver({ threshold: 0.1 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-slide functionality for text content
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentSlide])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setIsAnimating(false)
    }, 300)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setIsAnimating(false)
    }, 300)
  }

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsAnimating(false)
    }, 300)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Background Video with Parallax */}
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out"
            autoPlay
            loop
            muted
            playsInline
            style={{
              transform: `scale(${isAnimating ? 1.1 : 1}) translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`,
            }}
          >
            <source src="/images/payzon.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center pt-0 sm:pt-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 hover:scale-105 transition-transform duration-300"
              style={{
                animation: 'fadeInUp 0.8s ease-out'
              }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-medium text-white">Leading IT Innovation Since 2010</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>

            {/* Main Title */}
            <div className={`transition-all duration-700 ${isAnimating ? 'opacity-0 translate-y-12 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span
                  className="block text-white"
                  style={{
                    animation: 'slideInLeft 1s ease-out 0.3s both'
                  }}
                >
                  {currentSlideData.title}
                </span>
                <span
                  className={`block bg-gradient-to-r ${currentSlideData.accent} bg-clip-text text-transparent`}
                  style={{
                    animation: 'slideInRight 1s ease-out 0.6s both, gradient 4s ease infinite',
                    backgroundSize: '300% 300%'
                  }}
                >
                  {currentSlideData.subtitle}
                </span>
              </h1>

              <p
                className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                style={{
                  animation: 'fadeInUp 1s ease-out 0.9s both'
                }}
              >
                {currentSlideData.description}
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                style={{
                  animation: 'fadeInUp 1s ease-out 1.2s both'
                }}
              >
                <Button
                  className={`group relative overflow-hidden bg-gradient-to-r ${currentSlideData.accent} hover:scale-110 text-white px-10 py-5 text-lg font-semibold rounded-full transition-transform duration-300 shadow-xl hover:shadow-2xl`}
                >
                  <span className="relative z-10">{currentSlideData.buttonText}</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                <Button
                  variant="outline"
                  className="group bg-transparent border-2 border-white/30 text-white px-10 py-5 text-lg font-semibold rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            disabled={isAnimating}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Slide Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={isAnimating}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}

export default Hero