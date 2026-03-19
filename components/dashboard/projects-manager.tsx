"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, X, Star, StarOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface Project {
  id: string
  title: string
  description: string
  long_description: string | null
  image_url: string | null
  tags: string[]
  live_url: string | null
  github_url: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export function ProjectsManager({
  initialProjects,
}: {
  initialProjects: Project[]
}) {
  const [projects, setProjects] = useState(initialProjects)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const [tagsInput, setTagsInput] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      long_description: (form.get("long_description") as string) || null,
      image_url: (form.get("image_url") as string) || null,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      live_url: (form.get("live_url") as string) || null,
      github_url: (form.get("github_url") as string) || null,
      featured: form.get("featured") === "on",
      display_order: parseInt(form.get("display_order") as string) || 0,
    }

    const supabase = createClient()

    if (editing) {
      const { error } = await supabase
        .from("projects")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", editing.id)

      if (error) {
        toast.error("Erreur lors de la mise à jour")
      } else {
        toast.success("Projet mis à jour")
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editing.id ? { ...p, ...data, updated_at: new Date().toISOString() } : p
          )
        )
      }
    } else {
      const { data: newProject, error } = await supabase
        .from("projects")
        .insert(data)
        .select()
        .single()

      if (error) {
        toast.error("Erreur lors de la création")
      } else {
        toast.success("Projet ajouté")
        setProjects((prev) => [...prev, newProject])
      }
    }

    setLoading(false)
    setOpen(false)
    setEditing(null)
    setTagsInput("")
    router.refresh()
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from("projects").delete().eq("id", id)
    if (error) {
      toast.error("Erreur lors de la suppression")
    } else {
      toast.success("Projet supprimé")
      setProjects((prev) => prev.filter((p) => p.id !== id))
      router.refresh()
    }
  }

  function openEdit(project: Project) {
    setEditing(project)
    setTagsInput(project.tags?.join(", ") || "")
    setOpen(true)
  }

  function openCreate() {
    setEditing(null)
    setTagsInput("")
    setOpen(true)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {projects.length} projet{projects.length !== 1 ? "s" : ""}
        </p>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditing(null); setTagsInput(""); } }}>
          <DialogTrigger asChild>
            <Button
              onClick={openCreate}
              className="rounded-lg bg-primary text-sm text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un projet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto border-border/50 bg-card sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editing ? "Modifier le projet" : "Nouveau projet"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Titre</Label>
                <Input
                  name="title"
                  defaultValue={editing?.title || ""}
                  required
                  className="rounded-lg border-border/50 bg-background"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Description courte</Label>
                <Textarea
                  name="description"
                  defaultValue={editing?.description || ""}
                  required
                  rows={2}
                  className="resize-none rounded-lg border-border/50 bg-background"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Description détaillée</Label>
                <Textarea
                  name="long_description"
                  defaultValue={editing?.long_description || ""}
                  rows={3}
                  className="resize-none rounded-lg border-border/50 bg-background"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Image URL</Label>
                <Input
                  name="image_url"
                  defaultValue={editing?.image_url || ""}
                  placeholder="https://..."
                  className="rounded-lg border-border/50 bg-background"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">
                  Tags (séparés par des virgules)
                </Label>
                <Input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="React, Node.js, Docker"
                  className="rounded-lg border-border/50 bg-background"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">URL Live</Label>
                  <Input
                    name="live_url"
                    defaultValue={editing?.live_url || ""}
                    placeholder="https://..."
                    className="rounded-lg border-border/50 bg-background"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">URL GitHub</Label>
                  <Input
                    name="github_url"
                    defaultValue={editing?.github_url || ""}
                    placeholder="https://github.com/..."
                    className="rounded-lg border-border/50 bg-background"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">Ordre d{"'"}affichage</Label>
                  <Input
                    name="display_order"
                    type="number"
                    defaultValue={editing?.display_order || 0}
                    className="rounded-lg border-border/50 bg-background"
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch
                    name="featured"
                    defaultChecked={editing?.featured || false}
                  />
                  <Label className="text-sm text-foreground">Featured</Label>
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

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 py-16">
          <p className="text-sm text-muted-foreground">Aucun projet pour le moment</p>
          <Button
            variant="ghost"
            onClick={openCreate}
            className="mt-3 text-sm text-primary hover:bg-primary/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter votre premier projet
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all hover:border-border"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.tags?.slice(0, 4).map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] bg-secondary/60 text-muted-foreground border-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(project)}
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(project.id)}
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
