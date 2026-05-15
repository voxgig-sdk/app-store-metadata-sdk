<?php
declare(strict_types=1);

// AppStoreMetadata SDK utility: result_body

class AppStoreMetadataResultBody
{
    public static function call(AppStoreMetadataContext $ctx): ?AppStoreMetadataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
