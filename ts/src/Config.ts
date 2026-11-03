
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'AppStoreMetadata',
        slug: "app-store-metadata",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://app-store-metadata-api.kula.app",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        app: {
        },
  
    }
  }


  entity = {
    "app": {
      "fields": [
        {
          "name": "appId",
          "title": "App Id",
          "type": "`$STRING`",
          "short": "Unique App Store identifier"
        },
        {
          "name": "appName",
          "title": "App Name",
          "type": "`$STRING`",
          "short": "Name of the application"
        },
        {
          "name": "bundleId",
          "title": "Bundle Id",
          "type": "`$STRING`",
          "short": "App bundle identifier"
        },
        {
          "name": "category",
          "title": "Category",
          "type": "`$STRING`",
          "short": "Primary app category"
        },
        {
          "name": "currency",
          "title": "Currency",
          "type": "`$STRING`",
          "short": "Currency code"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Full app description"
        },
        {
          "name": "developer",
          "title": "Developer",
          "type": "`$STRING`",
          "short": "Developer or publisher name"
        },
        {
          "name": "iconUrl",
          "title": "Icon Url",
          "type": "`$STRING`",
          "short": "URL to app icon image",
          "format": "uri"
        },
        {
          "name": "price",
          "title": "Price",
          "type": "`$NUMBER`",
          "short": "App price in local currency"
        },
        {
          "name": "rating",
          "title": "Rating",
          "type": "`$OBJECT`"
        },
        {
          "name": "releaseDate",
          "title": "Release Date",
          "type": "`$STRING`",
          "short": "Release date of current version",
          "format": "date-time"
        },
        {
          "name": "reviews",
          "title": "Reviews",
          "type": "`$ARRAY`",
          "short": "Recent user reviews"
        },
        {
          "name": "screenshots",
          "title": "Screenshots",
          "type": "`$ARRAY`",
          "short": "Array of screenshot URLs"
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$STRING`",
          "short": "Current version number"
        }
      ],
      "id": {
        "field": "appId",
        "name": "id"
      },
      "name": "app",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/app/{appId}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "app"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "app",
                "{id}"
              ],
              "rename": {
                "param": {
                  "appId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "appId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "284882215"
                  }
                ],
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "us"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              },
              "alias": {
                "id": "appId"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

