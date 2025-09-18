import { Users, Trophy, Briefcase, Star } from "lucide-react"

const stats = [
  { icon: Users, number: "48+", label: "Team members" },
  { icon: Trophy, number: "7+", label: "Winning awards" },
  { icon: Briefcase, number: "5K+", label: "Completed project" },
  { icon: Star, number: "386+", label: "Client's reviews" },
]

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="flex items-center justify-center mb-4">
                <stat.icon className="w-8 h-8 text-blue-400 mr-3" />
                <span className="text-4xl font-bold">{stat.number}</span>
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
