import { ShieldAlert } from 'lucide-react'

export function DemoBanner() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-foreground px-4 py-2 text-center text-xs font-medium text-background sm:text-sm">
      <ShieldAlert className="size-4 shrink-0" aria-hidden="true" />
      <span className="text-pretty">
        Cybersecurity Hackathon Demonstration — Do NOT enter real personal or
        payment information.
      </span>
    </div>
  )
}
