<?php
declare(strict_types=1);

// AppStoreMetadata SDK utility: prepare_body

class AppStoreMetadataPrepareBody
{
    public static function call(AppStoreMetadataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
