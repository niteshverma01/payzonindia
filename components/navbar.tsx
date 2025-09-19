"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Menu, X, Phone, Mail, ArrowRight, Sparkles, Star } from "lucide-react"

interface NavigationItem {
  name: string
  href: string
  hasDropdown: boolean
  dropdownItems: string[]
  icon?: string
}

const navigationItems: NavigationItem[] = [
  {
    name: "Profile",
    href: "#profile",
    hasDropdown: true,
    dropdownItems: ["Company History", "Leadership Team", "Mission & Vision", "Awards & Recognition"],
    icon: "👤"
  },
  {
    name: "Ventures",
    href: "#ventures",
    hasDropdown: true,
    dropdownItems: ["Tech Startups", "Real Estate", "E-commerce", "Fintech Solutions"],
    icon: "🚀"
  },
  {
    name: "Associations",
    href: "#associations",
    hasDropdown: true,
    dropdownItems: ["Business Partners", "Industry Alliances", "Global Networks", "Strategic Partnerships"],
    icon: "🤝"
  },
  {
    name: "Portfolio",
    href: "#portfolio",
    hasDropdown: true,
    dropdownItems: ["Active Investments", "Success Stories", "Case Studies", "Market Analysis"],
    icon: "📊"
  },
  {
    name: "Management",
    href: "#management",
    hasDropdown: true,
    dropdownItems: ["Executive Team", "Board Members", "Advisory Panel", "Department Heads"],
    icon: "⚡"
  },
  {
    name: "Audit Report",
    href: "#audit",
    hasDropdown: true,
    dropdownItems: ["Financial Reports", "Compliance Documents", "Annual Reviews", "Transparency Reports"],
    icon: "📋"
  },
  {
    name: "Investor Program",
    href: "#investor",
    hasDropdown: true,
    dropdownItems: ["Investment Opportunities", "Funding Rounds", "Returns Analysis", "Join Program"],
    icon: "💎"
  },
  {
    name: "Working Sector",
    href: "#sector",
    hasDropdown: true,
    dropdownItems: ["Technology", "Healthcare", "Finance", "Manufacturing"],
    icon: "🏢"
  },
]

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "premium" | "outline" | "glow"
  size?: "default" | "icon" | "lg"
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-110 active:scale-95 relative overflow-hidden group"

  const variants = {
    default: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-400 hover:to-cyan-400",
    ghost: "hover:bg-slate-800/30 backdrop-blur-sm text-white border border-slate-700/50 hover:border-emerald-400/50",
    premium: "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-violet-500/60 hover:from-violet-500 hover:to-pink-500",
    outline: "border-2 border-emerald-400/60 backdrop-blur-sm hover:bg-emerald-400/20 hover:border-emerald-300 text-emerald-100 hover:text-white hover:shadow-lg hover:shadow-emerald-400/30",
    glow: "bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white hover:shadow-2xl hover:shadow-orange-500/70 hover:from-amber-300 hover:to-red-400"
  }

  const sizes = {
    default: "h-12 px-6 py-3",
    icon: "h-12 w-12",
    lg: "h-14 px-8 py-4 text-lg"
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
        setMobileActiveDropdown(null)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setMobileActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDropdownEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(itemName)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setMobileActiveDropdown(null)
  }

  const toggleMobileDropdown = (itemName: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === itemName ? null : itemName)
  }

  return (
    <>
      {/* Floating cursor effect */}
      <div
        className="hidden lg:block fixed pointer-events-none z-40 w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-70 blur-sm transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isScrolled ? 0.8 : 1.5})`
        }}
      />

      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ease-out ${isScrolled
          ? "bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-3xl shadow-2xl shadow-emerald-500/20 py-2 border-b border-emerald-400/30"
          : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl py-4 shadow-xl"
          }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-4 right-1/3 w-1 h-1 bg-teal-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-2 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="group cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className={`relative transition-all duration-700 group-hover:scale-125 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-spin opacity-80 blur-md" style={{ animationDuration: '6s' }} />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 animate-spin opacity-60 blur-sm" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                  <img
                    src="/images/logo.png"
                    alt="Payzonindia Logo"
                    className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-full border-2 border-emerald-400/50 shadow-2xl object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                </div>
                {/* <div className={`transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                  <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-violet-400 group-hover:to-pink-400 transition-all duration-500">
                    PayzonIndia
                  </h1>
                  <p className="text-xs text-emerald-300/80 font-semibold tracking-wide">Premium Solutions</p>
                </div> */}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-4">
              <div className={`flex items-center space-x-1 px-6 py-4 rounded-3xl transition-all duration-700 backdrop-blur-2xl border ${isScrolled
                ? 'bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 shadow-2xl border-emerald-400/30 shadow-emerald-500/20'
                : 'bg-slate-800/50 border-slate-700/50 shadow-xl shadow-slate-900/50'
                }`}>
                {navigationItems.map((item, index) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <button
                      className={`relative overflow-hidden whitespace-nowrap px-3 xl:px-1 py-3 rounded-2xl transition-all duration-500 flex items-center space-x-1 text-sm xl:text-base font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 group ${activeDropdown === item.name
                        ? 'bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 text-emerald-300 shadow-lg shadow-emerald-500/30 scale-105'
                        : 'text-slate-300 hover:text-emerald-300 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-cyan-500/10 hover:shadow-md hover:shadow-emerald-500/20'
                        }`}
                      aria-expanded={activeDropdown === item.name}
                      aria-haspopup={item.hasDropdown}
                    >
                      <span className="relative z-10 transition-all duration-300">{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown className={`w-4 h-4 transition-all duration-500 ${activeDropdown === item.name ? 'rotate-180 text-emerald-400' : ''
                          }`} />
                      )}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </button>

                    {/* Desktop Dropdown Menu */}
                    {item.hasDropdown && activeDropdown === item.name && (
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-emerald-400/30 overflow-hidden opacity-100 scale-100 transition-all duration-500 animate-in slide-in-from-top-2"
                        role="menu"
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5" />
                        <div className="relative p-4">
                          <div className="text-xs font-black text-emerald-400 uppercase tracking-wider px-4 py-2 mb-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl">
                            {item.name}
                          </div>
                          {item.dropdownItems.map((dropdownItem, idx) => (
                            <a
                              key={dropdownItem}
                              href="#"
                              className="group flex items-center px-4 py-4 text-slate-300 hover:text-emerald-300 transition-all duration-300 rounded-2xl hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-cyan-500/10 hover:shadow-lg hover:shadow-emerald-500/20 transform hover:scale-105 hover:translate-x-2"
                              role="menuitem"
                              style={{ animationDelay: `${idx * 0.05}s` }}
                              onClick={(e) => {
                                e.preventDefault()
                                console.log(`Clicked on ${dropdownItem}`)
                              }}
                            >
                              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 mr-4 opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125" />
                              <span className="text-sm font-semibold flex-1">{dropdownItem}</span>
                              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 text-emerald-400" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center whitespace-nowrap space-x-4">
              <a
                href="/contact"
                className="relative flex items-center px-8 py-4 text-lg font-semibold text-white 
               rounded-full group overflow-hidden transition-all duration-300 
               shadow-2xl shadow-orange-500/40 bg-gradient-to-r from-blue-500 via-cyan-400 to-cyan-500 
               hover:shadow-orange-400/60 hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  Contact
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </span>

                {/* Glow animation background */}
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></span>
              </a>
            </div>



            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="relative overflow-hidden text-emerald-300 hover:text-emerald-100 hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-500"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 transition-transform duration-500 rotate-180" />
                ) : (
                  <Menu className="w-6 h-6 transition-transform duration-500" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden transition-all duration-700 ease-out ${isMobileMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
            } bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-2xl shadow-2xl border-t border-emerald-400/30 overflow-hidden`}
        >
          <div className="relative px-6 py-8 space-y-6 max-h-[95vh] overflow-y-auto pb-12">
            

            {/* Mobile Navigation Items */}
            {navigationItems.map((item, index) => (
              <div
                key={item.name}
                className="border-b border-slate-700/50 pb-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  className="w-full group flex justify-between items-center text-slate-300 hover:text-emerald-300 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-cyan-500/10 px-6 py-5 rounded-2xl transition-all duration-500 font-bold text-left shadow-sm hover:shadow-lg hover:shadow-emerald-500/20 transform hover:scale-105"
                  onClick={() => item.hasDropdown && toggleMobileDropdown(item.name)}
                  aria-expanded={mobileActiveDropdown === item.name}
                >
                  <div className="flex items-center space-x-4">
                    {/* <span className="text-2xl">{item.icon}</span> */}
                    <span className="text-lg">{item.name}</span>
                  </div>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-6 h-6 transition-all duration-500 ${mobileActiveDropdown === item.name
                      ? 'rotate-180 text-emerald-400'
                      : 'group-hover:text-emerald-300'
                      }`} />
                  )}
                </button>

                {/* Mobile Dropdown Items */}
                {item.hasDropdown && mobileActiveDropdown === item.name && (
                  <div className="mt-4 ml-8 space-y-3 animate-in slide-in-from-top-2 duration-500">
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <a
                        key={dropdownItem}
                        href="#"
                        className="group flex items-center py-4 px-5 text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300 transform hover:translate-x-3 hover:shadow-md hover:shadow-emerald-500/20"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                        onClick={(e) => {
                          e.preventDefault()
                          console.log(`Mobile clicked: ${dropdownItem}`)
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 mr-4 opacity-70 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
                        <span className="font-semibold">{dropdownItem}</span>
                        <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 text-emerald-400" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            

            {/* Mobile Contact Info */}
            <div className="pt-6 border-t border-slate-700/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-5 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20">
                  <Phone className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
                  <p className="text-sm font-bold text-emerald-300">Call</p>
                  <p className="text-xs text-slate-400 mt-1">+91-7554923296</p>
                </div>
                <div className="text-center p-5 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 rounded-2xl border border-violet-500/20">
                  <Mail className="w-8 h-8 mx-auto mb-3 text-violet-400" />
                  <p className="text-sm font-bold text-violet-300">Email</p>
                  <p className="text-xs text-slate-400 mt-1">info@payzonindia.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}