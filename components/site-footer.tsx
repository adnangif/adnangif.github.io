export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Muhammad Fahim. All rights reserved.
      </div>
    </footer>
  );
}
