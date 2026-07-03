package = "voxgig-sdk-app-store-metadata"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/app-store-metadata-sdk.git",
  tag = "lua/v0.0.1",
  dir = "app-store-metadata-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the App Store Metadata public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/app-store-metadata-sdk",
  issues_url = "https://github.com/voxgig-sdk/app-store-metadata-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "app-store-metadata" }
}
dependencies = {
  "lua >= 5.3",
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
