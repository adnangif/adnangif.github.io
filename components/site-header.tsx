import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">
            MF
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            <Link
              href="/projects/"
              className="text-muted-foreground hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="/experience/"
              className="text-muted-foreground hover:text-foreground"
            >
              Experience
            </Link>
            <Link
              href="/skills/"
              className="text-muted-foreground hover:text-foreground"
            >
              Skills
            </Link>
            <Link
              href="/resume/"
              className="text-muted-foreground hover:text-foreground"
            >
              Resume
            </Link>
            <Link
              href="/contact/"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
