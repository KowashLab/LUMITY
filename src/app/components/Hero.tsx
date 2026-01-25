import { motion, useMotionValue, useTransform, useScroll } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { ImageWithFallback } from "@/app/components/ui/ImageWithFallback";
import { Zap, ArrowRight, Sparkles, Shield, Layers, Gauge, Upload, Search, Lock, Image as ImageIcon } from "lucide-react";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const offsetX = useTransform(mouseX, [-500, 500], [-15, 15]);
  const offsetY = useTransform(mouseY, [-500, 500], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePosition({ x: clientX - centerX, y: clientY - centerY });
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Sample images for dashboard mockup
  const dashboardImages = [
    {
      url: "https://images.unsplash.com/photo-1600257729950-13a634d32697?w=800&h=600&fit=crop",
      title: "Mountain Vista",
      size: "2.4 MB",
      date: "2 hours ago",
      tags: ["Nature", "Landscape"],
    },
    {
      url: "https://images.unsplash.com/photo-1642287040066-2bd340523289?w=800&h=600&fit=crop",
      title: "City Lights",
      size: "3.1 MB",
      date: "5 hours ago",
      tags: ["Urban", "Architecture"],
    },
    {
      url: "https://images.unsplash.com/photo-1598399929533-847def01aa41?w=800&h=600&fit=crop",
      title: "Ocean Sunset",
      size: "1.8 MB",
      date: "1 day ago",
      tags: ["Beach", "Sunset"],
    },
    {
      url: "https://images.unsplash.com/photo-1709408635158-8d735f0395c4?w=800&h=600&fit=crop",
      title: "Nebula Space",
      size: "4.2 MB",
      date: "2 days ago",
      tags: ["Space", "Galaxy"],
    },
  ];

  const features = [
    { icon: Upload, text: "Instant Upload", color: "#6A0DAD" },
    { icon: Layers, text: "Smart Organization", color: "#FF4B2B" },
    { icon: Search, text: "Powerful Search", color: "#00F0FF" },
    { icon: Lock, text: "Bank-Grade Security", color: "#9333EA" },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, rgba(106, 13, 173, 0.8) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, rgba(255, 75, 43, 0.8) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left pt-8 lg:pt-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
              style={{
                background: "rgba(106, 13, 173, 0.1)",
                border: "1px solid rgba(106, 13, 173, 0.3)",
              }}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#00F0FF" }}
              />
              <span className="text-sm font-bold" style={{ color: "#E0E0E0" }}>
                Next-Generation Image Storage
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight mb-5 leading-[1.15]"
              style={{ color: "#F8F8F8" }}
            >
              Store & Organize{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your Images
              </span>
              {" "}Like a Pro
            </motion.h1>

            {/* Description - Extended */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              style={{ color: "#C5C5C5" }}
            >
              Professional-grade image storage that's{" "}
              <span className="font-bold" style={{ color: "#00F0FF" }}>blazingly fast</span>,{" "}
              <span className="font-bold" style={{ color: "#FF4B2B" }}>ultra-secure</span>, and{" "}
              <span className="font-bold" style={{ color: "#9333EA" }}>beautifully organized</span>. 
              No AI algorithms. No complexity. Just pure, powerful storage that works exactly how you need it. 
              Built for photographers, designers, and creative teams who demand the best.
            </motion.p>

            {/* CTA Buttons - 2x3 Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10 max-w-3xl mx-auto lg:mx-0"
            >
              {/* 4 Feature buttons */}
              {features.map((feature, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="group px-5 py-3.5 rounded-xl font-bold text-sm backdrop-blur-xl border transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "#F8F8F8",
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <feature.icon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{feature.text}</span>
                  </span>
                </motion.button>
              ))}

              {/* 2 CTA buttons (colored) */}
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="group relative px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg overflow-hidden transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                  border: "none",
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #FF4B2B 0%, #6A0DAD 100%)",
                  }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2 text-white" style={{ textDecoration: "none" }}>
                  <Zap className="w-4 h-4" />
                  Start Free Trial
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="group relative px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg overflow-hidden transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #00F0FF 0%, #6A0DAD 100%)",
                  border: "none",
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #6A0DAD 0%, #00F0FF 100%)",
                  }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2 text-white" style={{ textDecoration: "none" }}>
                  <Gauge className="w-4 h-4" />
                  Pricing
                </span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {[
                { value: "2M+", label: "Images" },
                { value: "150K+", label: "Users" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div 
                    className="text-3xl font-black"
                    style={{
                      background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium" style={{ color: "#C5C5C5" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual - Modern Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <motion.div
              style={{ x: offsetX, y: offsetY }}
              className="relative"
            >
              {/* Dashboard Container with glassmorphism */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative backdrop-blur-2xl rounded-3xl overflow-hidden border shadow-2xl"
                style={{
                  background: "rgba(28, 28, 28, 0.8)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Ambient glow */}
                <div 
                  className="absolute -inset-20 opacity-30 blur-3xl"
                  style={{
                    background: "linear-gradient(135deg, #6A0DAD, #FF4B2B, #00F0FF)",
                  }}
                />

                {/* Header bar */}
                <div className="relative p-4 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: "#FF4B2B" }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: "#FFB82B" }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: "#00F0FF" }}
                      />
                    </div>
                    <div 
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(0, 240, 255, 0.1)",
                        color: "#00F0FF",
                      }}
                    >
                      4 Collections
                    </div>
                  </div>
                </div>

                {/* Content grid */}
                <div className="relative p-4 space-y-3">
                  {dashboardImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + idx * 0.15 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      className="flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm group cursor-pointer"
                      style={{
                        background: "rgba(10, 10, 10, 0.5)",
                        borderColor: "rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: "linear-gradient(135deg, rgba(106, 13, 173, 0.3), rgba(255, 75, 43, 0.3))",
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold truncate" style={{ color: "#F8F8F8" }}>
                            {img.title}
                          </span>
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: idx * 0.3,
                            }}
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              background: idx === 0 ? "#00F0FF" : "rgba(255, 255, 255, 0.3)",
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 text-xs" style={{ color: "#999" }}>
                          <span>{img.size}</span>
                          <span>•</span>
                          <span>{img.date}</span>
                        </div>
                        <div className="flex gap-1 mt-1.5">
                          {img.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="text-xs px-2 py-0.5 rounded"
                              style={{
                                background: tagIdx === 0 
                                  ? "linear-gradient(135deg, rgba(106, 13, 173, 0.2), rgba(255, 75, 43, 0.2))"
                                  : "rgba(255, 255, 255, 0.05)",
                                color: tagIdx === 0 ? "#FF4B2B" : "#C5C5C5",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Status icon */}
                      <div className="flex-shrink-0">
                        <motion.div
                          whileHover={{ rotate: 90 }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background: idx === 0 
                              ? "linear-gradient(135deg, #6A0DAD, #FF4B2B)" 
                              : "rgba(255, 255, 255, 0.05)",
                          }}
                        >
                          <ArrowRight 
                            className="w-4 h-4" 
                            style={{ 
                              color: idx === 0 ? "#FFFFFF" : "#666" 
                            }} 
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom action bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="relative p-4 border-t"
                  style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
                        }}
                      >
                        <Upload className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold" style={{ color: "#F8F8F8" }}>
                          Quick Upload
                        </div>
                        <div className="text-xs" style={{ color: "#666" }}>
                          Drag & drop anywhere
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold"
                      style={{
                        background: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(106, 13, 173, 0.2))",
                        color: "#00F0FF",
                        border: "1px solid rgba(0, 240, 255, 0.3)",
                      }}
                    >
                      256-bit Encrypted
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating stats badges */}
              {[
                { label: "2.4s", sublabel: "Avg Upload", top: "-8%", right: "10%", color: "#00F0FF", delay: 1.7 },
                { label: "99.9%", sublabel: "Uptime", top: "50%", right: "-10%", color: "#FF4B2B", delay: 1.9 },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  style={{
                    position: "absolute",
                    top: stat.top,
                    bottom: stat.bottom,
                    left: stat.left,
                    right: stat.right,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: idx * 0.7,
                    }}
                    className="backdrop-blur-xl rounded-2xl p-3 border shadow-xl"
                    style={{
                      background: "rgba(10, 10, 10, 0.9)",
                      borderColor: `${stat.color}40`,
                    }}
                  >
                    <div 
                      className="text-2xl font-black mb-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stat.label}
                    </div>
                    <div className="text-xs font-bold" style={{ color: "#999" }}>
                      {stat.sublabel}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}