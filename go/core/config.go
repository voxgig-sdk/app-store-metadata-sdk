package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AppStoreMetadata",
			"slug": "app-store-metadata",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://app-store-metadata-api.kula.app",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"app": map[string]any{},
			},
		},
		"entity": map[string]any{
			"app": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "appId",
						"short": "Unique App Store identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "appName",
						"short": "Name of the application",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bundleId",
						"short": "App bundle identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "category",
						"short": "Primary app category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"short": "Currency code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Full app description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "developer",
						"short": "Developer or publisher name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iconUrl",
						"short": "URL to app icon image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price",
						"short": "App price in local currency",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "rating",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "releaseDate",
						"short": "Release date of current version",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reviews",
						"short": "Recent user reviews",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "screenshots",
						"short": "Array of screenshot URLs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"short": "Current version number",
						"type": "`$STRING`",
					},
				},
				"name": "app",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "284882215",
											"kind": "param",
											"name": "id",
											"orig": "app_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "us",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/app/{appId}",
								"parts": []any{
									"api",
									"app",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"appId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
