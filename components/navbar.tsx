"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Menu, X, Phone, Mail } from "lucide-react"
import Link from "next/link"

interface NavigationItem {
  name: string
  href: string
  hasDropdown: boolean
  dropdownItems: string[]
}

const navigationItems: NavigationItem[] = [
  // {
  //   name: "Home",
  //   href: "#",
  //   hasDropdown: true,
  //   dropdownItems: [],
  // },
  {
    name: "Profile",
    href: "#",
    hasDropdown: true,
    dropdownItems: [],
  },
  {
    name: "Ventures",
    href: "#",
    hasDropdown: true,
    dropdownItems: [],
  },
  {
    name: "Associations ",
    href: "#",
    hasDropdown: true,
    dropdownItems: [],
  },
  {
    name: "Portfolio",
    href: "#",
    hasDropdown: true,
    dropdownItems: [],
  },
  {
    name: "Management",
    href: "#",
    hasDropdown: true,
    dropdownItems: [],
  },
  {
    name: "Audit report",
    href: "#",
    hasDropdown: true,
    dropdownItems: [],
  },
  {
    name: "Investor Program",
    href: "#",
    hasDropdown: true,
    dropdownItems: [],
  },
]

// Button Component with TypeScript types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost"
  size?: "default" | "icon"
}

const Button: React.FC<ButtonProps> = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)

  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when window is resized to desktop
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

  // Close dropdowns when clicking outside
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
    }, 150)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setMobileActiveDropdown(null)
  }

  const toggleMobileDropdown = (itemName: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === itemName ? null : itemName)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-xl py-2 border-b border-gray-100"
        : "bg-transparent py-3 sm:py-4"
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex-shrink-0 flex items-center">
              <div className={`transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                <img src="/images/logo.png" alt="" className="h-16 w-16 sm:h-20 sm:w-20" />
              </div>
              <div className="ml-3 ">
                <h1 className={`font-bold text-lg sm:text-xl ${isScrolled ? 'text-gray-900' : 'text-white'} transition-colors`}>
                  Payzonindia
                </h1>
                <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-gray-300'} transition-colors`}>
                  Pvt. Ltd.              </p>
              </div>
            </div></Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className={`flex items-center space-x-1 px-6 py-3 rounded-full transition-all duration-300 ${isScrolled
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
              }`}>
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className={`text-white whitespace-nowrap hover:text-blue-200 px-3 xl:px-2 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 text-sm xl:text-base font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 ${activeDropdown === item.name ? 'bg-white/10' : ''
                      }`}
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup={item.hasDropdown}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                    )}
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-0 overflow-hidden transform transition-all duration-200 opacity-100 scale-100"
                      style={{ transformOrigin: "top center" }}
                      role="menu"
                      onMouseEnter={() => handleDropdownEnter(item.name)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="p-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <a
                            key={dropdownItem}
                            href="#"
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-150 rounded-lg text-sm font-medium"
                            role="menuitem"
                            onClick={(e) => {
                              e.preventDefault()
                              console.log(`Clicked on ${dropdownItem}`)
                            }}
                          >
                            {dropdownItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              className={`!rounded-full transition-all duration-300 hover:scale-105 px-6 py-7 font-semibold ${isScrolled
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-blue-600 hover:bg-gray-100"
                }`}
            >
              Get Started
            </Button>
          </div>


          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`${isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"} focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors`}
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
          ? "max-h-screen opacity-100 visible"
          : "max-h-0 opacity-0 invisible"
          } bg-white shadow-2xl border-t border-gray-100 overflow-hidden`}
      >
        <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
         

          {/* Mobile Navigation Items */}
          {navigationItems.map((item) => (
            <div key={item.name} className="border-b border-gray-50 pb-2">
              <button
                className="w-full flex justify-between items-center text-gray-800 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-left"
                onClick={() => item.hasDropdown && toggleMobileDropdown(item.name)}
                aria-expanded={mobileActiveDropdown === item.name}
              >
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileActiveDropdown === item.name ? 'rotate-180 text-blue-600' : ''
                    }`} />
                )}
              </button>

              {/* Mobile Dropdown Items */}
              {item.hasDropdown && mobileActiveDropdown === item.name && (
                <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {item.dropdownItems.map((dropdownItem) => (
                    <a
                      key={dropdownItem}
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                      onClick={(e) => {
                        e.preventDefault()
                        console.log(`Mobile clicked: ${dropdownItem}`)
                      }}
                    >
                      {dropdownItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile CTA Button */}
          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold text-base shadow-lg transition-all duration-200">
              Get Started
            </Button>
          </div>

          {/* Mobile Social Links */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Follow us:</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">Facebook</span>
                FB
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">Twitter</span>
                TW
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                LI
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}