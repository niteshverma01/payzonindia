"use client"
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { motion } from "framer-motion";

const reviews = [
  { img: "/images/1.png" },
  { img: "/images/2.png" },
  { img: "/images/4.png" },
  { img: "/images/5.png" },
  { img: "/images/6.png" },
  { img: "/images/9.png" },
  { img: "/images/SMART TAX !DEA.png" },
  { img: "/images/jkk.png" },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <motion.figure
      className={cn(
        "relative flex h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-52 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border transition-all duration-500",
        // Enhanced Base styles with premium glassmorphism
        "border-white/20 bg-gradient-to-br from-white/15 via-white/8 to-white/5 backdrop-blur-2xl",
        // Enhanced Dark mode
        "dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-white/2",
        // Ultra Premium Hover effects with multiple shadows
        "hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:shadow-blue-500/20",
        "hover:border-white/30 hover:bg-gradient-to-br hover:from-white/20 hover:via-white/10 hover:to-white/8",
        // Enhanced multi-layer Glow effect
        "relative before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-r before:from-blue-500/30 before:via-purple-500/30 before:to-pink-500/30 before:opacity-0 before:transition-all before:duration-500 hover:before:opacity-100 before:blur-md",
        // Inner glow layer
        "after:absolute after:inset-[1px] after:-z-5 after:rounded-2xl after:bg-gradient-to-br after:from-blue-400/10 after:via-purple-400/10 after:to-pink-400/10 after:opacity-0 after:transition-all after:duration-500 hover:after:opacity-100",
        // Transform preparation for 3D effects
        "transform-gpu"
      )}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.12, 
        rotate: 3,
        rotateY: 8,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Enhanced image with premium filters */}
      <motion.img
        className="h-full w-full object-contain transition-all duration-700 filter hover:brightness-110 hover:contrast-105"
        alt="review"
        src={img}
        whileHover={{ 
          scale: 1.15,
          filter: "brightness(1.1) contrast(1.05) saturate(1.1)"
        }}
      />
      
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5 opacity-50 hover:opacity-20 transition-opacity duration-500" />
      
      {/* Animated shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 -translate-x-full hover:translate-x-full transition-all duration-1000"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
      />
      
      {/* Corner accent dots */}
      <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-blue-400/60 opacity-0 hover:opacity-100 transition-all duration-500 animate-pulse" />
      <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-pink-400/60 opacity-0 hover:opacity-100 transition-all duration-700 animate-pulse" />
    </motion.figure>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Ultra Enhanced Animated Background */}
      <div className="absolute inset-0 -z-20">
        {/* Multi-layered Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-purple-950/50 opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 opacity-80 animate-gradient-bg" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-rose-900/20 opacity-70" />
        
        {/* Enhanced Radial Glow Effect with multiple layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-purple-500/12 to-transparent opacity-80 blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-500/15 via-purple-500/10 to-transparent opacity-70 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/12 via-purple-500/8 to-transparent opacity-60 blur-2xl" />
        
        {/* Premium Noise Texture */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-8 mix-blend-overlay" />
<div className="absolute inset-0 bg-[url(data:image/svg+xml,%3Csvg%20viewBox='0%200%20256%20256'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noiseFilter'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='4'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noiseFilter)'%20opacity='0.03'/%3E%3C/svg%3E)] opacity-20 mix-blend-soft-light" />
        
        {/* Enhanced Animated Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Original particles enhanced */}
          <div className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-blue-400/60 to-blue-300/40 animate-particle-float shadow-lg shadow-blue-400/50" style={{ top: '20%', left: '30%' }} />
          <div className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-purple-400/60 to-purple-300/40 animate-particle-float-delayed shadow-lg shadow-purple-400/50" style={{ top: '50%', left: '60%' }} />
          <div className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-pink-400/60 to-pink-300/40 animate-particle-float shadow-lg shadow-pink-400/50" style={{ top: '70%', left: '10%' }} />
          
          {/* Additional floating elements */}
          <div className="absolute h-2 w-2 rounded-full bg-blue-400/30 animate-float-slow blur-sm" style={{ top: '15%', left: '80%' }} />
          <div className="absolute h-1.5 w-1.5 rounded-full bg-purple-400/40 animate-float-medium blur-sm" style={{ top: '60%', left: '20%' }} />
          <div className="absolute h-2 w-2 rounded-full bg-pink-400/25 animate-float-fast blur-sm" style={{ top: '80%', left: '70%' }} />
          <div className="absolute h-1 w-1 rounded-full bg-indigo-400/50 animate-particle-float" style={{ top: '30%', left: '90%' }} />
          <div className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400/35 animate-float-slow" style={{ top: '85%', left: '25%' }} />
        </div>
        
        {/* Animated gradient meshes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 animate-gradient-x" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/8 to-transparent animate-gradient-y" />
        </div>
      </div>

      {/* Ultra Enhanced Heading */}
      <motion.div className="relative mb-12 text-center">
        {/* Heading background glow */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-pink-600/40 opacity-50 animate-pulse-slow scale-150" />
        
        <motion.h1
          className="relative text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 z-10 drop-shadow-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1],
            type: "spring"
          }}
        >
          Our Trusted Partners
          
          {/* Animated underline */}
          <motion.div 
            className="absolute -bottom-2 left-1/2 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "70%", x: "-50%" }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          />
        </motion.h1>
        
        {/* Subtle subtitle */}
        <motion.p
          className="mt-6 text-gray-400/80 font-medium text-sm tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Excellence in Partnership
        </motion.p>
      </motion.div>

      {/* Enhanced Marquee Container with improved gradients */}
      <div className="relative w-full">
        {/* Enhanced fade gradients */}
        <div className="absolute left-0 top-0 z-20 h-full w-24 sm:w-32 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-20 h-full w-24 sm:w-32 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent pointer-events-none" />

        {/* Enhanced Marquee Rows */}
        <Marquee
          pauseOnHover
          className="[--duration:30s] gap-8 sm:gap-12 perspective-1000 relative z-10"
        >
          {firstRow.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ rotateX: 15, opacity: 0.8, y: 30 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100
              }}
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </Marquee>

        <Marquee
          reverse
          pauseOnHover
          className="[--duration:30s] gap-8 sm:gap-12 mt-8 perspective-1000 relative z-10"
        >
          {secondRow.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ rotateX: -15, opacity: 0.8, y: -30 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100
              }}
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </Marquee>
      </div>

      {/* Enhanced bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-purple-500/20 via-blue-500/10 to-transparent blur-3xl opacity-60 animate-pulse-slower" />
    </div>
  );
}