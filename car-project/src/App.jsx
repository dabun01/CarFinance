import React, { useState, useEffect, useMemo } from "react";
import Wizard from "./components/Wizard";
import CarCardList from "./components/CarCardList";
import { filterCars } from "./utils/filterCars";

const PAGE_SIZE = 8;

export default function App() {
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [allCars, setAllCars] = useState([]);
  const [filtered, setFiltered] = useState([]);    // filtered cars after wizard
  const [limit, setLimit] = useState(PAGE_SIZE);

  // Fetch LARGE JSON from /public
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/carDatabase.json"); // served from public/
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // normalize model string (trim spaces like " GT86")
        const normalized = data.map((c) => ({ ...c, model: String(c.model || "").trim() }));
        setAllCars(normalized);
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    })();
  }, []);

  // When wizard finishes, filter cars and reset limit
  const handleFinish = (answers) => {
    setResult(answers);
    const subset = filterCars(allCars, answers);
    setFiltered(subset);
    setLimit(PAGE_SIZE);
  };

  // Cards currently visible (apply the limit)
  const visibleCars = useMemo(() => filtered.slice(0, limit), [filtered, limit]);

  // Loading / error states
  if (status === "loading") return <p>Loading car data…</p>;
  if (status === "error")   return <p>Failed to load car data.</p>;
  // Results view
  if (result) {
    const hasMore = limit < filtered.length;
    return (
      <div className="app">
        <h1>Car Results ({filtered.length})</h1>

        {filtered.length === 0 ? (
          <>
            <p>No cars matched your preferences.</p>
            <button onClick={() => setResult(null)}>Back to Wizard</button>
          </>
        ) : (
          <>
            <CarCardList cars={visibleCars} />

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {hasMore && (
                <button onClick={() => setLimit((n) => n + PAGE_SIZE)}>
                  Load more (+{PAGE_SIZE})
                </button>
              )}
              {hasMore && (
                <button onClick={() => setLimit(filtered.length)}>
                  Show all
                </button>
              )}
              <button onClick={() => setResult(null)}>
                Back to Wizard
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Wizard view
  return (
    <div className="app">
      <h1>Car Finder Wizard</h1>
      <Wizard onFinish={handleFinish} />
    </div>
  );
}
