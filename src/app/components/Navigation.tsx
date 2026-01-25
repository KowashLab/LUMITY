import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Sparkles, Globe, ChevronDown } from "lucide-react";
import { ArrowRight } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const languages = ["EN", "SWE", "RU"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Features", "Categories", "Pricing", "Community", "Enterprise", "API", "Docs", "Security", "Templates", "Support"];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4"
    >
      <div
        className="max-w-[1600px] mx-auto backdrop-blur-xl rounded-2xl px-6 md:px-8 py-4 flex items-center justify-between shadow-2xl border"
        style={{
          background: "rgba(10, 10, 10, 0.8)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-60 blur-lg transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
              }}
            />
            <div 
              className="relative p-2 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <span className="text-2xl tracking-tight font-black" style={{ color: "#F8F8F8" }}>
            LUMITY
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
              style={{
                color: "#E0E0E0",
              }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg backdrop-blur-xl border transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "#E0E0E0",
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-sm font-semibold">{selectedLanguage}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Language Dropdown */}
            {showLangMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-2 backdrop-blur-xl rounded-xl border shadow-xl overflow-hidden"
                style={{
                  background: "rgba(10, 10, 10, 0.95)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className="block w-full px-4 py-2 text-sm font-semibold text-left transition-all duration-200"
                    style={{
                      color: selectedLanguage === lang ? "#F8F8F8" : "#C5C5C5",
                      background: selectedLanguage === lang 
                        ? "linear-gradient(135deg, rgba(106, 13, 173, 0.2), rgba(255, 75, 43, 0.2))" 
                        : "transparent",
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sign In */}
          <button className="hidden md:block text-sm font-semibold hover:text-white transition-colors" style={{ color: "#E0E0E0" }}>
            Sign In
          </button>

          {/* Start Free Trial */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 md:px-6 py-2 rounded-full text-sm font-bold text-white flex items-center gap-2 shadow-lg relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
            }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #FF4B2B 0%, #6A0DAD 100%)",
              }}
            />
            <span className="relative z-10">Start Free</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}