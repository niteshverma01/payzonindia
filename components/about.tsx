"use client"

import { Button } from "@/components/ui/button"
import { Play, Award, Users, Shield, Lightbulb, ArrowRight, Sparkles, Star } from "lucide-react"
import { useState, useEffect } from "react"

// Define types for tab content
interface TabContent {
  text: string
  image: string
  icon: JSX.Element
  color: string
  bgColor: string
}

interface TabContentMap {
  mission: TabContent
  vision: TabContent
  value: TabContent
}

interface MousePosition {
  x: number
  y: number
}

export default function About() {
  const [activeTab, setActiveTab] = useState<keyof TabContentMap>("mission")
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  // Disable mouse movement on touch devices
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (!isTouchDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const tabContent: TabContentMap = {
    mission: {
      text: "Our vision is to empower businesses with innovative IT solutions that streamline operations, enhance productivity, and drive sustainable growth.",
      image: "/professional-woman-smiling.png",
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    vision: {
      text: "Our mission is to provide businesses with cutting-edge IT solutions that drive growth, increase efficiency, and enhance customer experiences.",
      image: "/professional-woman-smiling.png",
      icon: <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
    },
    value: {
      text: "An emerging corporate powerhouse from Central India, driving innovation and growth across diverse industries with a strong focus on excellence, sustainability, and customer satisfaction. Delivers top-notch IT solutions, helping businesses enhance efficiency, security, and scalability with cutting-edge technologies.",
      image: "/professional-woman-smiling.png",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  }

  // Swipe support for tabs
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd
      const isSwipe = Math.abs(distance) > 50
      if (isSwipe) {
        const tabKeys = Object.keys(tabContent) as (keyof TabContentMap)[]
        const currentIndex = tabKeys.indexOf(activeTab)
        if (distance > 0 && currentIndex < tabKeys.length - 1) {
          setActiveTab(tabKeys[currentIndex + 1])
        } else if (distance < 0 && currentIndex > 0) {
          setActiveTab(tabKeys[currentIndex - 1])
        }
      }
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section className="min-h-screen py-6 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs (reduced on mobile) */}
        <div className="absolute top-8 left-8 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse hidden md:block"></div>
        <div className="absolute top-16 right-8 w-36 h-36 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 left-12 w-28 h-28 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-r from-cyan-400/25 to-blue-600/25 rounded-full blur-3xl animate-pulse delay-2000 hidden md:block"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]"></div>

        {/* Floating particles (reduced count on mobile) */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Interactive mouse glow (disabled on mobile) */}
        <div
          className="hidden md:block absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-300 pointer-events-none"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 md:order-1">
            {/* Header */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-2 sm:space-x-3 group">
                <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover:w-12 sm:group-hover:w-16 transition-all duration-300"></div>
                <span className="text-blue-300 font-semibold text-xs sm:text-sm tracking-widest uppercase flex items-center space-x-1 sm:space-x-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>About Us PayzonIndia</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                Choose{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  The Best
                </span>{" "}
                <br />IT Service Company
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                PayzonIndia has been optimized to give your visitors the best experience in terms of UX/UI, with a
                <span className="text-blue-300 font-semibold"> unique design</span> that sets industry standards.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-white/20">
              <div
                className="flex space-x-3 sm:space-x-6 overflow-x-auto scrollbar-hide"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {Object.entries(tabContent).map(([key, content]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as keyof TabContentMap)}
                    className={`pb-2 sm:pb-3 px-2 border-b-2 font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base ${
                      activeTab === key
                        ? "text-blue-300 border-blue-400"
                        : "text-gray-400 border-transparent hover:text-white hover:border-gray-500"
                    }`}
                    aria-label={`View ${key} details`}
                  >
                    <span className={`transition-all duration-300 ${activeTab === key ? "text-blue-300 scale-110" : "text-gray-500 group-hover:text-blue-400"}`}>
                      {content.icon}
                    </span>
                    <span className="capitalize">Our {key}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl bg-white/10 transition-all duration-300 ${tabContent[activeTab].bgColor}`}>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r ${tabContent[activeTab].color} p-2 flex items-center justify-center shadow-lg`}>
                  <span className="text-white">{tabContent[activeTab].icon}</span>
                </div>
                <p className="text-white leading-relaxed font-semibold text-xs sm:text-sm md:text-base flex-1">
                  {tabContent[activeTab].text}
                </p>
              </div>
            </div>

            {/* Enhanced Button */}
            <div className="flex items-center">
              <div className="relative group cursor-pointer">
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white pl-4 sm:pl-6 pr-10 sm:pr-12 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-1 sm:space-x-2 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="font-semibold text-xs sm:text-sm md:text-base tracking-wide relative z-10">
                    Check details about our company
                  </span>
                  <div className="absolute -right-1 sm:-right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 sm:w-6 sm:h-6 text-black ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Visual */}
          <div className="relative order-1 md:order-2">
            <div className="relative flex justify-center">
              {/* Main Circle Container */}
              <div className="relative">
                {/* Experience Badge */}
                <div className="absolute z-20 -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm">
                  <div className="text-center relative">
                    <div className="absolute inset-0 bg-white/10 rounded-xl sm:rounded-2xl"></div>
                    <div className="relative z-10 p-1 sm:p-2">
                      <div className="text-sm sm:text-base md:text-lg font-bold flex items-center justify-center space-x-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-300" />
                        <span>Multiple</span>
                      </div>
                      <div className="text-xs sm:text-sm font-medium opacity-90">Years Experience</div>
                    </div>
                  </div>
                </div>

                {/* Main Circle with Enhanced Gradient */}
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative group">
                  {/* Image container */}
                  <div className="absolute bottom-0 right-0 w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                    <img
                      src={tabContent[activeTab].image}
                      alt={`${activeTab} image`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 relative z-0"
                      loading="lazy"
                      srcSet={`
                        ${tabContent[activeTab].image}?w=200 200w,
                        ${tabContent[activeTab].image}?w=400 400w,
                        ${tabContent[activeTab].image}?w=800 800w
                      `}
                      sizes="(max-width: 640px) 200px, (max-width: 1024px) 400px, 800px"
                    />
                  </div>

                  {/* Floating particles */}
                  <div className="absolute top-8 sm:top-12 left-8 sm:left-12 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 rounded-full animate-bounce hidden md:block"></div>
                  <div className="absolute top-12 sm:top-16 right-12 sm:right-16 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-yellow-300/60 rounded-full animate-ping"></div>
                  <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-8 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-300/40 rounded-full animate-pulse hidden md:block"></div>
                  <div className="absolute top-16 sm:top-20 left-16 sm:left-20 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-pink-300/50 rounded-full animate-ping delay-500"></div>
                </div>
              </div>

              {/* Award badge */}
              <div className="absolute -bottom-20 sm:-bottom-24 md:-bottom-28 -right-4 sm:-right-6 bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl max-w-[280px] sm:max-w-sm transform hover:scale-105 transition-all duration-300 border border-white/20 hover:bg-white/20">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 shadow-lg">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base flex items-center space-x-1 sm:space-x-2">
                      <span>Best Awarded Company</span>
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-xs sm:text-sm mb-2 sm:mb-3">
                      We adapt our delivery to the way your work, whether as an external provider with cutting-edge solutions.
                    </p>
                    <div className="flex items-center text-blue-300 font-medium text-xs sm:text-sm group cursor-pointer">
                      <span>Learn more</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional floating elements */}
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse hidden md:block"></div>
              <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-8 w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-ping {
          animation: ping 2s infinite;
        }
        .animate-bounce {
          animation: bounce 3s infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        img {
          will-change: transform;
        }
        @media (max-width: 640px) {
          .animate-ping, .animate-bounce {
            animation-duration: 4s;
          }
        }
      `}</style>
    </section>
  )
}