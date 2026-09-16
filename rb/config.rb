# AppStoreMetadata SDK configuration

module AppStoreMetadataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AppStoreMetadata",
        "slug" => "app-store-metadata",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://app-store-metadata-api.kula.app",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "app" => {},
        },
      },
      "entity" => {
        "app" => {
          "fields" => [
            {
              "name" => "appId",
              "short" => "Unique App Store identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "appName",
              "short" => "Name of the application",
              "type" => "`$STRING`",
            },
            {
              "name" => "bundleId",
              "short" => "App bundle identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "category",
              "short" => "Primary app category",
              "type" => "`$STRING`",
            },
            {
              "name" => "currency",
              "short" => "Currency code",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Full app description",
              "type" => "`$STRING`",
            },
            {
              "name" => "developer",
              "short" => "Developer or publisher name",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "iconUrl",
              "short" => "URL to app icon image",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "price",
              "short" => "App price in local currency",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "rating",
              "type" => "`$OBJECT`",
            },
            {
              "format" => "date-time",
              "name" => "releaseDate",
              "short" => "Release date of current version",
              "type" => "`$STRING`",
            },
            {
              "name" => "reviews",
              "short" => "Recent user reviews",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "screenshots",
              "short" => "Array of screenshot URLs",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "version",
              "short" => "Current version number",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "app",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "284882215",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "app_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "us",
                        "kind" => "query",
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/app/{appId}",
                  "rename" => {
                    "param" => {
                      "appId" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "app",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "country",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "app",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AppStoreMetadataFeatures.make_feature(name)
  end
end
