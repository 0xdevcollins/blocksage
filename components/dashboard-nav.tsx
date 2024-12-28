"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
// import { ModeToggle } from "@/components/mode-toggle"
import { UserButton } from "@clerk/nextjs"
import { LayoutDashboard, Wallet, History, Brain, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/assets",
    label: "Assets",
    icon: Wallet,
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: History,
  },
  {
    href: "/insights",
    label: "AI Insights",
    icon: Brain,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-bold">
            Portfolio Storyteller
          </Link>
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            )
          })}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Portfolio Storyteller</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {routes.map((route) => {
                  const Icon = route.icon
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center text-sm font-medium transition-colors hover:text-primary",
                        pathname === route.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {route.label}
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center space-x-4">
          <WalletConnect />
          {/* <ModeToggle /> */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  )
}

