import React, { useState, useEffect, useMemo } from "react";
import Landing from "./pages/Landing.jsx";
import WizardPage from "./pages/WizardPage.jsx";
export default function App() {
  const [stage, setStage] = useState("landing"); // 'landing' | 'wizard'

  return stage === "landing" ? (
    <div className="app">
      <Landing onStart={() => setStage("wizard")} />
    </div>
  ) : (
    <div className="app">
      <WizardPage onBackHome={() => setStage("landing")} />
    </div>
  );
}
