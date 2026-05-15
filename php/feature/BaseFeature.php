<?php
declare(strict_types=1);

// AppStoreMetadata SDK base feature

class AppStoreMetadataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AppStoreMetadataContext $ctx, array $options): void {}
    public function PostConstruct(AppStoreMetadataContext $ctx): void {}
    public function PostConstructEntity(AppStoreMetadataContext $ctx): void {}
    public function SetData(AppStoreMetadataContext $ctx): void {}
    public function GetData(AppStoreMetadataContext $ctx): void {}
    public function GetMatch(AppStoreMetadataContext $ctx): void {}
    public function SetMatch(AppStoreMetadataContext $ctx): void {}
    public function PrePoint(AppStoreMetadataContext $ctx): void {}
    public function PreSpec(AppStoreMetadataContext $ctx): void {}
    public function PreRequest(AppStoreMetadataContext $ctx): void {}
    public function PreResponse(AppStoreMetadataContext $ctx): void {}
    public function PreResult(AppStoreMetadataContext $ctx): void {}
    public function PreDone(AppStoreMetadataContext $ctx): void {}
    public function PreUnexpected(AppStoreMetadataContext $ctx): void {}
}
