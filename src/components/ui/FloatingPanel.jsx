// src/components/ui/FloatingPanel.jsx
// Signature 3-layer stacked glass panel — GPU optimized

import { cn } from '../../utils/cn'

export default function FloatingPanel({ children, className }) {
  return (
    <div className={cn('relative w-full', className)}>
      {/* Back layer 3 — furthest */}
      <div
        className="absolute inset-0 rounded-4xl"
        style={{
          transform: 'scale(0.88) translateY(28px)',
          background: 'rgba(0,188,235,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          zIndex: 1,
        }}
      />
      {/* Back layer 2 */}
      <div
        className="absolute inset-0 rounded-4xl"
        style={{
          transform: 'scale(0.94) translateY(14px)',
          background: 'rgba(0,188,235,0.08)',
          border: '1px solid rgba(255,255,255,0.10)',
          zIndex: 2,
        }}
      />
      {/* Main front panel */}
      <div
        className="relative rounded-4xl overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #0D2444 0%, #0A1F3D 55%, #071527 100%)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow:
            '0 32px 80px rgba(0,10,30,0.70), 0 0 0 1px rgba(0,188,235,0.12)',
          zIndex: 3,
        }}
      >
        {/* Glass top highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
        />
        {children}
      </div>
    </div>
  )
}
