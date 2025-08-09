/* eslint-disable no-console */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

type ResumeData = {
  profile: {
    name: string;
    email?: string;
    links: { url: string; label: string }[];
  };
  education: Array<{
    institution: string;
    degree: string;
    location?: string;
    start?: string;
    end?: string;
    items?: string[];
  }>;
  experience: Array<{
    title: string;
    company: string;
    location?: string;
    start?: string;
    end?: string;
    items: string[];
  }>;
  projects: Array<{
    name: string;
    url?: string;
    items: string[];
  }>;
  competitiveProgramming: string[];
  skills: {
    frameworks?: string[];
    tools?: string[];
  };
};

const ROOT = process.cwd();

function parseLinks(line: string): { url: string; label: string }[] {
  const links: { url: string; label: string }[] = [];
  const hrefRegex = /\\href\{([^}]+)\}\{([^}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = hrefRegex.exec(line))) {
    const url = m[1].trim();
    const label = m[2].trim();
    links.push({ url, label });
  }
  return links;
}

function stripLatex(text: string): string {
  return text
    .replace(/\\textbf\{([^}]+)\}/g, "$1")
    .replace(/\\hfill/g, " ")
    .replace(/\\\\/g, " ")
    .replace(/\{\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parse() {
  const texPath = resolve(ROOT, "muhammadfahim.tex");
  const raw = readFileSync(texPath, "utf8");
  const lines = raw.split(/\r?\n/);

  const data: ResumeData = {
    profile: { name: "", links: [] },
    education: [],
    experience: [],
    projects: [],
    competitiveProgramming: [],
    skills: {},
  };

  // Name
  const nameMatch = raw.match(/\\centerline\{\\Huge\s+([^}]+)\}/);
  if (nameMatch) data.profile.name = nameMatch[1].trim();

  // Contact line
  const contactLine = lines.find((l) => l.includes("\\centerline{") && l.includes("href"));
  if (contactLine) {
    const links = parseLinks(contactLine);
    data.profile.links = links;
    const emailLink = links.find((l) => l.url.startsWith("mailto:"));
    if (emailLink) data.profile.email = emailLink.url.replace("mailto:", "");
  }

  // Helper to collect itemize bullets starting at index
  function collectItemize(startIdx: number): { items: string[]; nextIndex: number } {
    const items: string[] = [];
    let i = startIdx;
    while (i < lines.length && !lines[i].includes("\\begin{itemize}")) i++;
    if (i >= lines.length) return { items, nextIndex: i };
    i++; // move to first line after \begin{itemize}
    for (; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes("\\end{itemize}")) break;
      const li = line.replace(/^\s*\\item\s*/, "").trim();
      if (li) items.push(stripLatex(li));
    }
    return { items, nextIndex: i };
  }

  // Education
  {
    const eduIdx = lines.findIndex((l) => l.includes("\\section*{Education}"));
    if (eduIdx !== -1) {
      const header = stripLatex(lines[eduIdx + 1] || "");
      const m = header.match(/([^—]+) — ([^\h]+.*?)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[^\\]*\\hfill\s*([^\\]+)?/);
      // Fallback generic split
      const parts = header.split(" — ");
      const institution = parts[0]?.replace(/\\textbf\{|\}/g, "").trim();
      const degreeAndDates = parts[1] || "";
      const [degree, dates] = degreeAndDates.split(" \\\\ ");
      const { items } = collectItemize(eduIdx + 1);
      data.education.push({
        institution,
        degree: stripLatex(degree || degreeAndDates).trim(),
        items,
      });
    }
  }

  // Experience
  {
    const expIdx = lines.findIndex((l) => l.includes("\\section*{Experience}"));
    if (expIdx !== -1) {
      let i = expIdx + 1;
      while (i < lines.length) {
        const line = lines[i] || "";
        if (line.startsWith("\\section*{")) break;
        const jobMatch = line.match(/\\textbf\{([^}]+)\,\}\s*\{([^}]+)\}\s*--\s*([^\\]+)\\hfill\s*([^\\]+)\\\\/);
        if (jobMatch) {
          const [, title, company, location, dates] = jobMatch.map((s) => stripLatex(s));
          const { items, nextIndex } = collectItemize(i);
          data.experience.push({ title, company, location, start: dates, end: undefined, items });
          i = nextIndex + 1;
          continue;
        }
        i++;
      }
    }
  }

  // Projects
  {
    const prIdx = lines.findIndex((l) => l.includes("\\section*{Projects}"));
    if (prIdx !== -1) {
      let i = prIdx + 1;
      while (i < lines.length) {
        const line = lines[i] || "";
        if (line.startsWith("\\section*{")) break;
        const prMatch = line.match(/\\textbf\{([^}]+)\}.*?(\\href\{([^}]+)\}\{[^}]*\})?/);
        if (prMatch) {
          const name = prMatch[1].trim();
          let url: string | undefined;
          const urlMatch = line.match(/\\href\{([^}]+)\}/);
          if (urlMatch) url = urlMatch[1];
          const { items, nextIndex } = collectItemize(i);
          data.projects.push({ name, url, items });
          i = nextIndex + 1;
          continue;
        }
        i++;
      }
    }
  }

  // Competitive Programming
  {
    const cpIdx = lines.findIndex((l) => l.includes("\\section*{Competitive Programming}"));
    if (cpIdx !== -1) {
      const { items } = collectItemize(cpIdx + 1);
      data.competitiveProgramming = items;
    }
  }

  // Skills
  {
    const skIdx = lines.findIndex((l) => l.includes("\\section*{Skills}"));
    if (skIdx !== -1) {
      const frameworksLine = lines[skIdx + 1] || "";
      const toolsLine = lines[skIdx + 2] || "";
      const fw = frameworksLine.replace(/.*Frameworks:\s*/i, "").replace(/\\\\/g, "").split(/,\s*/).map((s) => s.trim()).filter(Boolean);
      const tools = toolsLine.replace(/.*Tools:\s*/i, "").replace(/\\\\/g, "").split(/,\s*/).map((s) => s.trim()).filter(Boolean);
      data.skills.frameworks = fw;
      data.skills.tools = tools;
    }
  }

  const outDir = resolve(ROOT, "data");
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, "resume.json");
  writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`Wrote ${outPath}`);
}

parse();


