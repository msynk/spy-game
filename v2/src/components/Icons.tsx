/** Inline SVG icon set. Keeps the build asset-free and themable via currentColor. */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const baseProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  )
}

export function PlayersIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 19c.6-3 3.4-4.5 6.5-4.5s5.9 1.5 6.5 4.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14c2.5 0 4.5 1.2 5 3.5" />
    </svg>
  )
}

export function SpyIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 12h18l-2-5H5z" />
      <circle cx="7.5" cy="15.5" r="2.8" />
      <circle cx="16.5" cy="15.5" r="2.8" />
      <path d="M10.3 15.5h3.4" />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m4.5 12.5 4.5 4.5L19 7" />
    </svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}
