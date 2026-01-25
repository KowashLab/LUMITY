import { motion } from "motion/react";
import { Database, Users, Clock, Headphones, Zap, Shield } from "lucide-react";

export function TrustedBy() {
  // Brand logos with names
  const brands = [
    {
      name: "Adobe",
      logo: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#F8F8F8]">
          <path d="M20 0L12 32h4l2-6h8l-1.5-4h-5l4-18h4L20 0zM8 0L0 32h4L8 0zM24 6v26h4V6h-4z"/>
        </svg>
      ),
    },
    {
      name: "Spotify",
      logo: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#F8F8F8]">
          <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 20c3-2 9-2 12 0M9 16c4-2 11-2 14 0M8 12c5-3 13-3 16 0" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
    },
    {
      name: "Netflix",
      logo: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#F8F8F8]">
          <path d="M6 4h4v24H6V4zM14 4l6 16V4h4v24h-4l-6-16v16h-4V4h4z"/>
        </svg>
      ),
    },
    {
      name: "Nike",
      logo: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#F8F8F8]">
          <path d="M2 20L24 10l-3 10L2 20z"/>
        </svg>
      ),
    },
    {
      name: "Airbnb",
      logo: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#F8F8F8]">
          <path d="M16 8c-2 0-4 2-4 4 0 3 4 8 4 8s4-5 4-8c0-2-2-4-4-4zm0 6c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
        </svg>
      ),
    },
    {
      name: "Tesla",
      logo: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#F8F8F8]">
          <path d="M16 8L8 12v8l8 4 8-4v-8L16 8zM16 10l6 3v6l-6 3-6-3v-6l6-3z"/>
        </svg>
      ),
    },
    {
      name: "Apple",
      logo: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#F8F8F8]">
          <path d="M18 6c-1 2-3 3-5 3-1-2 0-4 1-5 1-1 4-2 5-1-1 1-1 2-1 3zm-2 3c3 0 5 2 5 5 0 4-3 9-6 9-1 0-2-1-3-1s-2 1-3 1c-3 0-6-5-6-9 0-3 2-5 5-5 1 0 2 1 4 1s3-1 4-1z"/>
        </svg>
      ),
    },
    {
      name: "Google",
      logo: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#F8F8F8]">
          <path d="M16 8c4 0 7 3 7 7 0 5-4 9-9 9-5 0-9-4-9-9s4-9 9-9c2 0 4 1 5 2l-2 2c-1-1-2-1-3-1-3 0-6 3-6 6s3 6 6 6c2 0 4-1 5-3h-5v-3h8c0 1 0 2 0 3 0 5-3 8-8 8-6 0-10-5-10-10s4-10 10-10z"/>
        </svg>
      ),
    },
  ];

  // Double for seamless loop
  const doubledBrands = [...brands, ...brands];

  const features = [
    { 
      icon: Database,
      stat: "2M+",
      label: "Images Stored",
      gradient: "linear-gradient(135deg, #6A0DAD, #9333EA)",
    },
    { 
      icon: Users,
      stat: "150K+",
      label: "Active Users",
      gradient: "linear-gradient(135deg, #FF4B2B, #FF6B4A)",
    },
    { 
      icon: Clock,
      stat: "99.9%",
      label: "Uptime SLA",
      gradient: "linear-gradient(135deg, #00F0FF, #0080FF)",
    },
    { 
      icon: Headphones,
      stat: "24/7",
      label: "Support",
      gradient: "linear-gradient(135deg, #9333EA, #6A0DAD)",
    },
    { 
      icon: Zap,
      stat: "<1s",
      label: "Upload Speed",
      gradient: "linear-gradient(135deg, #FF4B2B, #FF0080)",
    },
    { 
      icon: Shield,
      stat: "256-bit",
      label: "Encryption",
      gradient: "linear-gradient(135deg, #00F0FF, #6A0DAD)",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-8 overflow-hidden" style={{ background: "#0A0A0A" }}>
      <div className="max-w-[1600px] mx-auto">
        {/* Trusted By - Infinite Scroll with Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-wider mb-8 font-bold text-center" style={{ color: "#C5C5C5" }}>
            Trusted by Creative Teams Worldwide
          </p>
          
          {/* Infinite scrolling container */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, #0A0A0A 0%, transparent 100%)",
              }}
            />
            <div 
              className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(270deg, #0A0A0A 0%, transparent 100%)",
              }}
            />

            <motion.div
              className="flex gap-16 items-center"
              animate={{
                x: [0, -160 * brands.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                },
              }}
            >
              {doubledBrands.map((brand, index) => (
                <div key={index} className="flex-shrink-0 flex items-center gap-3 transition-all duration-300 hover:scale-110 opacity-40 hover:opacity-100 cursor-pointer group">
                  {brand.logo}
                  <span className="text-lg font-black whitespace-nowrap" style={{ color: "#F8F8F8" }}>
                    {brand.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid - Unified Style with Gradient Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative backdrop-blur-xl rounded-xl p-4 border transition-all duration-300 text-center"
              style={{
                background: "rgba(28, 28, 28, 0.4)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Animated background on hover */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `${feature.gradient}`,
                  opacity: 0.05,
                }}
              />

              {/* Gradient glow on hover */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"
                style={{
                  background: feature.gradient,
                }}
              />
              
              <div className="relative">
                {/* Gradient stat number */}
                <div 
                  className="text-3xl md:text-4xl font-black mb-1"
                  style={{
                    background: feature.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {feature.stat}
                </div>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#999" }}>
                  {feature.label}
                </p>
              </div>

              {/* Bottom accent line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: feature.gradient,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}