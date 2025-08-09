import { loadResume } from "@/lib/resume";

export default function ResumePage() {
  const resume = loadResume();
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Resume</h1>
      <section className="mt-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{resume.profile.name}</h2>
          <ul className="mt-2 text-sm text-muted-foreground">
            {resume.profile.links?.map((l) => (
              <li key={l.url}>
                <a className="underline" href={l.url} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Education</h3>
          {resume.education.map((e, idx) => (
            <ul key={idx} className="mt-2 list-disc pl-6 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">{e.degree},{e.institution}</span>
              </li>
              <li>
                <span className="">{e.duration}</span>
              </li>
              {e.items?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Experience</h3>
          <ul className="mt-2 space-y-4">
            {resume.experience.map((x, idx) => (
              <li key={idx}>
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
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Projects</h3>
          <ul className="mt-2 space-y-4">
            {resume.projects.map((p, idx) => (
              <li key={idx}>
                <div className="font-medium">
                  {p.url ? (
                    <a className="underline" href={p.url} target="_blank" rel="noreferrer">
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </div>
                <ul className="list-disc pl-6 text-sm text-muted-foreground mt-1">
                  {p.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="mt-8">
        <a className="underline" href="/muhammadfahim.pdf" target="_blank" rel="noreferrer">
          Open PDF
        </a>
      </div>
    </main>
  );
}


