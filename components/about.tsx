"use client"

import { Button } from "@/components/ui/button"
import { Play, Award, CheckCircle, Users, Shield, Lightbulb, ArrowRight, Sparkles, Star, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export default function About() {
  const [activeTab, setActiveTab] = useState("mission")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const tabContent = {
    mission: {
      text: "An IT firm or MSP who keeps your IT running smoothly at all times is like a plumber who fixes your pipes; that's what they are supposed to do. Many IT firms struggle to keep themselves and their IT from falling apart. We've raised the standards in this industry and are a leading cybersecurity provider.",
      image: "/professional-woman-smiling.png",
      icon: <Shield className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    vision: {
      text: "To be the leading provider of innovative IT solutions that transform businesses and drive digital excellence across all industries. We envision a future where technology seamlessly integrates with business operations to create unprecedented value.",
      image: "/professional-woman-smiling.png",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50"
    },
    value: {
      text: "We believe in delivering exceptional value through integrity, innovation, and excellence. Our core values include customer-centricity, continuous learning, and building long-term partnerships that drive mutual success and growth.",
      image: "/professional-woman-smiling.png",
      icon: <Users className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
  }



  return (
    <section className="min-h-screen py-16 lg:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Magic UI Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/25 to-blue-600/25 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}

        {/* Interactive mouse glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-300 pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="space-y-10 order-2 lg:order-1">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover:w-20 transition-all duration-300"></div>
                <span className="text-blue-300 font-semibold text-sm tracking-widest uppercase flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>About Us</span>
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Choose{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  The Best
                </span>{" "}
                <br />IT Service Company
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                ITSoft has been optimized to give your visitors the best experience in terms of UX/UI, with a
                <span className="text-blue-300 font-semibold"> unique design</span> that sets industry standards.
              </p>
            </div>



            {/* Tab Navigation */}
            <div className="border-b border-white/20">
              <div className="flex space-x-8 overflow-x-auto">
                {Object.entries(tabContent).map(([key, content]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`pb-4 px-2 border-b-2 font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-3 group ${activeTab === key
                      ? "text-blue-300 border-blue-400"
                      : "text-gray-400 border-transparent hover:text-white hover:border-gray-500"
                      }`}
                  >
                    <span className={`transition-all duration-300 ${activeTab === key ? "text-blue-300 scale-110" : 'text-gray-500 group-hover:text-blue-400'}`}>
                      {content.icon}
                    </span>
                    <span className="capitalize">Our {key}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tabContent[activeTab as keyof typeof tabContent].color} p-3 flex items-center justify-center shadow-lg`}>
                  <span className="text-white">
                    {tabContent[activeTab as keyof typeof tabContent].icon}
                  </span>
                </div>
                <p className="text-gray-200 leading-relaxed text-lg flex-1">
                  {tabContent[activeTab as keyof typeof tabContent].text}
                </p>
              </div>
            </div>

            {/* Enhanced Button */}
            <div className="flex items-center">
              <div className="relative group cursor-pointer">
                {/* Main Button Body */}
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600
                    text-white pl-8 pr-16 py-5 rounded-2xl shadow-2xl 
                    hover:shadow-blue-500/25 transition-all duration-300 
                    flex items-center space-x-3 relative ">

                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  <span className="font-semibold text-lg tracking-wide relative z-10">
                    Check details about our company
                  </span>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 
                    h-18 w-18 bg-white rounded-full flex items-center justify-center 
                    shadow-2xl ">
                    <div className="w-12 h-12 b rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Circular Play Button */}

              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Visual */}
          <div className="relative order-1 lg:order-2">
            <div className="relative flex justify-center">

              {/* Main Circle Container */}
              <div className="relative">

                {/* Experience Badge */}
                <div className="absolute z-20 -top-6 -left-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm">
                  <div className="text-center relative">
                    <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                    <div className="relative z-10">
                      <div className="text-4xl font-bold flex items-center justify-center space-x-1">
                        <span>5+</span>
                        <Star className="w-6 h-6 text-yellow-300" />
                      </div>
                      <div className="text-sm font-medium opacity-90">Years Experience</div>
                    </div>
                  </div>
                </div>

                {/* Main Circle with Enhanced Gradient */}
                <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] relative  group">

                  {/* Rotating border */}
                  {/* <div className="absolute inset-2 border-2 border-white/30 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
                  <div className="absolute inset-4 border border-white/20 rounded-full"></div> */}

                  {/* Image container with enhanced effects */}
                  <div className="absolute bottom-0 right-0 w-60 h-60 sm:w-72 sm:h-72 lg:w-full lg:h-full rounded-full overflow-hidden">
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent z-10"></div> */}
                    <img
                      src={tabContent[activeTab as keyof typeof tabContent].image}
                      alt={`${activeTab} image`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 relative z-0"
                    />
                  </div>

                  {/* Enhanced floating particles */}
                  <div className="absolute top-16 left-16 w-3 h-3 bg-white/40 rounded-full animate-bounce"></div>
                  <div className="absolute top-28 right-20 w-2 h-2 bg-yellow-300/60 rounded-full animate-ping"></div>
                  <div className="absolute bottom-28 left-12 w-2.5 h-2.5 bg-blue-300/40 rounded-full animate-pulse"></div>
                  <div className="absolute top-40 left-32 w-1.5 h-1.5 bg-pink-300/50 rounded-full animate-ping delay-500"></div>
                </div>
              </div>

              {/* Enhanced Award badge */}
              <div className="absolute -bottom-36 -right-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-sm transform hover:scale-105 transition-all duration-300 border border-white/20 hover:bg-white/20">
                <div className="flex items-start space-x-5">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl flex-shrink-0 shadow-lg">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-3 text-lg flex items-center space-x-2">
                      <span>Best Awarded Company</span>
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      We adapt our delivery to the way your work, whether as an external provider with cutting-edge solutions.
                    </p>
                    <div className="flex items-center text-blue-300 font-medium group cursor-pointer">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional floating elements */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 left-10 w-12 h-12 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  )
}