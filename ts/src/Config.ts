
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


  main = {
    name: 'AppStoreMetadata',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "appName",
          "type": "`$STRING`"
        },
        {
          "name": "bundleId",
          "type": "`$STRING`"
        },
        {
          "name": "category",
          "type": "`$STRING`"
        },
        {
          "name": "currency",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "developer",
          "type": "`$STRING`"
        },
        {
          "name": "iconUrl",
          "type": "`$STRING`"
        },
        {
          "name": "price",
          "type": "`$NUMBER`"
        },
        {
          "name": "rating",
          "type": "`$OBJECT`"
        },
        {
          "name": "releaseDate",
          "type": "`$STRING`"
        },
        {
          "name": "reviews",
          "type": "`$ARRAY`"
        },
        {
          "name": "screenshots",
          "type": "`$ARRAY`"
        },
        {
          "name": "version",
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

