import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "~/lib/utils"

interface TextProps extends ComponentPropsWithoutRef<"p"> {
  as?: "p" | "span"
  children: ReactNode
  className?: string
}

const styles = cn(
  //Default
  "font-medium text-light-dark",
  //Mobile
  "text-[14px] leading-[20px] tracking-[-0.28px]",
  //Tablet
  "md:text-[16px] md:leading-[24px] md:tracking-[-0.32px]"
)

export default function Text({
  as: Component = "p",
  children,
  className,
  ...props
}: TextProps) {
  return (
    <Component {...props} className={cn(styles, className)}>
      {children}
    </Component>
  )
}
