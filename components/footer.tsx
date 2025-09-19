import { Facebook, Youtube, Linkedin, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img src="/images/logo.png" alt="" className="h-12 w-12 sm:h-20 sm:w-20"/>
              <div>
                <h3 className="font-bold text-lg">PAYZON INDIA PVT LTD</h3>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We have extensive experience providing industry-specific IT solutions. Our team understands the unique
              challenges.
            </p>
            <div className="flex space-x-4">
              <Facebook href="https://www.facebook.com/PAYZONINDIA/" className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <Youtube href="https://www.youtube.com/channel/UCSjsk1O7zYurXPDl2o3RuIA" className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
              <Linkedin href="https://www.linkedin.com/company/payzonindiabhopal/posts/?feedView=all" className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <Instagram href="https://www.instagram.com/thepayzonindia/" className="w-5 h-5 text-gray-400 hover:text-pink-600 cursor-pointer transition-colors" />
            <Twitter href="https://x.com/payzonindia" className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors"/>
            </div>
          </div>

          {/* Online Versatility */}
          <div>
            <h3 className="font-bold text-xl mb-6">Online Versatility</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  payzonindia.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  payzonapi.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  payzonmarketing.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  payzonshoppy.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  payzonitservices.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  sadaivsatya.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  sadaivyuvafoundation.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Collaboration */}
          <div>
            <h3 className="font-bold text-xl mb-6">Business Collaboration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <img src="/images/Sadaiv MEDIA 1.png" alt="Satya" className="w-full h-20 object-contain" />
              </div>
              <div className="">
                <img src="/images/inffablesparklogo (1).png" alt="Dollar" className="w-full h-20 object-contain" />
              </div>
              <div className="">
                <img src="/images/jkk.png" alt="Dun Bradstreet" className="w-full h-20 object-contain" />
              </div>
              <div className="">
                <img src="/images/sadaivsatyalogo.jpeg" alt="Yuva" className="w-full h-20 object-contain" />
              </div>
            </div>
            <div className="mt-4  w-24 bg-white ">
              <img src="/images/SMART TAX !DEA.png" alt="SSI" className="w-full h-24 object-contain" />
            </div>
          </div>

          {/* Our Contacts */}
          <div>
            <h3 className="font-bold text-xl mb-6">Our Contacts</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 mb-1">Address :</p>
                <p className="text-white">B1, Patel Nagar,Raisen road Near HP Petrol Pump, Bhopal (MP)</p>
                <p className="text-white">Pin: 462022</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Email :</p>
                <p className="text-white">info@payzonindia.com</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Contact:</p>
                <p className="text-white">+91 755 485 9540,</p>
                <p className="text-white">+91 755 492 3296</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">Copyright © 2025 PAYZONINDIA PVT LTD | All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Refund Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cancellation Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
