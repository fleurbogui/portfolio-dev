import { createClient } from "@/lib/supabase/server"
import { SkillsManager } from "@/components/dashboard/skills-manager"

export default async function SkillsPage() {
  const supabase = await createClient()
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Compétences</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez vos compétences et technologies.
        </p>
      </div>
      <SkillsManager initialSkills={skills ?? []} />
    </div>
  )
}
