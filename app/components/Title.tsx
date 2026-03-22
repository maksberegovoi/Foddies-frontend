import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "~/lib/utils"

interface TitleProps extends ComponentPropsWithoutRef<"h1"> {
  as?: "h1" | "h2" | "h3" | "h4"
  children: ReactNode
  className?: string
}

const baseStyles = "uppercase text-dark font-extrabold"
const styles = {
  h1: cn(
    // Mobile
    "text-[40px] leading-[40px] tracking-[-0.8px]",
    // Tablet
    "md:text-[70px] md:leading-[70px] md:tracking-[-1.4px]",
    // Desktop
    "lg:text-[90px] lg:leading-[90px] lg:tracking-[-1.8px]"
  ),
  h2: cn(
    // Mobile
    "text-[28px] leading-[32px] tracking-[-0.56px]",
    // Tablet & Desktop
    "md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]"
  ),
  h3: cn(
    // Mobile
    "text-[20px] leading-[24px] tracking-[-0.4px]",
    // Tablet & Desktop
    "md:text-[26px] md:leading-[30px] md:tracking-[-0.52px]"
  ),
  h4: cn(
    // Mobile
    "text-[16px] leading-[24px] tracking-[-0.32px]",
    // Tablet & Desktop
    "md:text-[20px] md:leading-[24px] md:tracking-[-0.4px]"
  ),
}

export default function Title({
  as: Component = "h1",
  children,
  className,
  ...props
}: TitleProps) {
  return (
    <Component
      {...props}
      className={cn(baseStyles, styles[Component], className)}
    >
      {children}
    </Component>
  )
}
