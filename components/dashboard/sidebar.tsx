"use client"

import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  LayoutDashboard,
  FolderOpen,
  Zap,
  MessageSquare,
  LogOut,
  Terminal,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projets", icon: FolderOpen },
  { href: "/dashboard/skills", label: "Compétences", icon: Zap },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
]

export function DashboardSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/50 bg-card/30 lg:flex">
      <div className="flex items-center gap-2 border-b border-border/50 px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
          <Terminal className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground">Dashboard</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          )
        })}

        <div className="my-2 h-px bg-border/50" />

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
        >
          <ExternalLink className="h-4 w-4" />
          Voir le portfolio
        </a>
      </nav>

      <div className="border-t border-border/50 px-3 py-4">
        <p className="mb-3 truncate px-3 text-xs text-muted-foreground">
          {userEmail}
        </p>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 rounded-lg px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </aside>
  )
}
