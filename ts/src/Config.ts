
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "short": "Unique App Store identifier",
          "type": "`$STRING`"
        },
        {
          "name": "appName",
          "short": "Name of the application",
          "type": "`$STRING`"
        },
        {
          "name": "bundleId",
          "short": "App bundle identifier",
          "type": "`$STRING`"
        },
        {
          "name": "category",
          "short": "Primary app category",
          "type": "`$STRING`"
        },
        {
          "name": "currency",
          "short": "Currency code",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Full app description",
          "type": "`$STRING`"
        },
        {
          "name": "developer",
          "short": "Developer or publisher name",
          "type": "`$STRING`"
        },
        {
          "name": "iconUrl",
          "short": "URL to app icon image",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "price",
          "short": "App price in local currency",
          "type": "`$NUMBER`"
        },
        {
          "name": "rating",
          "type": "`$OBJECT`"
        },
        {
          "name": "releaseDate",
          "short": "Release date of current version",
          "type": "`$STRING`"
        },
        {
          "name": "reviews",
          "short": "Recent user reviews",
          "type": "`$ARRAY`"
        },
        {
          "name": "screenshots",
          "short": "Array of screenshot URLs",
          "type": "`$ARRAY`"
        },
        {
          "name": "version",
          "short": "Current version number",
          "type": "`$STRING`"
        }
      ],
      "name": "app",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "284882215",
                    "kind": "param",
                    "name": "id",
                    "orig": "app_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "us",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/app/{appId}",
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
              "select": {
                "exist": [
                  "country",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
  config
}

