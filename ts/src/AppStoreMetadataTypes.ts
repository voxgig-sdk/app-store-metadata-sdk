// Typed models for the AppStoreMetadata SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface App {
  app_id?: string
  app_name?: string
  bundle_id?: string
  category?: string
  currency?: string
  description?: string
  developer?: string
  icon_url?: string
  price?: number
  rating?: Record<string, any>
  release_date?: string
  review?: any[]
  screenshot?: any[]
  version?: string
}

export interface AppLoadMatch {
  id: string
}

