"use client";

import { useState } from "react";
import {
  UNI_FORMULAS,
  UNIVERSITY_IDS,
  calculateMerit,
  type UniversityId,
} from "@/lib/meritFormulas";

export function MeritCalculator() {
  const [uni, setUni] = useState<UniversityId>("nust");
  const [matric, setMatric] = useState("");
  const [fsc, setFsc] = useState("");
  const [test, setTest] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateMerit> | null>(
    null
  );

  const formula = UNI_FORMULAS[uni];
  const showMatric = formula.matric > 0;

  function selectUni(id: UniversityId) {
    setUni(id);
    setResult(null);
  }

  function handleBlur(value: string, setter: (val: string) => void) {
    if (!value) return;
    const parsed = parseFloat(value);
    if (Number.isNaN(parsed)) return;
    if (parsed > 100) setter("100");
    if (parsed < 0) setter("0");
  }

  function calculate() {
    const meritResult = calculateMerit(
      uni,
      parseFloat(matric) || 0,
      parseFloat(fsc) || 0,
      parseFloat(test) || 0
    );
    setResult(meritResult);
  }

  function clear() {
    setMatric("");
    setFsc("");
    setTest("");
    setResult(null);
  }

  return (
    <div className="sheet">
      <h2>University Merit Aggregate Calculator</h2>

      <div className="uni-select" role="tablist" aria-label="Select university">
        {UNIVERSITY_IDS.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={uni === id}
            className={`uni-btn${uni === id ? " active" : ""}`}
            onClick={() => selectUni(id)}
          >
            {UNI_FORMULAS[id].name}
          </button>
        ))}
      </div>

      <div className="formula-note">{formula.note}</div>

      <div className="field-row">
        {showMatric && (
          <div className="field">
            <label htmlFor="matricPct">Matric % (or O-Level equiv.)</label>
            <input
              id="matricPct"
              type="number"
              className="sheet-input"
              min={0}
              max={100}
              step={0.01}
              placeholder="e.g. 88.5"
              value={matric}
              onChange={(e) => setMatric(e.target.value)}
              onBlur={() => handleBlur(matric, setMatric)}
            />
          </div>
        )}
        <div className="field">
          <label htmlFor="fscPct">{formula.fscLabel}</label>
          <input
            id="fscPct"
            type="number"
            className="sheet-input"
            min={0}
            max={100}
            step={0.01}
            placeholder="e.g. 85"
            value={fsc}
            onChange={(e) => setFsc(e.target.value)}
            onBlur={() => handleBlur(fsc, setFsc)}
          />
        </div>
        <div className="field">
          <label htmlFor="testPct">{formula.testLabel}</label>
          <input
            id="testPct"
            type="number"
            className="sheet-input"
            min={0}
            max={100}
            step={0.01}
            placeholder="e.g. 70"
            value={test}
            onChange={(e) => setTest(e.target.value)}
            onBlur={() => handleBlur(test, setTest)}
          />
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <button type="button" className="btn-calc" onClick={calculate}>
          Calculate Aggregate
        </button>
        <button type="button" className="btn-clear" onClick={clear}>
          Clear
        </button>
      </div>

      {result && (
        <div className="result-panel">
          <div className="result-label">Your Aggregate</div>
          <div className="big">{result.aggregate.toFixed(2)}%</div>
          <div className="breakdown">
            {result.rows.map((row, i) => (
              <div key={i} className="breakdown-row">
                <span>{row.label}</span>
                <span>{row.contribution.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="disclaimer">
            Formulas verified against official university admission pages, 2026
            cycle. Always confirm against the official portal before applying.
          </p>
        </div>
      )}
    </div>
  );
}
