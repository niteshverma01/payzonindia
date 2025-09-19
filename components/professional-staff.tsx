"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Play,
  Shield,
  Zap,
  Database,
  Target,
  Sparkles,
  ChevronRight,
  Briefcase,
  Users,
  Star,
  CheckCircle,
  Rocket,
} from "lucide-react";

interface Slide {
  image: string;
  category: string;
  title: string;
  description: string;
  bgColor: string;
  accentColor: string;
  stats: { number: string; label: string };
}

interface Service {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  gradient: string;
}

interface Achievement {
  number: string;
  label: string;
  icon: JSX.Element;
  color: string;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function PayzonIndiaHero() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeService, setActiveService] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const slides: Slide[] = [
    {
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      category: "Digital Excellence",
      title: "Revolutionary Digital Marketing Solutions",
      description:
        "Transforming businesses with cutting-edge digital strategies, web development, and comprehensive online presence management.",
      bgColor: "from-emerald-900/90 via-teal-900/70",
      accentColor: "emerald",
      stats: { number: "500+", label: "Success Stories" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      category: "Banking & Finance",
      title: "NISM & IRDA Certification Program",
      description:
        "Accelerate your banking career with our comprehensive training program, earning industry-recognized certifications.",
      bgColor: "from-violet-900/90 via-purple-900/70",
      accentColor: "violet",
      stats: { number: "1000+", label: "Certified Professionals" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
      category: "Web Development",
      title: "Next-Gen Web Solutions",
      description:
        "Creating responsive, scalable websites that deliver exceptional user experiences and drive business growth.",
      bgColor: "from-blue-900/90 via-indigo-900/70",
      accentColor: "blue",
      stats: { number: "99.9%", label: "Client Satisfaction" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      category: "Data Protection",
      title: "Advanced Security Solutions",
      description:
        "Comprehensive data protection services safeguarding sensitive business information with industry-leading security protocols.",
      bgColor: "from-orange-900/90 via-red-900/70",
      accentColor: "orange",
      stats: { number: "24/7", label: "Security Monitoring" },
    },
  ];

  const services: Service[] = [
    {
      title: "Innovative Development",
      description:
        "Crafting innovative software solutions that empower businesses to streamline operations and enhance productivity.",
      icon: <Zap className="w-6 h-6 md:w-7 md:h-7" />,
      color: "from-pink-500 to-rose-500",
      gradient: "from-pink-50 to-rose-50",
    },
    {
      title: "Project Management",
      description:
        "Efficient project management services ensuring timely delivery and successful implementation of IT solutions.",
      icon: <Database className="w-6 h-6 md:w-7 md:h-7" />,
      color: "from-green-500 to-lime-500",
      gradient: "from-green-50 to-lime-50",
    },
    {
      title: "Support & Services",
      description:
        "Dedicated and fast support services to ensure your systems run smoothly with future-ready enhancements.",
      icon: <CheckCircle className="w-6 h-6 md:w-7 md:h-7" />,
      color: "from-yellow-500 to-amber-500",
      gradient: "from-yellow-50 to-amber-50",
    },
  ];

  const achievements: Achievement[] = [
    {
      number: "500+",
      label: "Projects Completed",
      icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      number: "1000+",
      label: "Certified Professionals",
      icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "99.9%",
      label: "Client Satisfaction",
      icon: <Star className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-violet-500 to-purple-500",
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <Target className="w-5 h-5 md:w-6 md:h-6" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  // Mouse movement handling (disabled on touch devices)
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      let timeoutId: NodeJS.Timeout;
      const handleMouseMove = (e: MouseEvent) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100,
          });
        }, 16);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  // IntersectionObserver for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, slides.length]);

  // Auto-rotate services
  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(serviceInterval);
  }, [services.length]);

  // Swipe support for carousel
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const isSwipe = Math.abs(distance) > 50; // Minimum swipe distance
      if (isSwipe) {
        setIsAutoPlay(false);
        if (distance > 0) {
          setActiveSlide((prev) => (prev + 1) % slides.length); // Swipe left
        } else {
          setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length); // Swipe right
        }
        setTimeout(() => setIsAutoPlay(true), 10000);
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden bg-slate-900"
    >
      {/* Animated Background (simplified for mobile) */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-40 transition-all duration-500 hidden md:block"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
              radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              conic-gradient(from 0deg at 50% 50%, 
                rgba(16, 185, 129, 0.1) 0deg,
                rgba(59, 130, 246, 0.1) 90deg,
                rgba(139, 92, 246, 0.1) 180deg,
                rgba(236, 72, 153, 0.1) 270deg,
                rgba(16, 185, 129, 0.1) 360deg
              )
            `,
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float hidden md:block"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div
                className="w-2 h-2 md:w-3 md:h-3 rounded-full blur-sm opacity-50"
                style={{
                  background: [
                    "#10B981",
                    "#3B82F6",
                    "#8B5CF6",
                    "#EC4899",
                    "#F59E0B",
                  ][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-8 md:space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-8 md:pb-12">
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm sm:text-base">
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  <span>About PayzonIndia</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mt-4">
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  PayzonIndia
                </span>
                <br />
                <span className="text-slate-300">Excellent IT Services</span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  For Your Success
                </span>
              </h2>
            </div>
            <div>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed">
                We are a dynamic software company specializing in innovative, scalable solutions that empower businesses to streamline operations, enhance productivity, and drive digital transformation. Our expertise spans:
                <ul className="list-disc pl-5 sm:pl-6 mt-2 space-y-1 sm:space-y-2">
                  <li className="text-sm sm:text-base">Following the latest technology standards for cutting-edge solutions.</li>
                  <li className="text-sm sm:text-base">Believing in secure and simple development practices.</li>
                  <li className="text-sm sm:text-base">Providing dedicated and fast support for seamless operations.</li>
                  <li className="text-sm sm:text-base">Always ready for future enhancements to keep you ahead.</li>
                </ul>
              </p>
              <button className="px-4 sm:px-6 mt-4 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full font-bold text-sm sm:text-base hover:scale-105 transition-transform duration-300 ease-out">
                Get Started with PayzonIndia
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
            {/* Image Carousel */}
            <div
              className={`lg:col-span-7 transform transition-all duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative group">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50">
                  <img
                    src={slides[activeSlide].image}
                    alt={slides[activeSlide].title}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                    loading="lazy"
                    srcSet={`
                      ${slides[activeSlide].image}&w=400 400w,
                      ${slides[activeSlide].image}&w=800 800w,
                      ${slides[activeSlide].image}&w=1200 1200w
                    `}
                    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${slides[activeSlide].bgColor} to-transparent opacity-70 transition-opacity duration-500`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-20 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-1 sm:py-2 border border-emerald-400/30 mb-3 sm:mb-4">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse text-emerald-400" />
                      <span className="text-xs sm:text-sm font-bold text-emerald-300">
                        {slides[activeSlide].category}
                      </span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent">
                      {slides[activeSlide].title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6 max-w-md leading-relaxed">
                      {slides[activeSlide].description}
                    </p>
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-4 py-1 sm:py-2">
                      <span className="text-lg sm:text-xl md:text-2xl font-black text-emerald-300">
                        {slides[activeSlide].stats.number}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-300">
                        {slides[activeSlide].stats.label}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 right-4 sm:-bottom-8 sm:-right-8 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-emerald-400/30 backdrop-blur-xl z-30">
                  <div className="flex flex-row sm:flex-col items-center space-x-4 sm:space-x-0 sm:space-y-4">
                    <div className="relative">
                      <button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-out hover:shadow-2xl hover:shadow-emerald-500/50"
                        aria-label={isAutoPlay ? "Pause carousel" : "Play carousel"}
                      >
                        <Play
                          className={`w-5 h-5 sm:w-6 sm:h-6 text-white ml-1 transition-opacity duration-300 ${!isAutoPlay ? "opacity-50" : ""}`}
                          fill="currentColor"
                        />
                      </button>
                      {isAutoPlay && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl sm:rounded-2xl animate-ping opacity-20" />
                      )}
                    </div>
                    <div className="flex space-x-2 sm:space-x-0 sm:flex-col sm:space-y-4">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleDotClick(index)}
                          className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-black transition-all duration-300 ease-out ${activeSlide === index
                            ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-2xl scale-110 shadow-emerald-500/50"
                            : "bg-slate-700 text-slate-400 hover:bg-slate-600 hover:scale-105"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        >
                          <span className="relative z-10">{index + 1}</span>
                          {activeSlide === index && (
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg sm:rounded-xl animate-pulse opacity-40" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div
              className={`lg:col-span-5 space-y-6 transform transition-all duration-1000 ease-out delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-500 ease-out cursor-pointer border ${activeService === index
                      ? "bg-gradient-to-r from-slate-800 to-slate-700 border-emerald-400/50 shadow-2xl shadow-emerald-500/20 scale-102"
                      : "bg-slate-800/50 border-slate-700/50 hover:border-emerald-400/30"
                    }`}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out`}
                    />
                    <div className="relative z-10 flex items-start space-x-3 sm:space-x-4">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 ease-out`}
                      >
                        <span className="text-white">{service.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-lg sm:text-xl text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                          {service.title}
                        </h4>
                        <p className="text-sm sm:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                      <ArrowRight
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-600 group-hover:text-emerald-400 transform group-hover:translate-x-2 transition-all duration-300 ease-out ${activeService === index
                          ? "text-emerald-400 translate-x-2"
                          : ""
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Custom CSS for Smooth Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        img {
          will-change: transform;
        }
        .group:hover img {
          transform: scale(1.05);
        }
        section {
          scroll-behavior: smooth;
        }
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 6s;
          }
        }
      `}</style>
    </section>
  );
}