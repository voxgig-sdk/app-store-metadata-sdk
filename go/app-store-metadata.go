package voxgigappstoremetadatasdk

import (
	"github.com/voxgig-sdk/app-store-metadata-sdk/go/core"
	"github.com/voxgig-sdk/app-store-metadata-sdk/go/entity"
	"github.com/voxgig-sdk/app-store-metadata-sdk/go/feature"
	_ "github.com/voxgig-sdk/app-store-metadata-sdk/go/utility"
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

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAppStoreMetadataSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AppStoreMetadataSDK  { return NewAppStoreMetadataSDK(nil) }
func Test() *AppStoreMetadataSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
