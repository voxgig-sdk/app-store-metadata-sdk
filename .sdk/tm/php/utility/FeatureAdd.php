<?php
declare(strict_types=1);

// AppStoreMetadata SDK utility: feature_add

class AppStoreMetadataFeatureAdd
{
    public static function call(AppStoreMetadataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
