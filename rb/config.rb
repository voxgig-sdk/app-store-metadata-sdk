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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "appName",
              "type" => "`$STRING`",
            },
            {
              "name" => "bundleId",
              "type" => "`$STRING`",
            },
            {
              "name" => "category",
              "type" => "`$STRING`",
            },
            {
              "name" => "currency",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "type" => "`$STRING`",
            },
            {
              "name" => "developer",
              "type" => "`$STRING`",
            },
            {
              "name" => "iconUrl",
              "type" => "`$STRING`",
            },
            {
              "name" => "price",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "rating",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "releaseDate",
              "type" => "`$STRING`",
            },
            {
              "name" => "reviews",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "screenshots",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "version",
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "api",
                    "app",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "appId" => "id",
                    },
                  },
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
