// src/components/ui/PrimaryButton.jsx
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * PrimaryButton
 * variant: 'solid' | 'ghost' | 'glass'
 * size: 'sm' | 'md' | 'lg'
 */
export default function PrimaryButton({
  children,
  variant = 'solid',
  size = 'md',
  className,
  href,
  onClick,
  icon,
  ...rest
}) {
  const base = 'inline-flex items-center gap-2 rounded-full font-heading font-bold tracking-wider uppercase transition-all duration-300'

  const sizes = {
    sm: 'text-xs  px-5  py-2.5',
    md: 'text-sm  px-6  py-3',
    lg: 'text-base px-8 py-4',
  }

  const variants = {
    solid: 'bg-white text-deep-teal shadow-card hover:shadow-glow hover:scale-105',
    ghost: 'text-white border border-white/35 glass hover:bg-white/20 hover:border-white/50',
    glass: 'bg-white/15 text-white border border-white/30 backdrop-blur-sm hover:bg-white/25',
  }

  const cls = cn(base, sizes[size], variants[variant], className)

  const content = (
    <>
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...rest}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={cls}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {content}
    </motion.button>
  )
}

