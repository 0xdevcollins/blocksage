"use client"

import { Button } from "@/components/ui/button"
import { useWalletStore } from "@/store/use-wallet-store"
import { useAuth } from "@clerk/nextjs"
import { Wallet, LogOut } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useEffect } from "react"

export function WalletConnect() {
  const { userId, isSignedIn } = useAuth()
  const { address, isConnecting, isConnected, connect, disconnect, checkConnection } = useWalletStore()

  // Check for existing connection when component mounts
  useEffect(() => {
    if (userId) {
      checkConnection(userId)
    }
  }, [userId, checkConnection])

  // Clear connection when user signs out
  useEffect(() => {
    if (!isSignedIn && userId) {
      disconnect(userId)
    }
  }, [isSignedIn, userId, disconnect])

  const handleConnect = async () => {
    if (!isSignedIn || !userId) {
      toast.error("Please sign in to connect your wallet")
      return
    }

    try {
      await connect(userId)
      toast.success("Wallet connected successfully")
    } catch (error) {
      toast.error("Failed to connect wallet")
    }
  }

  const handleDisconnect = () => {
    if (userId) {
      disconnect(userId)
      toast.success("Wallet disconnected")
    }
  }

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            {address.slice(0, 6)}...{address.slice(-4)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDisconnect}>
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting || !isSignedIn}
      className="flex items-center gap-2"
    >
      <Wallet className="h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  )
}

