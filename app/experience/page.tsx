import { loadResume } from "@/lib/resume";

export default function ExperiencePage() {
  const resume = loadResume();
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Experience</h1>
      <ol className="mt-6 space-y-6">
        {resume.experience.map((x, idx) => (
          <li key={idx} className="rounded-lg border p-4">
            <div className="font-medium">
              {x.title}, {x.company} {x.location ? `— ${x.location}` : ""}
            </div>
            <ul className="list-disc pl-6 text-sm text-muted-foreground mt-1">
              {x.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </main>
  );
}


