import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cryptoAgent } from '@/lib/crypto-agent'
import { CHAIN_IDS } from '@/lib/constant'

interface WalletBalance {
  total: number
  tokens: {
    symbol: string
    balance: number
    value: number
  }[]
}

interface WalletState {
  address: string | null
  chainId: number
  balance: WalletBalance | null
  isConnecting: boolean
  isConnected: boolean
  error: string | null
  connect: (userId: string) => Promise<void>
  disconnect: (userId: string) => void
  checkConnection: (userId: string) => void
  fetchBalance: () => Promise<void>
  switchChain: (chainId: number) => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      address: null,
      chainId: CHAIN_IDS.CRONOS_ZKEVM_TESTNET,
      balance: null,
      isConnecting: false,
      isConnected: false,
      error: null,

      connect: async (userId: string) => {
        if (!userId) {
          throw new Error("Please sign in first")
        }

        set({ isConnecting: true, error: null })
        try {
          // Generate wallet connection query
          const response = await cryptoAgent.generateQuery('connect wallet')
          if (!response?.data?.address) {
            throw new Error('Failed to get wallet address')
          }

          set({
            address: response.data.address,
            isConnected: true,
          })
          
          // Store wallet address with user ID
          localStorage.setItem(`wallet_${userId}`, response.data.address)
          
          // Fetch initial balance
          await get().fetchBalance()
        } catch (error) {
          set({ error: 'Failed to connect wallet' })
          console.error('Wallet connection error:', error)
          throw error
        } finally {
          set({ isConnecting: false })
        }
      },

      disconnect: (userId: string) => {
        set({
          address: null,
          isConnected: false,
          balance: null,
          error: null
        })
        localStorage.removeItem(`wallet_${userId}`)
      },

      checkConnection: (userId: string) => {
        if (!userId) return

        const savedAddress = localStorage.getItem(`wallet_${userId}`)
        if (savedAddress) {
          set({
            address: savedAddress,
            isConnected: true
          })
          // Fetch balance for saved address
          get().fetchBalance()
        }
      },

      fetchBalance: async () => {
        const { address } = get()
        if (!address) return

        try {
          const response = await cryptoAgent.getWalletBalance(address)
          if (response?.data?.balance) {
            set({ balance: response.data.balance })
          }
        } catch (error) {
          console.error('Error fetching balance:', error)
          set({ error: 'Failed to fetch wallet balance' })
        }
      },

      switchChain: (chainId: number) => {
        set({ chainId })
        // Refresh balance after chain switch
        get().fetchBalance()
      }
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        address: state.address,
        chainId: state.chainId,
        isConnected: state.isConnected
      })
    }
  )
)

