import { Server, Code2, Shield, Database } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Fullstack Development",
    description:
      "Applications web modernes avec React, Next.js, Node.js et TypeScript. Du prototype au produit fini.",
  },
  {
    icon: Server,
    title: "Infrastructure Réseau",
    description:
      "Configuration et administration de réseaux, routeurs, switches. Protocoles TCP/IP, DNS, DHCP, VPN.",
  },
  {
    icon: Database,
    title: "Base de données & API",
    description:
      "Design de bases de données relationnelles et NoSQL. APIs RESTful et GraphQL performantes.",
  },
  {
    icon: Shield,
    title: "Sécurité & DevOps",
    description:
      "Sécurisation d'infrastructures, CI/CD, Docker, monitoring et bonnes pratiques de déploiement.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            A propos
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Un profil polyvalent entre
            <br />
            développement et réseau
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
            Passionné par la technologie, je combine une expertise en
            développement fullstack avec des compétences solides en
            infrastructure réseau pour livrer des solutions complètes et fiables.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
