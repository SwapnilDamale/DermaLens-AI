/**
 * Single source of truth for DermaLens AI colour tokens.
 * Consumed by tailwind.config.ts. Brand values follow the brief:
 * deep plum ≈ #3D285E, rose ≈ #D65370, soft off-white ≈ #FCFAFC.
 */
export const palette = {
  plum: {
    DEFAULT: "#3D285E",
    50: "#F5F1FA",
    100: "#E9E1F3",
    200: "#CFC2E4",
    600: "#523779",
    800: "#2E1D49",
    900: "#241638",
  },
  rose: {
    DEFAULT: "#D65370",
    50: "#FDF2F5",
    100: "#F9E0E7",
    200: "#F0B5C3",
    700: "#B03755", // text-safe rose on white (>= 5.5:1)
  },
  paper: "#FCFAFC",
  blush: "#F6EEF3",
  line: "#E6DEEC",
  ink: "#241638",
  slate: {
    DEFAULT: "#5A566B", // secondary text (>= 6.5:1 on white)
  },
} as const;
