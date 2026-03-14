import { useMemo } from "react"
import { useBreakpoints } from "~/hooks/useBreakpoints"

interface CategoryCardProps {
  title: string
  idx: number
  onButtonClick: () => void
}

export default function CategoryCard({
  title,
  idx,
  onButtonClick,
}: CategoryCardProps) {
  const { isMobile, isTablet } = useBreakpoints()
  const GAP_PX = 20 // matches gap-5 (sm:gap-5) between category cards

  // Gap share per item: 2-col → gap/2 each; 4-col → (3*gap)/4 per 26%, gap/2 per 48%
  const categoryWidthByIdx = useMemo<Record<number, string>>(
    () =>
      isTablet
        ? {
            // 2 columns: 50% minus half the gap
            0: `calc(50% - ${GAP_PX / 2}px)`,
            1: `calc(50% - ${GAP_PX / 2}px)`,
            2: "100%",
            3: `calc(50% - ${GAP_PX / 2}px)`,
            4: `calc(50% - ${GAP_PX / 2}px)`,
            5: `calc(50% - ${GAP_PX / 2}px)`,
            6: `calc(50% - ${GAP_PX / 2}px)`,
            7: "100%",
            8: `calc(50% - ${GAP_PX / 2}px)`,
            9: `calc(50% - ${GAP_PX / 2}px)`,
            10: `calc(50% - ${GAP_PX / 2}px)`,
          }
        : {
            // 4 columns: 26% minus (3*gap)/4; 48% minus gap/2
            0: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            1: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            2: `calc(46% - ${GAP_PX / 2}px)`,
            3: `calc(46% - ${GAP_PX / 2}px)`,
            4: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            5: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            6: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            7: `calc(46% - ${GAP_PX / 2}px)`,
            8: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
            9: `calc(46% - ${GAP_PX / 2}px)`,
            10: `calc(27% - ${(3 * GAP_PX) / 4}px)`,
          },
    [isTablet]
  )
  return (
    <li
      className={
        "relative flex h-63 items-end overflow-hidden rounded-[30px] bg-dark p-6 sm:h-92"
      }
      style={{
        // backgroundImage: `url(/category_${c.id}.jpg)`,
        width: isMobile ? "100%" : categoryWidthByIdx[idx],
      }}
    >
      <div
        className="absolute bottom-0 left-0 size-full bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(/category_${idx + 1}.jpg)` }}
      />
      <div className="relative flex gap-1">
        <div className="rounded-[30px] border border-white/20 bg-white/20 px-3.5 py-2.5 text-xl leading-6 font-medium text-white">
          {title}
        </div>
        <button
          className="rounded-full border border-white/20 p-[13px]"
          onClick={onButtonClick}
        ></button>
      </div>
    </li>
  )
}
