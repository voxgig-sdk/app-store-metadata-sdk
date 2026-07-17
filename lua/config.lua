-- AppStoreMetadata SDK configuration

local function make_config()
  return {
    main = {
      name = "AppStoreMetadata",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["active"] = true,
            ["name"] = "app_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "app_name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "bundle_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "category",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "currency",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "description",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "developer",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "icon_url",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "price",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "rating",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "release_date",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "review",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "screenshot",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "version",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 13,
          },
        },
        ["name"] = "app",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "284882215",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "app_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "us",
                      ["kind"] = "query",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
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
