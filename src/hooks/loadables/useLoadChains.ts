import { useEffect } from 'react'
import { type ChainInfo, FEATURES, getChainsConfig, RPC_AUTHENTICATION } from '@safe-global/safe-gateway-typescript-sdk'
import useAsync, { type AsyncResult } from '../useAsync'
import { Errors, logError } from '@/services/exceptions'

const getConfigs = async (): Promise<ChainInfo[]> => {
  const data = await getChainsConfig()
  const kyoto: ChainInfo = {
    transactionService: 'https://safe-transaction-base.safe.global/',
    chainId: '1998',
    chainName: 'Kyoto',
    shortName: 'kyt',
    l2: false,
    description: 'Kyoto Testnet',
    rpcUri: {
      authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
      value: 'https://rpc-testnet.kyotoprotocol.io/',
    },
    safeAppsRpcUri: {
      authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
      value: 'https://rpc-testnet.kyotoprotocol.io/',
    },
    publicRpcUri: {
      authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
      value: 'https://rpc-testnet.kyotoprotocol.io/',
    },
    blockExplorerUriTemplate: {
      address: 'https://testnet.kyotoscan.io/address/{{address}}',
      txHash: 'https://testnet.kyotoscan.io/tx/{{txHash}}',
      api: 'https://testnet.kyotoscan.io/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
    },
    nativeCurrency: {
      name: 'Kyoto',
      symbol: 'KYT',
      decimals: 18,
      logoUri: '',
    },
    theme: {
      textColor: '#ffffff',
      backgroundColor: '#4D99EB',
    },
    gasPrice: [],
    disabledWallets: ['coinbase', 'fortmatic', 'portis', 'tally', 'torus', 'trust'],
    features: [
      FEATURES.CONTRACT_INTERACTION,
      FEATURES.DOMAIN_LOOKUP,
      FEATURES.EIP1271,
      FEATURES.EIP1559,
      FEATURES.ERC721,
      FEATURES.SAFE_APPS,
      FEATURES.SAFE_TX_GAS_OPTIONAL,
      FEATURES.SPENDING_LIMIT,
      FEATURES.TX_SIMULATION,
    ],
  }
  return [...data.results, kyoto] || []
}

export const useLoadChains = (): AsyncResult<ChainInfo[]> => {
  const [data, error, loading] = useAsync<ChainInfo[]>(getConfigs, [])

  // Log errors
  useEffect(() => {
    if (error) {
      logError(Errors._620, error.message)
    }
  }, [error])

  return [data, error, loading]
}

export default useLoadChains
