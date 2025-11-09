import React, { useState } from "react";
import Wizard from "./componets/Wizard";

export default function App() {
  const [result, setResult] = useState(null);

  const handleFinish = (answers) => {
    setResult(answers);
    // Here you can route to results, call an API (e.g., carapi.app), etc.
  };

  if (result) {
    return (
      <div className="app">
        <h1>Your Selections</h1>
        <pre className="result-block">{JSON.stringify(result, null, 2)}</pre>
        <button onClick={() => setResult(null)}>Restart</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Car Finder Wizard</h1>
      <Wizard onFinish={handleFinish} />
    </div>
  );
}
