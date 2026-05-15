<?php
declare(strict_types=1);

// AppStoreMetadata SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AppStoreMetadataMakeContext
{
    public static function call(array $ctxmap, ?AppStoreMetadataContext $basectx): AppStoreMetadataContext
    {
        return new AppStoreMetadataContext($ctxmap, $basectx);
    }
}
