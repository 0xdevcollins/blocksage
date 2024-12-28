import { create } from 'zustand'
import { cryptoAgent } from '@/lib/crypto-agent'
import { useWalletStore } from './use-wallet-store'

export interface Asset {
  symbol: string
  amount: number
  value: number
  change24h: number
  price: number
  chain: string
}

export interface Transaction {
  hash: string
  type: string
  amount: number
  symbol: string
  timestamp: number
  value: number
  status: string
  from: string
  to: string
  fee: number
}

export interface TimelineEvent {
  id: string
  type: string
  title: string
  description: string
  timestamp: number
  data: any
}

export interface Insight {
  id: string
  type: 'warning' | 'opportunity' | 'info'
  title: string
  description: string
  importance: number
  timestamp: number
  relatedAssets?: string[]
}

interface PortfolioState {
  totalValue: number
  dailyChange: number
  profitLoss: number
  assets: Asset[]
  transactions: Transaction[]
  insights: Insight[]
  timelineEvents: TimelineEvent[]
  isLoading: boolean
  error: string | null
  selectedTimeRange: '24h' | '7d' | '30d' | '1y' | 'all'
  fetchPortfolioData: (address: string) => Promise<void>
  fetchTimelineEvents: (address: string) => Promise<void>
  generateInsights: (address: string) => Promise<void>
  setTimeRange: (range: '24h' | '7d' | '30d' | '1y' | 'all') => void
  reset: () => void
}

const initialState = {
  totalValue: 0,
  dailyChange: 0,
  profitLoss: 0,
  assets: [],
  transactions: [],
  insights: [],
  timelineEvents: [],
  isLoading: false,
  error: null,
  selectedTimeRange: '24h' as const
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  ...initialState,

  fetchPortfolioData: async (address: string) => {
    set({ isLoading: true, error: null })
    try {
      // Fetch portfolio overview
      const portfolioQuery = `get portfolio data for ${address} in last ${get().selectedTimeRange}`
      const portfolioResponse = await cryptoAgent.generateQuery(portfolioQuery)
      
      if (!portfolioResponse?.data) {
        throw new Error('Failed to fetch portfolio data')
      }

      // Fetch transactions
      const txQuery = `get transaction history for ${address} in last ${get().selectedTimeRange}`
      const txResponse = await cryptoAgent.generateQuery(txQuery)

      set({
        totalValue: portfolioResponse.data.totalValue || 0,
        dailyChange: portfolioResponse.data.dailyChange || 0,
        profitLoss: portfolioResponse.data.profitLoss || 0,
        assets: portfolioResponse.data.assets || [],
        transactions: txResponse?.data?.transactions || [],
      })

      // Generate new insights after data update
      await get().generateInsights(address)
    } catch (error) {
      console.error('Error fetching portfolio data:', error)
      set({ error: 'Failed to fetch portfolio data' })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchTimelineEvents: async (address: string) => {
    try {
      const query = `generate timeline events for ${address}`
      const response = await cryptoAgent.generateQuery(query)
      
      if (response?.data?.events) {
        set({ timelineEvents: response.data.events })
      }
    } catch (error) {
      console.error('Error generating timeline:', error)
      set({ error: 'Failed to generate timeline' })
    }
  },

  generateInsights: async (address: string) => {
    try {
      const query = `analyze portfolio and generate insights for ${address}`
      const response = await cryptoAgent.generateQuery(query)
      
      if (response?.data?.insights) {
        set({ insights: response.data.insights })
      }
    } catch (error) {
      console.error('Error generating insights:', error)
      set({ error: 'Failed to generate insights' })
    }
  },

  setTimeRange: (range: '24h' | '7d' | '30d' | '1y' | 'all') => {
    set({ selectedTimeRange: range })
    const { address } = useWalletStore.getState()
    if (address) {
      get().fetchPortfolioData(address)
    }
  },

  reset: () => {
    set(initialState)
  }
}))

