"use client"

import { useState } from "react"
import { Send, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function ContactSection() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to send message")

      toast.success("Message envoyé avec succès !")
      ;(e.target as HTMLFormElement).reset()
    } catch {
      toast.error("Erreur lors de l'envoi du message. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="pointer-events-none absolute inset-0 bg-secondary/20" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Travaillons ensemble
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            Un projet en tête ? N{"'"}hésitez pas à me contacter pour en
            discuter.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact info */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">
                  contact@monportfolio.dev
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Localisation
                </p>
                <p className="text-sm text-muted-foreground">
                  France - Remote / On-site
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Disponibilité
                </p>
                <p className="text-sm text-muted-foreground">
                  Réponse sous 24-48h
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Nom
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="rounded-xl border-border/50 bg-card/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="rounded-xl border-border/50 bg-card/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="subject"
                className="text-sm font-medium text-foreground"
              >
                Sujet
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Projet web / Infrastructure / Collaboration"
                className="rounded-xl border-border/50 bg-card/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Décrivez votre projet ou votre besoin..."
                rows={5}
                required
                className="resize-none rounded-xl border-border/50 bg-card/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all sm:w-auto sm:self-end sm:px-8"
            >
              {loading ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer le message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
