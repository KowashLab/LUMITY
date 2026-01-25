import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus, Minus, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: "How does LUMITY image storage work?",
      answer:
        "LUMITY provides secure cloud storage for all your images. Simply upload your files through our intuitive interface, and they're instantly accessible from anywhere. We use enterprise-grade encryption and redundant storage to ensure your images are always safe and available.",
    },
    {
      question: "What makes LUMITY different from other storage solutions?",
      answer:
        "LUMITY is built specifically for visual professionals. Unlike generic storage, we offer advanced image classification, lightning-fast preview generation, and smart organization tools designed for photographers, designers, and creative teams.",
    },
    {
      question: "Is my data secure with LUMITY?",
      answer:
        "Absolutely. Security is our top priority. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. Your images are stored in multiple secure data centers with automatic backups. We're SOC 2 Type II certified and GDPR compliant.",
    },
    {
      question: "How much storage do I get?",
      answer:
        "We offer flexible plans starting from 100GB to unlimited storage. Our Professional plan includes 2TB, and Enterprise customers get unlimited storage with custom retention policies and dedicated infrastructure.",
    },
    {
      question: "Can I integrate LUMITY with other tools?",
      answer:
        "Yes! LUMITY offers a comprehensive REST API for seamless integration. You can easily integrate with your existing tools and workflows. We support standard HTTP endpoints for programmatic image uploads and retrieval.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "LUMITY supports all major image formats including JPG, PNG, GIF, WebP, TIFF, BMP, SVG, and RAW formats from professional cameras (CR2, NEF, ARW, DNG, etc.). We also support video thumbnails and preview generation.",
    },
    {
      question: "How fast is the upload speed?",
      answer:
        "Our infrastructure is optimized for speed with a global CDN. Most images upload in seconds. You can upload multiple files simultaneously with our parallel upload technology. For large batches, our desktop app offers even faster bulk uploads.",
    },
    {
      question: "Can I share images with my team?",
      answer:
        "Absolutely! Create shared workspaces, set granular permissions (view, edit, admin), and track activity. Generate shareable links with custom expiration dates and password protection. Create beautiful galleries to share with clients.",
    },
    {
      question: "What happens if I reach my storage limit?",
      answer:
        "You'll receive notifications when approaching your limit. You can upgrade your plan anytime or purchase additional storage. We never delete your files - uploads are simply paused until you upgrade or free up space.",
    },
    {
      question: "Does LUMITY use AI for image classification?",
      answer:
        "No. LUMITY is a pure storage and organization platform. We don't use AI or analyze your image content. You have complete control over how your images are tagged and categorized using our manual classification tools.",
    },
    {
      question: "Can I access my images offline?",
      answer:
        "Yes! Our desktop and mobile apps support offline access. You can mark specific folders for offline sync, and they'll automatically stay updated when you're online. Perfect for working on the go.",
    },
    {
      question: "How do you handle image backups?",
      answer:
        "All images are automatically backed up to multiple geo-distributed data centers in real-time. We maintain version history for 30 days (90 days on Pro plans), so you can recover previous versions if needed.",
    },
    {
      question: "What's your uptime guarantee?",
      answer:
        "We guarantee 99.9% uptime with our SLA. Our infrastructure is built on enterprise-grade cloud providers with automatic failover. In the rare event of downtime, Pro and Enterprise customers receive service credits.",
    },
    {
      question: "Can I migrate from another platform?",
      answer:
        "Yes! We provide free migration assistance for Pro and Enterprise plans. Our migration tool preserves your folder structure, metadata, and organization. Most migrations complete within 24-48 hours.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Absolutely! Free plans get email support with 24-hour response time. Pro plans include priority support, and Enterprise customers get dedicated account managers with 24/7 phone support and <1 hour response time.",
    },
  ];

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 6);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: "#1C1C1C" }}>
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(106, 13, 173, 0.5), transparent)",
          }}
        />
        <div 
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255, 75, 43, 0.5), transparent)",
          }}
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 backdrop-blur-sm"
            style={{
              background: "rgba(106, 13, 173, 0.1)",
              border: "1px solid rgba(106, 13, 173, 0.3)",
            }}
          >
            <span className="text-sm font-bold" style={{ color: "#E0E0E0" }}>
              GOT QUESTIONS?
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3" style={{ color: "#F8F8F8" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#C5C5C5" }}>
            Everything you need to know about LUMITY image storage
          </p>
        </motion.div>

        <div className="space-y-3 mb-8">
          {displayedFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{
                background: "rgba(28, 28, 28, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left group"
              >
                <span 
                  className="text-base font-bold transition-all duration-300 pr-4"
                  style={{ color: "#F8F8F8" }}
                >
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{
                      background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                    }}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="px-6 pb-4 text-sm leading-relaxed"
                      style={{ 
                        color: "#C5C5C5",
                        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                        paddingTop: "16px",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-3 rounded-xl font-bold text-sm backdrop-blur-xl border transition-all duration-300 flex items-center gap-2 relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#F8F8F8",
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(106, 13, 173, 0.2), rgba(255, 75, 43, 0.2))",
                }}
              />
              <span className="relative z-10">View All {faqs.length} Questions</span>
              <ChevronDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}