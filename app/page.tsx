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
import { MarqueeDemo } from "@/components/marquee"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
      <About />
      <ProfessionalStaff />
      <MarqueeDemo />
      <AwardsAchievements />
      <Services />
      <Stats />
      <Portfolio />
      <Team />
       <Testimonials />
      <ScrollToTop />
    </main>
  )
}
