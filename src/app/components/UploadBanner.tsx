import { motion, AnimatePresence } from "motion/react";
import { Upload, Sparkles, Check, Link as LinkIcon, Copy, AlertCircle } from "lucide-react";
import { useState, useCallback, useRef } from "react";

interface UploadResponse {
  success: boolean;
  message?: string;
  url?: string;
  filename?: string;
  original_filename?: string;
  size?: number;
  error?: string;
}

export function UploadBanner() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  }, [isUploading]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  }, []);

  const uploadFile = async (file: File) => {
    // Reset states
    setError(null);
    setUploadedUrl(null);
    setUploadComplete(false);
    setIsUploading(true);
    setUploadProgress(0);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported file format. Please upload JPG, PNG, or GIF images.');
      setIsUploading(false);
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size exceeds 5MB limit.');
      setIsUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 150);

      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data: UploadResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      // Success
      setUploadedUrl(data.url || null);
      setUploadComplete(true);
      setIsUploading(false);

      // Reset after 10 seconds
      setTimeout(() => {
        setUploadComplete(false);
        setUploadedUrl(null);
        setUploadProgress(0);
      }, 10000);

    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const copyToClipboard = useCallback(() => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [uploadedUrl]);

  return (
    <section className="relative py-24 px-8 overflow-hidden" style={{ background: "#1C1C1C" }}>
      {/* Very Subtle Background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 0% 50%, rgba(106, 13, 173, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 50%, rgba(255, 75, 43, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 50%, rgba(106, 13, 173, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-12">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-5xl font-black tracking-tight mb-4" style={{ color: "#F8F8F8" }}>
              Got stunning visuals?
              <br />
              <span 
                style={{
                  background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Store them here.
              </span>
            </h2>
            <p className="text-xl font-medium" style={{ color: "#C5C5C5" }}>
              Drag, drop, and watch your images upload instantly.
            </p>
          </motion.div>

          {/* Right Side - Upload Zone */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <motion.div
              whileHover={{ scale: isUploading ? 1 : 1.02 }}
              className="relative group cursor-pointer"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={isUploading ? undefined : handleClick}
            >
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {/* Gradient Glow - only on hover/active */}
              <div className={`absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-all duration-500 ${
                isDragging || isUploading ? "opacity-60 blur-2xl" : "group-hover:opacity-40"
              }`}
              style={{
                background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
              }}
              />
              
              {/* Upload Box */}
              <div className={`relative backdrop-blur-xl border-2 border-dashed rounded-3xl p-16 transition-all duration-300 ${
                isDragging 
                  ? "bg-opacity-10" 
                  : uploadComplete
                  ? "bg-opacity-10"
                  : error
                  ? "bg-opacity-10"
                  : "bg-opacity-5 group-hover:bg-opacity-10"
              }`}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: isDragging 
                  ? "#6A0DAD" 
                  : uploadComplete
                  ? "#00F0FF"
                  : error
                  ? "#FF4B2B"
                  : "rgba(255, 255, 255, 0.2)",
              }}
              >
                <div className="flex flex-col items-center justify-center gap-6">
                  <AnimatePresence mode="wait">
                    {error ? (
                      <motion.div
                        key="error"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="relative"
                      >
                        <div 
                          className="absolute inset-0 opacity-40 blur-2xl rounded-full"
                          style={{
                            background: "#FF4B2B",
                          }}
                        />
                        <div 
                          className="relative p-6 rounded-2xl"
                          style={{
                            background: "#FF4B2B",
                          }}
                        >
                          <AlertCircle className="w-12 h-12 text-white" />
                        </div>
                      </motion.div>
                    ) : uploadComplete ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="relative"
                      >
                        <div 
                          className="absolute inset-0 opacity-40 blur-2xl rounded-full"
                          style={{
                            background: "linear-gradient(135deg, #00F0FF, #0080FF)",
                          }}
                        />
                        <div 
                          className="relative p-6 rounded-2xl"
                          style={{
                            background: "linear-gradient(135deg, #00F0FF 0%, #0080FF 100%)",
                          }}
                        >
                          <Check className="w-12 h-12 text-white" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upload"
                        initial={{ scale: 1 }}
                        animate={{
                          rotate: isUploading ? 360 : [0, 10, -10, 0],
                          scale: isDragging ? 1.1 : 1,
                        }}
                        transition={{
                          rotate: isUploading ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 2, repeat: Infinity, ease: "easeInOut" },
                          scale: { duration: 0.3 },
                        }}
                        className="relative"
                      >
                        <div 
                          className="absolute inset-0 opacity-30 blur-2xl rounded-full"
                          style={{
                            background: "linear-gradient(135deg, #6A0DAD, #FF4B2B)",
                          }}
                        />
                        <div 
                          className="relative p-6 rounded-2xl"
                          style={{
                            background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                          }}
                        >
                          <Upload className="w-12 h-12 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-center w-full">
                    <AnimatePresence mode="wait">
                      {error ? (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p 
                            className="text-2xl font-bold mb-2"
                            style={{ color: "#FF4B2B" }}
                          >
                            Upload Failed
                          </p>
                          <p className="text-sm font-medium" style={{ color: "#C5C5C5" }}>
                            {error}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setError(null)}
                            className="mt-4 px-6 py-2 rounded-full font-semibold text-white"
                            style={{ background: "#FF4B2B" }}
                          >
                            Try Again
                          </motion.button>
                        </motion.div>
                      ) : uploadComplete ? (
                        <motion.div
                          key="complete"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-full"
                        >
                          <p 
                            className="text-2xl font-bold mb-2"
                            style={{ color: "#00F0FF" }}
                          >
                            Upload Complete!
                          </p>
                          <p className="text-sm font-medium mb-4" style={{ color: "#C5C5C5" }}>
                            Your image is ready
                          </p>
                          
                          {uploadedUrl && (
                            <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                              <div className="flex items-center gap-2 mb-2">
                                <LinkIcon className="w-4 h-4" style={{ color: "#00F0FF" }} />
                                <p className="text-xs font-semibold" style={{ color: "#00F0FF" }}>
                                  Image URL
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={uploadedUrl}
                                  readOnly
                                  className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
                                  style={{ 
                                    background: "rgba(0, 0, 0, 0.3)",
                                    color: "#F8F8F8",
                                    border: "1px solid rgba(255, 255, 255, 0.1)"
                                  }}
                                />
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={copyToClipboard}
                                  className="px-4 py-2 rounded-lg font-semibold text-white flex items-center gap-2"
                                  style={{
                                    background: copied ? "#00F0FF" : "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                                  }}
                                >
                                  <Copy className="w-4 h-4" />
                                  {copied ? "Copied!" : "Copy"}
                                </motion.button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ) : isUploading ? (
                        <motion.div
                          key="uploading"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-full"
                        >
                          <p className="text-2xl font-bold mb-4" style={{ color: "#F8F8F8" }}>
                            Uploading... {uploadProgress}%
                          </p>
                          <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: "rgba(255, 255, 255, 0.1)" }}>
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: "linear-gradient(90deg, #6A0DAD 0%, #FF4B2B 100%)",
                              }}
                              initial={{ width: "0%" }}
                              animate={{ width: `${uploadProgress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-2xl font-bold mb-2" style={{ color: "#F8F8F8" }}>
                            Drop files here
                          </p>
                          <p className="text-sm font-medium" style={{ color: "#C5C5C5" }}>
                            or click to browse
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {!isUploading && !uploadComplete && !error && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-full font-semibold text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      style={{
                        background: "linear-gradient(135deg, #6A0DAD 0%, #FF4B2B 100%)",
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                      Instant Upload
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}