import { JobCategory } from '@/lib/types'

function RoadIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20L9 4h6l5 16M8 14h8M10 4L7 20M14 4l3 16" />
    </svg>
  )
}
function BridgeIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17c2-4 5-6 10-6s8 2 10 6" /><path d="M6 17V9M12 17V7M18 17V9" /><path d="M2 17h20" />
    </svg>
  )
}
function CubeIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5v10l-9 5-9-5V7z" /><path d="M3 7l9 5 9-5M12 12v10" />
    </svg>
  )
}
function CompassIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M16 8l-2.5 6.5L7 17l2.5-6.5z" />
    </svg>
  )
}
function PeopleIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" /><circle cx="17" cy="8" r="2.3" />
      <path d="M2 21c0-3.3 3.1-6 7-6s7 2.7 7 6M15.5 13.8c2.6.4 4.5 2.4 4.5 4.7" />
    </svg>
  )
}
function ShieldCheckIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  )
}
function DropletIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  )
}

const ICONS: Record<JobCategory, () => React.JSX.Element> = {
  roads: RoadIcon,
  bridges: BridgeIcon,
  bim: CubeIcon,
  surveying: CompassIcon,
  team: PeopleIcon,
  supervision: ShieldCheckIcon,
  networks: DropletIcon,
}

export default function JobCategoryIcon({ category }: { category: JobCategory }) {
  const Icon = ICONS[category] ?? RoadIcon
  return <Icon />
}
