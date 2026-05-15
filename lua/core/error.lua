-- AppStoreMetadata SDK error

local AppStoreMetadataError = {}
AppStoreMetadataError.__index = AppStoreMetadataError


function AppStoreMetadataError.new(code, msg, ctx)
  local self = setmetatable({}, AppStoreMetadataError)
  self.is_sdk_error = true
  self.sdk = "AppStoreMetadata"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AppStoreMetadataError:error()
  return self.msg
end


function AppStoreMetadataError:__tostring()
  return self.msg
end


return AppStoreMetadataError
