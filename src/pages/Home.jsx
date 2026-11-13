// src/pages/Home.jsx
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronDown,
  Play,
  Sparkles,
  Star,
  Target,
  Users,
  Handshake,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import FloatingPanel from '../components/ui/FloatingPanel'
import GlassCard from '../components/ui/GlassCard'
import PrimaryButton from '../components/ui/PrimaryButton'
import SectionHeading from '../components/ui/SectionHeading'
import { fadeUp, staggerContainer } from '../hooks/useScrollReveal'
import { portfolioProjects } from '../data/portfolio'
import altamashImg from '../assets/altamash.png'

// Sparkle positions for the hero panel
const sparkles = [
  { top: '18%', left: '12%', delay: 0 },
  { top: '32%', right: '18%', delay: 0.5 },
  { bottom: '35%', left: '42%', delay: 1 },
  { top: '58%', right: '32%', delay: 1.5 },
  { top: '22%', right: '28%', delay: 0.8 },
]

// Stats strip items
const heroStats = [
  '3+ Years',
  '15M+ Subscribers',
  'Offerzone',
  "India's #1 Deals Channel",
]

// What I Do services
const services = [
  {
    icon: Target,
    title: 'Campaign Strategy',
    description:
      'Data-informed influencer campaign roadmaps aligned to brand KPIs, audience resonance, and maximum ROI.',
  },
  {
    icon: Users,
    title: 'Creator Management',
    description:
      'End-to-end creator scouting, contract negotiation, content briefing, and seamless execution.',
  },
  {
    icon: Handshake,
    title: 'Brand Partnerships',
    description:
      'High-impact collaborative deals, affiliate placements, and long-term brand-creator alliances.',
  },
]

