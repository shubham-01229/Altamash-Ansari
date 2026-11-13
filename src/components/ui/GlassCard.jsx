// src/components/ui/GlassCard.jsx
import { cn } from '../../utils/cn'

/**
 * GlassCard — frosted glass container (GPU-optimized, no backdrop-blur)
 * variant: 'sm' | 'md' | 'lg' | 'featured'
 * hover: boolean — whether to apply hover lift effect
 */
export default function GlassCard({
  children,
  className,
  variant = 'md',
  hover = false,
  onClick,
  as: Tag = 'div',
  ...rest
}) {
  const base =
    'rounded-3xl border border-white/20 transition-all duration-200 will-change-transform'

  const variants = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 md:p-10',
    featured: 'p-8 md:p-12 border-white/30 shadow-panel',
  }

  const hoverStyles = hover
    ? 'hover:-translate-y-1 hover:border-white/35 hover:shadow-card cursor-pointer'
    : ''

  return (
    <Tag
      className={cn(base, variants[variant], hoverStyles, className)}
      onClick={onClick}
      style={{ background: 'rgba(255, 255, 255, 0.04)' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
