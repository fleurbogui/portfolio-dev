import { Terminal, Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Terminal className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {"<dev />"}
          </span>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {"Conçu & développé avec passion. Tous droits réservés."} {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:contact@example.com"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
