# AppStoreMetadata SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AppStoreMetadataFeatures
  def self.make_feature(name)
    case name
    when "base"
      AppStoreMetadataBaseFeature.new
    when "ratelimit"
      AppStoreMetadataRatelimitFeature.new
    when "retry"
      AppStoreMetadataRetryFeature.new
    when "test"
      AppStoreMetadataTestFeature.new
    when "timeout"
      AppStoreMetadataTimeoutFeature.new
    else
      AppStoreMetadataBaseFeature.new
    end
  end
end
