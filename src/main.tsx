import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Dashboard from "@/components/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
);