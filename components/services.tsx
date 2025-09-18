import { Shield, Phone, Users, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Shield,
    title: "Backup & Recovery",
    description: "Comprehensive data backup and recovery solutions to protect your business.",
    image: "/backup-and-recovery-technology.jpg",
  },
  {
    icon: Phone,
    title: "VoIP Solutions",
    description: "Advanced voice over IP communication systems for modern businesses.",
    image: "/voip-communication-technology.jpg",
  },
  {
    icon: Users,
    title: "Consulting Planning",
    description: "Strategic IT consulting and planning services for business growth.",
    image: "/business-consulting-meeting.png",
  },
  {
    icon: BarChart3,
    title: "IT Consultancy",
    description: "Expert IT consultancy services to optimize your technology infrastructure.",
    image: "/it-consultancy-professionals.jpg",
  },
]

export default function Services() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-blue-600 font-semibold mb-2 flex items-center justify-center">
            <span className="w-6 sm:w-8 h-0.5 bg-blue-600 mr-3"></span>
            Our Services
            <span className="w-6 sm:w-8 h-0.5 bg-blue-600 ml-3"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            We provide the necessary
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>services to you
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Service Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white drop-shadow-lg">{service.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
            View Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
