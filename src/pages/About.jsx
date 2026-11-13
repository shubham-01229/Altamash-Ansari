// src/pages/About.jsx
import { motion } from 'framer-motion'
import {
  Target,
  Handshake,
  TrendingUp,
  PenTool,
  Megaphone,
  Users,
  Award,
  Video,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import altamashImg from '../assets/altamash.png'
import GlassCard from '../components/ui/GlassCard'
import SectionHeading from '../components/ui/SectionHeading'
import PrimaryButton from '../components/ui/PrimaryButton'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '../hooks/useScrollReveal'
import { cn } from '../utils/cn'

const expertise = [
  {
    icon: Target,
    label: 'Creator Sourcing',
    desc: 'Identifying, vetting, and onboarding high-affinity creators tailored precisely to campaign goals and buyer personas.',
  },
  {
    icon: Handshake,
    label: 'Contract Negotiation',
    desc: 'Structuring transparent, win-win agreements that safeguard deliverables, usage rights, and commercial expectations.',
  },
  {
    icon: TrendingUp,
    label: 'Budget Optimization',
    desc: 'Allocating marketing spend strategically across creator tiers to maximize reach, engagement, and conversion ROI.',
  },
  {
    icon: PenTool,
    label: 'Content Strategy',
    desc: 'Developing platform-native creative angles and briefs that resonate organically and convert without ad fatigue.',
  },
  {
    icon: Megaphone,
    label: 'Campaign Execution',
    desc: 'Managing end-to-end delivery — from initial briefing and script sign-offs to coordinated go-lives and reporting.',
  },
  {
    icon: Users,
    label: 'Brand Partnerships',
    desc: 'Building enduring, mutually beneficial relationships between growing brands and influential creator communities.',
  },
  {
    icon: Award,
    label: 'Social Media Management',
    desc: 'Scaling brand voice, follower retention, and daily engagement across modern digital and social channels.',
  },
  {
    icon: Video,
    label: 'Video Editing',
    desc: 'Producing high-retention short-form video content optimized specifically for Reels, Shorts, and algorithmic reach.',
  },
]

const approachSteps = [
  'Deep-dive into brand objectives, KPIs, and target demographics before scouting talent',
  'Screen creators through engagement forensics and audience authenticity, avoiding vanity metrics',
  'Oversee hands-on briefing that balances brand talking points with natural creator autonomy',
  'Structure transparent contracts, milestone tracking, and strict deliverable compliance',
  'Analyze full-funnel post-campaign metrics to extract actionable insights for iterative growth',
]

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24">

        {/* ── 1. HERO HEADER ── */}
        <section className="text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto flex flex-col items-center"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="section-overline block mb-3"
            >
              About Altamash
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-heading font-bold text-white text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6 tracking-tight"
            >
              Where Strategy<br className="hidden sm:inline" /> Meets Influence.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="font-body text-white/75 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              Influencer Marketing Expert with 3+ years of building creator ecosystems, driving high-ROI campaigns, and turning digital attention into measurable commercial growth.
            </motion.p>
          </motion.div>
        </section>

        {/* ── 2. INTRO SPLIT ── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left — 3 paragraphs & action buttons */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={slideInLeft}
              className="lg:col-span-6 space-y-6"
            >
              <div className="space-y-4">
                <p className="font-body text-white/80 text-base md:text-lg leading-relaxed">
                  I'm <strong className="text-white font-semibold">Altamash Ansari</strong> — an Influencer Marketing Expert with over 3 years of hands-on experience bridging the gap between ambitious brands and trusted digital creators. My focus is on turning creator collaborations from unpredictable expenses into predictable, high-performing revenue drivers.
                </p>
                <p className="font-body text-white/70 text-base leading-relaxed">
                  In my primary role at <strong className="text-ice-cyan font-semibold">Offerzone</strong> — India's largest deals Telegram channel with an audience exceeding <strong className="text-white font-semibold">15M+ subscribers</strong> — I have spearheaded influencer operations, managed multi-tier creator rosters, executed high-velocity deal distributions, and optimized budgets to achieve industry-leading reach and conversion.
                </p>
                <p className="font-body text-white/70 text-base leading-relaxed">
                  My philosophy marries data-informed creator discovery with genuine relationship building. I believe sustainable influence isn't bought through transactional shoutouts — it is earned when a brand's narrative integrates seamlessly with a creator's natural voice, delivering tangible impact for both parties.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <PrimaryButton href="/experience" size="md">
                  View My Experience
                </PrimaryButton>
                <PrimaryButton href="/contact" variant="ghost" size="md">
                  Get In Touch
                </PrimaryButton>
              </div>
            </motion.div>

            {/* Right — portrait */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={slideInRight}
              className="lg:col-span-6"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-panel">
                {/* Ambient glow behind image */}
                <div
                  className="absolute inset-0 z-0"
                  style={{ background: 'linear-gradient(135deg, #0D2444 0%, #0A1F3D 55%, #071527 100%)' }}
                />
                {/* Photo */}
                <img
                  src={altamashImg}
                  alt="Altamash Ansari — Influencer Marketing Expert"
                  className="absolute inset-0 w-full h-full object-contain object-bottom select-none scale-110 origin-bottom"
                  style={{
                    maskImage: 'linear-gradient(to top, transparent 0%, black 10%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%)',
                    filter: 'drop-shadow(0 0 32px rgba(0,188,235,0.25))',
                  }}
                  draggable={false}
                />
                {/* Glass top highlight */}
                <div
                  className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
                />
                {/* Name badge overlay */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                  <div className="glass border border-white/35 rounded-full px-5 py-2 flex items-center gap-2 shadow-glass">
                    <span className="font-heading font-bold text-white text-sm tracking-wide">Altamash Ansari</span>
                    <span className="w-1 h-1 rounded-full bg-ice-cyan" />
                    <span className="font-heading text-white/60 text-xs tracking-widest uppercase">IME</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 3. MARKETING PHILOSOPHY ── */}
        <section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <GlassCard variant="featured" className="border-white/30">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-2">
                  <SectionHeading
                    overline="Philosophy"
                    heading="Influence Built on Trust"
                    subtitle="True influence cannot be forced through vanity metrics — it stems from alignment, empathy, and consistency."
                  />
                </div>
                <div className="lg:col-span-3 space-y-4">
                  <p className="font-body text-white/80 text-base leading-relaxed">
                    The modern creator ecosystem is crowded, but genuine attention remains scarce. The most effective campaigns don't rely on generic scripts or disconnected follower counts — they succeed when the right creator communicates an authentic recommendation to an attentive, trusting community.
                  </p>
                  <p className="font-body text-white/70 text-base leading-relaxed">
                    Every collaboration I direct is built around three core pillars:{' '}
                    <strong className="text-white font-semibold">Authenticity</strong> (preserving the creator's organic tone),{' '}
                    <strong className="text-white font-semibold">Strategic Fit</strong> (meticulously aligning audience demographics with brand buyer profiles), and{' '}
                    <strong className="text-white font-semibold">Measurable Impact</strong> (ensuring every rupee spent is tracked against tangible engagement and revenue goals).
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* ── 4. EXPERTISE GRID ── */}
        <section>
          <SectionHeading
            overline="Core Capabilities"
            heading="Areas of Expertise"
            subtitle="A multidisciplinary skill set developed through high-scale campaigns and verified commercial outcomes."
            className="mb-12"
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {expertise.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i * 0.05}>
                <GlassCard hover className="h-full flex flex-col justify-between p-6">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-4 text-ice-cyan shadow-sm">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-heading font-bold text-white text-base leading-snug mb-2">
                      {label}
                    </h3>
                    <p className="font-body text-white/65 text-xs sm:text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── 5. PERSONAL APPROACH ── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* How I Work */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={slideInLeft}
              className="h-full"
            >
              <GlassCard variant="lg" className="h-full flex flex-col justify-between">
                <div>
                  <SectionHeading
                    overline="Execution"
                    heading="How I Work"
                    className="mb-6"
                  />
                  <ul className="space-y-4">
                    {approachSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 font-body text-white/75 text-sm leading-relaxed">
                        <CheckCircle2 size={18} className="text-ice-cyan shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-white/50 text-xs font-heading uppercase tracking-wider">
                  <Sparkles size={14} className="text-primary" />
                  <span>Disciplined • Transparent • Outcome-Driven</span>
                </div>
              </GlassCard>
            </motion.div>

            {/* Beyond Work */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={slideInRight}
              className="h-full"
            >
              <GlassCard variant="lg" className="h-full flex flex-col justify-between">
                <div>
                  <SectionHeading
                    overline="Background"
                    heading="Beyond Work"
                    className="mb-6"
                  />
                  <div className="space-y-4 font-body text-white/70 text-sm leading-relaxed">
                    <p>
                      <strong className="text-white font-medium">Digital Communities & Subcultures:</strong> My fascination with creator marketing began with observing how passionate online groups form around niche topics. Understanding how community dynamics work allows me to craft campaigns that fit naturally into social conversations.
                    </p>
                    <p>
                      <strong className="text-white font-medium">Leadership Under Pressure:</strong> Managing official college fests and leading their digital promotions provided my foundational experience in large-scale logistics, crisis resolution, and aligning diverse teams toward high-stakes deadlines.
                    </p>
                    <p>
                      <strong className="text-white font-medium">Production & Video Craft:</strong> Working hands-on with video editing tools keeps me intimately connected to the mechanics of retention, pacing, and visual hooks — making me a sharper strategist and a more intuitive collaborator for creators.
                    </p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-white/50 text-xs font-heading uppercase tracking-wider">
                  <Sparkles size={14} className="text-primary" />
                  <span>Creative Roots • Team Leadership • Practical Craft</span>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* ── 6. BOTTOM CTA ── */}
        <section className="text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <GlassCard variant="featured" className="max-w-3xl mx-auto border-white/35">
              <span className="section-overline block mb-3">Ready to Collaborate?</span>
              <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                Let's Create Something<br className="hidden sm:inline" /> Influential Together.
              </h2>
              <p className="font-body text-white/70 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
                Whether you are looking to scale an existing creator initiative or build an end-to-end influencer strategy from scratch, I'm ready to help you drive real impact.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <PrimaryButton href="/contact" size="lg" icon={<ArrowUpRight size={18} />}>
                  Start a Conversation
                </PrimaryButton>
                <PrimaryButton href="/portfolio" variant="ghost" size="lg">
                  View My Work
                </PrimaryButton>
              </div>
            </GlassCard>
          </motion.div>
        </section>

      </div>
    </div>
  )
}
