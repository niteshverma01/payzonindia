"use client"

import { ShieldCheck, Headphones, Lightbulb, Award, ArrowRight, Zap } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Define interface for service items
interface Service {
    title: string
    desc: string
    icon: React.FC<{ className?: string }>
    gradient: string
    bgGradient: string
    glowColor: string
    particle: string
}

// Services Data
const services: Service[] = [
    {
        title: "Reliable & Secure Services",
        desc: "We provide reliable and secure services, ensuring peace of mind with every solution we deliver.",
        icon: ShieldCheck,
        gradient: "from-emerald-300 via-teal-400 to-cyan-500",
        bgGradient: "from-emerald-200/20 via-teal-300/20 to-cyan-400/20",
        glowColor: "shadow-emerald-400/40",
        particle: "bg-emerald-300"
    },
    {
        title: "Unmatched Support & Assistance",
        desc: "Dedicated to Excellence in Customer Support and Service Service Beyond Compare: World-Class Support & Experience",
        icon: Headphones,
        gradient: "from-violet-300 via-purple-400 to-indigo-500",
        bgGradient: "from-violet-200/20 via-purple-300/20 to-indigo-400/20",
        glowColor: "shadow-violet-400/40",
        particle: "bg-violet-300"
    },
    {
        title: "Future-Focused Innovative Curve",
        desc: "Future-driven technology solutions designed to meet evolving market demands and empower your business growth.",
        icon: Lightbulb,
        gradient: "from-amber-300 via-orange-400 to-red-500",
        bgGradient: "from-amber-200/20 via-orange-300/20 to-red-400/20",
        glowColor: "shadow-amber-400/40",
        particle: "bg-amber-300"
    },
    {
        title: "Certified in Global Markets",
        desc: "Equipped with all the necessary global certifications and documentation to conduct business seamlessly worldwide.",
        icon: Award,
        gradient: "from-blue-300 via-indigo-400 to-purple-500",
        bgGradient: "from-blue-200/20 via-indigo-300/20 to-purple-400/20",
        glowColor: "shadow-blue-400/40",
        particle: "bg-blue-300"
    },
]

export default function ServicesSection() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [globalMousePos, setGlobalMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [scrollY, setScrollY] = useState<number>(0)
    const sectionRef = useRef<HTMLElement>(null)

    // Global mouse tracking for advanced effects
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            setGlobalMousePos({ x: e.clientX, y: e.clientY })
        }
        const handleScroll = () => setScrollY(window.scrollY)

        window.addEventListener('mousemove', handleGlobalMouseMove)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
        setHoveredCard(cardIndex)
    }

    return (
        <section ref={sectionRef} className="relative py-12 md:py-20 lg:py-24 overflow-hidden bg-white">
            {/* Dynamic Background Mesh */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 via-purple-300/10 to-pink-300/10"></div>

            {/* Animated Mesh Background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
                }}
            />

       
            <div className="absolute inset-0">
                {[...Array(25)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${i % 4 === 0
                                ? "bg-blue-300/30"
                                : i % 4 === 1
                                    ? "bg-purple-300/30"
                                    : i % 4 === 2
                                        ? "bg-pink-300/30"
                                        : "bg-cyan-300/30"
                            }`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            transform: `translate(${Math.sin(scrollY * 0.001 + i) * 20}px, ${Math.cos(scrollY * 0.001 + i) * 20
                                }px)`,
                        }}
                    />
                ))}
            </div>


            {/* Floating Geometric Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`shape-${i}`}
                        className={`absolute opacity-15 ${i % 3 === 0 ? 'w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-blue-300/15 to-purple-300/15' :
                            i % 3 === 1 ? 'w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-pink-300/15 to-red-300/15 rounded-full' :
                                'w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-green-300/15 to-blue-300/15'
                            }`}
                        style={{
                            left: `${10 + (i * 12)}%`,
                            top: `${20 + (i * 8)}%`,
                            transform: `rotate(${scrollY * 0.05 + i * 45}deg) scale(${1 + Math.sin(scrollY * 0.001) * 0.1})`,
                            filter: 'blur(1px)',
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Revolutionary Header */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20">
                    <div className="flex items-center justify-center mb-6 md:mb-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-lg opacity-50 group-hover:opacity-80"></div>
                            <div className="relative flex items-center space-x-3 px-6 py-3 md:px-8 md:py-4 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200 shadow-lg">
                                <span className="text-gray-900 text-base md:text-lg font-bold bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Premium Services</span>
                                <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 animate-bounce" />
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 mb-6 md:mb-8 leading-tight">
                            Our{" "}
                            <span className="relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                    Services
                                </span>
                                <div className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm"></div>
                            </span>
                        </h2>

                        {/* Floating accent elements */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-xl animate-bounce"></div>
                        <div className="absolute -top-2 -right-6 w-6 h-6 md:w-12 md:h-12 bg-gradient-to-br from-pink-300/20 to-red-300/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    </div>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
                        Revolutionary solutions that transcend expectations and redefine industry standards
                    </p>
                </div>

                {/* Next-Level Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
                    {services.map((service, i) => {
                        const Icon = service.icon
                        return (
                            <div
                                key={i}
                                className="group relative perspective-1000 h-full"
                                onMouseMove={(e) => handleMouseMove(e, i)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Revolutionary Glow Effect */}
                                <div
                                    className={`absolute -inset-3 bg-gradient-to-t ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-50 transition-all duration-700 blur-xl ${service.glowColor} group-hover:scale-105`}
                                ></div>

                                {/* Main Card */}
                                <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 backdrop-blur-2xl border border-gray-200 shadow-lg transition-all duration-700 hover:scale-105 hover:rotate-y-12 group-hover:-translate-y-6 transform-gpu flex flex-col">

                                    {/* Content */}
                                    <div className="relative z-10 p-4 md:py-8 md:px-6 flex flex-col flex-grow">
                                        {/* Icon */}
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-700 scale-150`}></div>
                                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500 scale-125`}></div>
                                            <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 flex items-center justify-center shadow-lg group-hover:bg-gray-50/90 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                                                <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 transition-all duration-500 group-hover:scale-125 group-hover:text-gray-900 drop-shadow-md" />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center leading-tight">
                                            <span className={`group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${service.gradient}`}>
                                                {service.title}
                                            </span>
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-700 group-hover:text-gray-800 text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-grow text-center">
                                            {service.desc}
                                        </p>

                                        {/* CTA Button aligned bottom */}
                                        <div className="relative mt-auto mx-auto w-full max-w-xs">
                                            <button className="group/btn relative w-full overflow-hidden rounded-xl bg-white/50 border border-gray-200 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-gray-900 transition-all duration-500 hover:border-transparent hover:scale-105 backdrop-blur-xl">
                                                <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-0 group-hover/btn:opacity-90 transition-all duration-500`}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-gray-200/30 to-transparent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-1000"></div>
                                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                                    <span>Discover More</span>
                                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-125" />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Advanced CSS for 3D effects */}
            <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform-style: preserve-3d;
        }
        .hover\\:rotate-y-12:hover {
          transform: rotateY(12deg) translateZ(50px);
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .hover\\:rotate-y-12:hover {
            transform: none;
          }
        }
      `}</style>
        </section>
    )
}