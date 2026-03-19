import { createClient } from "@/lib/supabase/server"
import { Progress } from "@/components/ui/progress"

interface Skill {
  id: string
  name: string
  category: string
  level: number
  icon: string | null
  display_order: number
}

const defaultSkills: Skill[] = [
  { id: "1", name: "React / Next.js", category: "Frontend", level: 90, icon: null, display_order: 0 },
  { id: "2", name: "TypeScript", category: "Frontend", level: 85, icon: null, display_order: 1 },
  { id: "3", name: "Tailwind CSS", category: "Frontend", level: 90, icon: null, display_order: 2 },
  { id: "4", name: "HTML / CSS", category: "Frontend", level: 95, icon: null, display_order: 3 },
  { id: "5", name: "Node.js", category: "Backend", level: 85, icon: null, display_order: 0 },
  { id: "6", name: "PostgreSQL", category: "Backend", level: 80, icon: null, display_order: 1 },
  { id: "7", name: "REST API", category: "Backend", level: 90, icon: null, display_order: 2 },
  { id: "8", name: "Python", category: "Backend", level: 75, icon: null, display_order: 3 },
  { id: "9", name: "TCP/IP", category: "Réseau", level: 85, icon: null, display_order: 0 },
  { id: "10", name: "Cisco / Routing", category: "Réseau", level: 80, icon: null, display_order: 1 },
  { id: "11", name: "DNS / DHCP", category: "Réseau", level: 85, icon: null, display_order: 2 },
  { id: "12", name: "VPN / Firewall", category: "Réseau", level: 75, icon: null, display_order: 3 },
  { id: "13", name: "Docker", category: "DevOps", level: 80, icon: null, display_order: 0 },
  { id: "14", name: "Git / CI-CD", category: "DevOps", level: 85, icon: null, display_order: 1 },
  { id: "15", name: "Linux", category: "DevOps", level: 80, icon: null, display_order: 2 },
  { id: "16", name: "AWS / Cloud", category: "DevOps", level: 70, icon: null, display_order: 3 },
]

export async function SkillsSection() {
  const supabase = await createClient()
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true })

  const displaySkills = skills && skills.length > 0 ? skills : defaultSkills

  const categories = Array.from(
    new Set(displaySkills.map((s: Skill) => s.category))
  )

  return (
    <section id="skills" className="relative py-28 px-6">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 bg-secondary/20" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Competences
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Technologies & Outils
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            Un stack technique varié, du développement web à
            l{"'"}infrastructure réseau.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                <span className="h-px flex-1 bg-border/50" />
                <span className="px-3">{category}</span>
                <span className="h-px flex-1 bg-border/50" />
              </h3>
              <div className="flex flex-col gap-4">
                {displaySkills
                  .filter((s: Skill) => s.category === category)
                  .map((skill: Skill) => (
                    <div key={skill.id} className="group">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground/90">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress
                        value={skill.level}
                        className="h-1.5 bg-secondary"
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
