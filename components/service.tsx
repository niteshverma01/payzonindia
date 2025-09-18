"use client"

import { ShieldCheck, Headphones, Lightbulb, Award, ArrowRight, Sparkles, Star, Zap } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Services Data
const services = [
    {
        title: "Reliable & Secure Services",
        desc: "We provide reliable and secure services, ensuring peace of mind with every solution we deliver.",
        icon: ShieldCheck,
        gradient: "from-emerald-400 via-teal-500 to-cyan-600",
        bgGradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
        glowColor: "shadow-emerald-500/50",
        particle: "bg-emerald-400"
    },
    {
        title: "Unmatched Support & Assistance",
        desc: "Dedicated to Excellence in Customer Support and Service Service Beyond Compare: World-Class Support & Experience",
        icon: Headphones,
        gradient: "from-violet-400 via-purple-500 to-indigo-600",
        bgGradient: "from-violet-500/20 via-purple-500/20 to-indigo-500/20",
        glowColor: "shadow-violet-500/50",
        particle: "bg-violet-400"
    },
    {
        title: "Future-Focused Innovative Curve",
        desc: "Future-driven technology solutions designed to meet evolving market demands and empower your business growth.",
        icon: Lightbulb,
        gradient: "from-amber-400 via-orange-500 to-red-600",
        bgGradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
        glowColor: "shadow-amber-500/50",
        particle: "bg-amber-400"
    },
    {
        title: "Certified in Global Markets",
        desc: "Equipped with all the necessary global certifications and documentation to conduct business seamlessly worldwide.",
        icon: Award,
        gradient: "from-blue-400 via-indigo-500 to-purple-600",
        bgGradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
        glowColor: "shadow-blue-500/50",
        particle: "bg-blue-400"
    },
]

