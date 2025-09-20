import React from 'react';
import { Phone, MapPin, Mail, Facebook, Twitter, Globe, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <div className="w-full bg-gray-900">


      {/* Main navbar section */}
      <div className="py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Exact white oval with blue border */}
          <div className="relative">
            <div className="bg-white rounded-full w-32 h-20 flex items-center justify-center shadow-2xl border-4 border-blue-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Itfirm
                  <span className="inline-block ml-1">
                    <svg width="20" height="12" viewBox="0 0 20 12" className="inline-block">
                      <circle cx="2" cy="2" r="1.5" fill="#3B82F6" />
                      <circle cx="6" cy="2" r="1.5" fill="#3B82F6" />
                      <circle cx="10" cy="2" r="1.5" fill="#3B82F6" />
                      <circle cx="14" cy="2" r="1.5" fill="#3B82F6" />
                      <circle cx="18" cy="2" r="1.5" fill="#3B82F6" />
                      <circle cx="2" cy="6" r="1.5" fill="#3B82F6" />
                      <circle cx="6" cy="6" r="1.5" fill="#3B82F6" />
                      <circle cx="10" cy="6" r="1.5" fill="#3B82F6" />
                      <circle cx="14" cy="6" r="1.5" fill="#D1D5DB" />
                      <circle cx="18" cy="6" r="1.5" fill="#D1D5DB" />
                      <circle cx="2" cy="10" r="1.5" fill="#D1D5DB" />
                      <circle cx="6" cy="10" r="1.5" fill="#D1D5DB" />
                      <circle cx="10" cy="10" r="1.5" fill="#D1D5DB" />
                      <circle cx="14" cy="10" r="1.5" fill="#D1D5DB" />
                      <circle cx="18" cy="10" r="1.5" fill="#D1D5DB" />
                    </svg>
                  </span>
                </div>
                <div className="text-xs text-gray-600 -mt-1">IT Solutions & Service</div>
              </div>
            </div>
          </div>

          {/* Navigation - Exact blue rounded pill */}
          <nav >
            <div className="border-b border-gray-700 border-opacity-30">
              <div className="max-w-7xl mx-auto px-6 py-2.5">
                <div className="flex justify-between items-center text-white text-sm">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <Phone size={13} className="text-white" />
                      <span>(678) 345-3456</span>
                    </div>
                    <div className="h-4 w-px bg-gray-600"></div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={13} className="text-white" />
                      <span>380 Albert St, Melbourne, Australia</span>
                    </div>
                    <div className="h-4 w-px bg-gray-600"></div>
                    <div className="flex items-center space-x-2">
                      <Mail size={13} className="text-white" />
                      <span>envato@mail.com</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Facebook size={14} className="hover:text-blue-400 cursor-pointer text-white" />
                    <Twitter size={14} className="hover:text-blue-400 cursor-pointer text-white" />
                    <Globe size={14} className="hover:text-blue-400 cursor-pointer text-white" />
                    <Search size={14} className="hover:text-blue-400 cursor-pointer text-white" />
                    <span className="text-blue-400 font-bold text-sm">Be</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 rounded-full shadow-xl" style={{ backgroundColor: '#2563EB' }}>
              <ul className="flex items-center px-8 py-3 text-white">
                <li className="flex items-center cursor-pointer hover:text-blue-200 transition-colors px-4">
                  <span className="font-medium text-base">Home</span>
                  <span className="ml-1 text-base">+</span>
                </li>
                <li className="flex items-center cursor-pointer hover:text-blue-200 transition-colors px-4">
                  <span className="font-medium text-base">Pages</span>
                  <span className="ml-1 text-base">+</span>
                </li>
                <li className="flex items-center cursor-pointer hover:text-blue-200 transition-colors px-4">
                  <span className="font-medium text-base">Services</span>
                  <span className="ml-1 text-base">+</span>
                </li>
                <li className="flex items-center cursor-pointer hover:text-blue-200 transition-colors px-4">
                  <span className="font-medium text-base">Portfolio</span>
                  <span className="ml-1 text-base">+</span>
                </li>
                <li className="flex items-center cursor-pointer hover:text-blue-200 transition-colors px-4">
                  <span className="font-medium text-base">Blog</span>
                  <span className="ml-1 text-base">+</span>
                </li>
                <li className="flex items-center cursor-pointer hover:text-blue-200 transition-colors px-4">
                  <span className="font-medium text-base">Elements</span>
                  <span className="ml-1 text-base">+</span>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;