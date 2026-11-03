"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AppEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APP_STORE_METADATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APP_STORE_METADATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AppStoreMetadataSDK.test();
        const ent = testsdk.App();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.AppStoreMetadataSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.App().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APP_STORE_METADATA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "appId": { "a": true, "h": "App Id", "n": "appId", "r": false, "sh": "Unique App Store identifier", "t": "`$STRING`", "key$": "appId", "index$": 0 }, "appName": { "a": true, "h": "App Name", "n": "appName", "r": false, "sh": "Name of the application", "t": "`$STRING`", "key$": "appName", "index$": 1 }, "bundleId": { "a": true, "h": "Bundle Id", "n": "bundleId", "r": false, "sh": "App bundle identifier", "t": "`$STRING`", "key$": "bundleId", "index$": 2 }, "category": { "a": true, "h": "Category", "n": "category", "r": false, "sh": "Primary app category", "t": "`$STRING`", "key$": "category", "index$": 3 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "sh": "Currency code", "t": "`$STRING`", "key$": "currency", "index$": 4 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Full app description", "t": "`$STRING`", "key$": "description", "index$": 5 }, "developer": { "a": true, "h": "Developer", "n": "developer", "r": false, "sh": "Developer or publisher name", "t": "`$STRING`", "key$": "developer", "index$": 6 }, "iconUrl": { "a": true, "fo": "uri", "h": "Icon Url", "n": "iconUrl", "r": false, "sh": "URL to app icon image", "t": "`$STRING`", "key$": "iconUrl", "index$": 7 }, "price": { "a": true, "h": "Price", "n": "price", "r": false, "sh": "App price in local currency", "t": "`$NUMBER`", "key$": "price", "index$": 8 }, "rating": { "a": true, "h": "Rating", "n": "rating", "r": false, "t": "`$OBJECT`", "key$": "rating", "index$": 9 }, "releaseDate": { "a": true, "fo": "date-time", "h": "Release Date", "n": "releaseDate", "r": false, "sh": "Release date of current version", "t": "`$STRING`", "key$": "releaseDate", "index$": 10 }, "reviews": { "a": true, "h": "Reviews", "n": "reviews", "r": false, "sh": "Recent user reviews", "t": "`$ARRAY`", "key$": "reviews", "index$": 11 }, "screenshots": { "a": true, "h": "Screenshots", "n": "screenshots", "r": false, "sh": "Array of screenshot URLs", "t": "`$ARRAY`", "key$": "screenshots", "index$": 12 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "sh": "Current version number", "t": "`$STRING`", "key$": "version", "index$": 13 } }, "id": { "field": "appId", "name": "id" }, "name": "app", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/app/{appId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "284882215", "k": "param", "n": "id", "or": "appId", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "us", "k": "query", "n": "country", "or": "country", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/app/{appId}", "q": { "exist": ["id"] }, "r": { "param": { "appId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "app" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "app", "name__orig": "app", "Name": "App", "name_": "app", "name-": "app", "NAME": "APP", "index$": 0 }, { "active": true, "entity": "app", "key$": "BasicAppFlow", "kind": "basic", "name": "BasicAppFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_ref01", "srcdatavar": "app_ref01_data", "suffix": "_dt0" }, "m": { "id": "app01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_ref01" } }], "index$": 0, "route": "GET /api/app/{appId}", "record": {} }] }, 'App', { "GET /api/app/{appId}": { "protocol": "http", "parameters": [{ "name": "appId", "in": "path", "description": "The unique App Store ID of the iOS application", "required": true, "schema": { "type": "string" }, "example": "284882215", "index$": 0 }, { "name": "country", "in": "query", "description": "Two-letter country code for App Store region (ISO 3166-1 alpha-2)", "required": false, "schema": { "type": "string", "default": "us" }, "example": "us", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let app_ref01_data = Object.values(setup.data.existing.app)[0];
        // LOAD
        const app_ref01_ent = client.App();
        const app_ref01_match_dt0 = {};
        app_ref01_match_dt0.id = app_ref01_data.appId;
        const app_ref01_data_dt0 = (await app_ref01_ent.load(app_ref01_match_dt0)).data();
        (0, node_assert_1.default)(app_ref01_data_dt0.appId === app_ref01_data.appId);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app/AppTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    for (const rec of Object.values(entityData.existing?.["app"] ?? {})) {
        if (null != rec?.id)
            rec.appId = rec.id;
    }
    options.entity = entityData.existing;
    let client = __1.AppStoreMetadataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app01', 'app02', 'app03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APP_STORE_METADATA_TEST_APP_ENTID': idmap,
        'APP_STORE_METADATA_TEST_LIVE': 'FALSE',
        'APP_STORE_METADATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['APP_STORE_METADATA_TEST_APP_ENTID'];
    const live = 'TRUE' === env.APP_STORE_METADATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APP_STORE_METADATA_TEST_APP_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AppStoreMetadataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.APP_STORE_METADATA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AppEntity.test.js.map