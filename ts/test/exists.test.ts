
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AppStoreMetadataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AppStoreMetadataSDK.test()
    equal(testsdk instanceof AppStoreMetadataSDK, true,
      'AppStoreMetadataSDK.test() must return a client synchronously')
  })

})
