import { createClient } from "@crypto.com/ai-agent-client";
import { QueryOptions } from "@crypto.com/ai-agent-client/dist/integrations/cdc-ai-agent.interfaces";

// Configuration types
interface ChainConfig {
  id: number
  name: string
  rpc: string
}

interface ExplorerKeys {
  cronosMainnetKey: string
  cronosTestnetKey: string
  cronosZkEvmKey: string
  cronosZkEvmTestnetKey: string
}

class CryptoAgentService {
  private static instance: CryptoAgentService
  private client: any // Replace 'any' with proper type when available
  private readonly defaultChainId = 240 // Cronos zkEVM Testnet

  private constructor() {
    this.initializeClient()
  }

  public static getInstance(): CryptoAgentService {
    if (!CryptoAgentService.instance) {
      CryptoAgentService.instance = new CryptoAgentService()
    }
    return CryptoAgentService.instance
  }

  private initializeClient() {
    const queryOptions: QueryOptions = {
      openAI: {
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
        model: "gpt-4-turbo",
      },
      chainId: this.defaultChainId,
      explorerKeys: {
        cronosMainnetKey: process.env.NEXT_PUBLIC_CRONOS_MAINNET_KEY!,
        cronosTestnetKey: process.env.NEXT_PUBLIC_CRONOS_TESTNET_KEY!,
        cronosZkEvmKey: process.env.NEXT_PUBLIC_CRONOS_ZKEVM_KEY!,
        cronosZkEvmTestnetKey: process.env.NEXT_PUBLIC_CRONOS_ZKEVM_TESTNET_KEY!,
      },
      context: [],
    }

    this.client = createClient(queryOptions)
  }

  public async generateQuery(query: string) {
    try {
      const response = await this.client.agent.generateQuery(query)
      return response
    } catch (error) {
      console.error('Error generating query:', error)
      throw error
    }
  }

  public async getLatestBlock() {
    try {
      const response = await this.generateQuery('get latest block')
      return response
    } catch (error) {
      console.error('Error fetching latest block:', error)
      throw error
    }
  }

  public async getWalletBalance(address: string) {
    try {
      const response = await this.generateQuery(`get balance for address ${address}`)
      return response
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
      throw error
    }
  }

  public async getTransactionHistory(address: string) {
    try {
      const response = await this.generateQuery(`get transaction history for address ${address}`)
      return response
    } catch (error) {
      console.error('Error fetching transaction history:', error)
      throw error
    }
  }
}

// Export singleton instance
export const cryptoAgent = CryptoAgentService.getInstance()

