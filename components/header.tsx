import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { WalletConnect } from "./wallet-connect"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold">
          Portfolio Storyteller
        </Link>
        <div className="flex items-center gap-4">
          <WalletConnect />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}

