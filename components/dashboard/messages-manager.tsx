"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2, Mail, MailOpen, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Message {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export function MessagesManager({
  initialMessages,
}: {
  initialMessages: Message[]
}) {
  const [messages, setMessages] = useState(initialMessages)
  const [expanded, setExpanded] = useState<string | null>(null)
  const router = useRouter()

  async function toggleRead(msg: Message) {
    const supabase = createClient()
    const { error } = await supabase
      .from("messages")
      .update({ is_read: !msg.is_read })
      .eq("id", msg.id)

    if (!error) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msg.id ? { ...m, is_read: !m.is_read } : m
        )
      )
      router.refresh()
    }
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from("messages").delete().eq("id", id)
    if (error) {
      toast.error("Erreur lors de la suppression")
    } else {
      toast.success("Message supprimé")
      setMessages((prev) => prev.filter((m) => m.id !== id))
      router.refresh()
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </p>
        {unreadCount > 0 && (
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
            {unreadCount} non lu{unreadCount !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 py-16">
          <Mail className="mb-3 h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            Aucun message pour le moment
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl border bg-card/50 transition-all ${
                msg.is_read
                  ? "border-border/30"
                  : "border-primary/20 bg-primary/[0.02]"
              }`}
            >
              <button
                onClick={() =>
                  setExpanded(expanded === msg.id ? null : msg.id)
                }
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    msg.is_read
                      ? "bg-secondary/60 text-muted-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {msg.is_read ? (
                    <MailOpen className="h-3.5 w-3.5" />
                  ) : (
                    <Mail className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm truncate ${
                        msg.is_read
                          ? "text-foreground/80"
                          : "font-semibold text-foreground"
                      }`}
                    >
                      {msg.name}
                    </p>
                    <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                      {msg.email}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">
                    {msg.subject || "Sans sujet"} - {msg.message.slice(0, 60)}
                    {msg.message.length > 60 ? "..." : ""}
                  </p>
                </div>
                <span className="hidden text-xs text-muted-foreground sm:block whitespace-nowrap">
                  {formatDate(msg.created_at)}
                </span>
                {expanded === msg.id ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {expanded === msg.id && (
                <div className="border-t border-border/30 px-4 py-4 animate-fade-in">
                  <div className="mb-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      <strong className="text-foreground/80">De:</strong>{" "}
                      {msg.name} ({msg.email})
                    </span>
                    <span>
                      <strong className="text-foreground/80">Sujet:</strong>{" "}
                      {msg.subject || "Sans sujet"}
                    </span>
                    <span>
                      <strong className="text-foreground/80">Date:</strong>{" "}
                      {formatDate(msg.created_at)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRead(msg)}
                      className="rounded-lg text-xs text-muted-foreground hover:text-foreground"
                    >
                      {msg.is_read ? (
                        <>
                          <Mail className="mr-1.5 h-3 w-3" />
                          Marquer non lu
                        </>
                      ) : (
                        <>
                          <MailOpen className="mr-1.5 h-3 w-3" />
                          Marquer lu
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(msg.id)}
                      className="rounded-lg text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="mr-1.5 h-3 w-3" />
                      Supprimer
                    </Button>
                    <a
                      href={`mailto:${msg.email}`}
                      className="ml-auto rounded-lg px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                    >
                      Répondre par email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
