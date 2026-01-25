import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Creative Director",
      company: "Design Studio Pro",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "LUMITY transformed how we manage our client assets. The organization system is intuitive and saves us hours every week.",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Lead Photographer",
      company: "Visionary Images",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "As a photographer with over 100k images, finding the right shot used to be a nightmare. LUMITY's smart search made everything accessible instantly.",
    },
    {
      id: 3,
      name: "Emma Lindström",
      role: "Brand Manager",
      company: "Nordic Ventures",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      text: "We manage brand assets for 20+ companies. LUMITY's collaboration features and security give us peace of mind.",
    },
    {
      id: 4,
      name: "David Park",
      role: "Video Producer",
      company: "Motion Labs",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      text: "Lightning-fast uploads, powerful organization, and seamless sharing. LUMITY handles our massive video thumbnail library like a dream.",
    },
    {
      id: 5,
      name: "Olivia Martinez",
      role: "Art Director",
      company: "Pixel Perfect Agency",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
      rating: 5,
      text: "The speed and reliability of LUMITY is unmatched. We've migrated our entire asset library and couldn't be happier.",
    },
    {
      id: 6,
      name: "James Thompson",
      role: "Fashion Photographer",
      company: "Vogue Studios",
      image: "https://images.unsplash.com/photo-1627961888164-b79f406b245b?w=150&h=150&fit=crop",
      rating: 5,
      text: "Managing fashion shoots with thousands of RAW files is effortless with LUMITY. The preview generation is instant.",
    },
    {
      id: 7,
      name: "Sophia Kim",
      role: "Social Media Manager",
      company: "Influencer Hub",
      image: "https://images.unsplash.com/photo-1733731402869-57e0cce24aea?w=150&h=150&fit=crop",
      rating: 5,
      text: "We work with 50+ influencers daily. LUMITY's sharing capabilities have streamlined our entire content pipeline.",
    },
    {
      id: 8,
      name: "Alexander Novak",
      role: "Product Designer",
      company: "TechFlow",
      image: "https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?w=150&h=150&fit=crop",
      rating: 5,
      text: "As a designer, having all my mockups and assets in one secure place is invaluable. LUMITY's version control is a lifesaver.",
    },
    {
      id: 9,
      name: "Isabella Santos",
      role: "Wedding Photographer",
      company: "Eternal Moments",
      image: "https://images.unsplash.com/photo-1625682115702-3a561cd465fd?w=150&h=150&fit=crop",
      rating: 5,
      text: "I deliver over 500 photos per wedding. LUMITY's client galleries and sharing features make deliveries seamless.",
    },
    {
      id: 10,
      name: "Michael Chen",
      role: "E-commerce Manager",
      company: "Fashion Forward",
      image: "https://images.unsplash.com/photo-1758599543126-59e3154d7195?w=150&h=150&fit=crop",
      rating: 5,
      text: "Managing product photography for 10,000+ SKUs is no joke. LUMITY's bulk upload has cut our workflow time by 70%.",
    },
    {
      id: 11,
      name: "Rachel Moore",
      role: "Content Creator",
      company: "Digital Dreams",
      image: "https://images.unsplash.com/photo-1558975285-193b2c315c2c?w=150&h=150&fit=crop",
      rating: 5,
      text: "Creating content daily means I need reliable storage. LUMITY's mobile app and instant sync keep all my assets accessible.",
    },
    {
      id: 12,
      name: "Daniel Foster",
      role: "Marketing Director",
      company: "Growth Ventures",
      image: "https://images.unsplash.com/photo-1619680333072-3e947c65f4a3?w=150&h=150&fit=crop",
      rating: 5,
      text: "Our marketing team generates hundreds of assets monthly. LUMITY's collaboration tools keep everything organized and secure.",
    },
    {
      id: 13,
      name: "Natalie Anderson",
      role: "Graphic Designer",
      company: "Creative Minds",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
      rating: 5,
      text: "The search functionality is incredible. I can find any asset in seconds using colors, tags, or even visual search.",
    },
    {
      id: 14,
      name: "Robert Wilson",
      role: "Sports Photographer",
      company: "Action Shots Pro",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 5,
      text: "Shooting 5,000+ photos per game means I need serious storage power. LUMITY's upload speeds are phenomenal.",
    },
    {
      id: 15,
      name: "Emily Brooks",
      role: "Interior Designer",
      company: "Luxe Spaces",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      rating: 5,
      text: "Presenting design concepts to clients has never been easier. LUMITY's presentation mode makes me look incredibly professional.",
    },
    {
      id: 16,
      name: "Lucas Johnson",
      role: "Travel Blogger",
      company: "Wanderlust Media",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      rating: 5,
      text: "Traveling the world means unreliable internet. LUMITY's offline mode and smart sync ensure my photos are always backed up.",
    },
    {
      id: 17,
      name: "Amanda Wright",
      role: "Real Estate Agent",
      company: "Premier Properties",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
      rating: 5,
      text: "Managing property photos for 100+ listings is effortless with LUMITY. The folder structure helps me close deals faster.",
    },
    {
      id: 18,
      name: "Christopher Lee",
      role: "Film Director",
      company: "Cinematic Vision",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop",
      rating: 5,
      text: "Our production generates terabytes of stills and storyboards. LUMITY handles it all without breaking a sweat.",
    },
    {
      id: 19,
      name: "Victoria Chang",
      role: "Food Photographer",
      company: "Culinary Lens",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop",
      rating: 5,
      text: "Color accuracy is everything in food photography. LUMITY preserves every detail perfectly.",
    },
    {
      id: 20,
      name: "Benjamin Taylor",
      role: "Drone Pilot",
      company: "Aerial Perspectives",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop",
      rating: 5,
      text: "High-res aerial photography creates massive files. LUMITY's unlimited storage makes my job so much easier.",
    },
    {
      id: 21,
      name: "Ava Robinson",
      role: "Portrait Photographer",
      company: "Studio Elite",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      rating: 5,
      text: "The client portal feature is a game-changer. My customers can select their favorites directly from LUMITY galleries.",
    },
    {
      id: 22,
      name: "William Harris",
      role: "Architectural Photographer",
      company: "Structure & Light",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&h=150&fit=crop",
      rating: 5,
      text: "LUMITY's tagging system helped me catalog 15 years of architectural photography. Finding specific projects is instant.",
    },
    {
      id: 23,
      name: "Mia Thompson",
      role: "Fashion Stylist",
      company: "Vogue Collective",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
      rating: 5,
      text: "Managing lookbooks and campaign imagery across multiple seasons has never been this organized. LUMITY is essential.",
    },
    {
      id: 24,
      name: "Ethan Mitchell",
      role: "Wildlife Photographer",
      company: "Nature's Lens",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop",
      rating: 5,
      text: "Shooting in remote locations requires reliable backup. LUMITY's sync technology ensures I never lose a shot.",
    },
    {
      id: 25,
      name: "Charlotte Davis",
      role: "Event Photographer",
      company: "Moments Captured",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop",
      rating: 5,
      text: "Corporate events generate thousands of photos. LUMITY's facial recognition and tagging save me days of sorting time.",
    },
    {
      id: 26,
      name: "Henry Wilson",
      role: "Automotive Photographer",
      company: "Speed & Chrome",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop",
      rating: 5,
      text: "High-speed car photography requires pixel-perfect quality. LUMITY preserves every detail without compression artifacts.",
    },
    {
      id: 27,
      name: "Amelia Garcia",
      role: "Newborn Photographer",
      company: "Little Miracles",
      image: "https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?w=150&h=150&fit=crop",
      rating: 5,
      text: "Parents love the private galleries LUMITY provides. Sharing precious newborn photos securely builds trust with clients.",
    },
    {
      id: 28,
      name: "Jack Anderson",
      role: "Astrophotographer",
      company: "Cosmic Captures",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop",
      rating: 5,
      text: "Long-exposure astrophotography creates huge RAW files. LUMITY handles them effortlessly with lightning-fast previews.",
    },
    {
      id: 29,
      name: "Grace Martinez",
      role: "Pet Photographer",
      company: "Pawfect Portraits",
      image: "https://images.unsplash.com/photo-1598550487212-799c0308f9d5?w=150&h=150&fit=crop",
      rating: 5,
      text: "My pet photography business has grown 300% since using LUMITY. The organization tools keep me on top of every session.",
    },
    {
      id: 30,
      name: "Oliver Scott",
      role: "Underwater Photographer",
      company: "Deep Blue Studios",
      image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=150&h=150&fit=crop",
      rating: 5,
      text: "Underwater shoots are challenging enough. LUMITY's automatic backup means I can focus on capturing the perfect shot.",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const getCurrentTestimonials = () => {
    const startIndex = currentPage * itemsPerPage;
    return testimonials.slice(startIndex, startIndex + itemsPerPage);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentPage((prevPage) => {
      let nextPage = prevPage + newDirection;
      if (nextPage < 0) nextPage = totalPages - 1;
      if (nextPage >= totalPages) nextPage = 0;
      return nextPage;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 12000);

    return () => clearInterval(timer);
  }, [currentPage]);

  return (
    <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <motion.div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(106, 13, 173, 0.6), transparent)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255, 75, 43, 0.6), transparent)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 backdrop-blur-sm"
            style={{
              background: "rgba(106, 13, 173, 0.1)",
              border: "1px solid rgba(106, 13, 173, 0.3)",
            }}
          >
            <Star className="w-4 h-4" style={{ color: "#FF4B2B", fill: "#FF4B2B" }} />
            <span className="text-sm font-bold" style={{ color: "#E0E0E0" }}>
              TRUSTED BY PROFESSIONALS
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: "#F8F8F8" }}>
            Loved by{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              20,000+
            </span>
            {" "}Creatives
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#C5C5C5" }}>
            See what industry professionals say about their experience with LUMITY
          </p>
        </motion.div>

        {/* Testimonials Carousel - 3 Column */}
        <div className="relative mb-12">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="grid md:grid-cols-3 gap-6"
              >
                {getCurrentTestimonials().map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="backdrop-blur-xl rounded-2xl p-6 border relative group"
                    style={{
                      background: "rgba(28, 28, 28, 0.5)",
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {/* Gradient glow on hover */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(135deg, rgba(106, 13, 173, 0.05), rgba(255, 75, 43, 0.05))",
                      }}
                    />

                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 opacity-5">
                      <Quote className="w-12 h-12" style={{ color: "#6A0DAD" }} />
                    </div>

                    <div className="relative">
                      {/* Author info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                          <div 
                            className="absolute inset-0 rounded-full blur-md opacity-30"
                            style={{
                              background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
                            }}
                          />
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="relative w-12 h-12 rounded-full object-cover ring-2"
                            style={{ ringColor: "rgba(255, 255, 255, 0.1)" }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-base font-bold truncate" style={{ color: "#F8F8F8" }}>
                            {testimonial.name}
                          </div>
                          <div className="text-xs truncate" style={{ color: "#9333EA" }}>
                            {testimonial.role}
                          </div>
                        </div>
                        {/* Stars */}
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-3 h-3"
                              style={{ 
                                fill: "#FF4B2B",
                                color: "#FF4B2B",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review text */}
                      <p 
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: "#C5C5C5" }}
                      >
                        "{testimonial.text}"
                      </p>

                      {/* Company */}
                      <div className="text-xs font-medium" style={{ color: "#666" }}>
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="group absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-xl shadow-2xl flex items-center justify-center transition-all duration-300 z-10 border backdrop-blur-xl"
            style={{
              background: "rgba(28, 28, 28, 0.9)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              color: "#F8F8F8",
            }}
            aria-label="Previous testimonials"
          >
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
              }}
            />
            <ChevronLeft className="w-6 h-6 relative z-10 group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="group absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-xl shadow-2xl flex items-center justify-center transition-all duration-300 z-10 border backdrop-blur-xl"
            style={{
              background: "rgba(28, 28, 28, 0.9)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              color: "#F8F8F8",
            }}
            aria-label="Next testimonials"
          >
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
              }}
            />
            <ChevronRight className="w-6 h-6 relative z-10 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-16">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentPage ? 1 : -1);
                setCurrentPage(index);
              }}
              className={`h-2 rounded-full transition-all duration-300`}
              style={{
                width: index === currentPage ? "40px" : "8px",
                background: index === currentPage 
                  ? "linear-gradient(90deg, #6A0DAD, #FF4B2B)" 
                  : "rgba(255, 255, 255, 0.2)",
              }}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "20K+", label: "Happy Users" },
            { value: "50M+", label: "Images Stored" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center backdrop-blur-xl rounded-xl p-4 border"
              style={{
                background: "rgba(28, 28, 28, 0.4)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <div 
                className="text-3xl md:text-4xl font-black mb-1"
                style={{
                  background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "#999" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}