"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from '@clerk/nextjs'
import { cryptoAgent     } from './crypto-agent'

interface WalletContextType {
  address: string | null
  isConnecting: boolean
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnecting: false,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const { userId, isSignedIn } = useAuth()
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const connect = async () => {
    if (!isSignedIn) {
      throw new Error("Please sign in first")
    }
    
    setIsConnecting(true)
    try {
      const walletResponse = await agent.connectWallet()
      setAddress(walletResponse.address)
      setIsConnected(true)
      
      // Store wallet address with user ID
      localStorage.setItem(`wallet_${userId}`, walletResponse.address)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAddress(null)
    setIsConnected(false)
    if (userId) {
      localStorage.removeItem(`wallet_${userId}`)
    }
  }

  useEffect(() => {
    // Check for existing connection when user signs in
    if (userId) {
      const savedAddress = localStorage.getItem(`wallet_${userId}`)
      if (savedAddress) {
        setAddress(savedAddress)
        setIsConnected(true)
      }
    }
  }, [userId])

  // Clear wallet connection when user signs out
  useEffect(() => {
    if (!isSignedIn) {
      disconnect()
    }
  }, [isSignedIn])

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnecting,
        isConnected,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)

