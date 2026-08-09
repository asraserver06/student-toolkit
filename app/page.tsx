import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — CGPA & Merit Calculators for Pakistani Students`,
  description:
    "Free online tools for Pakistani university students: semester CGPA calculator and merit aggregate calculator for NUST, FAST, PU, UET, and GIKI admissions.",
};

export default function HomePage() {
  return (
    <main className="site-main">
      <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 28 }}>
        {SITE_TAGLINE}
      </p>

      <Link href="/tools/cgpa-calculator" className="tool-card">
        <h2>CGPA Calculator</h2>
        <p>
          Calculate your semester CGPA from course credit hours and letter
          grades. Uses the standard 4.0 scale used by Pakistani universities.
          Add as many courses as you need — no account required.
        </p>
      </Link>

      <Link href="/tools/merit-calculator" className="tool-card">
        <h2>Merit Calculator</h2>
        <p>
          Estimate your admission aggregate for NUST, FAST, Punjab University,
          UET Lahore, and GIKI. Each university uses different weightages for
          Matric, FSc, and entry test scores — this tool applies the exact 2026
          formulas.
        </p>
      </Link>

      <article className="explainer">
        <h3>Why Student Toolkit?</h3>
        <p>
          Applying to Pakistani universities means juggling different grading
          scales, merit formulas, and deadline pressure — often while your
          classmates are sharing outdated spreadsheets on WhatsApp. Student
          Toolkit gives you fast, accurate calculators with the official 2026
          weightages built in, so you can focus on studying instead of
          double-checking math.
        </p>
        <p>
          Every tool runs entirely in your browser. Nothing you enter is stored
          on a server. Bookmark the pages you use most and come back whenever
          you need a quick estimate before results day or admission deadlines.
        </p>
      </article>
    </main>
  );
}
