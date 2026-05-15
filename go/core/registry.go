package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAppEntityFunc func(client *AppStoreMetadataSDK, entopts map[string]any) AppStoreMetadataEntity

