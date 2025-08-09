export default function ResumePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Resume</h1>
      <p className="text-muted-foreground mt-2">Resume rendering will be wired to JSON parsed from LaTeX.</p>
      <div className="mt-6">
        <a className="underline" href="/resume.pdf" target="_blank" rel="noreferrer">
          Download PDF
        </a>
      </div>
    </main>
  );
}