export default function ServicesSection() {
    const [hoveredCard, setHoveredCard] = useState(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [globalMousePos, setGlobalMousePos] = useState({ x: 0, y: 0 })
    const [scrollY, setScrollY] = useState(0)
    const sectionRef = useRef(null)

    // Global mouse tracking for advanced effects
    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
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

    const handleMouseMove = (e, cardIndex) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
        setHoveredCard(cardIndex)
    }

    return (
        <section ref={sectionRef} className="relative min-h-screen py-12 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Dynamic Background Mesh */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
            
            {/* Animated Mesh Background */}
            <div 
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                }}
            />

            {/* Advanced Particle System */}
            <div className="absolute inset-0">
                {[...Array(25)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full animate-pulse ${
                            i % 4 === 0 ? 'bg-blue-400/40' : 
                            i % 4 === 1 ? 'bg-purple-400/40' : 
                            i % 4 === 2 ? 'bg-pink-400/40' : 'bg-cyan-400/40'
                        }`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            transform: `translate(${Math.sin(scrollY * 0.001 + i) * 20}px, ${Math.cos(scrollY * 0.001 + i) * 20}px)`
                        }}
                    />
                ))}
            </div>

            {/* Floating Geometric Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`shape-${i}`}
                        className={`absolute opacity-20 ${
                            i % 3 === 0 ? 'w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20' :
                            i % 3 === 1 ? 'w-24 h-24 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full' :
                            'w-20 h-20 bg-gradient-to-br from-green-500/20 to-blue-500/20'
                        } animate-pulse`}
                        style={{
                            left: `${10 + (i * 12)}%`,
                            top: `${20 + (i * 8)}%`,
                            transform: `rotate(${scrollY * 0.05 + i * 45}deg) scale(${1 + Math.sin(scrollY * 0.001) * 0.1})`,
                            filter: 'blur(1px)',
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Revolutionary Header */}
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center mb-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-lg opacity-60 group-hover:opacity-100 animate-pulse"></div>
                            <div className="relative flex items-center space-x-3 px-8 py-4 bg-slate-900/80 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
                                {/* <div className="flex space-x-1">
                                    {[...Array(3)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 text-yellow-400 animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
                                    ))}
                                </div> */}
                                <span className="text-white text-lg font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Premium Services</span>
                                <Zap className="w-5 h-5 text-yellow-400 animate-bounce" />
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-8 leading-tight">
                            Our{" "}
                            <span className="relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
                                    Services
                                </span>
                                <div className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm animate-pulse"></div>
                            </span>
                        </h2>
                        
                        {/* Floating accent elements */}
                        <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-bounce"></div>
                        <div className="absolute -top-4 -right-12 w-12 h-12 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    </div>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
                        Revolutionary solutions that transcend expectations and redefine industry standards
                    </p>
                </div>

                {/* Next-Level Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="group relative h-[450px] w-full perspective-1000"
                            onMouseMove={(e) => handleMouseMove(e, i)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Revolutionary Glow Effect */}
                            <div className={`absolute -inset-3 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-xl ${service.glowColor} group-hover:scale-105`}></div>
                            
                            {/* Animated Border */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-spin-slow"></div>
                            </div>

                            {/* Main Card with 3D Transform */}
                            <div className="relative h-full w-full transform-gpu transition-all duration-700 hover:scale-105 hover:rotate-y-12 group-hover:-translate-y-6">
                                <div className={`relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl ${service.glowColor} transition-all duration-700`}>

                                    {/* Dynamic Background Pattern */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                                    
                                    {/* Animated Mesh Overlay */}
                                    {hoveredCard === i && (
                                        <div
                                            className="absolute inset-0 opacity-30 transition-opacity duration-500"
                                            style={{
                                                background: `
                                                    radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                                                    rgba(59, 130, 246, 0.3) 0%, 
                                                    rgba(147, 51, 234, 0.2) 30%, 
                                                    rgba(236, 72, 153, 0.1) 60%, 
                                                    transparent 80%)`
                                            }}
                                        />
                                    )}

                                    {/* Premium Card Content */}
                                    <div className="relative z-10 py-8 px-4 h-full flex flex-col">
                                        {/* Revolutionary Icon Design */}
                                        <div className="relative w-20 h-20 mx-auto mb-8">
                                            {/* Multi-layer Glow */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-80 transition-all duration-700 animate-pulse scale-150`}></div>
                                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500 scale-125`}></div>
                                            
                                            {/* Main Icon Container */}
                                            <div className="relative w-20 h-20 rounded-2xl bg-slate-800/80 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl group-hover:bg-white/10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                                                <service.icon className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-125 group-hover:text-white drop-shadow-lg" />
                                            </div>
                                            
                                            {/* Floating Particles around Icon */}
                                            {[...Array(6)].map((_, particleIndex) => (
                                                <div
                                                    key={particleIndex}
                                                    className={`absolute w-2 h-2 ${service.particle}/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-bounce`}
                                                    style={{
                                                        left: `${50 + Math.cos(particleIndex * 60 * Math.PI / 180) * 40}%`,
                                                        top: `${50 + Math.sin(particleIndex * 60 * Math.PI / 180) * 40}%`,
                                                        animationDelay: `${particleIndex * 0.1}s`
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* Enhanced Typography */}
                                        <h3 className="text-2xl font-bold text-white mb-6 transition-all duration-300 group-hover:scale-105 text-center leading-tight">
                                            <span className={`group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${service.gradient}`}>
                                                {service.title}
                                            </span>
                                        </h3>

                                        <p className="text-slate-300 group-hover:text-white text-base leading-relaxed mb-8 transition-all duration-300 flex-grow text-center">
                                            {service.desc}
                                        </p>

                                        {/* Revolutionary CTA Button */}
                                        <div className="relative mt-auto">
                                            <button className="group/btn relative w-full overflow-hidden rounded-xl bg-slate-800/50 border border-white/20 px-8 py-4 text-lg font-bold text-white transition-all duration-500 hover:border-transparent hover:scale-105 backdrop-blur-xl">
                                                {/* Button Background Animation */}
                                                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover/btn:opacity-100 transition-all duration-500`}></div>
                                                
                                                {/* Shimmer Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                                                
                                                {/* Button Content */}
                                                <span className="relative z-10 flex items-center justify-center space-x-1">
                                                    <span>Discover More</span>
                                                    <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-125" />
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Premium Corner Accents */}
                                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                    
                                    {/* Animated Bottom Accent */}
                                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                </div>
                            </div>
                        </div>
                    ))}
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
            `}</style>
        </section>
    )
}