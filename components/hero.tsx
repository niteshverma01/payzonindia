import { ChevronLeft, ChevronRight, ArrowRight, Play } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Types
interface Slide {
  title: string
  subtitle?: string
  description: string
  buttonText: string
  accent: string
}

// Custom Hook for Intersection Observer
const useIntersectionObserver = (options: IntersectionObserverInit = {}): [React.RefObject<HTMLElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return [ref, isIntersecting]
}

// Data
const slides: Slide[] = [
  {
    title: "Leading a Legacy of",
    subtitle: "Innovation",
    description: "As the cornerstone of our group, PayzonIndia drives transformative solutions across industries, uniting expertise and innovation.",
    buttonText: "Discover Our Group",
    accent: "from-blue-600 via-indigo-500 to-purple-600"
  },
  {
    title: "Empowering Global",
    subtitle: "Growth",
    description: "Our diverse portfolio of companies delivers cutting-edge technology and services to fuel your success worldwide.",
    buttonText: "Explore Our Ventures",
    accent: "from-blue-600 via-indigo-500 to-purple-600"
  },
  {
    title: "Building a Stronger",
    subtitle: "Future",
    description: "With a commitment to excellence, our group shapes industries through innovation, reliability, and global reach.",
    buttonText: "Join Our Vision",
    accent: "from-blue-600 via-indigo-500 to-purple-600"
  },
]

// Sample company logos (using placeholder colors for demo)
const orbitIcons = [
  "/images/payzonit.png",
  "/images/PAYZONINDIA-pngLogo.png",
  "/images/logo.png",
  "/images/payzonit.png",
  "/images/shoppy-logo.png",
  "/images/logo.png",
];

// Simple Button component
const Button = ({ children, onClick, disabled, className, variant = "default", size = "default" }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "icon";
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className || ''}`}
    >
      {children}
    </button>
  );
};

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [servicesRef, servicesInView] = useIntersectionObserver({ threshold: 0.1 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-slide functionality
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
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-18">
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
            autoPlay
            loop
            muted
            playsInline
            style={{
              transform: `scale(${isAnimating ? 1.05 : 1}) translate(${mousePosition.x * 8}px, ${mousePosition.y * 4}px)`,
            }}
          >
            <source src="/images/payzon.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left side */}
          <div>
            <div className="relative z-10 min-h-screen flex items-center justify-center pt-0 sm:pt-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center">
                {/* Main Title */}
                <div className={`transition-all duration-700 ease-out ${isAnimating ? 'opacity-0 translate-y-10 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
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
                    className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
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
                      className={`group relative overflow-hidden bg-gradient-to-r ${currentSlideData.accent} hover:scale-105 text-white px-10 py-5 text-lg font-semibold rounded-full transition-transform duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <span className="relative z-10">{currentSlideData.buttonText}</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                    <Button
                      variant="outline"
                      className="group bg-transparent border-2 border-white/30 text-white px-10 py-5 text-lg font-semibold rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                      Watch Our Story
                    </Button>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 transform -translate-x-1/2 flex justify-center items-center gap-4 z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white hover:scale-105 transition-transform duration-300"
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
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white hover:scale-105 transition-transform duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right side with ROTATING OrbitingCircles */}
          <div className="hidden lg:flex items-center justify-center h-screen relative">
            <div className="relative flex h-[600px] w-[600px] items-center justify-center">

              {/* Outer Orbit Path */}
              <div className="absolute w-[440px] h-[440px] rounded-full border border-gray-500/30" />
              <div className="absolute w-[440px] h-[440px] rounded-full animate-spin-slow">
                {orbitIcons.slice(0, 4).map((icon, i) => {
                  const angle = (i / 4) * 360;
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-14 h-14 -mt-7 -ml-7"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-220px) rotate(-${angle}deg)`,
                      }}
                    >
                      <img
                        src={icon}
                        alt={`icon-${i}`}
                        className="w-full h-full rounded-full object-cover shadow-lg hover:scale-110 transition-transform"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Inner Orbit Path */}
              <div className="absolute w-[280px] h-[280px] rounded-full border border-gray-500/30" />
              <div className="absolute w-[280px] h-[280px] rounded-full animate-reverse-spin">
                {orbitIcons.slice(2, 6).map((icon, i) => {
                  const angle = (i / 4) * 360;
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-140px) rotate(-${angle}deg)`,
                      }}
                    >
                      <img
                        src={icon}
                        alt={`icon-inner-${i}`}
                        className="w-full h-full rounded-full object-cover shadow-lg hover:scale-110 transition-transform"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Central Logo */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center z-10 shadow-2xl ">
                <img src="/images/logo.png" alt="" />  </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(15px);
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

        /* ORBIT ANIMATIONS */
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-reverse-spin {
          animation: spin 15s linear infinite reverse;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default Hero