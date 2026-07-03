import { mockTelegramEnv, emitEvent } from "@telegram-apps/bridge";

const themeParams = {
  accent_text_color: "#2C8FCC",
  bg_color: "#F4F5F8",
  button_color: "#2C8FCC",
  button_text_color: "#ffffff",
  destructive_text_color: "#E05050",
  hint_color: "#9AA1AE",
  link_color: "#2C8FCC",
  secondary_bg_color: "#ffffff",
  text_color: "#1A1C22",
} as const;

mockTelegramEnv({
  launchParams: {
    tgWebAppThemeParams: themeParams,
    tgWebAppData: new URLSearchParams([
      ["user", JSON.stringify({ id: 1, first_name: "Марія" })],
      ["hash", ""],
      ["signature", ""],
      ["auth_date", Date.now().toString()],
    ]),
    tgWebAppVersion: "8",
    tgWebAppPlatform: "tdesktop",
  },
  onEvent(e) {
    if (e[0] === "web_app_request_theme") {
      return emitEvent("theme_changed", { theme_params: themeParams });
    }
  },
});
