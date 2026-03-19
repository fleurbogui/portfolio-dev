import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 border border-destructive/20">
          <Terminal className="h-5 w-5 text-destructive" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">
          Erreur d{"'"}authentification
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur est survenue. Veuillez réessayer.
        </p>
        <Button asChild variant="outline" className="mt-6 rounded-xl border-border/50">
          <a href="/auth/login">Retour à la connexion</a>
        </Button>
      </div>
    </div>
  )
}
