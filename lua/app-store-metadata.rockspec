package = "voxgig-sdk-app-store-metadata"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/app-store-metadata-sdk.git"
}
description = {
  summary = "AppStoreMetadata SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["app-store-metadata_sdk"] = "app-store-metadata_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
