import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "app",
    "accessor": "App",
    "op": "load",
    "method": "GET",
    "path": "/api/app/{appId}",
    "args": [
      {
        "name": "id",
        "wire": "appId",
        "value": "284882215"
      }
    ],
    "select": {
      "country": "us"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "country"
    ],
    "queryArgs": [
      {
        "name": "country",
        "wire": "country"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "appId": "284882215",
      "appName": "Facebook",
      "developer": "Meta Platforms, Inc.",
      "description": "Connect with friends and the world around you on Facebook.",
      "category": "Social Networking",
      "price": 0,
      "currency": "USD",
      "rating": {
        "average": 4.2,
        "count": 5234567
      },
      "version": "442.0",
      "releaseDate": "2024-01-15T00:00:00Z",
      "bundleId": "com.facebook.Facebook",
      "iconUrl": "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/b5/d1/99/b5d19970-example.png",
      "screenshots": [
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/example1.png",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/example2.png"
      ],
      "reviews": [
        {
          "id": "12345",
          "author": "AppUser123",
          "rating": 5,
          "title": "Great app!",
          "content": "Love the new features and improvements.",
          "date": "2024-01-10T14:30:00Z"
        }
      ]
    },
    "idField": "appId"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
