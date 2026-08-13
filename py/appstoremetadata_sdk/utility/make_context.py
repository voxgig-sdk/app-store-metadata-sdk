# AppStoreMetadata SDK utility: make_context

from appstoremetadata_sdk.core.context import AppStoreMetadataContext


def make_context_util(ctxmap, basectx):
    return AppStoreMetadataContext(ctxmap, basectx)
