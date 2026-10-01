

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AppStoreMetadataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AppEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APP_STORE_METADATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('APP_STORE_METADATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AppStoreMetadataSDK.test()
    const ent = testsdk.App()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APP_STORE_METADATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"appId":{"a":true,"h":"App Id","n":"appId","r":false,"sh":"Unique App Store identifier","t":"`$STRING`","key$":"appId","index$":0},"appName":{"a":true,"h":"App Name","n":"appName","r":false,"sh":"Name of the application","t":"`$STRING`","key$":"appName","index$":1},"bundleId":{"a":true,"h":"Bundle Id","n":"bundleId","r":false,"sh":"App bundle identifier","t":"`$STRING`","key$":"bundleId","index$":2},"category":{"a":true,"h":"Category","n":"category","r":false,"sh":"Primary app category","t":"`$STRING`","key$":"category","index$":3},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"Currency code","t":"`$STRING`","key$":"currency","index$":4},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Full app description","t":"`$STRING`","key$":"description","index$":5},"developer":{"a":true,"h":"Developer","n":"developer","r":false,"sh":"Developer or publisher name","t":"`$STRING`","key$":"developer","index$":6},"iconUrl":{"a":true,"fo":"uri","h":"Icon Url","n":"iconUrl","r":false,"sh":"URL to app icon image","t":"`$STRING`","key$":"iconUrl","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":8},"price":{"a":true,"h":"Price","n":"price","r":false,"sh":"App price in local currency","t":"`$NUMBER`","key$":"price","index$":9},"rating":{"a":true,"h":"Rating","n":"rating","r":false,"t":"`$OBJECT`","key$":"rating","index$":10},"releaseDate":{"a":true,"fo":"date-time","h":"Release Date","n":"releaseDate","r":false,"sh":"Release date of current version","t":"`$STRING`","key$":"releaseDate","index$":11},"reviews":{"a":true,"h":"Reviews","n":"reviews","r":false,"sh":"Recent user reviews","t":"`$ARRAY`","key$":"reviews","index$":12},"screenshots":{"a":true,"h":"Screenshots","n":"screenshots","r":false,"sh":"Array of screenshot URLs","t":"`$ARRAY`","key$":"screenshots","index$":13},"version":{"a":true,"h":"Version","n":"version","r":false,"sh":"Current version number","t":"`$STRING`","key$":"version","index$":14}},"id":{"field":"id","name":"id"},"name":"app","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/app/{appId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"284882215","k":"param","n":"id","or":"appId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"us","k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/app/{appId}","q":{"exist":["country","id"]},"r":{"param":{"appId":"id"}},"s":[{"lit":"api"},{"lit":"app"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"app","name__orig":"app","Name":"App","name_":"app","name-":"app","NAME":"APP","index$":0}, {"active":true,"entity":"app","key$":"BasicAppFlow","kind":"basic","name":"BasicAppFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_ref01","srcdatavar":"app_ref01_data","suffix":"_dt0"},"m":{"id":"app01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_ref01"}}],"index$":0}]}, 'App', {"GET /api/app/{appId}":{"protocol":"http","parameters":[{"name":"appId","in":"path","description":"The unique App Store ID of the iOS application","required":true,"schema":{"type":"string"},"example":"284882215","index$":0},{"name":"country","in":"query","description":"Two-letter country code for App Store region (ISO 3166-1 alpha-2)","required":false,"schema":{"type":"string","default":"us"},"example":"us","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let app_ref01_data = Object.values(setup.data.existing.app)[0] as any

    // LOAD
    const app_ref01_ent = client.App()
    const app_ref01_match_dt0: any = {}
    app_ref01_match_dt0.id = app_ref01_data.id
    const app_ref01_data_dt0 = (await app_ref01_ent.load(app_ref01_match_dt0)).data()
    assert(app_ref01_data_dt0.id === app_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/app/AppTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AppStoreMetadataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APP_STORE_METADATA_TEST_APP_ENTID': idmap,
    'APP_STORE_METADATA_TEST_LIVE': 'FALSE',
    'APP_STORE_METADATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['APP_STORE_METADATA_TEST_APP_ENTID']

  const live = 'TRUE' === env.APP_STORE_METADATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APP_STORE_METADATA_TEST_APP_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AppStoreMetadataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.APP_STORE_METADATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
