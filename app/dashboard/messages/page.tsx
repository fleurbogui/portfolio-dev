import { createClient } from "@/lib/supabase/server"
import { MessagesManager } from "@/components/dashboard/messages-manager"

export default async function MessagesPage() {
  const supabase = await createClient()
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Messages reçus via le formulaire de contact.
        </p>
      </div>
      <MessagesManager initialMessages={messages ?? []} />
    </div>
  )
}
