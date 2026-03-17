import { cn } from "~/lib/utils"

interface SubtitleProps {
  children: React.ReactNode
  className?: string
}

export default function Subtitle({ children, className }: SubtitleProps) {
  return (
    <p
      className={cn(
        "text-base leading-6 font-medium tracking-[-0.32px] text-light-dark",
        className
      )}
    >
      {children}
    </p>
  )
}
