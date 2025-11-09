import React, { useEffect, useMemo, useState } from "react";
import Wizard from "../components/Wizard";
import CarCardList from "../components/CarCardList";
import { filterCars } from "../utils/filterCars";

const PAGE_SIZE = 8;

export default function WizardPage({ onBackHome }) {
  const [answers, setAnswers] = useState(null);     // wizard answers
  const [status, setStatus] = useState("loading");  // loading | ready | error
  const [allCars, setAllCars] = useState([]);       // full dataset
  const [filtered, setFiltered] = useState([]);     // after filtering
  const [limit, setLimit] = useState(PAGE_SIZE);    // pagination

  // Fetch LARGE JSON from /public
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/carDatabase.json"); // file in /public
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // normalize leading/trailing spaces in model
        const normalized = data.map(c => ({ ...c, model: String(c.model || "").trim() }));
        setAllCars(normalized);
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    })();
  }, []);

  // When wizard finishes, filter cars and reset limit
  const handleFinish = (a) => {
    setAnswers(a);
    const subset = filterCars(allCars, a);
    setFiltered(subset);
    setLimit(PAGE_SIZE);
  };

  // Cards currently visible (apply the limit)
  const visible = useMemo(() => filtered.slice(0, limit), [filtered, limit]);

  // Loading / error states
  if (status === "loading") return <p>Loading car data…</p>;
  if (status === "error")   return <p>Failed to load car data.</p>;

  // Wizard view
  if (!answers) {
    return (
          <section className="wizard-section">
      <div className="wizard-header">
        <h1>Car Finder Wizard</h1>
        <button className="wizard-btn" onClick={onBackHome}>
          Back to Home
        </button>
      </div>

      <Wizard onFinish={handleFinish} />
    </section>
    );
  }

  // Results view
  const hasMore = limit < filtered.length;
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Car Results ({filtered.length})</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => setAnswers(null)}>Back to Wizard</button>
          <button className="btn" onClick={onBackHome}>Home</button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <>
          <p>No cars matched your preferences.</p>
          <button className="btn" onClick={() => setAnswers(null)}>Try Again</button>
        </>
      ) : (
        <>
          <CarCardList cars={visible} />
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {hasMore && (
              <button className="btn" onClick={() => setLimit(n => n + PAGE_SIZE)}>
                Load more (+{PAGE_SIZE})
              </button>
            )}
            {hasMore && (
              <button className="btn" onClick={() => setLimit(filtered.length)}>
                Show all
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
