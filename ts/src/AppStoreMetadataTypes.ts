// Typed models for the AppStoreMetadata SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface App {
  appId?: string
  appName?: string
  bundleId?: string
  category?: string
  currency?: string
  description?: string
  developer?: string
  iconUrl?: string
  price?: number
  rating?: Record<string, any>
  releaseDate?: string
  reviews?: any[]
  screenshots?: any[]
  version?: string
}

export interface AppLoadMatch {
  id: string
}

