import { createClient } from "@/lib/supabase/server"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  tags: string[]
  live_url: string | null
  github_url: string | null
  featured: boolean
  display_order: number
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Dashboard Monitoring Réseau",
    description:
      "Application de monitoring en temps réel pour superviser l'infrastructure réseau avec alertes et visualisations.",
    image_url: null,
    tags: ["Next.js", "WebSocket", "PostgreSQL", "Docker"],
    live_url: "#",
    github_url: "#",
    featured: true,
    display_order: 0,
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description:
      "Plateforme e-commerce complète avec gestion des paiements, inventaire et tableau de bord admin.",
    image_url: null,
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    live_url: "#",
    github_url: "#",
    featured: true,
    display_order: 1,
  },
  {
    id: "3",
    title: "Automatisation Infra CI/CD",
    description:
      "Pipeline de déploiement automatisé avec tests, build et mise en production continue sur cloud.",
    image_url: null,
    tags: ["Docker", "GitHub Actions", "AWS", "Terraform"],
    live_url: null,
    github_url: "#",
    featured: false,
    display_order: 2,
  },
  {
    id: "4",
    title: "API Gateway Sécurisé",
    description:
      "Gateway API avec authentification JWT, rate limiting, logging et gestion des microservices.",
    image_url: null,
    tags: ["Node.js", "Redis", "Nginx", "TypeScript"],
    live_url: null,
    github_url: "#",
    featured: false,
    display_order: 3,
  },
]

export async function ProjectsSection() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })

  const displayProjects =
    projects && projects.length > 0 ? projects : defaultProjects

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Projets
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Réalisations récentes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            Une sélection de projets qui illustrent mon expertise technique et
            ma capacité à livrer des solutions complètes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {displayProjects.map((project: Project) => (
            <div
              key={project.id}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30 hover:bg-card ${
                project.featured ? "md:col-span-1" : ""
              }`}
            >
              {/* Project image placeholder with gradient */}
              <div className="relative h-48 overflow-hidden bg-secondary/30">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="font-mono text-3xl font-bold text-muted-foreground/20">
                      {project.title
                        .split(" ")
                        .map((w: string) => w[0])
                        .join("")
                        .slice(0, 3)}
                    </div>
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 text-primary-foreground border-0 text-[10px] uppercase tracking-wider">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {project.live_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="rounded-full text-xs border-border/60 hover:bg-secondary/50"
                    >
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1.5 h-3 w-3" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="rounded-full text-xs text-muted-foreground hover:text-foreground"
                    >
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1.5 h-3 w-3" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
