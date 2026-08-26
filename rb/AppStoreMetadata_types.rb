# frozen_string_literal: true

# Typed models for the AppStoreMetadata SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# App entity data model.
#
# @!attribute [rw] appId
#   @return [String, nil]
#
# @!attribute [rw] appName
#   @return [String, nil]
#
# @!attribute [rw] bundleId
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] developer
#   @return [String, nil]
#
# @!attribute [rw] iconUrl
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] rating
#   @return [Hash, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] reviews
#   @return [Array, nil]
#
# @!attribute [rw] screenshots
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
App = Struct.new(
  :appId,
  :appName,
  :bundleId,
  :category,
  :currency,
  :description,
  :developer,
  :iconUrl,
  :id,
  :price,
  :rating,
  :releaseDate,
  :reviews,
  :screenshots,
  :version,
  keyword_init: true
)

# Request payload for App#load.
#
# @!attribute [rw] id
#   @return [String]
AppLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

