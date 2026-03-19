import { createClient } from "@/lib/supabase/server"
import { ProjectsManager } from "@/components/dashboard/projects-manager"

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Projets</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ajoutez, modifiez ou supprimez vos projets.
        </p>
      </div>
      <ProjectsManager initialProjects={projects ?? []} />
    </div>
  )
}
