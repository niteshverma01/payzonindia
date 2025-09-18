const teamMembers = [
  {
    name: "Ashish Sudra",
    role: "Founder & CEO",
    image: "/professional-business-woman-ceo.jpg",
  },
  {
    name: "Rachna Sheth",
    role: "Business Head",
    image: "/professional-businessman-glasses.png",
  },
  {
    name: "Tapak Meni",
    role: "President, Principal",
    image: "/professional-asian-woman-with-coffee.jpg",
  },
  {
    name: "Ergi Laura",
    role: "Sales & Marketing",
    image: "/professional-woman-glasses.png",
  },
]

export default function Team() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-blue-600 font-semibold mb-2 flex items-center justify-center">
            <span className="w-8 h-0.5 bg-blue-600 mr-3"></span>
            Team Member
            <span className="w-8 h-0.5 bg-blue-600 ml-3"></span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Passionate Personalities, <span className="text-blue-600">Versatile</span> Brains
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    f
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    t
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    in
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
