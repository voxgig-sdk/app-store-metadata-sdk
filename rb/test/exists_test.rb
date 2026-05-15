# AppStoreMetadata SDK exists test

require "minitest/autorun"
require_relative "../AppStoreMetadata_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AppStoreMetadataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
