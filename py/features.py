# AppStoreMetadata SDK feature factory

from feature.base_feature import AppStoreMetadataBaseFeature
from feature.test_feature import AppStoreMetadataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AppStoreMetadataBaseFeature(),
        "test": lambda: AppStoreMetadataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
