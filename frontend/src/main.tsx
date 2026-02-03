import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "locomotive-scroll/dist/locomotive-scroll.css";

createRoot(document.getElementById("root")!).render(<App />);
