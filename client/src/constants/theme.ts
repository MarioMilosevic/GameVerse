import { ThemeType } from "@/stores/themeStore";

type ThemeOptionsType = {
  dark: ThemeType;
  light: ThemeType;
};

export const THEME_OPTIONS: ThemeOptionsType = {
  dark: "dark",
  light: "light",
};

export const DATA_THEME = "data-theme";
