# AppStoreMetadata SDK

Fetch real-time iOS App Store metadata, ratings, and reviews via stable HTTP endpoints

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About App Store Metadata API

The App Store Metadata API is a lightweight HTTP service operated by [Kula](https://kula.app) that exposes metadata about applications listed on the Apple iOS App Store. It is designed as a drop-in alternative to scraping the App Store directly, returning JSON for a given app identifier.

What you get from the API:

- App details (title, publisher, and other store metadata) for a given Apple app ID
- Ratings information
- User reviews

The service exposes a versioned path under `/api/v1/apple/apps/{appId}` — for example `GET /api/v1/apple/apps/361309726` retrieves metadata for one app by its numeric App Store ID.

Operational notes: the API is listed on [freepublicapis.com](https://freepublicapis.com/app-store-metadata-api) and has shown intermittent availability. Authentication requirements, rate limits, and licence terms are not published on the catalogue page — check the kula.app homepage for current status before relying on it in production.

## Try it

**TypeScript**
```bash
npm install app-store-metadata
```

**Python**
```bash
pip install app-store-metadata-sdk
```

**PHP**
```bash
composer require voxgig/app-store-metadata-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/app-store-metadata-sdk/go
```

**Ruby**
```bash
gem install app-store-metadata-sdk
```

**Lua**
```bash
luarocks install app-store-metadata-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AppStoreMetadataSDK } from 'app-store-metadata'

const client = new AppStoreMetadataSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o app-store-metadata-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "app-store-metadata": {
      "command": "/abs/path/to/app-store-metadata-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **App** | An iOS application listed on the Apple App Store, addressed by its numeric Apple ID — e.g. `GET /api/v1/apple/apps/{appId}` returns the app's metadata, ratings, and reviews. | `/api/app/{appId}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from appstoremetadata_sdk import AppStoreMetadataSDK

client = AppStoreMetadataSDK({})


# Load a specific app
app, err = client.App(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'appstoremetadata_sdk.php';

$client = new AppStoreMetadataSDK([]);


// Load a specific app
[$app, $err] = $client->App(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/app-store-metadata-sdk/go"

client := sdk.NewAppStoreMetadataSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "AppStoreMetadata_sdk"

client = AppStoreMetadataSDK.new({})


# Load a specific app
app, err = client.App(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("app-store-metadata_sdk")

local client = sdk.new({})


-- Load a specific app
local app, err = client:App(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AppStoreMetadataSDK.test()
const result = await client.App().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AppStoreMetadataSDK.test(None, None)
result, err = client.App(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AppStoreMetadataSDK::test(null, null);
[$result, $err] = $client->App(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.App(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AppStoreMetadataSDK.test(nil, nil)
result, err = client.App(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:App(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the App Store Metadata API

- Upstream: [https://app-store-metadata-api.kula.app](https://app-store-metadata-api.kula.app)
- API docs: [https://freepublicapis.com/app-store-metadata-api](https://freepublicapis.com/app-store-metadata-api)

---

Generated from the App Store Metadata API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
