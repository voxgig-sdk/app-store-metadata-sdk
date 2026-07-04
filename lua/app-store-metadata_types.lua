-- Typed models for the AppStoreMetadata SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class App
---@field app_id? string
---@field app_name? string
---@field bundle_id? string
---@field category? string
---@field currency? string
---@field description? string
---@field developer? string
---@field icon_url? string
---@field price? number
---@field rating? table
---@field release_date? string
---@field review? table
---@field screenshot? table
---@field version? string

---@class AppLoadMatch
---@field id string

local M = {}

return M
