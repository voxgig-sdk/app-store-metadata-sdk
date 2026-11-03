# App entity test

import json
import os
import time

import pytest

from appstoremetadata_sdk.utility.voxgig_struct import voxgig_struct as vs
from appstoremetadata_sdk import AppStoreMetadataSDK
from appstoremetadata_sdk.core import helpers
from appstoremetadata_sdk.config import shared_config
from appstoremetadata_sdk.feature.base_feature import AppStoreMetadataBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestAppEntity:

    def test_should_create_instance(self):
        testsdk = AppStoreMetadataSDK.test(None, None)
        ent = testsdk.App(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = AppStoreMetadataSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.App(None).load({"id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _app_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "app." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key, _live_ex in {"app01": "284882215"}.items():
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    setup["idmap"][_live_key] = _live_ex
        client = setup["client"]
        if setup["live"]:
            runner.live_existing(setup, LIVE_STRICT, "app",
                                 lambda: [{"id": setup["idmap"].get("app01")}])

        # Bootstrap entity data from existing test data.
        app_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.app")))
        app_ref01_data = None
        if len(app_ref01_data_raw) > 0:
            app_ref01_data = helpers.to_map(app_ref01_data_raw[0][1])

        # LOAD
        app_ref01_ent = client.App(None)
        app_ref01_match_dt0 = {
            "id": app_ref01_data["appId"],
        }
        app_ref01_data_dt0_loaded = app_ref01_ent.load(app_ref01_match_dt0, None)
        app_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(app_ref01_data_dt0_loaded))
        assert app_ref01_data_dt0_load_result is not None
        assert app_ref01_data_dt0_load_result["appId"] == app_ref01_data["appId"]



def _app_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/app/AppTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    for rec in ((entity_data.get("existing") or {}).get("app") or {}).values():
        if isinstance(rec, dict) and rec.get("id") is not None:
            rec["appId"] = rec["id"]

    options = {}
    options["entity"] = entity_data.get("existing")

    client = AppStoreMetadataSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["app01", "app02", "app03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "APP_STORE_METADATA_TEST_APP_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "APP_STORE_METADATA_TEST_APP_ENTID": idmap,
        "APP_STORE_METADATA_TEST_LIVE": "FALSE",
        "APP_STORE_METADATA_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("APP_STORE_METADATA_TEST_APP_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("APP_STORE_METADATA_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = AppStoreMetadataSDK(helpers.to_map(merged_opts))

    _live = env.get("APP_STORE_METADATA_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("APP_STORE_METADATA_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
