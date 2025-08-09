import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="space-y-6">
        <div className="space-y-2">
          <Badge>Available for opportunities</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Muhammad Fahim
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
    </main>
  );
}
