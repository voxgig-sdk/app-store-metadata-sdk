package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/app-store-metadata-sdk/go"
	"github.com/voxgig-sdk/app-store-metadata-sdk/go/core"

	vs "github.com/voxgig-sdk/app-store-metadata-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const appEntityLiveStrict = true


func TestAppEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.App(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.App(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.AppStoreMetadataError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := appBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"app01": "284882215"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, appEntityLiveStrict, setup.data, "app", func() (any, error) {
				return []any{map[string]any{"id": setup.idmap["app01"]}}, nil
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		appRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.app")))
		var appRef01Data map[string]any
		if len(appRef01DataRaw) > 0 {
			appRef01Data = core.ToMapAny(appRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appRef01Data

		// LOAD
		appRef01Ent := client.App(nil)
		appRef01MatchDt0 := map[string]any{
			"id": appRef01Data["appId"],
		}
		appRef01DataDt0Loaded, err := appRef01Ent.Load(appRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appRef01DataDt0LoadResult := core.ToMapAny(entityData(appRef01DataDt0Loaded))
		if appRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if appRef01DataDt0LoadResult["appId"] != appRef01Data["appId"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func appBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app", "AppTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app test data: " + err.Error())
	}

	for _, rec := range core.ToMapAny(vs.GetPath(entityData, "existing.app")) {
		if recMap := core.ToMapAny(rec); recMap != nil && recMap["id"] != nil {
			recMap["appId"] = recMap["id"]
		}
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("APP_STORE_METADATA_TEST_APP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APP_STORE_METADATA_TEST_APP_ENTID": idmap,
		"APP_STORE_METADATA_TEST_LIVE":      "FALSE",
		"APP_STORE_METADATA_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["APP_STORE_METADATA_TEST_APP_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["APP_STORE_METADATA_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewAppStoreMetadataSDK(core.ToMapAny(mergedOpts))
	}

	live := env["APP_STORE_METADATA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["APP_STORE_METADATA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
