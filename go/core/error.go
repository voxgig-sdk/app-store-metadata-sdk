package core

type AppStoreMetadataError struct {
	IsAppStoreMetadataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAppStoreMetadataError(code string, msg string, ctx *Context) *AppStoreMetadataError {
	return &AppStoreMetadataError{
		IsAppStoreMetadataError: true,
		Sdk:              "AppStoreMetadata",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AppStoreMetadataError) Error() string {
	return e.Msg
}
