import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/ui/ImageWithFallback";

interface Category {
  name: string;
  image: string;
  gradient: string;
}

export function CategoriesGrid() {
  const categories: Category[] = [
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1718351041906-d1086f502f8a?w=500&h=500&fit=crop",
      gradient: "from-fuchsia-500/80 to-transparent",
    },
    {
      name: "Product",
      image: "https://images.unsplash.com/photo-1612430685147-f68276c3fa9f?w=500&h=500&fit=crop",
      gradient: "from-orange-500/80 to-transparent",
    },
    {
      name: "Architecture",
      image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?w=500&h=500&fit=crop",
      gradient: "from-teal-500/80 to-transparent",
    },
    {
      name: "Digital Art",
      image: "https://images.unsplash.com/photo-1705254613735-1abb457f8a60?w=500&h=500&fit=crop",
      gradient: "from-purple-500/80 to-transparent",
    },
    {
      name: "Nature",
      image: "https://images.unsplash.com/photo-1598439473183-42c9301db5dc?w=500&h=500&fit=crop",
      gradient: "from-green-500/80 to-transparent",
    },
    {
      name: "Food",
      image: "https://images.unsplash.com/photo-1625860633266-8707a63d6671?w=500&h=500&fit=crop",
      gradient: "from-amber-500/80 to-transparent",
    },
    {
      name: "Technology",
      image: "https://images.unsplash.com/photo-1762768727350-7f2b1d559a47?w=500&h=500&fit=crop",
      gradient: "from-blue-500/80 to-transparent",
    },
    {
      name: "Portraits",
      image: "https://images.unsplash.com/photo-1660018322118-184703f102fc?w=500&h=500&fit=crop",
      gradient: "from-pink-500/80 to-transparent",
    },
    {
      name: "Urban",
      image: "https://images.unsplash.com/photo-1643875396528-5770014cefdf?w=500&h=500&fit=crop",
      gradient: "from-gray-500/80 to-transparent",
    },
    {
      name: "Interiors",
      image: "https://images.unsplash.com/photo-1690489965043-ec15758cce71?w=500&h=500&fit=crop",
      gradient: "from-indigo-500/80 to-transparent",
    },
    {
      name: "Travel",
      image: "https://images.unsplash.com/photo-1534443274343-c6200874852c?w=500&h=500&fit=crop",
      gradient: "from-cyan-500/80 to-transparent",
    },
    {
      name: "Sports",
      image: "https://images.unsplash.com/photo-1642506539297-6021bf65badc?w=500&h=500&fit=crop",
      gradient: "from-red-500/80 to-transparent",
    },
    {
      name: "Wildlife",
      image: "https://images.unsplash.com/photo-1651707265633-6043d4606339?w=500&h=500&fit=crop",
      gradient: "from-lime-500/80 to-transparent",
    },
    {
      name: "Minimalist",
      image: "https://images.unsplash.com/photo-1528262004378-a108d795029c?w=500&h=500&fit=crop",
      gradient: "from-slate-500/80 to-transparent",
    },
    {
      name: "Vintage",
      image: "https://images.unsplash.com/photo-1588420635201-3a9e2a2a0a07?w=500&h=500&fit=crop",
      gradient: "from-yellow-500/80 to-transparent",
    },
    {
      name: "Abstract",
      image: "https://images.unsplash.com/photo-1639493115941-a70fcef4f715?w=500&h=500&fit=crop",
      gradient: "from-violet-500/80 to-transparent",
    },
    {
      name: "Workspace",
      image: "https://images.unsplash.com/photo-1558259299-5d46c4408730?w=500&h=500&fit=crop",
      gradient: "from-emerald-500/80 to-transparent",
    },
    {
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1630331811881-58a6f87bf7f2?w=500&h=500&fit=crop",
      gradient: "from-rose-500/80 to-transparent",
    },
  ];

  return (
    <section className="py-20 md:py-24 px-6 md:px-8" style={{ background: "#0A0A0A" }}>
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3" style={{ color: "#F8F8F8" }}>
            Smart Visual{" "}
            <span 
              style={{
                background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Organization
            </span>
          </h2>
          <p className="text-base md:text-lg font-medium max-w-2xl mx-auto" style={{ color: "#C5C5C5" }}>
            Organize your images by categories for lightning-fast access
          </p>
        </motion.div>

        {/* Categories Grid - 6 columns, 3 rows */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              whileHover={{
                scale: 1.05,
              }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Image */}
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />

              {/* Dark Overlay - stronger on hover */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)",
                }}
              />

              {/* Gradient Glow on Hover */}
              <div 
                className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                }}
              />

              {/* Category Name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <h3 
                  className="text-sm md:text-base font-black tracking-tight drop-shadow-lg transition-all duration-300"
                  style={{ color: "#FFFFFF" }}
                >
                  {category.name}
                </h3>
              </div>

              {/* Shine Effect on Hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}