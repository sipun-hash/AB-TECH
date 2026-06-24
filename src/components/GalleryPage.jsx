import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { 
  ArrowLeft, Maximize2, Users, Award, Coffee, 
  BookOpen, Presentation, Heart, Share2, Upload, X, Film, Image as ImageIcon,
  ChevronDown
} from 'lucide-react';
import Lenis from 'lenis';
import ScrollAnimateCard from './ScrollAnimateCard';
import { uploadToCloudinary } from '../utils/cloudinary';
import { fetchSnapshots, addSnapshot, likeSnapshot, unlikeSnapshot, shareSnapshot } from '../utils/firebase';

const categoryIcons = {
  Workplace: Users,
  Training: BookOpen,
  Events: Heart,
  Default: Coffee
};

const getIconForCategory = (category) => {
  return categoryIcons[category] || categoryIcons.Default;
};

const categories = ['All', 'Workplace', 'Training', 'Events'];

const animationPatterns = [
  {
    animate: { scale: [1.05, 1.10, 1.05], y: [0, -4, 0] },
    transition: { duration: 8, ease: "easeInOut", repeat: Infinity }
  },
  {
    animate: { x: [0, 6, 0], scale: [1.07, 1.12, 1.07] },
    transition: { duration: 9, ease: "easeInOut", repeat: Infinity }
  },
  {
    animate: { rotate: [0, 0.8, 0], scale: [1.08, 1.13, 1.08], y: [0, 4, 0] },
    transition: { duration: 10, ease: "easeInOut", repeat: Infinity }
  },
  {
    animate: { x: [0, -6, 0], y: [0, -3, 0], scale: [1.06, 1.11, 1.06] },
    transition: { duration: 8.5, ease: "easeInOut", repeat: Infinity }
  },
  {
    animate: { y: [0, 5, 0], scale: [1.10, 1.05, 1.10] },
    transition: { duration: 9.5, ease: "easeInOut", repeat: Infinity }
  },
  {
    animate: { x: [-3, 3, -3], y: [-3, 3, -3], scale: [1.07, 1.12, 1.07] },
    transition: { duration: 11, ease: "easeInOut", repeat: Infinity }
  }
];

const getOptimizedVideoUrl = (url, isThumbnail = true) => {
  if (!url || !url.includes('/video/upload/')) return url;
  const transformation = isThumbnail
    ? 'q_auto,f_auto,c_scale,w_480'
    : 'q_auto,f_auto';
  return url.replace('/video/upload/', `/video/upload/${transformation}/`);
};

const getVideoPosterUrl = (url, isThumbnail = true) => {
  if (!url || !url.includes('/video/upload/')) return undefined;
  const transformation = isThumbnail
    ? 'q_auto,f_auto,c_scale,w_480'
    : 'q_auto,f_auto,w_1280';
  return url.replace('/video/upload/', `/video/upload/${transformation}/`).replace(/\.[^/.]+$/, '.jpg');
};

const SkeletonCard = ({ gridClass }) => {
  return (
    <div className={`${gridClass} relative overflow-hidden border border-textPrimary/5 bg-white/40 flex flex-col justify-end w-full h-full rounded-none`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{ animationDuration: '1.8s' }} />
      <div className="relative z-20 bg-white/60 border-t border-textPrimary/5 p-2.5 pb-2 flex flex-col gap-1.5 min-h-[68px] w-full shrink-0">
        <div className="flex justify-between items-center w-full">
          <div className="w-16 h-2.5 bg-brandTeal/15 animate-pulse rounded-none" />
          <div className="w-6 h-2 bg-textMuted/15 animate-pulse rounded-none" />
        </div>
        <div className="w-2/3 h-3 bg-textPrimary/15 animate-pulse rounded-none mt-1" />
        <div className="w-5/6 h-2 bg-textMuted/10 animate-pulse rounded-none mt-0.5" />
      </div>
    </div>
  );
};

