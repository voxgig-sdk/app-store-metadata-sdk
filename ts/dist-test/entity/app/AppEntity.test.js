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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APP_STORE_METADATA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "appId", "req": false, "short": "Unique App Store identifier", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "appName", "req": false, "short": "Name of the application", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "bundleId", "req": false, "short": "App bundle identifier", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "category", "req": false, "short": "Primary app category", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "currency", "req": false, "short": "Currency code", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "description", "req": false, "short": "Full app description", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "developer", "req": false, "short": "Developer or publisher name", "type": "`$STRING`", "index$": 6 }, { "active": true, "format": "uri", "name": "iconUrl", "req": false, "short": "URL to app icon image", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "price", "req": false, "short": "App price in local currency", "type": "`$NUMBER`", "index$": 9 }, { "active": true, "name": "rating", "req": false, "type": "`$OBJECT`", "index$": 10 }, { "active": true, "format": "date-time", "name": "releaseDate", "req": false, "short": "Release date of current version", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "reviews", "req": false, "short": "Recent user reviews", "type": "`$ARRAY`", "index$": 12 }, { "active": true, "name": "screenshots", "req": false, "short": "Array of screenshot URLs", "type": "`$ARRAY`", "index$": 13 }, { "active": true, "name": "version", "req": false, "short": "Current version number", "type": "`$STRING`", "index$": 14 }], "id": { "field": "id", "name": "id" }, "name": "app", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "284882215", "kind": "param", "name": "id", "orig": "app_id", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "us", "kind": "query", "name": "country", "orig": "country", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/app/{appId}", "json": "{\"operationId\":\"getAppMetadata\",\"parameters\":[{\"description\":\"The unique App Store ID of the iOS application\",\"example\":\"284882215\",\"in\":\"path\",\"name\":\"appId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Two-letter country code for App Store region (ISO 3166-1 alpha-2)\",\"example\":\"us\",\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"us\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"appId\":\"284882215\",\"appName\":\"Facebook\",\"bundleId\":\"com.facebook.Facebook\",\"category\":\"Social Networking\",\"currency\":\"USD\",\"description\":\"Connect with friends and the world around you on Facebook.\",\"developer\":\"Meta Platforms, Inc.\",\"iconUrl\":\"https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/b5/d1/99/b5d19970-example.png\",\"price\":0,\"rating\":{\"average\":4.2,\"count\":5234567},\"releaseDate\":\"2024-01-15T00:00:00Z\",\"reviews\":[{\"author\":\"AppUser123\",\"content\":\"Love the new features and improvements.\",\"date\":\"2024-01-10T14:30:00Z\",\"id\":\"12345\",\"rating\":5,\"title\":\"Great app!\"}],\"screenshots\":[\"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/example1.png\",\"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/example2.png\"],\"version\":\"442.0\"},\"schema\":{\"properties\":{\"appId\":{\"description\":\"Unique App Store identifier\",\"type\":\"string\"},\"appName\":{\"description\":\"Name of the application\",\"type\":\"string\"},\"bundleId\":{\"description\":\"App bundle identifier\",\"type\":\"string\"},\"category\":{\"description\":\"Primary app category\",\"type\":\"string\"},\"currency\":{\"description\":\"Currency code\",\"type\":\"string\"},\"description\":{\"description\":\"Full app description\",\"type\":\"string\"},\"developer\":{\"description\":\"Developer or publisher name\",\"type\":\"string\"},\"iconUrl\":{\"description\":\"URL to app icon image\",\"format\":\"uri\",\"type\":\"string\"},\"price\":{\"description\":\"App price in local currency\",\"type\":\"number\"},\"rating\":{\"properties\":{\"average\":{\"description\":\"Average user rating\",\"format\":\"float\",\"type\":\"number\"},\"count\":{\"description\":\"Total number of ratings\",\"type\":\"integer\"}},\"type\":\"object\"},\"releaseDate\":{\"description\":\"Release date of current version\",\"format\":\"date-time\",\"type\":\"string\"},\"reviews\":{\"description\":\"Recent user reviews\",\"items\":{\"properties\":{\"author\":{\"description\":\"Review author username\",\"type\":\"string\"},\"content\":{\"description\":\"Review text content\",\"type\":\"string\"},\"date\":{\"description\":\"Review submission date\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Review identifier\",\"type\":\"string\"},\"rating\":{\"description\":\"Star rating (1-5)\",\"maximum\":5,\"minimum\":1,\"type\":\"integer\"},\"title\":{\"description\":\"Review title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"screenshots\":{\"description\":\"Array of screenshot URLs\",\"items\":{\"format\":\"uri\",\"type\":\"string\"},\"type\":\"array\"},\"version\":{\"description\":\"Current version number\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with app metadata\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Invalid app ID format\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid app ID format\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"App not found in the specified App Store region\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"App not found\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Rate limit exceeded. Please try again later.\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Too many requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"An internal error occurred while processing your request\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/app/{appId}", "rename": { "param": { "appId": "id" } }, "segments": [{ "lit": "api" }, { "lit": "app" }, { "var": "id" }], "select": { "exist": ["country", "id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "app", "name__orig": "app", "Name": "App", "name_": "app", "name-": "app", "NAME": "APP", "index$": 0 }, { "active": true, "entity": "app", "key$": "BasicAppFlow", "kind": "basic", "name": "BasicAppFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "app_ref01", "srcdatavar": "app_ref01_data", "suffix": "_dt0" }, "match": { "id": "app01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_ref01" } }], "index$": 0 }] }, 'App');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let app_ref01_data = Object.values(setup.data.existing.app)[0];
        // LOAD
        const app_ref01_ent = client.App();
        const app_ref01_match_dt0 = {};
        app_ref01_match_dt0.id = app_ref01_data.id;
        const app_ref01_data_dt0 = (await app_ref01_ent.load(app_ref01_match_dt0)).data();
        (0, node_assert_1.default)(app_ref01_data_dt0.id === app_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app/AppTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
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