import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export type Resume = ReturnType<typeof loadResume>;

export function loadResume() {
  const path = resolve(process.cwd(), "data", "resume.json");
  try {
    const content = readFileSync(path, "utf8");
    return JSON.parse(content) as {
      profile: { name: string; email?: string; links: { url: string; label: string }[] };
      education: Array<{ institution: string; degree: string; items?: string[] }>;
      experience: Array<{ title: string; company: string; location?: string; start?: string; end?: string; items: string[] }>;
      projects: Array<{ name: string; url?: string; items: string[] }>;
      competitiveProgramming: string[];
      skills: { frameworks?: string[]; tools?: string[] };
    };
  } catch {
    return {
      profile: { name: "", links: [] },
      education: [],
      experience: [],
      projects: [],
      competitiveProgramming: [],
      skills: {},
    };
  }
}


