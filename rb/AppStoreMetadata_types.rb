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
# @!attribute [rw] app_id
#   @return [String, nil]
#
# @!attribute [rw] app_name
#   @return [String, nil]
#
# @!attribute [rw] bundle_id
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
# @!attribute [rw] icon_url
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] rating
#   @return [Hash, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] review
#   @return [Array, nil]
#
# @!attribute [rw] screenshot
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
App = Struct.new(
  :app_id,
  :app_name,
  :bundle_id,
  :category,
  :currency,
  :description,
  :developer,
  :icon_url,
  :price,
  :rating,
  :release_date,
  :review,
  :screenshot,
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

