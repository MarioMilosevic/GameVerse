import type { navLinkType } from "@/layouts/types/index";
import type { ThemeType } from "@/stores/theme/types";
import type { UserType } from "@/utils/types";
import { THEME_OPTIONS } from "@/stores/theme/constants";

const BASE_LINKS: navLinkType[] = [
  {
    icon: "md-accountbox",
    text: "Account",
  },
  {
    icon: "md-ratereview",
    text: "My Reviews",
  },
  {
    icon: "gi-exit-door",
    text: "Log out",
  },
];

export const createNavLinks = (
  theme: ThemeType,
  user?: UserType,
): navLinkType[] => {
  const isDark = theme === THEME_OPTIONS.DARK;

  const themeLink: navLinkType = {
    icon: isDark ? "md-darkmode" : "md-lightmode",
    text: isDark ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT,
  };

  const adminLinks: navLinkType[] =
    user?.role === "ADMIN"
      ? [
          {
            icon: "md-dashboardcustomize",
            text: "Dashboard",
          },
        ]
      : [];

  return [themeLink, ...adminLinks, ...BASE_LINKS];
};
