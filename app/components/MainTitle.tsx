import { cn } from "~/lib/utils"

interface MainTitleProps {
  children: React.ReactNode
  className?: string
}

export default function MainTitle({ children, className }: MainTitleProps) {
  return (
    <h1
      className={cn(
        "mb-4 text-[28px] leading-8 font-extrabold tracking-[-0.8px] text-dark uppercase md:mb-5 md:text-[40px] md:leading-11",
        className
      )}
    >
      {children}
    </h1>
  )
}
