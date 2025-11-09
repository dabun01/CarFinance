import React from "react";

export default function ProgressBar({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="progress-wrap" aria-label="progress">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-text">
        Step {current + 1} of {total} ({pct}%)
      </div>
    </div>
  );
}
