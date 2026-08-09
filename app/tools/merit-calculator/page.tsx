import type { Metadata } from "next";
import { MeritCalculator } from "@/components/MeritCalculator";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merit Calculator — NUST, FAST, PU, UET, GIKI Aggregate",
  description:
    "Calculate your university admission merit aggregate for NUST, FAST, Punjab University, UET Lahore, and GIKI using official 2026 weightages.",
  openGraph: {
    title: "Merit Calculator — NUST, FAST, PU, UET, GIKI Aggregate",
    description:
      "Free merit aggregate calculator with exact 2026 formulas for top Pakistani universities.",
    url: `${SITE_URL}/tools/merit-calculator`,
  },
};

export default function MeritCalculatorPage() {
  return (
    <main className="site-main">
      <MeritCalculator />

      <article className="explainer">
        <h3>How this works</h3>
        <p>
          Each Pakistani engineering and CS university weighs Matric,
          FSc/Intermediate, and entry test scores differently when computing
          your merit aggregate. Select your target university above, enter your
          percentages, and the calculator applies the exact official weightage
          for that university&apos;s 2026 admission cycle.
        </p>
        <p>
          For example, NUST gives NET (the entry test) a 75% share — meaning
          a strong test score can compensate for average school marks. FAST
          Computing programs split weight more evenly between FSc Part-1 (40%)
          and the NU entry test (50%). UET Lahore uses ECAT at 33% alongside
          FSc Part-1 at 50%. Punjab University (PUCIT/FCIT) balances all three
          components more evenly at 25%, 50%, and 25%.
        </p>
        <p>
          GIKI is different: Matric is required for eligibility but does not
          appear in the aggregate formula. Only your FSc (or last qualification)
          and admission test scores count — with the test weighted at 85%.
          When you switch universities, field labels and the formula note update
          automatically, and any previous result is cleared so you are not
          looking at stale numbers.
        </p>

        <h3>FAQ</h3>
        <p>
          <strong>Are these formulas official?</strong> Yes, sourced from each
          university&apos;s published 2026 admission criteria. Formulas can
          change year to year — always cross-check with the university&apos;s
          official admissions page before applying.
        </p>
        <p>
          <strong>Why doesn&apos;t GIKI ask for Matric?</strong> GIKI&apos;s
          aggregate formula only weighs your most recent completed qualification
          (FSc) plus the admission test — Matric is used only for eligibility,
          not the merit score itself.
        </p>
        <p>
          <strong>What percentages should I enter?</strong> Use your obtained
          marks as a percentage of total marks (e.g., 850 out of 1100 ≈ 77.27%).
          For entry tests, convert your raw score to a percentage if the
          university publishes a conversion table — otherwise use the percentage
          shown on your result slip.
        </p>
        <p>
          <strong>Do FAST Engineering programs use the same formula?</strong>{" "}
          This calculator uses the Computing/Business weightage (Matric 10% +
          FSc Part-1 40% + Test 50%). FAST Engineering programs use a different
          split (Matric 17% + FSc 50% + Test 33%) — verify your specific
          program&apos;s criteria on the FAST admissions portal.
        </p>
      </article>
    </main>
  );
}
