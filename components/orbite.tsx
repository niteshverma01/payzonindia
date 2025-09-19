"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Code, Shield, TrendingUp, ExternalLink, Sparkles } from 'lucide-react';

interface SkillData {
    title: string;
    percentage: number;
    icon: React.ReactNode;
    color: string;
    image?: string;
}

interface PartnerData {
    name: string;
    description: string;
    url: string;
    gradient: string;
    logo?: string; // ✅ added logo field
}

const FloatingParticles: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
            <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                }}
            />
        ))}
    </div>
);

const ProgressBar: React.FC<{ skill: SkillData; index: number }> = ({ skill, index }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setWidth(skill.percentage), 500 + index * 200);
        return () => clearTimeout(timer);
    }, [skill.percentage, index]);

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">

                    <div className={`p-1.5 rounded-lg bg-gradient-to-r ${skill.color}`}>
                        {skill.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">{skill.title}</h3>
                </div>
                <span className="text-lg font-semibold text-white/90">{skill.percentage}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1500 ease-out`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
};

const PartnerCard: React.FC<{ partner: PartnerData; index: number }> = ({ partner, index }) => (
    <div
        className={`relative p-6 bg-gradient-to-br ${partner.gradient} rounded-2xl group hover:scale-102 transition-all duration-300`}
        style={{ animationDelay: `${index * 0.2}s` }}
    >
        <div className="relative z-10 space-y-4">
            {/* ✅ Logo */}
           <div className='flex items-center gap-2'> {partner.logo && (
                <img src={partner.logo} alt={partner.name} className="w-auto h-24 object-contain" />
            )}

            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-yellow-100 transition-colors">
                {partner.name}
            </h3></div>
            <p className="text-sm sm:text-base text-white/90">{partner.description}</p>
            <a
                href={partner.url}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-all"
            >
                Visit {partner.name}
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    </div>
);

const BusinessShowcase: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const skillsData: SkillData[] = [
        {
            title: "Web Development & Support",
            percentage: 97,
            icon: <Code className="w-5 h-5" />,
            color: "from-blue-500 to-purple-600",
            image: "/images/webdev.png", // ✅ your skill logo
        },
        {
            title: "Sales & Revenue Reinforce",
            percentage: 96,
            icon: <TrendingUp className="w-5 h-5" />,
            color: "from-emerald-500 to-teal-600",
            image: "/images/sales.png",
        },
        {
            title: "Cyber Affairs & Data Security",
            percentage: 95,
            icon: <Shield className="w-5 h-5" />,
            color: "from-red-500 to-pink-600",
            image: "/images/security.png",
        },
    ];

    const partnersData: PartnerData[] = [
        {
            name: "Smart Tax Idea",
            description: "Smart tax idea is a legal corporate company and one stop for the corporates with regards to rendering Legal and Secretarial Services.",
            url: "https://smarttaxidea.com/",
            gradient: "from-violet-600 to-indigo-600",
            logo: "/images/SMART TAX !DEA.png", // ✅ partner logo
        },
        {
            name: "Ineffable Spark",
            description: "Accelerate your banking career with our comprehensive training program, earning NISM and IRDA certifications.",
            url: "https://ineffablespark.com/",
            gradient: "from-orange-500 to-pink-600",
            logo: "/images/inffablesparklogo (1).png",
        },
    ];

    useEffect(() => {
        setIsVisible(true);
        const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="bg-gradient-to-br from-slate-900 to-purple-900 relative">
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>

            <FloatingParticles />
            <div
                className="fixed w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl pointer-events-none transition-all duration-300 z-0"
                style={{ left: mousePosition.x - 96, top: mousePosition.y - 96 }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-20 flex flex-col h-full">
                {/* Skills Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Side */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4 text-white">Our Skills and Expertise</h1>
                        <span className="text-gray-300">
                            Our team specializes in cutting-edge web development and software
                            solutions, delivering scalable and innovative applications tailored to
                            business needs.
                        </span>
                    </div>

                    {/* Right Side */}
                    <div
                        className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-all duration-700 delay-200"
                    >
                        {skillsData.map((skill, index) => (
                            <div
                                key={index}
                                className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 "
                                style={{ animationDelay: `${index * 0.3}s` }}
                            >
                                <ProgressBar skill={skill} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partners Section */}
                <div className={`mt-8 sm:mt-12 transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 sm:mb-6">
                        Our Corporate
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Ally For Business Growth</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        {partnersData.map((partner, index) => (
                            <PartnerCard key={index} partner={partner} index={index} />
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default BusinessShowcase;
