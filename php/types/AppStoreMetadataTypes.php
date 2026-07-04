<?php
declare(strict_types=1);

// Typed models for the AppStoreMetadata SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** App entity data model. */
class App
{
    public ?string $app_id = null;
    public ?string $app_name = null;
    public ?string $bundle_id = null;
    public ?string $category = null;
    public ?string $currency = null;
    public ?string $description = null;
    public ?string $developer = null;
    public ?string $icon_url = null;
    public ?float $price = null;
    public ?array $rating = null;
    public ?string $release_date = null;
    public ?array $review = null;
    public ?array $screenshot = null;
    public ?string $version = null;
}

/** Request payload for App#load. */
class AppLoadMatch
{
    public string $id;
}

