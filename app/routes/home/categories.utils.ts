export const getCategoriesWidthByIdx = (gapPx: number, isTablet: boolean) => {
  return isTablet
    ? {
        // 2 columns: 50% minus half the gap
        0: `calc(50% - ${gapPx / 2}px)`,
        1: `calc(50% - ${gapPx / 2}px)`,
        2: "100%",
        3: `calc(50% - ${gapPx / 2}px)`,
        4: `calc(50% - ${gapPx / 2}px)`,
        5: `calc(50% - ${gapPx / 2}px)`,
        6: `calc(50% - ${gapPx / 2}px)`,
        7: "100%",
        8: `calc(50% - ${gapPx / 2}px)`,
        9: `calc(50% - ${gapPx / 2}px)`,
        10: `calc(50% - ${gapPx / 2}px)`,
      }
    : {
        // 4 columns: 26% minus (3*gap)/4; 48% minus gap/2
        0: `calc(27% - ${(3 * gapPx) / 4}px)`,
        1: `calc(27% - ${(3 * gapPx) / 4}px)`,
        2: `calc(46% - ${gapPx / 2}px)`,
        3: `calc(46% - ${gapPx / 2}px)`,
        4: `calc(27% - ${(3 * gapPx) / 4}px)`,
        5: `calc(27% - ${(3 * gapPx) / 4}px)`,
        6: `calc(27% - ${(3 * gapPx) / 4}px)`,
        7: `calc(46% - ${gapPx / 2}px)`,
        8: `calc(27% - ${(3 * gapPx) / 4}px)`,
        9: `calc(46% - ${gapPx / 2}px)`,
        10: `calc(27% - ${(3 * gapPx) / 4}px)`,
      }
}
