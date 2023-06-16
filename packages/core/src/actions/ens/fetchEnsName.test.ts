import { beforeEach, describe, expect, it } from 'vitest'

import { setupConfig } from '../../../test'
import { fetchEnsName } from './fetchEnsName'

describe('fetchEnsName', () => {
  beforeEach(() => {
    setupConfig()
  })

  describe('args', () => {
    describe('address', () => {
      it('no result', async () => {
        expect(
          await fetchEnsName({
            address: '0x5FE6C3F8d12D5Ad1480F6DC01D8c7864Aa58C523',
          }),
        ).toMatchInlineSnapshot('null')
      })

      it('has name', async () => {
        expect(
          await fetchEnsName({
            address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          }),
        ).toMatchInlineSnapshot(`"awkweb.eth"`)
      })
    })

    it('chainId', async () => {
      expect(
        await fetchEnsName({
          address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`"awkweb.eth"`)
    })

    it('custom universal resolver contract address', async () => {
      expect(
        await fetchEnsName({
          address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          universalResolverAddress: '0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62',
        }),
      ).toMatchInlineSnapshot(`"awkweb.eth"`)
    })
  })
})
