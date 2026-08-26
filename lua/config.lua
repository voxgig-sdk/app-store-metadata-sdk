-- AppStoreMetadata SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AppStoreMetadata",
      slug = "app-store-metadata",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://app-store-metadata-api.kula.app",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["app"] = {},
      },
    },
    entity = {
      ["app"] = {
        ["fields"] = {
          {
            ["name"] = "appId",
            ["short"] = "Unique App Store identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "appName",
            ["short"] = "Name of the application",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "bundleId",
            ["short"] = "App bundle identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "category",
            ["short"] = "Primary app category",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "currency",
            ["short"] = "Currency code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Full app description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "developer",
            ["short"] = "Developer or publisher name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "iconUrl",
            ["short"] = "URL to app icon image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "price",
            ["short"] = "App price in local currency",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "rating",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "releaseDate",
            ["short"] = "Release date of current version",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "reviews",
            ["short"] = "Recent user reviews",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "screenshots",
            ["short"] = "Array of screenshot URLs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "version",
            ["short"] = "Current version number",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "app",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "284882215",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "app_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "us",
                      ["kind"] = "query",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/app/{appId}",
                ["parts"] = {
                  "api",
                  "app",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["appId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