/* â”€â”€â”€ Featured Campaign Card with video preview â”€â”€â”€ */
function FeaturedCampaignCard({ project, index }) {
  const videoRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  const handleMouseEnter = () => {
    setHovering(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }
  const handleMouseLeave = () => {
    setHovering(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div variants={fadeUp} custom={index * 0.1}>
      <Link
        to="/media"
        className="block group h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <GlassCard hover className="h-full flex flex-col gap-4">
          {/* Video Thumbnail Preview */}
          <div className="aspect-[9/16] max-h-[320px] rounded-2xl overflow-hidden relative bg-navy">
            {project.videoSrc ? (
              <>
                <video
                  ref={videoRef}
                  src={project.videoSrc}
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <Play size={20} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full border-2 border-dashed border-white/25 flex flex-col items-center justify-center gap-2 bg-white/5">
                <Sparkles size={18} className="text-white/40" />
                <span className="font-heading text-[9px] tracking-widest uppercase text-white/30">Campaign Thumbnail</span>
              </div>
            )}
          </div>
          {/* Meta tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-heading text-[9px] font-semibold tracking-widest uppercase text-ice-cyan bg-white/10 rounded-full px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-heading font-bold text-white text-base leading-snug group-hover:text-ice-cyan transition-colors">
            {project.title}
          </h3>
          <p className="font-body text-white/55 text-xs leading-relaxed flex-1">
            {project.objective}
          </p>
          <div className="flex items-center gap-1.5 text-white/50 group-hover:text-white transition-colors">
            <Play size={11} fill="currentColor" />
            <span className="font-heading font-semibold text-xs">Watch Campaign</span>
            <ArrowUpRight size={13} />
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* â”€â”€ HERO SECTION â”€â”€ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20">
        {/* Atmospheric background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-30"
            style={{
              background:
                'radial-gradient(circle, rgba(181,241,250,0.5) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background:
                'radial-gradient(circle, rgba(0,188,235,0.4) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          {/* Floating Panel with stacked layers */}
          <FloatingPanel>
            <div className="relative min-h-[660px] md:min-h-[720px] flex flex-col">
              {/* Sparkle decorations — CSS animation, no JS */}
              {sparkles.map((s, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white/70 sparkle-dot"
                  style={{
                    top: s.top,
                    left: s.left,
                    right: s.right,
                    bottom: s.bottom,
                    animationDelay: `${s.delay}s`,
                  }}
                />
              ))}

              {/* Atmospheric glow inside panel */}
              <div
                className="absolute bottom-0 right-[15%] w-72 h-72 rounded-full opacity-25 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(181,241,250,0.6) 0%, transparent 70%)',
                }}
              />

              {/* â”€â”€ OVERSIZED HERO NAME â”€â”€ */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
                <span
                  className="font-heading font-bold text-white/[0.08] uppercase tracking-tight whitespace-nowrap"
                  style={{ fontSize: 'clamp(72px, 13vw, 160px)' }}
                >
                  ALTAMASH
                </span>
              </div>

              {/* â”€â”€ PORTRAIT â€” Altamash Ansari â”€â”€ */}
              <motion.div
                className="absolute bottom-0 z-10 pointer-events-none"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 'clamp(320px, 42vw, 580px)',
                }}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3,
                }}
              >
                <img
                  src={altamashImg}
                  alt="Altamash Ansari â€” Influencer Marketing Expert"
                  className="w-full h-auto object-contain object-bottom select-none"
                  style={{
                    display: 'block',
                    maxHeight: '640px',
                    maskImage:
                      'linear-gradient(to top, transparent 0%, black 10%)',
                    WebkitMaskImage:
                      'linear-gradient(to top, transparent 0%, black 10%)',
                    filter: 'drop-shadow(0 0 48px rgba(0,188,235,0.30))',
                  }}
                  draggable={false}
                />
              </motion.div>

              {/* â”€â”€ LEFT CONTENT â”€â”€ */}
              <motion.div
                className="absolute bottom-10 left-8 md:left-12 z-20 max-w-[280px] md:max-w-[340px] lg:max-w-[380px]"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.span
                  variants={fadeUp}
                  custom={0.3}
                  className="section-overline block mb-3"
                >
                  Influencer Marketing Expert
                </motion.span>
                <motion.h1
                  variants={fadeUp}
                  custom={0.4}
                  className="font-heading font-bold text-white text-2xl md:text-3xl lg:text-4xl leading-tight mb-3"
                >
                  Connecting Brands<br />with Creators.
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  custom={0.5}
                  className="font-body text-white/60 text-xs md:text-sm leading-relaxed mb-4"
                >
                  Results-driven Influencer Marketing Manager with 3+ years driving campaigns that matter.
                </motion.p>
                <motion.div
                  variants={fadeUp}
                  custom={0.55}
                  className="w-12 h-px bg-white/20 mb-5"
                />
                <motion.div
                  variants={fadeUp}
                  custom={0.6}
                  className="flex flex-wrap gap-2.5"
                >
                  <PrimaryButton href="/portfolio" size="sm">
                    Explore My Work
                  </PrimaryButton>
                  <PrimaryButton href="/contact" variant="ghost" size="sm">
                    Book a Call
                  </PrimaryButton>
                </motion.div>
              </motion.div>

              {/* â”€â”€ RIGHT CONTENT â€” Badges â”€â”€ */}
              <motion.div
                className="absolute bottom-10 right-8 md:right-12 z-20 flex flex-col items-end gap-3"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeUp} custom={0.4}>
                  <GlassCard
                    variant="sm"
                    className="rounded-full px-4 py-2.5 flex items-center gap-3"
                  >
                    <Sparkles size={14} className="text-ice-cyan" />
                    <div>
                      <div className="font-heading font-bold text-white text-base leading-none">
                        3+
                      </div>
                      <div className="font-heading text-white/55 text-[9px] tracking-widest uppercase mt-0.5">
                        Years Experience
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
                <motion.div variants={fadeUp} custom={0.5}>
                  <GlassCard
                    variant="sm"
                    className="rounded-full px-4 py-2.5 flex items-center gap-3"
                  >
                    <Star
                      size={14}
                      className="text-ice-cyan"
                      fill="currentColor"
                    />
                    <div>
                      <div className="font-heading font-bold text-white text-base leading-none">
                        15M+
                      </div>
                      <div className="font-heading text-white/55 text-[9px] tracking-widest uppercase mt-0.5">
                        Offerzone Subscribers
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
                <motion.div variants={fadeUp} custom={0.6}>
                  <Link
                    to="/portfolio"
                    className="glass border border-white/25 rounded-xl px-3.5 py-2.5 flex items-center gap-2 group hover:bg-white/20 transition-all"
                  >
                    <span className="font-heading font-semibold text-white/70 text-[10px] tracking-widest uppercase group-hover:text-white transition-colors">
                      All Projects
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="text-white/50 group-hover:text-white transition-colors"
                    />
                  </Link>
                </motion.div>
              </motion.div>

              {/* â”€â”€ SCROLL INDICATOR â”€â”€ */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
                <ChevronDown size={14} className="text-white/50 animate-bounce" />
              </motion.div>

              {/* Thin horizontal line divider at bottom of panel */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 pointer-events-none" />
            </div>
          </FloatingPanel>

          {/* â”€â”€ STATS STRIP BELOW HERO PANEL â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {heroStats.map((stat) => (
              <div
                key={stat}
                className="glass border border-white/25 rounded-full px-5 py-2.5 font-heading text-white text-sm font-semibold shadow-card hover:bg-white/20 transition-all"
              >
                {stat}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ WHAT I DO / SERVICES SECTION â”€â”€ */}
      <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
        <SectionHeading
          overline="Services"
          heading="What I Bring to Every Campaign"
          subtitle="End-to-end influencer marketing execution engineered for reach, engagement, and measurable ROI."
          className="mb-12"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={fadeUp} custom={index * 0.1}>
              <GlassCard hover className="h-full flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-ice-cyan mb-5 shadow-inner">
                    <service.icon size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-white text-xl mb-3">
                    {service.title}
                  </h3>
                  <p className="font-body text-white/65 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ FEATURED PROJECTS PREVIEW â”€â”€ */}
      <section className="px-4 pb-24 max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <SectionHeading
            overline="Selected Work"
            heading="Featured Campaigns"
            subtitle="A snapshot of campaigns and influencer marketing strategies."
          />
          <PrimaryButton
            href="/portfolio"
            variant="ghost"
            size="sm"
            icon={<ArrowUpRight size={14} />}
          >
            View All Work
          </PrimaryButton>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {portfolioProjects.slice(0, 3).map((project, i) => (
            <FeaturedCampaignCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ CTA BANNER SECTION â”€â”€ */}
      <section className="px-4 pb-24 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <GlassCard
            variant="featured"
            className="relative overflow-hidden text-center py-12 md:py-16 px-6 md:px-12 flex flex-col items-center"
          >
            {/* Background ambient glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-30 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(181,241,250,0.6) 0%, transparent 70%)',
              }}
            />

            <span className="section-overline block mb-3 text-ice-cyan">
              Let's Collaborate
            </span>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight max-w-2xl mb-4">
              Ready to build something influential?
            </h2>
            <p className="font-body text-white/70 text-sm md:text-base max-w-xl mx-auto mb-8">
              Whether launching a new product, scaling community reach, or orchestrating multi-creator campaigns â€” let's connect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton
                href="/portfolio"
                size="md"
                icon={<ArrowUpRight size={16} />}
              >
                View Full Portfolio
              </PrimaryButton>
              <PrimaryButton href="/contact" variant="ghost" size="md">
                Let's Talk
              </PrimaryButton>
            </div>
          </GlassCard>
        </motion.div>
      </section>
    </div>
  )
}
