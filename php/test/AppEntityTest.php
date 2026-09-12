<?php
declare(strict_types=1);

// App entity test

require_once __DIR__ . '/../appstoremetadata_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AppEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AppStoreMetadataSDK::test(null, null);
        $ent = $testsdk->App(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = app_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "app." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set APP_STORE_METADATA_TEST_APP_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $app_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.app")));
        $app_ref01_data = null;
        if (count($app_ref01_data_raw) > 0) {
            $app_ref01_data = Helpers::to_map($app_ref01_data_raw[0][1]);
        }

        // LOAD
        $app_ref01_ent = $client->App(null);
        $app_ref01_match_dt0 = [
            "id" => $app_ref01_data["id"],
        ];
        $app_ref01_data_dt0_loaded = $app_ref01_ent->load($app_ref01_match_dt0, null);
        $app_ref01_data_dt0_load_result = Helpers::to_map(is_object($app_ref01_data_dt0_loaded) && method_exists($app_ref01_data_dt0_loaded, 'data_get') ? $app_ref01_data_dt0_loaded->data_get() : $app_ref01_data_dt0_loaded);
        $this->assertNotNull($app_ref01_data_dt0_load_result);
        $this->assertEquals($app_ref01_data_dt0_load_result["id"], $app_ref01_data["id"]);

    }
}

function app_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/app/AppTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AppStoreMetadataSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["app01", "app02", "app03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("APP_STORE_METADATA_TEST_APP_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "APP_STORE_METADATA_TEST_APP_ENTID" => $idmap,
        "APP_STORE_METADATA_TEST_LIVE" => "FALSE",
        "APP_STORE_METADATA_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["APP_STORE_METADATA_TEST_APP_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["APP_STORE_METADATA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        $client = new AppStoreMetadataSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["APP_STORE_METADATA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["APP_STORE_METADATA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
