import React from "react"
import {createRoot} from "react-dom/client"
import App from "./App"

const consoleWarn = console.error
const SUPPRESSED_WARNINGS = ["Warning:"]

console.error = function filterWarnings(msg, ...args) {
  if (!SUPPRESSED_WARNINGS.some((entry) => msg && msg.includes(entry))) {
    consoleWarn(msg, ...args)
  }
}

const root = createRoot(document.getElementById("root"))
root.render(<App />)
