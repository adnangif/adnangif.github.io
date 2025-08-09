import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadResume } from "@/lib/resume";

export default function Home() {
  const resume = loadResume();
  const featured = resume.projects.slice(0, 3);
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="space-y-6">
        <div className="space-y-2">
          <Badge>Available for opportunities</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {resume.profile.name || "Muhammad Fahim"}
          </h1>
          <p className="text-muted-foreground">
            Software Engineer — building fast, accessible web experiences.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <a href="/projects/" className="">View Projects</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="/resume/">View Resume</a>
          </Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Featured Projects</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <Card key={p.name}>
              <CardHeader>
                <CardTitle>
                  {p.url ? (
                    <a className="underline" href={p.url} target="_blank" rel="noreferrer">
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 text-sm text-muted-foreground">
                  {p.items.slice(0, 2).map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
          {(resume.skills.frameworks || []).map((s) => (
            <span key={s} className="rounded border px-2 py-1">{s}</span>
          ))}
          {(resume.skills.tools || []).map((s) => (
            <span key={s} className="rounded border px-2 py-1">{s}</span>
          ))}
        </div>
      </section>

      <section className="mt-12 flex items-center gap-3">
        <Button asChild>
          <a href="/contact/">Get in touch</a>
        </Button>
      </section>
    </main>
  );
}
