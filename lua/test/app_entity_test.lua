-- App entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("app-store-metadata_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("AppEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:App(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:App(nil):load({ ["id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = app_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "app." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _live_key, _live_ex in pairs({["app01"] = "284882215"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          setup.idmap[_live_key] = _live_ex
        end
      end
    end
    local client = setup.client
    if setup.live then
      runner.live_existing(pending, setup, LIVE_STRICT, "app", function()
        return { { id = setup.idmap["app01"] } }
      end)
    end

    -- Bootstrap entity data from existing test data.
    local app_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.app")))
    local app_ref01_data = nil
    if #app_ref01_data_raw > 0 then
      app_ref01_data = helpers.to_map(app_ref01_data_raw[1][2])
    end

    -- LOAD
    local app_ref01_ent = client:App(nil)
    local app_ref01_match_dt0 = {
      id = app_ref01_data["appId"],
    }
    local app_ref01_data_dt0_loaded, err = app_ref01_ent:load(app_ref01_match_dt0, nil)
    assert.is_nil(err)
    local app_ref01_data_dt0_load_result = helpers.to_map(type(app_ref01_data_dt0_loaded) == 'table' and app_ref01_data_dt0_loaded.data_get and app_ref01_data_dt0_loaded:data_get() or app_ref01_data_dt0_loaded)
    assert.is_not_nil(app_ref01_data_dt0_load_result)
    assert.are.equal(app_ref01_data_dt0_load_result["appId"], app_ref01_data["appId"])

  end)
end)

function app_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/app/AppTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read app test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  for _, rec in pairs(((entity_data["existing"] or {})["app"]) or {}) do
    if type(rec) == "table" and rec["id"] ~= nil then
      rec["appId"] = rec["id"]
    end
  end

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "app01", "app02", "app03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("APP_STORE_METADATA_TEST_APP_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["APP_STORE_METADATA_TEST_APP_ENTID"] = idmap,
    ["APP_STORE_METADATA_TEST_LIVE"] = "FALSE",
    ["APP_STORE_METADATA_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["APP_STORE_METADATA_TEST_APP_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["APP_STORE_METADATA_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["APP_STORE_METADATA_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["APP_STORE_METADATA_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
