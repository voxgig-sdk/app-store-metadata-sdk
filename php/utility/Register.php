<?php
declare(strict_types=1);

// AppStoreMetadata SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AppStoreMetadataUtility::setRegistrar(function (AppStoreMetadataUtility $u): void {
    $u->clean = [AppStoreMetadataClean::class, 'call'];
    $u->done = [AppStoreMetadataDone::class, 'call'];
    $u->make_error = [AppStoreMetadataMakeError::class, 'call'];
    $u->feature_add = [AppStoreMetadataFeatureAdd::class, 'call'];
    $u->feature_hook = [AppStoreMetadataFeatureHook::class, 'call'];
    $u->feature_init = [AppStoreMetadataFeatureInit::class, 'call'];
    $u->fetcher = [AppStoreMetadataFetcher::class, 'call'];
    $u->make_fetch_def = [AppStoreMetadataMakeFetchDef::class, 'call'];
    $u->make_context = [AppStoreMetadataMakeContext::class, 'call'];
    $u->make_options = [AppStoreMetadataMakeOptions::class, 'call'];
    $u->make_request = [AppStoreMetadataMakeRequest::class, 'call'];
    $u->make_response = [AppStoreMetadataMakeResponse::class, 'call'];
    $u->make_result = [AppStoreMetadataMakeResult::class, 'call'];
    $u->make_point = [AppStoreMetadataMakePoint::class, 'call'];
    $u->make_spec = [AppStoreMetadataMakeSpec::class, 'call'];
    $u->make_url = [AppStoreMetadataMakeUrl::class, 'call'];
    $u->param = [AppStoreMetadataParam::class, 'call'];
    $u->prepare_auth = [AppStoreMetadataPrepareAuth::class, 'call'];
    $u->prepare_body = [AppStoreMetadataPrepareBody::class, 'call'];
    $u->prepare_headers = [AppStoreMetadataPrepareHeaders::class, 'call'];
    $u->prepare_method = [AppStoreMetadataPrepareMethod::class, 'call'];
    $u->prepare_params = [AppStoreMetadataPrepareParams::class, 'call'];
    $u->prepare_path = [AppStoreMetadataPreparePath::class, 'call'];
    $u->prepare_query = [AppStoreMetadataPrepareQuery::class, 'call'];
    $u->result_basic = [AppStoreMetadataResultBasic::class, 'call'];
    $u->result_body = [AppStoreMetadataResultBody::class, 'call'];
    $u->result_headers = [AppStoreMetadataResultHeaders::class, 'call'];
    $u->transform_request = [AppStoreMetadataTransformRequest::class, 'call'];
    $u->transform_response = [AppStoreMetadataTransformResponse::class, 'call'];
});
