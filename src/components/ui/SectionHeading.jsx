// src/components/ui/SectionHeading.jsx
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { fadeUp } from '../../hooks/useScrollReveal'

/**
 * SectionHeading — editorial style section header
 * overline: string — small uppercase label above heading
 * heading: string  — main H2 or H3
 * subtitle: string — optional body text below
 * align: 'left' | 'center' | 'right'
 * light: boolean   — light colour variant (for light backgrounds)
 */
export default function SectionHeading({
  overline,
  heading,
  subtitle,
  align = 'left',
  light = false,
  className,
}) {
  const alignClass = {
    left:   'text-left  items-start',
    center: 'text-center items-center',
    right:  'text-right  items-end',
  }[align]

  return (
    <motion.div
      className={cn('flex flex-col gap-3', alignClass, className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {overline && (
        <motion.span
          variants={fadeUp}
          custom={0}
          className={cn(
            'font-heading font-semibold text-xs tracking-[0.15em] uppercase',
            light ? 'text-ocean' : 'text-ice-cyan/90',
          )}
        >
          {overline}
        </motion.span>
      )}

      <motion.h2
        variants={fadeUp}
        custom={0.08}
        className={cn(
          'font-heading font-bold leading-tight',
          'text-3xl md:text-4xl lg:text-5xl',
          light ? 'text-deep-teal' : 'text-white',
        )}
      >
        {heading}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={0.16}
          className={cn(
            'font-body text-sm md:text-base leading-relaxed max-w-xl',
            light ? 'text-deep-teal/70' : 'text-white/65',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

