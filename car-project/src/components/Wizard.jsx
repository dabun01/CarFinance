import React, { useState, useMemo } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import QUESTIONS from "../data/question";

export default function Wizard({ onFinish }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({}); // { [id]: selectedOption }

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const currentValue = answers[q.id] ?? null;

  const canNext = useMemo(() => currentValue !== null && currentValue !== undefined, [currentValue]);
  const isLast = step === total - 1;

  const handleSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [q.id]: option }));
  };

  const handleNext = () => {
    if (!canNext) return;
    if (isLast) {
      onFinish?.(answers);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));
  const handleRestart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div className="wizard">
      <ProgressBar current={step} total={total} />

      <QuestionCard
        question={q.question}
        options={q.options}
        value={currentValue}
        onSelect={handleSelect}
      />

      <div className="nav-row">
        <button className="secondary" onClick={handleBack} disabled={step === 0}>
          Back
        </button>
        {!isLast ? (
          <button className="primary" onClick={handleNext} disabled={!canNext}>
            Next
          </button>
        ) : (
          <button className="primary" onClick={handleNext} disabled={!canNext}>
            Finish
          </button>
        )}
      </div>

      <button className="link" onClick={handleRestart}>Start over</button>
    </div>
  );
}
