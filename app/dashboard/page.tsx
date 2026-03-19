import { createClient } from "@/lib/supabase/server"
import { FolderOpen, Zap, MessageSquare, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  const supabase = await createClient()

  const [{ count: projectCount }, { count: skillCount }, { count: messageCount }, { count: unreadCount }] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("skills").select("*", { count: "exact", head: true }),
      supabase.from("messages").select("*", { count: "exact", head: true }),
      supabase.from("messages").select("*", { count: "exact", head: true }).eq("is_read", false),
    ])

  const stats = [
    { label: "Projets", value: projectCount ?? 0, icon: FolderOpen, href: "/dashboard/projects" },
    { label: "Compétences", value: skillCount ?? 0, icon: Zap, href: "/dashboard/skills" },
    { label: "Messages", value: messageCount ?? 0, icon: MessageSquare, href: "/dashboard/messages" },
    { label: "Non lus", value: unreadCount ?? 0, icon: Eye, href: "/dashboard/messages" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez votre portfolio depuis cet espace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <a key={stat.label} href={stat.href}>
            <Card className="border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
