# AppStoreMetadata SDK utility: make_context
require_relative '../core/context'
module AppStoreMetadataUtilities
  MakeContext = ->(ctxmap, basectx) {
    AppStoreMetadataContext.new(ctxmap, basectx)
  }
end
