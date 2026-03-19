"use client"

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow accent */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="animate-fade-in-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide">
              Disponible pour de nouveaux projets
            </span>
          </div>
        </div>

        <h1
          className="animate-fade-in-up text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
          style={{ animationDelay: "0.1s" }}
        >
          Fullstack Developer
          <br />
          <span className="text-primary">& Network Engineer</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl animate-fade-in-up text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
          style={{ animationDelay: "0.2s" }}
        >
          Je conçois des applications web performantes et des infrastructures
          réseau robustes. Du frontend au backend, en passant par le DevOps
          et la sécurité réseau.
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-4 animate-fade-in-up sm:flex-row sm:justify-center"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            asChild
            className="rounded-full px-8 py-6 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <a href="#projects">Voir mes projets</a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="rounded-full px-8 py-6 text-sm font-medium border-border/60 text-foreground hover:bg-secondary/50 transition-all"
          >
            <a href="#contact">Me contacter</a>
          </Button>
        </div>

        <div
          className="mt-12 flex items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-3 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-3 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:contact@example.com"
            className="rounded-full p-3 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  )
}
