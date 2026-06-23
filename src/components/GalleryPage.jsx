import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { 
  ArrowLeft, Maximize2, Users, Award, Coffee, 
  BookOpen, Presentation, Heart, Upload, X, Film, Image as ImageIcon 
} from 'lucide-react';
import Lenis from 'lenis';
import ScrollAnimateCard from './ScrollAnimateCard';
import { uploadToCloudinary } from '../utils/cloudinary';
import { fetchSnapshots, addSnapshot } from '../utils/firebase';

const categoryIcons = {
  Workplace: Users,
  Training: BookOpen,
  Events: Heart,
  Default: Coffee
};

const getIconForCategory = (category) => {
  return categoryIcons[category] || categoryIcons.Default;
};

const bentoItems = [
  {
    title: 'Team Briefing',
    desc: 'Alignment meetings discussing client deliverables and milestones.',
    category: 'Workplace',
    icon: Users,
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-2 row-span-1 h-[200px] md:col-span-2 md:row-span-1 md:h-[260px]'
  },
  {
    title: 'Training Session',
    desc: 'Onboarding bootcamps for freshers focusing on Excel and core processes.',
    category: 'Training',
    icon: BookOpen,
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-2 h-[416px] md:col-span-1 md:row-span-2 md:h-[544px]'
  },
  {
    title: 'Award Day',
    desc: 'Recognizing monthly top performers across data and leadership roles.',
    category: 'Events',
    icon: Award,
    url: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]'
  },
  {
    title: 'Onboarding Desk',
    desc: 'Setting up new workspaces and accounts for the incoming cohort.',
    category: 'Workplace',
    icon: Coffee,
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-1 h-[200px] md:col-span-2 md:row-span-1 md:h-[260px]'
  },
  {
    title: 'Project Review',
    desc: 'Structured quality assessment audits of database models.',
    category: 'Training',
    icon: Presentation,
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]'
  },
  {
    title: 'Team Outing',
    desc: 'Building bonds beyond coordinates and corporate structures.',
    category: 'Events',
    icon: Heart,
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-2 h-[416px] md:col-span-1 md:row-span-2 md:h-[544px]'
  },
  {
    title: 'Collaborative Coding',
    desc: 'Developers pair programming and reviewing system logs together.',
    category: 'Workplace',
    icon: Users,
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-1 h-[200px] md:col-span-2 md:row-span-1 md:h-[260px]'
  },
  {
    title: 'Technical Seminar',
    desc: 'Weekly knowledge transfer session sharing coding standards.',
    category: 'Training',
    icon: BookOpen,
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]'
  },
  {
    title: 'Office Celebration',
    desc: 'Celebrating project milestones with team refreshments.',
    category: 'Events',
    icon: Award,
    url: 'https://images.unsplash.com/photo-1516062423079-7ca13cca775f?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]'
  },
  {
    title: 'Code Architecture',
    desc: 'Designing scalable front-ends and optimizing server render loops.',
    category: 'Training',
    icon: Presentation,
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-2 row-span-1 h-[200px] md:col-span-2 md:row-span-1 md:h-[260px]'
  },
  {
    title: 'Design Sprint',
    desc: 'Wireframing user-friendly interfaces with clean design patterns.',
    category: 'Workplace',
    icon: Coffee,
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]'
  },
  {
    title: 'Fun & Games',
    desc: 'Recreational activities to refresh minds and build connection.',
    category: 'Events',
    icon: Heart,
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-1 row-span-1 h-[200px] md:col-span-3 md:row-span-1 md:h-[260px]'
  }
];

const categories = ['All', 'Workplace', 'Training', 'Events'];

