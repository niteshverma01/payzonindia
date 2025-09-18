"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const categories = ["All", "Cloud Services", "Cyber Security", "IT Security", "Networking"]

const portfolioItems = [
  {
    title: "Product Engineering",
    category: "Cloud Services",
    image: "/product-engineering-team.jpg",
  },
  {
    title: "Firewall Advance",
    category: "IT Security",
    image: "/firewall-security-technology.jpg",
  },
  {
    title: "Data Management",
    category: "IT Security",
    image: "/data-management-professionals.jpg",
  },
  {
    title: "Big Data & Analytics",
    category: "Cloud Services",
    image: "/big-data-analytics.png",
  },
  {
    title: "Research & Energy",
    category: "Networking",
    image: "/research-and-energy-technology.jpg",
  },
  {
    title: "Security Management",
    category: "Cyber Security",
    image: "/security-management-team.jpg",
  },
  {
    title: "Internal Networking",
    category: "Networking",
    image: "/internal-networking-infrastructure.jpg",
  },
  {
    title: "Property Simplified",
    category: "Networking",
    image: "/property-management-technology.jpg",
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems =
    activeCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-blue-600 font-semibold mb-2 flex items-center justify-center">
            <span className="w-8 h-0.5 bg-blue-600 mr-3"></span>
            Work Index!
            <span className="w-8 h-0.5 bg-blue-600 ml-3"></span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Few of Our Apps Adored
            <br />
            by <span className="text-blue-600">millions of users!</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We shows only the best websites and portfolios built completely with passion, simplicity & creativity.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg font-bold mb-1 text-white drop-shadow-lg">{item.title}</h3>
                  <p className="text-sm text-blue-300 drop-shadow-lg">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">Load more</Button>
        </div>
      </div>
    </section>
  )
}
