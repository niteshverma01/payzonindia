"use client"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import Stats from "@/components/stats"
import Portfolio from "@/components/portfolio"
import ProfessionalStaff from "@/components/professional-staff"
import Team from "@/components/team"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import ServicesSection from "@/components/service"
import AwardsAchievements from "@/components/collaboration"
import NewComponent from "@/components/newcomponent"
import MarqueeDemo from "@/components/marquee"
import MarketingSection from "@/components/marketing"
import BusinessShowcase from "@/components/orbite"
import PayZoneFAQ from "@/components/faq"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
      <About />
      <ProfessionalStaff />

      <BusinessShowcase />

      <NewComponent />
      
      <MarketingSection />
      
      <AwardsAchievements />
      <MarqueeDemo />
      {/* <Services /> */}
      <PayZoneFAQ />
      {/* <Stats /> */}
      {/* <Portfolio /> */}
      {/* <Team /> */}
      {/* <Testimonials /> */}
      <ScrollToTop />
    </main>
  )
}
