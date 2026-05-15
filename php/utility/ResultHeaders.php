<?php
declare(strict_types=1);

// AppStoreMetadata SDK utility: result_headers

class AppStoreMetadataResultHeaders
{
    public static function call(AppStoreMetadataContext $ctx): ?AppStoreMetadataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