export default function GalleryPage({ onClose }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const containerRef = useRef(null);

  // Stateful list of items merging static and custom uploads
  const [items, setItems] = useState(bentoItems);
  const [loadingSnapshots, setLoadingSnapshots] = useState(true);

  // Fetch custom snapshots from Firestore on mount
  useEffect(() => {
    let active = true;
    async function loadSnapshots() {
      try {
        const dbSnapshots = await fetchSnapshots();
        if (active) {
          setItems([...dbSnapshots, ...bentoItems]);
        }
      } catch (err) {
        console.error('Failed to fetch snapshots from Firestore:', err);
      } finally {
        if (active) {
          setLoadingSnapshots(false);
        }
      }
    }
    loadSnapshots();
    return () => {
      active = false;
    };
  }, []);

  // Modal and file upload states
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Workplace');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setError('');
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // Call Cloudinary client upload utility
      const uploadRes = await uploadToCloudinary(file);

      const newItem = {
        title,
        desc,
        category,
        url: uploadRes.url,
        isVideo: uploadRes.resourceType === 'video' || file.type.startsWith('video/'),
        gridClass: 'col-span-1 row-span-1 h-[200px] md:h-[260px]'
      };

      // Save to Firestore
      await addSnapshot(newItem);

      // Add to state list
      setItems(prev => [newItem, ...prev]);

      // Reset fields
      setTitle('');
      setCategory('Workplace');
      setDesc('');
      setFile(null);
      setUploadModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to upload media. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Lock body scroll of the parent viewport while overlay is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Initialize local Lenis for smooth modal scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lenis = new Lenis({
      wrapper: container,
      content: container.querySelector('main') || container,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Scroll to top immediately when activeCategory changes
    container.scrollTop = 0;
    lenis.scrollTo(0, { immediate: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [activeCategory]);

  // Filter items
  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  const slides = filteredItems.map(item => ({ src: item.url }));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      data-lenis-prevent
      className="fixed inset-0 bg-[#f2f2f2] z-[1000] !overflow-y-auto w-full h-full flex flex-col font-sans select-none"
    >
      
      {/* Sticky Header Nav Bar */}
      <header className="sticky top-0 z-[1010] bg-[#f2f2f2]/80 backdrop-blur-md border-b border-brandTeal/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 border border-brandTeal/20 hover:border-brandTeal/60 text-brandTeal bg-white/40 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 rounded-none"
          >
            <ArrowLeft size={14} />
            Back to Drive
          </button>
          
          <button 
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-brandAmber/35 hover:border-brandAmber/85 text-brandAmber bg-white/40 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 rounded-none"
          >
            <Upload size={14} />
            Upload Snapshot
          </button>
        </div>

        <div className="flex items-center gap-3">
          <img 
            src="/assets/WhatsApp Image 2026-06-21 at 6.52.02 PM (1).jpeg" 
            alt="AB IT Solutions Logo" 
            className="w-7 h-7 rounded object-cover"
          />
          <span className="font-display font-bold text-xs tracking-wider text-textPrimary uppercase">
            AB IT Solutions
          </span>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        
        {/* Title */}
        <div className="mb-10 border-b border-textPrimary/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-2">
              ✦ MEDIA ARCHIVE {loadingSnapshots && ' (LOADING SNAPSHOTS...)'}
            </span>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
              COLLECTIVE SNAPSHOTS
            </h1>
          </div>
          
          {/* Category Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border rounded-none transition-all duration-300 active:scale-95 ${
                    isActive 
                      ? 'bg-brandTeal text-white border-brandTeal shadow-neon-teal'
                      : 'bg-white/40 border-brandTeal/15 text-textMuted hover:border-brandTeal/40 hover:text-brandTeal'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeCategory} // Reset animation when category changes
          className={`grid ${
            activeCategory === 'All'
              ? 'grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'
              : 'grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const Icon = item.icon || getIconForCategory(item.category);
              return (
                <ScrollAnimateCard
                  key={item.title}
                  index={idx}
                  yOffset={40}
                  scale={0.97}
                  blur="6px"
                  threshold="-20px"
                  viewport={{ root: containerRef }}
                  className={activeCategory === 'All' ? item.gridClass : 'col-span-1 h-[200px] md:h-[280px]'}
                >
                  <motion.div
                    layout
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    }}
                    className="group relative overflow-hidden cursor-pointer border border-textPrimary/10 flex flex-col justify-end transition-all duration-500 rounded-none bg-white shadow-sm w-full h-full"
                  >
                    {/* Image/Video wrapper */}
                    <div className="absolute inset-0 overflow-hidden z-0">
                      {item.isVideo || item.url.match(/\.(mp4|webm|ogg|mov)$/i) || item.url.includes('/video/upload/') ? (
                        <video 
                          src={item.url} 
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          autoPlay
                        />
                      ) : (
                        <img 
                          src={item.url} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      )}
                      {/* Hover Tint Overlay */}
                      <div className="absolute inset-0 bg-[#112f35]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    </div>

                    {/* Top-Right Maximize Overlay Icon */}
                    <div className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm border border-textPrimary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 rounded-none">
                      <Maximize2 size={12} className="text-brandTeal" />
                    </div>

                    {/* Details Overlay */}
                    <div className="relative z-20 bg-white/90 backdrop-blur-sm border-t border-textPrimary/5 p-4 flex flex-col justify-between min-h-[30%] min-h-[80px] w-full transition-colors duration-300 group-hover:bg-white shrink-0">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1.5">
                          <div className="p-1 rounded-none bg-brandTeal/10 border border-brandTeal/10 text-brandTeal">
                            <Icon size={10} />
                          </div>
                          <span className="font-mono text-[9px] font-bold text-brandTeal uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-textMuted">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xs text-textPrimary uppercase tracking-wide truncate">
                        {item.title}
                      </h3>
                      <p className="text-textMuted text-[10px] leading-relaxed font-sans line-clamp-1 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </ScrollAnimateCard>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if no items match */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center border border-dashed border-brandTeal/20">
            <p className="text-textMuted font-mono text-xs">No media files found in this category.</p>
          </div>
        )}

      </main>

      {/* Lightbox Modal */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        render={{
          slide: ({ slide }) => {
            if (slide.type === 'video') {
              return (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <video
                    src={slide.src}
                    className="max-w-full max-h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                </div>
              );
            }
            return null;
          }
        }}
        styles={{
          container: { backgroundColor: 'rgba(242, 242, 242, 0.98)' }
        }}
      />

      {/* Upload Modal Overlay */}
      <AnimatePresence>
        {uploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white/90 border border-white/60 p-6 md:p-8 max-w-md w-full shadow-2xl relative flex flex-col gap-5 rounded-none font-sans"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  if (!uploading) {
                    setUploadModalOpen(false);
                    setError('');
                  }
                }}
                className="absolute top-4 right-4 text-textMuted hover:text-textPrimary transition-colors duration-200"
              >
                <X size={18} />
              </button>

              <div>
                <span className="font-mono text-[9px] font-bold text-brandTeal uppercase tracking-widest block mb-1">
                  ✦ Admin Panel
                </span>
                <h3 className="font-display font-bold text-xl text-textPrimary uppercase tracking-tight">
                  Upload Media Snapshot
                </h3>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-textMuted uppercase tracking-wider">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Office Hackathon"
                    className="w-full px-3 py-2 border border-brandTeal/20 bg-white/50 text-textPrimary text-sm font-sans focus:outline-none focus:border-brandTeal transition-colors duration-200 rounded-none"
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-textMuted uppercase tracking-wider">
                    Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Workplace', 'Training', 'Events'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`py-1.5 border text-[11px] font-mono font-bold uppercase tracking-wider transition-colors duration-200 rounded-none ${
                          category === cat
                            ? 'bg-brandTeal text-white border-brandTeal'
                            : 'bg-white/40 border-brandTeal/15 text-textMuted hover:border-brandTeal/30'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-textMuted uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Short description of the event..."
                    className="w-full px-3 py-2 border border-brandTeal/20 bg-white/50 text-textPrimary text-sm font-sans focus:outline-none focus:border-brandTeal transition-colors duration-200 resize-none rounded-none"
                  />
                </div>

                {/* File Drop / Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-textMuted uppercase tracking-wider">
                    Image / Video File
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-brandTeal/20 hover:border-brandTeal/55 transition-colors duration-300 py-6 px-4 flex flex-col items-center gap-2 cursor-pointer bg-white/30 text-center"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {file ? (
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-brandTeal">
                          {file.type.startsWith('video/') ? <Film size={14} /> : <ImageIcon size={14} />}
                          <span className="truncate max-w-[200px]">{file.name}</span>
                        </div>
                        <span className="text-[10px] text-textMuted">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload size={20} className="text-brandTeal/60" />
                        <span className="text-xs text-textMuted font-sans">
                          Click to select Image or Video
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={uploading || !file}
                  className="w-full py-3 bg-brandTeal text-white font-display font-bold text-xs uppercase tracking-wider border border-brandTeal/30 hover:bg-brandTeal/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-neon-teal active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-none mt-2"
                >
                  {uploading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading to Cloudinary...
                    </>
                  ) : (
                    <>
                      <Upload size={14} />
                      Upload & Publish
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </motion.div>
  );
}
