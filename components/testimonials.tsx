import { Quote } from "lucide-react"

export default function Testimonials() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-blue-600 font-semibold mb-2 flex items-center justify-center">
            <span className="w-8 h-0.5 bg-blue-600 mr-3"></span>
            Our Client's Testimonials
            <span className="w-8 h-0.5 bg-blue-600 ml-3"></span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-start space-x-6">
              <Quote className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "The support service is always run at the highest possible standard. All issues are resolved with a
                  lot of care. All phone calls and emails are answered very professionally."
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src="/avatar-1.png"
                    alt="Rachna Sheth"
                    className="w-15 h-15 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">Rachna Sheth</h4>
                    <p className="text-blue-600 text-sm">(President, Principal)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
