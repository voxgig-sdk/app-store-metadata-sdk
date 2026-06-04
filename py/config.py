# AppStoreMetadata SDK configuration


def make_config():
    return {
        "main": {
            "name": "AppStoreMetadata",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://app-store-metadata-api.kula.app",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "app": {},
            },
        },
        "entity": {
      "app": {
        "fields": [
          {
            "name": "app_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "app_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "bundle_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "category",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "currency",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "developer",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "icon_url",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "price",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "rating",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "release_date",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "review",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "screenshot",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 12,
          },
          {
            "name": "version",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 13,
          },
        ],
        "name": "app",
        "op": {
          "load": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "example": "us",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/app/{appId}",
                "parts": [
                  "api",
                  "app",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "appId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "country",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
