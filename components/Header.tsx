"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeContext";
import { useEffect, useState } from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({
  title = "Merit Sheet",
  subtitle = "CGPA calculator & Pakistan university merit aggregate — no signup, instant results",
}: HeaderProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="site-header" style={{ position: "relative" }}>
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
        title="Toggle dark/light mode"
      >
        {mounted && theme === "dark" ? (
          // Sun Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
          // Moon Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>

      <div className="eyebrow">Student Toolkit</div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="stamp">VERIFIED 2026</div>
      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          href="/tools/cgpa-calculator"
          className={pathname === "/tools/cgpa-calculator" ? "active" : ""}
        >
          CGPA Calculator
        </Link>
        <Link
          href="/tools/merit-calculator"
          className={pathname === "/tools/merit-calculator" ? "active" : ""}
        >
          Merit Calculator
        </Link>
      </nav>
    </header>
  );
}
