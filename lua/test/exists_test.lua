-- AppStoreMetadata SDK exists test

local sdk = require("app-store-metadata_sdk")

describe("AppStoreMetadataSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
