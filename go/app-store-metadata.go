package voxgigappstoremetadatasdk

import (
	"github.com/voxgig-sdk/app-store-metadata-sdk/core"
	"github.com/voxgig-sdk/app-store-metadata-sdk/entity"
	"github.com/voxgig-sdk/app-store-metadata-sdk/feature"
	_ "github.com/voxgig-sdk/app-store-metadata-sdk/utility"
)

// Type aliases preserve external API.
type AppStoreMetadataSDK = core.AppStoreMetadataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AppStoreMetadataEntity = core.AppStoreMetadataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AppStoreMetadataError = core.AppStoreMetadataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAppEntityFunc = func(client *core.AppStoreMetadataSDK, entopts map[string]any) core.AppStoreMetadataEntity {
		return entity.NewAppEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAppStoreMetadataSDK = core.NewAppStoreMetadataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
