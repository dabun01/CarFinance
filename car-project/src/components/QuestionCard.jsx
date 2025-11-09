import React from "react";

export default function QuestionCard({ question, options, value, onSelect }) {
  return (
    <div className="question-card">
      <h2>{question}</h2>
      <ul className="option-list">
        {options.map((option) => {
          const selected = value === option;
          return (
            <li key={option} className="option-item">
              <button
                className={`option-button ${selected ? "selected" : ""}`}
                onClick={() => onSelect(option)}
                aria-pressed={selected}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
