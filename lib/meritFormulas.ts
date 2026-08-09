export type UniversityId = "nust" | "fast" | "pu" | "uet" | "giki";

export interface MeritFormula {
  name: string;
  matric: number;
  fsc: number;
  test: number;
  note: string;
  fscLabel: string;
  testLabel: string;
}

export const UNI_FORMULAS: Record<UniversityId, MeritFormula> = {
  nust: {
    name: "NUST",
    matric: 0.1,
    fsc: 0.15,
    test: 0.75,
    note: "NUST 2026: Matric 10% + FSc Part-1 15% + NET 75%. The entry test dominates — a strong NET score matters far more than school marks.",
    fscLabel: "FSc Part-1 %",
    testLabel: "NET Score %",
  },
  fast: {
    name: "FAST",
    matric: 0.1,
    fsc: 0.4,
    test: 0.5,
    note: "FAST 2026 (Computing/Business): Matric 10% + FSc Part-1 40% + Entry Test 50%.",
    fscLabel: "FSc Part-1 %",
    testLabel: "NU Test %",
  },
  pu: {
    name: "PU",
    matric: 0.25,
    fsc: 0.5,
    test: 0.25,
    note: "Punjab University (PUCIT/FCIT) 2026: Matric 25% + FSc 50% + PU Entry Test 25%. Other PU departments may vary — verify with your specific department.",
    fscLabel: "FSc %",
    testLabel: "PU Entry Test %",
  },
  uet: {
    name: "UET Lahore",
    matric: 0.17,
    fsc: 0.5,
    test: 0.33,
    note: "UET Lahore Fall 2026: Matric 17% + FSc Part-1 50% + ECAT 33%.",
    fscLabel: "FSc Part-1 %",
    testLabel: "ECAT %",
  },
  giki: {
    name: "GIKI",
    matric: 0,
    fsc: 0.15,
    test: 0.85,
    note: "GIKI 2026: FSc 15% + Admission Test 85%. Matric is required for eligibility only — not counted in the aggregate.",
    fscLabel: "FSc / Last Qualification %",
    testLabel: "GIKI Admission Test / SAT %",
  },
};

export const UNIVERSITY_IDS = Object.keys(UNI_FORMULAS) as UniversityId[];

export function clampPercentage(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export interface MeritBreakdownRow {
  label: string;
  weight: number;
  contribution: number;
}

export interface MeritResult {
  aggregate: number;
  rows: MeritBreakdownRow[];
}

export function calculateMerit(
  uni: UniversityId,
  matricPct: number,
  fscPct: number,
  testPct: number
): MeritResult {
  const formula = UNI_FORMULAS[uni];
  const matric = clampPercentage(matricPct);
  const fsc = clampPercentage(fscPct);
  const test = clampPercentage(testPct);

  const matricContrib = matric * formula.matric;
  const fscContrib = fsc * formula.fsc;
  const testContrib = test * formula.test;
  const aggregate = matricContrib + fscContrib + testContrib;

  const rows: MeritBreakdownRow[] = [];

  if (formula.matric > 0) {
    rows.push({
      label: `Matric (${(formula.matric * 100).toFixed(0)}%)`,
      weight: formula.matric,
      contribution: matricContrib,
    });
  }

  rows.push({
    label: `${formula.fscLabel} (${(formula.fsc * 100).toFixed(0)}%)`,
    weight: formula.fsc,
    contribution: fscContrib,
  });

  rows.push({
    label: `${formula.testLabel} (${(formula.test * 100).toFixed(0)}%)`,
    weight: formula.test,
    contribution: testContrib,
  });

  return { aggregate, rows };
}
