import { type Address, getAddress } from 'viem'
import { normalize } from 'viem/ens'

import { getPublicClient } from '../viem'

export type FetchEnsAddressArgs = {
  /** Chain id to use for Public Client. */
  chainId?: number
  /** ENS name to resolve */
  name: string
  /** Universal Resolver contract address */
  universalResolverAddress?: `0x${string}`
}

export type FetchEnsAddressResult = Address | null

export async function fetchEnsAddress({
  chainId,
  name,
  universalResolverAddress,
}: FetchEnsAddressArgs): Promise<FetchEnsAddressResult> {
  const publicClient = getPublicClient({ chainId })
  const address = await publicClient.getEnsAddress({
    name: normalize(name),
    universalResolverAddress,
  })

  try {
    if (address === '0x0000000000000000000000000000000000000000') return null
    return address ? getAddress(address) : null
  } catch (_error) {
    return null
  }
}
