import { useMediaQuery } from "@uidotdev/usehooks"

export function useBreakpoints() {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")
  const isTablet = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 1280px)"
  )
  const isDesktop = useMediaQuery("only screen and (min-width : 1281px)")

  return { isMobile, isTablet, isDesktop }
}
