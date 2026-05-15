# AppStoreMetadata SDK utility: feature_add
module AppStoreMetadataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
