# AppStoreMetadata SDK utility: prepare_body
require_relative 'media'
module AppStoreMetadataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AppStoreMetadataUtilities.raw_body(ctx.reqdata) if AppStoreMetadataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
