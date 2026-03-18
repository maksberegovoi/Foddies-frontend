import type { ReactNode } from "react"
import { cn } from "~/lib/utils"

interface TitleProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: ReactNode
  className: string
}

const baseStyles = "uppercase text-dark"
const styles = {
  h1: cn(
    // Mobile
    "text-center text-[40px] leading-[40px] font-extrabold tracking-[-0.8px] text-white uppercase",
    // Tablet
    "md:text-[70px] md:leading-[70px] md:tracking-[-1.4px]",
    // Desktop
    "xl:text-[90px] xl:leading-[90px] xl:tracking-[-1.8px]"
  ),
  h2: cn(
    // Mobile
    "font-['Mulish'] text-[28px] leading-[32px] font-extrabold tracking-[-0.56px] text-[#050505] uppercase",
    // Tablet & Desktop
    "md:text-[40px] md:leading-[44px] md:tracking-[-0.8px]"
  ),
  h3: "",
  h4: cn(
    // Mobile
    "font-['Mulish'] text-[16px] leading-[24px] font-extrabold tracking-[-0.32px] text-[#050505] uppercase",
    // Tablet & Desktop
    "md:text-[20px] md:tracking-[-0.4px]"
  ),
  h5: "",
  h6: "",
}

export default function Title({
  as: Component = "h1",
  children,
  className,
}: TitleProps) {
  return (
    <Component className={cn(baseStyles, styles[Component], className)}>
      {children}
    </Component>
  )
}
