import { cn } from "~/lib/utils"

interface MainTitleProps {
  children: React.ReactNode
  className?: string
}

export default function MainTitle({ children, className }: MainTitleProps) {
  return (
    <h1
      className={cn(
        "text-4xl leading-11 font-extrabold tracking-[-0.8px] text-dark uppercase",
        className
      )}
    >
      {children}
    </h1>
  )
}
