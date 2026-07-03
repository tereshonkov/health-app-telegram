import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { init } from "@telegram-apps/sdk-react";
import App from "./App";
import "./index.css";

if (import.meta.env.DEV) {
  await import("./mockEnv");
}

init();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
