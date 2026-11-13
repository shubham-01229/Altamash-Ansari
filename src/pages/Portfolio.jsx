// src/pages/Portfolio.jsx
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Play, Pause, Volume2, VolumeX, Instagram } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import PrimaryButton from '../components/ui/PrimaryButton'
import { fadeUp, staggerContainer } from '../hooks/useScrollReveal'
import { portfolioProjects, portfolioFilters } from '../data/portfolio'
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

/* ─── Portfolio Card — static thumbnail, click to open ─── */
function PortfolioCard({ project, onClick }) {
  return (
    <GlassCard
      hover
      onClick={onClick}
      className={cn(
        'group cursor-pointer h-full flex flex-col gap-4',
        project.featured && 'border-white/35',
      )}
    >
      {/* 3:4 Video Thumbnail — no autoplay */}
      <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden relative bg-navy/50">
        {project.videoSrc ? (
          <>
            <video
              src={project.videoSrc}
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                <Play size={20} className="text-white ml-0.5" fill="white" />
              </div>
            </div>
            {/* Creator avatar + name overlay */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <CreatorAvatar handle={project.instagramHandle} name={project.creatorsInvolved || project.brand} size={24} />
                <span className="font-heading font-semibold text-white text-xs truncate">
                  {project.creatorsInvolved || project.brand}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 bg-white/5">
            <Play size={24} className="text-ice-cyan/70" />
            <span className="font-heading text-[10px] tracking-widest uppercase text-white/40">
              Campaign Video
            </span>
          </div>
        )}
      </div>

      {/* Category + Featured Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-heading text-[10px] font-semibold tracking-wider uppercase text-ice-cyan bg-white/10 border border-white/15 rounded-full px-3 py-1">
          {project.category}
        </span>
        {project.featured && (
          <span className="font-heading text-[10px] font-semibold tracking-wider uppercase text-white bg-white/15 border border-white/25 rounded-full px-3 py-1">
            Featured
          </span>
        )}
      </div>

      {/* Project Title */}
      <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-snug group-hover:text-ice-cyan transition-colors duration-200">
        {project.title}
      </h3>

      {/* Brand | My Role */}
      <div className="grid grid-cols-2 gap-3 text-xs font-body">
        <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
          <span className="font-heading font-semibold text-white/40 text-[9px] tracking-widest uppercase block mb-1">
            Brand
          </span>
          <span className="text-white/85 font-medium truncate block text-[11px] sm:text-xs">
            {project.brand}
          </span>
        </div>
        <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
          <span className="font-heading font-semibold text-white/40 text-[9px] tracking-widest uppercase block mb-1">
            My Role
          </span>
          <span className="text-white/85 font-medium truncate block text-[11px] sm:text-xs">
            {project.myRole}
          </span>
        </div>
      </div>

      {/* Objective */}
      <p className="font-body text-white/60 text-xs leading-relaxed flex-1 line-clamp-2">
        {project.objective}
      </p>

      {/* Instagram handle link */}
      <a
        href={`https://www.instagram.com/${project.instagramHandle}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-white/50 hover:text-pink-400 transition-colors font-heading font-semibold text-xs tracking-wider pt-1 mt-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Instagram size={13} className="text-pink-400/70" />
        <span>@{project.instagramHandle}</span>
      </a>
    </GlassCard>
  )
}

/* ─── Case Study Modal ─── */
function CaseStudyModal({ project, onClose }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === ' ') { e.preventDefault(); togglePlay() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [playing])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play().catch(() => {}); setPlaying(true) }
  }

  const seek = (e) => {
    const bar = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - bar.left) / bar.width
    if (videoRef.current) videoRef.current.currentTime = pct * videoRef.current.duration
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#071527]/80 backdrop-blur-md" />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard variant="lg" className="relative border-white/30">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors z-20"
          >
            <X size={16} />
          </button>

          {/* Video Player — click to play, no autoplay */}
          {project.videoSrc ? (
            <div className="aspect-[3/4] max-h-[50vh] w-full rounded-2xl overflow-hidden relative bg-black mb-6">
              <video
                ref={videoRef}
                src={project.videoSrc}
                muted={muted}
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
                onTimeUpdate={() => {
                  if (!videoRef.current) return
                  const p = (videoRef.current.currentTime / videoRef.current.duration) * 100
                  setProgress(isNaN(p) ? 0 : p)
                }}
                onLoadedMetadata={() => { if (videoRef.current) setDuration(videoRef.current.duration) }}
                onEnded={() => setPlaying(false)}
                onClick={togglePlay}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer" onClick={seek}>
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
                    {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                  </button>
                  <span className="font-mono text-white/60 text-xs">
                    {formatTime(videoRef.current?.currentTime)} / {formatTime(duration)}
                  </span>
                  <div className="flex-1" />
                  <button onClick={() => setMuted(m => !m)} className="text-white/60 hover:text-white transition-colors">
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] max-h-[50vh] w-full rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5 mb-6">
              <Play size={28} className="text-ice-cyan/70" />
            </div>
          )}

          {/* Creator info */}
          <div className="flex items-center gap-3 mb-4">
            <CreatorAvatar handle={project.instagramHandle} name={project.creatorsInvolved || project.brand} size={32} />
            <div>
              <span className="font-heading font-bold text-white text-sm">{project.creatorsInvolved || project.brand}</span>
              <a
                href={`https://www.instagram.com/${project.instagramHandle}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/50 text-xs hover:text-pink-400 transition-colors"
              >
                <Instagram size={10} className="text-pink-400/70" />
                @{project.instagramHandle}
              </a>
            </div>
          </div>

          <span className="font-heading font-semibold text-xs tracking-[0.15em] uppercase text-ice-cyan block mb-2">
            {project.category}
          </span>
          <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl leading-tight mb-6">
            {project.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Brand', value: project.brand },
              { label: 'My Role', value: project.myRole },
              { label: 'Platform', value: project.tags?.join(', ') || 'Multi-platform' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="font-heading text-[9px] font-semibold tracking-widest uppercase text-white/40 block mb-1">{label}</span>
                <span className="font-body text-white/90 text-xs font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {[
              { label: 'Objective', value: project.objective },
              { label: 'Strategy', value: project.strategy },
              { label: 'Creators Involved', value: project.creatorsInvolved },
              { label: 'Campaign Outcome', value: project.outcome },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="font-heading text-[10px] font-semibold tracking-widest uppercase text-ice-cyan mb-1">{label}</div>
                <p className="font-body text-white/80 text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Portfolio Page ─── */
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = activeFilter === 'All'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeFilter)

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="font-heading font-semibold text-xs tracking-[0.15em] uppercase text-ice-cyan/90 block mb-3">
            Selected Work
          </span>
          <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4">
            Portfolio &amp; Campaigns
          </h1>
          <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mx-auto">
            Real influencer campaigns managed by Altamash Ansari — from creator sourcing and content strategy to end-to-end delivery and reporting.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-3 mb-10 justify-start sm:justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {portfolioFilters.map(filter => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'font-heading font-semibold text-[11px] sm:text-xs tracking-wider uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-200 whitespace-nowrap shrink-0',
                  isActive
                    ? 'bg-white text-deep-teal border-white shadow-card'
                    : 'text-white/75 border-white/20 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/35'
                )}
              >
                {filter}
              </button>
            )
          })}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <PortfolioCard project={project} onClick={() => setSelected(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selected && (
            <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-20 text-center">
          <GlassCard variant="featured" className="max-w-xl mx-auto">
            <span className="font-heading font-semibold text-xs tracking-[0.15em] uppercase text-ice-cyan/90 block mb-3">
              Let's Build Together
            </span>
            <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl leading-tight mb-4">
              Have a Campaign in Mind?
            </h2>
            <p className="font-body text-white/70 text-sm leading-relaxed mb-6 max-w-md mx-auto">
              Let's craft high-impact influencer partnerships and data-driven campaigns tailored to your brand's growth.
            </p>
            <PrimaryButton href="/contact" size="lg" icon={<ArrowUpRight size={18} />}>
              Start a Conversation
            </PrimaryButton>
          </GlassCard>
        </div>

      </div>
    </div>
  )
}
