# AppStoreMetadata SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AppStoreMetadataUtility.registrar = ->(u) {
  u.clean = AppStoreMetadataUtilities::Clean
  u.done = AppStoreMetadataUtilities::Done
  u.make_error = AppStoreMetadataUtilities::MakeError
  u.feature_add = AppStoreMetadataUtilities::FeatureAdd
  u.feature_hook = AppStoreMetadataUtilities::FeatureHook
  u.feature_init = AppStoreMetadataUtilities::FeatureInit
  u.fetcher = AppStoreMetadataUtilities::Fetcher
  u.make_fetch_def = AppStoreMetadataUtilities::MakeFetchDef
  u.make_context = AppStoreMetadataUtilities::MakeContext
  u.make_options = AppStoreMetadataUtilities::MakeOptions
  u.make_request = AppStoreMetadataUtilities::MakeRequest
  u.make_response = AppStoreMetadataUtilities::MakeResponse
  u.make_result = AppStoreMetadataUtilities::MakeResult
  u.make_point = AppStoreMetadataUtilities::MakePoint
  u.make_spec = AppStoreMetadataUtilities::MakeSpec
  u.make_url = AppStoreMetadataUtilities::MakeUrl
  u.param = AppStoreMetadataUtilities::Param
  u.prepare_auth = AppStoreMetadataUtilities::PrepareAuth
  u.prepare_body = AppStoreMetadataUtilities::PrepareBody
  u.prepare_headers = AppStoreMetadataUtilities::PrepareHeaders
  u.prepare_method = AppStoreMetadataUtilities::PrepareMethod
  u.prepare_params = AppStoreMetadataUtilities::PrepareParams
  u.prepare_path = AppStoreMetadataUtilities::PreparePath
  u.prepare_query = AppStoreMetadataUtilities::PrepareQuery
  u.result_basic = AppStoreMetadataUtilities::ResultBasic
  u.result_body = AppStoreMetadataUtilities::ResultBody
  u.result_headers = AppStoreMetadataUtilities::ResultHeaders
  u.transform_request = AppStoreMetadataUtilities::TransformRequest
  u.transform_response = AppStoreMetadataUtilities::TransformResponse
}
