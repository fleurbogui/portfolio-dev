"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface Skill {
  id: string
  name: string
  category: string
  level: number
  icon: string | null
  display_order: number
  created_at: string
}

const categories = ["Frontend", "Backend", "Réseau", "DevOps", "Autre"]

export function SkillsManager({
  initialSkills,
}: {
  initialSkills: Skill[]
}) {
  const [skills, setSkills] = useState(initialSkills)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const data = {
      name: form.get("name") as string,
      category: selectedCategory || (form.get("category") as string),
      level: parseInt(form.get("level") as string) || 80,
      icon: (form.get("icon") as string) || null,
      display_order: parseInt(form.get("display_order") as string) || 0,
    }

    const supabase = createClient()

    if (editing) {
      const { error } = await supabase
        .from("skills")
        .update(data)
        .eq("id", editing.id)

      if (error) {
        toast.error("Erreur lors de la mise à jour")
      } else {
        toast.success("Compétence mise à jour")
        setSkills((prev) =>
          prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s))
        )
      }
    } else {
      const { data: newSkill, error } = await supabase
        .from("skills")
        .insert(data)
        .select()
        .single()

      if (error) {
        toast.error("Erreur lors de la création")
      } else {
        toast.success("Compétence ajoutée")
        setSkills((prev) => [...prev, newSkill])
      }
    }

    setLoading(false)
    setOpen(false)
    setEditing(null)
    setSelectedCategory("")
    router.refresh()
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from("skills").delete().eq("id", id)
    if (error) {
      toast.error("Erreur lors de la suppression")
    } else {
      toast.success("Compétence supprimée")
      setSkills((prev) => prev.filter((s) => s.id !== id))
      router.refresh()
    }
  }

  function openEdit(skill: Skill) {
    setEditing(skill)
    setSelectedCategory(skill.category)
    setOpen(true)
  }

  function openCreate() {
    setEditing(null)
    setSelectedCategory("")
    setOpen(true)
  }

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {skills.length} compétence{skills.length !== 1 ? "s" : ""}
        </p>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditing(null); setSelectedCategory(""); } }}>
          <DialogTrigger asChild>
            <Button
              onClick={openCreate}
              className="rounded-lg bg-primary text-sm text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une compétence
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border/50 bg-card sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editing ? "Modifier la compétence" : "Nouvelle compétence"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Nom</Label>
                <Input
                  name="name"
                  defaultValue={editing?.name || ""}
                  required
                  placeholder="React, Docker, TCP/IP..."
                  className="rounded-lg border-border/50 bg-background"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Catégorie</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="rounded-lg border-border/50 bg-background">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">
                  Niveau (0-100)
                </Label>
                <Input
                  name="level"
                  type="number"
                  min={0}
                  max={100}
                  defaultValue={editing?.level || 80}
                  className="rounded-lg border-border/50 bg-background"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">Icône (optionnel)</Label>
                  <Input
                    name="icon"
                    defaultValue={editing?.icon || ""}
                    placeholder="react, docker..."
                    className="rounded-lg border-border/50 bg-background"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">Ordre</Label>
                  <Input
                    name="display_order"
                    type="number"
                    defaultValue={editing?.display_order || 0}
                    className="rounded-lg border-border/50 bg-background"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="rounded-lg"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading
                    ? "Enregistrement..."
                    : editing
                    ? "Mettre à jour"
                    : "Créer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 py-16">
          <p className="text-sm text-muted-foreground">
            Aucune compétence ajoutée
          </p>
          <Button
            variant="ghost"
            onClick={openCreate}
            className="mt-3 text-sm text-primary hover:bg-primary/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter votre première compétence
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {category}
              </h3>
              <div className="flex flex-col gap-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-3 transition-all hover:border-border"
                  >
                    <div className="flex-1">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-1.5 bg-secondary" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(skill)}
                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(skill.id)}
                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
