import { create } from 'zustand'
import { cryptoAgent } from '@/lib/crypto-agent'

interface CryptoState {
  latestBlock: any | null
  isLoading: boolean
  error: string | null
  fetchLatestBlock: () => Promise<void>
  getWalletBalance: (address: string) => Promise<void>
  getTransactionHistory: (address: string) => Promise<void>
}

export const useCryptoStore = create<CryptoState>((set) => ({
  latestBlock: null,
  isLoading: false,
  error: null,

  fetchLatestBlock: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await cryptoAgent.getLatestBlock()
      set({ latestBlock: response, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch latest block', isLoading: false })
    }
  },

  getWalletBalance: async (address: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await cryptoAgent.getWalletBalance(address)
      set({ isLoading: false })
      return response
    } catch (error) {
      set({ error: 'Failed to fetch wallet balance', isLoading: false })
      throw error
    }
  },

  getTransactionHistory: async (address: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await cryptoAgent.getTransactionHistory(address)
      set({ isLoading: false })
      return response
    } catch (error) {
      set({ error: 'Failed to fetch transaction history', isLoading: false })
      throw error
    }
  },
}))

