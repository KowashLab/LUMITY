import { motion } from "motion/react";
import { Sparkles, Twitter, Instagram, Linkedin, Youtube, Send, Globe, Mail, MapPin, Phone, Facebook, Github, Dribbble, Palette } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const languages = ["EN", "SWE", "RU"];

  const footerLinks = {
    "Product": [
      "Features",
      "Pricing",
      "Security",
      "Enterprise",
      "API Access",
    ],
    Company: [
      "About Us",
      "Careers",
      "Press Kit",
      "Contact",
      "Partners",
    ],
    Resources: [
      "Documentation",
      "Blog",
      "Community",
      "Tutorials",
      "Help Center",
    ],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Security",
      "Compliance",
    ],
  };

  const socialLinks = [
    { icon: Twitter, color: "hover:text-[#1DA1F2]", label: "Twitter", url: "#" },
    { icon: Facebook, color: "hover:text-[#1877F2]", label: "Facebook", url: "#" },
    { icon: Instagram, color: "hover:text-[#E4405F]", label: "Instagram", url: "#" },
    { icon: Linkedin, color: "hover:text-[#0A66C2]", label: "LinkedIn", url: "#" },
    { icon: Youtube, color: "hover:text-[#FF0000]", label: "YouTube", url: "#" },
    { icon: Github, color: "hover:text-[#FFFFFF]", label: "GitHub", url: "#" },
    { icon: Dribbble, color: "hover:text-[#EA4C89]", label: "Dribbble", url: "#" },
    { icon: Palette, color: "hover:text-[#1769FF]", label: "Creative", url: "#" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@lumity.io", url: "mailto:hello@lumity.io" },
    { icon: Phone, text: "+1 (555) 123-4567", url: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", url: "#" },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Rich Background with Multiple Orbs */}
      <div className="absolute inset-0 opacity-[0.06]">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(106, 13, 173, 0.6) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.6) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255, 75, 43, 0.5) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 py-20">
        {/* Language Selector at Top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end mb-8"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4" style={{ color: "#C5C5C5" }} />
            <div className="flex gap-2">
              {languages.map((lang) => (
                <motion.button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300`}
                  style={
                    selectedLanguage === lang
                      ? {
                          background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                          color: "#FFFFFF",
                        }
                      : {
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "#E0E0E0",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }
                  }
                >
                  {lang}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Section - Enhanced Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 pb-16" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative group">
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-80 blur-xl transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
                  }}
                />
                <div 
                  className="relative p-3 rounded-xl transition-transform group-hover:scale-110 duration-300"
                  style={{
                    background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="text-4xl tracking-tight font-black" style={{ color: "#F8F8F8" }}>LUMITY</span>
            </div>
            <p className="text-base mb-6 max-w-md leading-relaxed" style={{ color: "#C5C5C5" }}>
              Next-generation image storage platform for creative professionals. Store, organize, and share your visual universe with blazing speed and military-grade security.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="flex items-center gap-3 text-sm group hover:translate-x-1 transition-transform"
                  style={{ color: "#C5C5C5" }}
                >
                  <div 
                    className="p-2 rounded-lg"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <item.icon className="w-4 h-4 group-hover:text-white transition-colors" />
                  </div>
                  <span className="group-hover:text-white transition-colors">{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Column - Redesigned */}
          <div className="backdrop-blur-xl rounded-2xl p-8 border relative overflow-hidden" style={{ background: "rgba(28, 28, 28, 0.4)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
            {/* Gradient overlay */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
              style={{
                background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
              }}
            />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="p-2 rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
                  }}
                >
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h3 
                  className="text-2xl font-black"
                  style={{ color: "#F8F8F8" }}
                >
                  Stay Updated
                </h3>
              </div>
              
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#C5C5C5" }}>
                Join 50,000+ creatives. Get exclusive insights, trends, and early access to features.
              </p>
              
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3.5 pr-14 rounded-xl backdrop-blur-xl border focus:outline-none focus:ring-2 transition-all duration-300 text-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    color: "#F8F8F8",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg shadow-lg group"
                  style={{
                    background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition-opacity"
                    style={{
                      background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                    }}
                  />
                  <Send className="w-4 h-4 text-white relative z-10" />
                </motion.button>
              </div>
              
              <p className="text-xs mt-3" style={{ color: "#999" }}>
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid - Enhanced */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 
                className="text-lg font-black mb-6 relative inline-block"
                style={{ color: "#F8F8F8" }}
              >
                {category}
                <div 
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{
                    background: "linear-gradient(90deg, #6A0DAD, #FF4B2B)",
                  }}
                />
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm block group transition-all duration-200"
                      style={{ color: "#C5C5C5" }}
                    >
                      <span className="relative inline-block hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform">
                        {link}
                        {/* Gradient underline on hover */}
                        <span 
                          className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                          style={{
                            background: "linear-gradient(90deg, #6A0DAD, #FF4B2B)",
                          }}
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links - Enhanced with More */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map(({ icon: Icon, color, label, url }) => (
              <motion.a
                key={label}
                href={url}
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`group w-12 h-12 rounded-xl backdrop-blur-xl border flex items-center justify-center transition-all duration-300 ${color}`}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  color: "#E0E0E0",
                }}
              >
                {/* Gradient glow on hover */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 blur-lg transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                  }}
                />
                <Icon className="w-5 h-5 relative z-10" />
              </motion.a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "#999" }}>
            <span>© 2026 Lumity Inc.</span>
            <span className="hidden md:inline">•</span>
            <span>All rights reserved.</span>
          </div>
        </div>

        {/* Bottom Text - Enhanced */}
        <div className="text-center mt-8">
          <p className="text-sm leading-relaxed" style={{ color: "#C5C5C5" }}>
            Built with <span className="text-red-500">❤</span> for creatives, by creatives. 
            <br className="md:hidden" />
            <span className="mx-2 hidden md:inline">•</span>
            Powered by cutting-edge technology to elevate your visual workflow.
          </p>
        </div>
      </div>
    </footer>
  );
}