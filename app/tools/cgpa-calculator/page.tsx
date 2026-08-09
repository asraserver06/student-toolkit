import type { Metadata } from "next";
import { CgpaCalculator } from "@/components/CgpaCalculator";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "CGPA Calculator — Semester Grade Point Average",
  description:
    "Free semester CGPA calculator for Pakistani university students. Enter course credit hours and letter grades on a 4.0 scale for instant results with a full breakdown.",
  openGraph: {
    title: "CGPA Calculator — Semester Grade Point Average",
    description:
      "Calculate your semester CGPA from credit hours and grades. Standard 4.0 scale, instant breakdown.",
    url: `${SITE_URL}/tools/cgpa-calculator`,
  },
};

export default function CgpaCalculatorPage() {
  return (
    <main className="site-main">
      <CgpaCalculator />

      <article className="explainer">
        <h3>How this works</h3>
        <p>
          Enter each course&apos;s credit hours and the grade you received (or
          expect). The calculator converts each letter grade to its grade points
          on a 4.0 scale, multiplies by credit hours, and divides the total by
          your total credit hours — the standard formula used by Pakistani
          universities including University of the Punjab, NUST, and FAST.
        </p>
        <p>
          Credit hours represent how much a course counts toward your degree.
          A typical semester course is 3 credit hours; labs may be 1 or 1.5.
          Grade points reflect performance: an A is worth 4.0, while a C is
          2.0. Your CGPA is the weighted average across all courses — a single
          high-credit course pulls your average more than a one-credit elective.
        </p>
        <p>
          Rows with blank or zero credit hours are ignored, so you can leave
          unused rows empty without affecting the result. Decimal credit hours
          (like 0.5 for a short workshop) are supported.
        </p>

        <h3>FAQ</h3>
        <p>
          <strong>What grading scale is used?</strong> A standard 4.0 scale
          (A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D=1.0,
          F=0.0). Some universities vary slightly — check your department&apos;s
          official policy for final results.
        </p>
        <p>
          <strong>Is this my official CGPA?</strong> This tool gives you an
          estimate based on what you enter. Your university&apos;s registrar
          office calculates the official transcript CGPA, which may use
          different rounding rules or include policy adjustments like grade
          forgiveness.
        </p>
        <p>
          <strong>Can I calculate cumulative CGPA?</strong> This calculator
          covers a single semester. For cumulative CGPA across multiple
          semesters, add all courses from every semester into one list — the
          formula is the same: total grade points divided by total credit hours.
        </p>
        <p>
          <strong>What if my university uses a different scale?</strong> Many
          Pakistani institutions follow the same 4.0 mapping, but some
          departments publish slightly different grade-to-point tables. Always
          cross-check with your student handbook before relying on this for
          scholarship or probation decisions.
        </p>
      </article>
    </main>
  );
}
