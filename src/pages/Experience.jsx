// src/pages/Experience.jsx
import { motion } from 'framer-motion'
import { Calendar, MapPin, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import PrimaryButton from '../components/ui/PrimaryButton'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '../hooks/useScrollReveal'
import { experiences, stats } from '../data/experience'
import { cn } from '../utils/cn'

const colorBadgeStyles = {
  primary: 'bg-primary/20 text-ice-cyan border-primary/50 shadow-[0_0_12px_rgba(0,188,235,0.25)]',
  ocean: 'bg-ocean/30 text-cloud border-ice-cyan/40',
  'deep-teal': 'bg-deep-teal/40 text-ice-cyan border-ice-cyan/30',
}

function ExperienceCard({ exp }) {
  const isHighlight = exp.highlight

  return (
    <GlassCard
      variant={isHighlight ? 'featured' : 'lg'}
      className={cn(
        'relative overflow-hidden transition-all duration-300 text-left',
        isHighlight
          ? 'border-primary/60 bg-white/[0.22] shadow-panel ring-1 ring-primary/40'
          : 'border-white/30 hover:border-white/45'
      )}
    >
      {/* Ambient glow for highlighted card */}
      {isHighlight && (
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Card Header & Badges */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={cn(
                'font-heading font-bold text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full border',
                colorBadgeStyles[exp.color] || colorBadgeStyles.primary
              )}
            >
              {exp.badge}
            </span>
            {isHighlight && (
              <span className="inline-flex items-center gap-1 font-heading font-bold text-[10px] tracking-wider uppercase text-white bg-white/20 border border-white/35 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                <Sparkles size={11} className="text-ice-cyan" />
                Primary Role
              </span>
            )}
          </div>

          <h3 className="font-heading font-bold text-white text-xl sm:text-2xl leading-tight">
            {exp.role}
          </h3>
          <p className="font-heading font-semibold text-ice-cyan text-sm sm:text-base mt-1">
            {exp.company}
          </p>
          <p className="font-body text-white/60 text-xs sm:text-sm mt-0.5">
            {exp.companyDesc}
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0 pt-1 font-body text-xs text-white/65 space-y-1">
          <div className="flex items-center sm:justify-end gap-1.5">
            <Calendar size={13} className="text-ice-cyan shrink-0" />
            <span>{exp.period}</span>
          </div>
          <div className="flex items-center sm:justify-end gap-1.5">
            <MapPin size={13} className="text-ice-cyan shrink-0" />
            <span>{exp.location}</span>
          </div>
        </div>
      </div>

      {/* Responsibilities */}
      <div className="relative z-10 mb-6">
        <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
          Key Responsibilities &amp; Deliverables
        </h4>
        <ul className="space-y-2.5">
          {exp.responsibilities.map((r, ri) => (
            <li
              key={ri}
              className="flex items-start gap-2.5 font-body text-white/75 text-xs sm:text-sm leading-relaxed"
            >
              <ChevronRight
                size={15}
                className={cn('shrink-0 mt-0.5', isHighlight ? 'text-primary' : 'text-ice-cyan/70')}
              />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills tags */}
      <div className="relative z-10 pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="font-heading text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-white/80 bg-white/10 hover:bg-white/15 border border-white/15 rounded-full px-3 py-1 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export default function Experience() {
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
              Career Journey
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-heading font-bold text-white text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6 tracking-tight"
            >
              Experience &amp; Expertise
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="font-body text-white/75 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              3+ years of building campaigns, creator networks, and high-impact commercial outcomes in the influencer marketing space.
            </motion.p>
          </motion.div>
        </section>

        {/* ── 2. STATS ROW ── */}
        <section>
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {stats.map(({ number, label }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i * 0.08}>
                <GlassCard hover className="text-center p-6 sm:p-8 flex flex-col items-center justify-center h-full">
                  <div className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-2 tracking-tight text-white">
                    {number}
                  </div>
                  <div className="font-heading text-white/65 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                    {label}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── 3. TIMELINE ── */}
        <section className="relative">
          {/* Vertical centre timeline line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[2px] bg-gradient-to-b from-primary via-white/30 to-white/10 -translate-x-1/2 pointer-events-none" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={exp.id} className="relative">
                  {/* Timeline Node Dot (desktop) */}
                  <div
                    className={cn(
                      'hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 z-20 items-center justify-center transition-all duration-300',
                      exp.highlight
                        ? 'w-6 h-6 bg-primary border-white shadow-[0_0_20px_rgba(0,188,235,1)] scale-110'
                        : 'w-4 h-4 bg-ocean border-white/80 shadow-[0_0_10px_rgba(0,188,235,0.4)]'
                    )}
                  >
                    <div className={cn('rounded-full', exp.highlight ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-ice-cyan')} />
                  </div>

                  <div className="md:grid md:grid-cols-2 md:gap-12 items-start">
                    {/* Left slot */}
                    <div className={cn(isLeft ? 'block' : 'hidden md:block md:invisible')} aria-hidden={!isLeft}>
                      {isLeft && (
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: '-60px' }}
                          variants={slideInLeft}
                          className="md:pr-6"
                        >
                          <ExperienceCard exp={exp} />
                        </motion.div>
                      )}
                    </div>

                    {/* Right slot */}
                    <div className={cn(!isLeft ? 'block' : 'hidden md:block md:invisible')} aria-hidden={isLeft}>
                      {!isLeft && (
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: '-60px' }}
                          variants={slideInRight}
                          className="md:pl-6"
                        >
                          <ExperienceCard exp={exp} />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── 4. BOTTOM CTA ── */}
        <section className="text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <GlassCard variant="featured" className="max-w-3xl mx-auto border-white/35">
              <span className="section-overline block mb-3">Work With Me</span>
              <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                Ready to Run Your Next Campaign?
              </h2>
              <p className="font-body text-white/70 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
                From strategic creator discovery to high-scale execution and ROI optimization, I bring proven experience to every partnership.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <PrimaryButton href="/contact" size="lg" icon={<ArrowUpRight size={18} />}>
                  Book a Discovery Call
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
