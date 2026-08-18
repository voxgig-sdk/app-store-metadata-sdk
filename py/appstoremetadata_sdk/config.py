# AppStoreMetadata SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "appId",
            "type": "`$STRING`",
          },
          {
            "name": "appName",
            "type": "`$STRING`",
          },
          {
            "name": "bundleId",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "type": "`$STRING`",
          },
          {
            "name": "currency",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "developer",
            "type": "`$STRING`",
          },
          {
            "name": "iconUrl",
            "type": "`$STRING`",
          },
          {
            "name": "price",
            "type": "`$NUMBER`",
          },
          {
            "name": "rating",
            "type": "`$OBJECT`",
          },
          {
            "name": "releaseDate",
            "type": "`$STRING`",
          },
          {
            "name": "reviews",
            "type": "`$ARRAY`",
          },
          {
            "name": "screenshots",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "us",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
