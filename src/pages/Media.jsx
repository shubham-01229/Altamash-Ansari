// src/pages/Media.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, X, Volume2, VolumeX,
  ChevronLeft, ChevronRight,
  Instagram,
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import SectionHeading from '../components/ui/SectionHeading'
import PrimaryButton from '../components/ui/PrimaryButton'
import { fadeUp, staggerContainer } from '../hooks/useScrollReveal'
import { allVideos } from '../data/media'
import { cn } from '../utils/cn'

/* ——— Creator Avatar with fallback ——— */
function CreatorAvatar({ handle, name, size = 24 }) {
  const [imgError, setImgError] = useState(false)
  const avatarUrl = `https://unavatar.io/instagram/${handle}`

  return (
    <div
      className="rounded-full overflow-hidden bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      {!imgError ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <span className="text-primary font-bold" style={{ fontSize: size * 0.375 }}>
          {name[0]}
        </span>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   3D CYLINDER CAROUSEL — preview only, no play on click
   ═══════════════════════════════════════════════════ */
function CylinderCarousel({ videos }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAuto, setIsAuto] = useState(true)
  const count = videos.length
  const angleStep = 360 / count
  const radius = Math.max(380, (140 * count) / (2 * Math.PI))

  // Auto-rotate
  useEffect(() => {
    if (!isAuto) return
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % count)
    }, 2500)
    return () => clearInterval(timer)
  }, [isAuto, count])

  const goTo = useCallback(
    (i) => {
      setActiveIndex(((i % count) + count) % count)
    },
    [count],
  )

  const currentRotation = -activeIndex * angleStep

  return (
    <div className="relative w-full">
      {/* Carousel viewport */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{ height: '340px', perspective: '1200px' }}
        onMouseEnter={() => setIsAuto(false)}
        onMouseLeave={() => setIsAuto(true)}
      >
        {/* Rotating cylinder */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            style={{
              width: '140px',
              height: '300px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateY(${currentRotation}deg)`,
              transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {videos.map((video, i) => {
              const angle = i * angleStep
              return (
                <CylinderCard
                  key={video.id}
                  video={video}
                  angle={angle}
                  radius={radius}
                  isActive={i === activeIndex}
                  onClick={() => {
                    if (i !== activeIndex) goTo(i)
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#071527] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#071527] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => goTo(activeIndex - 1)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => goTo(activeIndex + 1)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all"
      >
        <ChevronRight size={18} />
      </button>

      {/* Active video label */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mt-4"
      >
        <h3 className="font-heading font-bold text-white text-lg">
          {videos[activeIndex].title}
        </h3>
        <p className="font-body text-white/50 text-sm">
          {videos[activeIndex].creator} · {videos[activeIndex].brand}
        </p>
      </motion.div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4 flex-wrap px-4">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i === activeIndex
                ? 'bg-primary w-6'
                : 'bg-white/20 hover:bg-white/40',
            )}
          />
        ))}
      </div>
    </div>
  )
}

/* Single card on the cylinder surface — muted preview only */
function CylinderCard({ video, angle, radius, isActive, onClick }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return
    if (isActive) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => { })
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  return (
    <div
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        width: '140px',
        height: '187px',
        marginLeft: '-70px',
        marginTop: '-93px',
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.4s ease',
      }}
      onClick={onClick}
    >
      <div
        className={cn(
          'w-full h-full rounded-2xl overflow-hidden relative border-2 transition-all duration-500',
          isActive
            ? 'border-primary/60 shadow-[0_0_30px_rgba(0,188,235,0.3)] scale-110'
            : 'border-white/15 hover:border-white/30',
        )}
      >
        <video
          ref={videoRef}
          src={video.videoSrc}
          muted
          playsInline
          loop
          preload="none"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Creator name */}
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white text-[10px] font-heading font-bold truncate text-center">
            {video.creator}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   VIDEO CARD — static thumbnail, click to open modal
   No platform badge, Instagram handle instead of "Watch Campaign"
   ═══════════════════════════════════════════════════ */
function VideoCard({ video, onPlay }) {
  return (
    <div
      className="group cursor-pointer h-full"
      onClick={() => onPlay(video)}
    >
      <GlassCard className="p-0 overflow-hidden h-full flex flex-col hover:border-white/30 transition-all duration-300">
        {/* 3:4 Static Thumbnail */}
        <div className="relative overflow-hidden bg-navy shrink-0 aspect-[3/4]">
          <video
            src={video.videoSrc}
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/80 transition-all duration-300">
              <Play size={20} className="text-white ml-0.5" fill="white" />
            </div>
          </div>

          {/* Creator avatar + name overlay at bottom */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2">
              <CreatorAvatar handle={video.instagramHandle} name={video.creator} size={24} />
              <span className="font-heading font-semibold text-white text-xs truncate">
                {video.creator}
              </span>
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className="flex flex-col gap-2 p-3 sm:p-4">
          <div className="flex flex-wrap gap-1.5">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="font-heading text-[9px] font-semibold tracking-widest uppercase text-ice-cyan bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-heading font-bold text-white text-sm leading-snug group-hover:text-primary transition-colors duration-200">
            {video.title}
          </h3>

          {/* Instagram handle link */}
          <a
            href={`https://www.instagram.com/${video.instagramHandle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/50 hover:text-pink-400 transition-colors mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Instagram size={12} className="text-pink-400/70" />
            <span className="font-heading font-semibold text-[10px] tracking-wide">
              @{video.instagramHandle}
            </span>
          </a>
        </div>
      </GlassCard>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   FULL VIDEO PLAYER MODAL — auto-plays on open, fixed audio bug
   ═══════════════════════════════════════════════════ */
function VideoModal({ video, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  // Auto-play on open / video change, clean up previous audio
  useEffect(() => {
    setPlaying(false)
    setProgress(0)
    setDuration(0)
    setMuted(false)

    const vid = videoRef.current
    if (vid) {
      // Force reload and play
      vid.load()
      const playWhenReady = () => {
        vid.play()
          .then(() => setPlaying(true))
          .catch(() => { })
      }
      vid.addEventListener('canplay', playWhenReady, { once: true })

      return () => {
        vid.removeEventListener('canplay', playWhenReady)
        vid.pause()
        vid.removeAttribute('src')
        vid.load()
      }
    }
  }, [video.id])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasNext) onNext()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === ' ') {
        e.preventDefault()
        togglePlay()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [hasPrev, hasNext, playing])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play().catch(() => { })
      setPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100
    setProgress(isNaN(p) ? 0 : p)
  }

  const seek = (e) => {
    const bar = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - bar.left) / bar.width
    if (videoRef.current) {
      videoRef.current.currentTime = pct * videoRef.current.duration
    }
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const isVertical = video.aspectRatio === '9:16'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-2xl" />

      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-2 sm:left-4 md:left-8 z-20 w-11 h-11 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-2 sm:right-4 md:right-8 z-20 w-11 h-11 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      )}

      <motion.div
        className={cn(
          'relative z-10 w-full flex flex-col',
          isVertical ? 'max-w-sm' : 'max-w-4xl',
        )}
        initial={{ scale: 0.93, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            'relative rounded-3xl overflow-hidden bg-black shadow-panel',
            isVertical ? 'aspect-[3/4] max-h-[75vh]' : 'aspect-video',
          )}
        >
          <video
            ref={videoRef}
            src={video.videoSrc}
            muted={muted}
            playsInline
            preload="auto"
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration)
            }}
            onEnded={() => setPlaying(false)}
            onClick={togglePlay}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <div
              className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer group/bar"
              onClick={seek}
            >
              <div
                className="h-full bg-primary rounded-full relative group-hover/bar:h-1.5 transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-glow opacity-0 group-hover/bar:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="text-white hover:text-primary transition-colors"
              >
                {playing ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" />
                )}
              </button>
              <span className="font-mono text-white/60 text-xs">
                {formatTime(videoRef.current?.currentTime)} /{' '}
                {formatTime(duration)}
              </span>
              <div className="flex-1" />
              <button
                onClick={() => setMuted((m) => !m)}
                className="text-white/60 hover:text-white transition-colors"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <div className="glass border border-white/10 rounded-2xl mt-3 px-5 py-3 flex items-center gap-4">
          <CreatorAvatar handle={video.instagramHandle} name={video.creator} size={28} />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-white text-sm truncate">
              {video.title}
            </h3>
            <a
              href={`https://www.instagram.com/${video.instagramHandle}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-white/50 text-xs hover:text-pink-400 transition-colors flex items-center gap-1"
            >
              <Instagram size={10} className="text-pink-400/70" />
              @{video.instagramHandle}
            </a>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="font-heading text-[9px] font-bold tracking-widest uppercase text-ice-cyan bg-white/5 border border-white/10 rounded-full px-2.5 py-1 hidden md:inline-flex"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-center text-white/25 text-[10px] font-body mt-2 tracking-wide hidden sm:block">
          ← → to navigate · Space to play/pause · Esc to close
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */
export default function Media() {
  const [activeVideo, setActiveVideo] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const gridVideos = showAll ? allVideos : allVideos.slice(0, 8)
  const hasMoreVideos = allVideos.length > 8

  const currentIndex = activeVideo
    ? allVideos.findIndex((v) => v.id === activeVideo.id)
    : -1

  const openVideo = (video) => setActiveVideo(video)
  const closeVideo = () => setActiveVideo(null)
  const prevVideo = () => {
    if (currentIndex > 0) setActiveVideo(allVideos[currentIndex - 1])
  }
  const nextVideo = () => {
    if (currentIndex < allVideos.length - 1)
      setActiveVideo(allVideos[currentIndex + 1])
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* —— PAGE HEADER —— */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-overline block mb-4">
            Creator Collaborations
          </span>
          <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            Influencer Media
            <br />
            <span className="text-primary">Gallery</span>
          </h1>
          <p className="font-body text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Real campaigns. Real creators. Real results. A showcase of
            influencer collaborations managed by Altamash Ansari for Offerzone
            and partner brands.
          </p>
        </motion.div>

        {/* —— STATS STRIP —— */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { label: `${allVideos.length}+ Campaign Videos` },
            { label: 'Top Indian Creators' },
            { label: 'Offerzone × Partner Brands' },
            { label: '15M+ Subscriber Reach' },
          ].map(({ label }) => (
            <div
              key={label}
              className="glass border border-white/10 rounded-full px-3 sm:px-5 py-2 sm:py-2.5"
            >
              <span className="font-heading font-semibold text-white/80 text-xs sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* —— 3D CYLINDER CAROUSEL —— */}
        <section>
          <SectionHeading
            overline="Featured Campaigns"
            heading="Campaign Showcase"
            subtitle="Scroll through all creator collaborations."
            align="center"
            className="mb-8"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
          >
            <CylinderCarousel videos={allVideos} />
          </motion.div>
        </section>

        {/* —— ALL VIDEOS GRID (3:4) —— */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <SectionHeading
              overline="All Campaigns"
              heading="Creator Collaborations"
            />
            <div className="flex items-center gap-2 text-white/50 text-xs font-body">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Click to watch</span>
            </div>
          </div>

          <motion.div
            key={showAll ? 'grid-all' : 'grid-partial'}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {gridVideos.map((video, i) => (
              <motion.div key={video.id} variants={fadeUp} custom={i * 0.06}>
                <VideoCard video={video} onPlay={openVideo} />
              </motion.div>
            ))}
          </motion.div>

          {hasMoreVideos && (
            <div className="flex justify-center mt-10">
              <PrimaryButton
                variant="ghost"
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll
                  ? 'Show Less'
                  : 'Show More'}
              </PrimaryButton>
            </div>
          )}
        </section>

        {/* —— CREATOR ROSTER —— */}
        <section>
          <SectionHeading
            overline="Creator Network"
            heading="Creators Collaborated With"
            subtitle="A growing network of top Indian influencers across entertainment, lifestyle, and tech."
            align="center"
            className="mb-8"
          />
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {[
              { name: 'Jannat Zubair', handle: 'jannatzubair29' },
              { name: 'Elvish Yadav', handle: 'elvish_yadav' },
              { name: 'Faisu (Mr. Faisu)', handle: 'mr_faisu_07' },
              { name: 'Aman Sharma', handle: 'amansharma_0000' },
              { name: 'Shivam Malik', handle: 'shivammalik09' },
              { name: 'Kuldeep Singhania', handle: 'thekuldeepsinghania' },
              { name: 'Kataria', handle: 'corrupt_tuber' },
              { name: 'Nazim Ahmed', handle: 'nazim4hmed' },
              { name: 'Zayn', handle: 'round2hell' },
              { name: 'Sajid Shaikh', handle: 'its_sajid_shaikh' },
              { name: 'Rajat', handle: 'rajat_9629' },
              { name: 'JJ Mobile World', handle: 'jj_mobile_world' },
              { name: 'A2 Motivation', handle: 'arvind.aroraj' },
            ].map((creator, i) => (
              <motion.div key={creator.name} variants={fadeUp} custom={i * 0.04}>
                <a
                  href={`https://www.instagram.com/${creator.handle}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 hover:border-pink-400/30 hover:bg-pink-400/5 transition-all duration-200"
                >
                  <CreatorAvatar handle={creator.handle} name={creator.name} size={20} />
                  <span className="font-heading font-semibold text-white/70 text-[11px] sm:text-xs hover:text-white transition-colors">
                    {creator.name}
                  </span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* —— WORK WITH ME CTA —— */}
        <section>
          <GlassCard
            variant="featured"
            className="border-white/15 text-center max-w-2xl mx-auto"
          >
            <span className="section-overline block mb-4">
              Start a Campaign
            </span>
            <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl md:text-4xl leading-tight mb-3">
              Want Your Brand Featured
              <br />
              with Top Creators?
            </h2>
            <p className="font-body text-white/60 text-sm leading-relaxed mb-7 max-w-sm mx-auto">
              I manage end-to-end influencer campaigns – from creator sourcing
              and negotiation to delivery and reporting.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <PrimaryButton href="/contact" size="lg">
                Book a Discovery Call
              </PrimaryButton>
              <PrimaryButton href="/portfolio" variant="ghost" size="lg">
                View Portfolio
              </PrimaryButton>
            </div>
          </GlassCard>
        </section>
      </div>

      {/* —— VIDEO PLAYER MODAL —— */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            video={activeVideo}
            onClose={closeVideo}
            onPrev={prevVideo}
            onNext={nextVideo}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < allVideos.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
