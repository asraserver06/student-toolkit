"use client";

import { useState } from "react";
import { GRADE_OPTIONS, getGradePoints } from "@/lib/gradePoints";

interface CourseRow {
  id: number;
  name: string;
  credit: string;
  grade: string;
}

interface BreakdownItem {
  name: string;
  credit: number;
  grade: string;
  points: number;
}

interface CgpaResult {
  cgpa: number;
  totalCredits: number;
  breakdown: BreakdownItem[];
}

let nextId = 1;

function createEmptyRow(): CourseRow {
  return { id: nextId++, name: "", credit: "", grade: "A" };
}

function createInitialRows(count: number): CourseRow[] {
  return Array.from({ length: count }, () => createEmptyRow());
}

export function CgpaCalculator() {
  const [courses, setCourses] = useState<CourseRow[]>(() =>
    createInitialRows(3)
  );
  const [result, setResult] = useState<CgpaResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function addCourse() {
    setCourses((prev) => [...prev, createEmptyRow()]);
  }

  function removeCourse(id: number) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  function updateCourse(id: number, field: keyof CourseRow, value: string) {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  function calculate() {
    setError(null);
    let totalPoints = 0;
    let totalCredits = 0;
    const breakdown: BreakdownItem[] = [];

    for (const course of courses) {
      const credit = parseFloat(course.credit);
      if (Number.isNaN(credit) || credit <= 0) continue;

      const pts = getGradePoints(course.grade);
      totalPoints += pts * credit;
      totalCredits += credit;
      breakdown.push({
        name: course.name.trim() || "Course",
        credit,
        grade: course.grade,
        points: pts * credit,
      });
    }

    if (totalCredits === 0) {
      setError("Add at least one course with credit hours.");
      setResult(null);
      return;
    }

    setResult({
      cgpa: totalPoints / totalCredits,
      totalCredits,
      breakdown,
    });
  }

  function clear() {
    nextId = 1;
    setCourses(createInitialRows(3));
    setResult(null);
    setError(null);
  }

  return (
    <div className="sheet">
      <h2>Semester CGPA Calculator</h2>

      {courses.map((course) => (
        <div key={course.id} className="gpa-row">
          <div>
            <label htmlFor={`name-${course.id}`}>Course Name</label>
            <input
              id={`name-${course.id}`}
              type="text"
              className="sheet-input"
              placeholder="e.g. Data Structures"
              value={course.name}
              onChange={(e) => updateCourse(course.id, "name", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`credit-${course.id}`}>Credit Hrs</label>
            <input
              id={`credit-${course.id}`}
              type="number"
              className="sheet-input"
              min={0}
              step={0.5}
              placeholder="3"
              value={course.credit}
              onChange={(e) =>
                updateCourse(course.id, "credit", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor={`grade-${course.id}`}>Grade</label>
            <select
              id={`grade-${course.id}`}
              className="sheet-input"
              value={course.grade}
              onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
            >
              {GRADE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeCourse(course.id)}
            aria-label="Remove course"
          >
            ✕
          </button>
        </div>
      ))}

      <button type="button" className="add-course" onClick={addCourse}>
        + Add Course
      </button>

      <div style={{ marginTop: 22 }}>
        <button type="button" className="btn-calc" onClick={calculate}>
          Calculate CGPA
        </button>
        <button type="button" className="btn-clear" onClick={clear}>
          Clear
        </button>
      </div>

      {error && (
        <p role="alert" style={{ color: "var(--red)", marginTop: 16 }}>
          {error}
        </p>
      )}

      {result && (
        <div className="result-panel">
          <div className="result-label">Your CGPA</div>
          <div className="big">{result.cgpa.toFixed(2)}</div>
          <div className="breakdown">
            {result.breakdown.map((item, i) => (
              <div key={i} className="breakdown-row">
                <span>
                  {item.name} ({item.credit} cr, {item.grade})
                </span>
                <span>{item.points.toFixed(2)} pts</span>
              </div>
            ))}
            <div className="breakdown-row">
              <strong>Total Credit Hours</strong>
              <strong>{result.totalCredits}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
