# AppStoreMetadata SDK feature factory

from appstoremetadata_sdk.feature.base_feature import AppStoreMetadataBaseFeature
from appstoremetadata_sdk.feature.test_feature import AppStoreMetadataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AppStoreMetadataBaseFeature(),
        "test": lambda: AppStoreMetadataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
