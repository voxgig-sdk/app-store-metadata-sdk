<?php
declare(strict_types=1);

// AppStoreMetadata SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AppStoreMetadataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AppStoreMetadataBaseFeature();
            case "test":
                return new AppStoreMetadataTestFeature();
            default:
                return new AppStoreMetadataBaseFeature();
        }
    }
}