const VideoSlide = ({ src, isCurrent }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isCurrent) {
        videoRef.current.play().catch(err => {
          console.warn("Autoplay blocked:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isCurrent]);

  const optimizedSrc = getOptimizedVideoUrl(src, false);
  const posterUrl = getVideoPosterUrl(src, false);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <video
        ref={videoRef}
        src={optimizedSrc}
        poster={posterUrl}
        className="max-w-full max-h-full object-contain"
        controls
        preload="auto"
        playsInline
      />
    </div>
  );
};

export default function GalleryPage({ onClose }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  // Stateful list of items merging static and custom uploads
  const [items, setItems] = useState([]);
  const [loadingSnapshots, setLoadingSnapshots] = useState(true);

  // Likes and shares states
  const [likedIds, setLikedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ab_tech_liked_snapshots') || '[]');
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState(null);

  // Logo flip and hidden upload toggle states
  const [logoClicks, setLogoClicks] = useState(0);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const next = prev + 1;
      if (next >= 3) {
        setShowUploadButton(true);
        setIsFlipped(true);
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem('ab_tech_liked_snapshots', JSON.stringify(likedIds));
  }, [likedIds]);

  const handleLike = async (itemId, e) => {
    if (e) e.stopPropagation();
    const wasLiked = likedIds.includes(itemId);
    
    setItems(prevItems => prevItems.map(item => {
      if (item.id === itemId) {
        const diff = wasLiked ? -1 : 1;
        return {
          ...item,
          likesCount: Math.max(0, (item.likesCount || 0) + diff)
        };
      }
      return item;
    }));

    if (wasLiked) {
      setLikedIds(prev => prev.filter(id => id !== itemId));
      await unlikeSnapshot(itemId).catch(err => console.error(err));
    } else {
      setLikedIds(prev => [...prev, itemId]);
      await likeSnapshot(itemId).catch(err => console.error(err));
    }
  };

  const handleShare = async (item, e) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#s-${item.id}`;
    const shareData = {
      title: item.title,
      text: item.desc || `Check out this snapshot: ${item.title}`,
      url: shareUrl
    };

    setItems(prevItems => prevItems.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          sharesCount: (i.sharesCount || 0) + 1
        };
      }
      return i;
    }));

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Native share cancelled or failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }

    await shareSnapshot(item.id).catch(err => console.error(err));
  };

  // Fetch custom snapshots from Firestore on mount
  useEffect(() => {
    let active = true;
    async function loadSnapshots() {
      try {
        const dbSnapshots = await fetchSnapshots();
        if (active) {
          const formatted = dbSnapshots.map(snap => ({
            ...snap,
            likesCount: snap.likesCount || 0,
            sharesCount: snap.sharesCount || 0,
          }));
          setItems(formatted);
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

  // Auto-open Lightbox from URL parameter or hash routing
  useEffect(() => {
    const handleDeepLink = () => {
      if (items.length === 0) return;
      const params = new URLSearchParams(window.location.search);
      let snapshotId = params.get('snapshot');
      
      const hash = window.location.hash;
      if (!snapshotId && hash.startsWith('#s-')) {
        snapshotId = hash.substring(3);
      }

      if (snapshotId) {
        const idx = items.findIndex(item => item.id === snapshotId);
        if (idx !== -1) {
          setLightboxIndex(idx);
          setLightboxOpen(true);
        }
      }
    };

    handleDeepLink();
    window.addEventListener('hashchange', handleDeepLink);
    return () => window.removeEventListener('hashchange', handleDeepLink);
  }, [items]);

  // Modal and file upload states
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Workplace');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const getFileDimensions = (file) => {
    return new Promise((resolve) => {
      if (!file) {
        resolve({ width: 0, height: 0 });
        return;
      }
      if (file.type.startsWith('image/')) {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = () => {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          resolve({ width: 0, height: 0 });
        };
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        const objectUrl = URL.createObjectURL(file);
        video.src = objectUrl;
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          URL.revokeObjectURL(objectUrl);
          resolve({ width: video.videoWidth, height: video.videoHeight });
        };
        video.onerror = () => {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          resolve({ width: 0, height: 0 });
        };
      } else {
        resolve({ width: 0, height: 0 });
      }
    });
  };

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
      // Get aspect ratio dimensions
      const dimensions = await getFileDimensions(file);
      let gridClass = 'col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]'; // default square

      if (dimensions.width > 0 && dimensions.height > 0) {
        const ratio = dimensions.width / dimensions.height;
        if (ratio > 1.35) {
          // Landscape / Wide
          gridClass = 'col-span-2 row-span-1 h-[200px] md:col-span-2 md:row-span-1 md:h-[260px]';
        } else if (ratio < 0.75) {
          // Portrait / Tall
          gridClass = 'col-span-1 row-span-2 h-[416px] md:col-span-1 md:row-span-2 md:h-[544px]';
        }
      }

      // Call Cloudinary client upload utility
      const uploadRes = await uploadToCloudinary(file);

      const newItem = {
        title,
        desc,
        category,
        url: uploadRes.url,
        isVideo: uploadRes.resourceType === 'video' || file.type.startsWith('video/'),
        gridClass
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

  const handleMediaLoad = (itemUrl, width, height) => {
    if (!width || !height) return;
    const ratio = width / height;
    let computedClass = 'col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]';
    if (ratio > 1.35) {
      computedClass = 'col-span-2 row-span-1 h-[200px] md:col-span-2 md:row-span-1 md:h-[260px]';
    } else if (ratio < 0.75) {
      computedClass = 'col-span-1 row-span-2 h-[416px] md:col-span-1 md:row-span-2 md:h-[544px]';
    }

    setItems(prevItems => 
      prevItems.map(item => {
        if (item.url === itemUrl) {
          const hasDefaultClass = !item.gridClass || 
            item.gridClass === 'col-span-1 row-span-1 h-[200px] md:h-[260px]' || 
            item.gridClass === 'col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]';
          if (hasDefaultClass && item.gridClass !== computedClass) {
            return { ...item, gridClass: computedClass };
          }
        }
        return item;
      })
    );
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

  const slides = filteredItems.map(item => {
    const isVideo = !!(item.isVideo || (item.url && (item.url.match(/\.(mp4|webm|ogg|mov|m4v|3gp|quicktime)$/i) || item.url.includes('/video/upload/'))));
    return {
      src: item.url,
      type: isVideo ? 'video' : 'image',
      id: item.id,
      title: item.title,
      likesCount: item.likesCount || 0,
      sharesCount: item.sharesCount || 0
    };
  });

  const currentLightboxItem = filteredItems[lightboxIndex];

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
      <header className="sticky top-0 z-[1010] bg-[#f2f2f2]/80 backdrop-blur-md border-b border-brandTeal/10 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 border border-brandTeal/20 hover:border-brandTeal/60 text-brandTeal bg-white/40 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 rounded-none"
          >
            <ArrowLeft size={14} />
            Back<span className="hidden sm:inline"> to Drive</span>
          </button>
          
          <AnimatePresence>
            {showUploadButton && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                onClick={() => setUploadModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 border border-brandAmber/35 hover:border-brandAmber/85 text-brandAmber bg-white/40 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 rounded-none"
              >
                <Upload size={14} />
                <span className="hidden sm:inline">Upload Snapshot</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          onClick={handleLogoClick}
          animate={{ rotateY: isFlipped ? 360 : 0 }}
          onAnimationComplete={() => setIsFlipped(false)}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
        >
          <img 
            src="/assets/WhatsApp Image 2026-06-21 at 6.52.02 PM (1).jpeg" 
            alt="AB IT Solutions Logo" 
            className="w-7 h-7 rounded object-cover pointer-events-none"
          />
          <span className="font-display font-bold text-xs tracking-wider text-textPrimary uppercase hidden sm:inline pointer-events-none">
            AB IT Solutions
          </span>
        </motion.div>
      </header>

      {/* Main Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-4 pb-8">
        
        {/* Title */}
        <div className="mb-6 border-b border-textPrimary/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-0.5">
              ✦ MEDIA ARCHIVE {loadingSnapshots && ' (LOADING SNAPSHOTS...)'}
            </span>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
              COLLECTIVE SNAPSHOTS
            </h1>
          </div>
          
          {/* Category Filter Bar - Desktop */}
          <div className="hidden sm:flex flex-wrap gap-2">
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

          {/* Category Filter Bar - Mobile Dropdown */}
          <div className="block sm:hidden relative min-w-[160px] w-full xs:w-auto z-30">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-white/70 border border-brandTeal/20 hover:border-brandTeal/50 text-brandTeal font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-none outline-none cursor-pointer shadow-sm transition-all"
            >
              <span>{activeCategory}</span>
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="text-brandTeal ml-2"
              >
                <ChevronDown size={14} />
              </motion.div>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <>
                  {/* Invisible backdrop to close on click outside */}
                  <div 
                    className="fixed inset-0 z-30 bg-black/5" 
                    onClick={() => setDropdownOpen(false)} 
                  />
                  
                  {/* Dropdown Options */}
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    style={{ originY: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 left-0 mt-1.5 bg-white border border-brandTeal/15 shadow-xl z-40 rounded-none overflow-hidden origin-top"
                  >
                    {categories.map((cat, idx) => {
                      const isActive = activeCategory === cat;
                      return (
                        <motion.button
                          key={cat}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04, duration: 0.25, ease: "easeOut" }}
                          onClick={() => {
                            setActiveCategory(cat);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border-b border-textPrimary/5 last:border-b-0 ${
                            isActive 
                              ? 'bg-brandTeal/10 text-brandTeal border-l-2 border-l-brandTeal' 
                              : 'text-textMuted hover:bg-[#E4EFF1]/50 hover:text-brandTeal'
                          }`}
                        >
                          {cat}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
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
            {loadingSnapshots ? (
              activeCategory === 'All' ? (
                <>
                  <SkeletonCard gridClass="col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]" />
                  <SkeletonCard gridClass="col-span-2 row-span-1 h-[200px] md:col-span-2 md:row-span-1 md:h-[260px]" />
                  <SkeletonCard gridClass="col-span-1 row-span-2 h-[416px] md:col-span-1 md:row-span-2 md:h-[544px]" />
                  <SkeletonCard gridClass="col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]" />
                  <SkeletonCard gridClass="col-span-2 row-span-1 h-[200px] md:col-span-2 md:row-span-1 md:h-[260px]" />
                  <SkeletonCard gridClass="col-span-1 row-span-1 h-[200px] md:col-span-1 md:row-span-1 md:h-[260px]" />
                </>
              ) : (
                <>
                  <SkeletonCard gridClass="col-span-1 h-[200px] md:h-[280px]" />
                  <SkeletonCard gridClass="col-span-1 h-[200px] md:h-[280px]" />
                  <SkeletonCard gridClass="col-span-1 h-[200px] md:h-[280px]" />
                  <SkeletonCard gridClass="col-span-1 h-[200px] md:h-[280px]" />
                  <SkeletonCard gridClass="col-span-1 h-[200px] md:h-[280px]" />
                  <SkeletonCard gridClass="col-span-1 h-[200px] md:h-[280px]" />
                </>
              )
            ) : (
              filteredItems.map((item, idx) => {
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
                          <motion.video 
                            src={getOptimizedVideoUrl(item.url)} 
                            poster={getVideoPosterUrl(item.url)}
                            className="w-full h-full object-cover origin-center"
                            muted
                            loop
                            playsInline
                            autoPlay
                            preload="metadata"
                            onLoadedMetadata={(e) => handleMediaLoad(item.url, e.target.videoWidth, e.target.videoHeight)}
                            animate={animationPatterns[idx % animationPatterns.length].animate}
                            transition={animationPatterns[idx % animationPatterns.length].transition}
                            whileHover={{ scale: 1.18, transition: { duration: 0.5, ease: "easeOut" } }}
                          />
                        ) : (
                          <motion.img 
                            src={item.url} 
                            alt={item.title}
                            className="w-full h-full object-cover origin-center"
                            onLoad={(e) => handleMediaLoad(item.url, e.target.naturalWidth, e.target.naturalHeight)}
                            animate={animationPatterns[idx % animationPatterns.length].animate}
                            transition={animationPatterns[idx % animationPatterns.length].transition}
                            whileHover={{ scale: 1.18, transition: { duration: 0.5, ease: "easeOut" } }}
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
                      <div className="relative z-20 bg-white/90 backdrop-blur-sm border-t border-textPrimary/5 p-2.5 pb-2 flex flex-col justify-between min-h-[64px] w-full transition-colors duration-300 group-hover:bg-white shrink-0">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-1.5">
                            <div className="p-1 rounded-none bg-brandTeal/10 border border-brandTeal/10 text-brandTeal">
                              <Icon size={10} />
                            </div>
                            <span className="font-mono text-[9px] font-bold text-brandTeal uppercase tracking-wider">
                              {item.category}
                            </span>
                          </div>

                          {/* Actions replacing the asset count */}
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={(e) => handleLike(item.id, e)} 
                              className="flex items-center gap-1 hover:text-brandTeal transition-colors text-[9px] font-mono font-semibold text-textMuted group/like relative"
                              aria-label="Like"
                            >
                              <Heart size={11} className={likedIds.includes(item.id) ? "fill-brandTeal text-brandTeal" : "text-textMuted group-hover/like:text-brandTeal"} />
                              <span>{item.likesCount || 0}</span>
                            </button>
                            <button 
                              onClick={(e) => handleShare(item, e)} 
                              className="flex items-center gap-1 hover:text-brandTeal transition-colors text-[9px] font-mono font-semibold text-textMuted group/share relative"
                              aria-label="Share"
                            >
                              <Share2 size={11} className="text-textMuted group-hover/share:text-brandTeal" />
                              <span>{item.sharesCount || 0}</span>
                              {copiedId === item.id && (
                                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-brandTeal text-white text-[8px] px-1.5 py-0.5 rounded shadow z-30 whitespace-nowrap">
                                  Copied!
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                        <h3 className="font-display font-bold text-xs text-textPrimary uppercase tracking-wide truncate mt-0.5">
                          {item.title}
                        </h3>
                        <p className="text-textMuted text-[10px] leading-relaxed font-sans line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </ScrollAnimateCard>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
        {/* Empty state if no items match */}
        {!loadingSnapshots && filteredItems.length === 0 && (
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
        on={{
          view: ({ index }) => {
            setLightboxIndex(index);
          }
        }}
        render={{
          slide: ({ slide, current }) => {
            if (slide.type === 'video') {
              return <VideoSlide src={slide.src} isCurrent={current} />;
            }
            return undefined; // Let the default renderer handle images
          }
        }}
        styles={{
          container: { backgroundColor: 'rgba(242, 242, 242, 0.98)' }
        }}
      />

      {/* Lightbox Custom Floating HUD Toolbar */}
      <AnimatePresence>
        {lightboxOpen && currentLightboxItem && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-6 left-1/2 z-[1000000] bg-white/95 backdrop-blur-md px-6 py-3 border border-textPrimary/10 shadow-2xl flex items-center gap-6 rounded-none select-none"
          >
            <span className="font-mono text-[10px] font-bold text-brandTeal uppercase tracking-wider max-w-[120px] sm:max-w-[200px] truncate mr-1">
              {currentLightboxItem.title}
            </span>
            <div className="h-4 w-[1px] bg-textPrimary/10" />
            <button 
              onClick={() => handleLike(currentLightboxItem.id)} 
              className="flex items-center gap-1.5 hover:text-brandTeal transition-colors text-xs font-mono font-bold text-textMuted group/like relative"
              aria-label="Like"
            >
              <Heart size={13} className={likedIds.includes(currentLightboxItem.id) ? "fill-brandTeal text-brandTeal animate-pulse" : "text-textMuted group-hover/like:text-brandTeal"} />
              <span>{currentLightboxItem.likesCount || 0}</span>
            </button>
            <button 
              onClick={() => handleShare(currentLightboxItem)} 
              className="flex items-center gap-1.5 hover:text-brandTeal transition-colors text-xs font-mono font-bold text-textMuted group/share relative"
              aria-label="Share"
            >
              <Share2 size={13} className="text-textMuted group-hover/share:text-brandTeal" />
              <span>{currentLightboxItem.sharesCount || 0}</span>
              {copiedId === currentLightboxItem.id && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brandTeal text-white text-[8px] px-1.5 py-0.5 rounded shadow z-30 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
