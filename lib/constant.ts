export const CHAIN_IDS = {
    CRONOS_MAINNET: 25,
    CRONOS_TESTNET: 338,
    CRONOS_ZKEVM_MAINNET: 388,
    CRONOS_ZKEVM_TESTNET: 240,
  } as const
  
  export const RPC_URLS = {
    [CHAIN_IDS.CRONOS_ZKEVM_MAINNET]: 'https://mainnet.zkevm.cronos.org',
    [CHAIN_IDS.CRONOS_ZKEVM_TESTNET]: 'https://testnet.zkevm.cronos.org',
  } as const
  
  export const EXPLORER_URLS = {
    [CHAIN_IDS.CRONOS_ZKEVM_MAINNET]: 'https://explorer.zkevm.cronos.org',
    [CHAIN_IDS.CRONOS_ZKEVM_TESTNET]: 'https://explorer.zkevm.cronos.org/testnet',
  } as const
  
  export const API_RATE_LIMITS = {
    CRONOS_MAINNET: 300, // requests per minute per IP
    CRONOS_TESTNET: 500, // requests per minute per IP
    ZKEVM_API: 50, // requests per minute
  } as const
  
  