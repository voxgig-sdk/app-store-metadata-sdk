# AppStoreMetadata SDK feature factory

from appstoremetadata_sdk.feature.base_feature import AppStoreMetadataBaseFeature
from appstoremetadata_sdk.feature.ratelimit_feature import AppStoreMetadataRatelimitFeature
from appstoremetadata_sdk.feature.retry_feature import AppStoreMetadataRetryFeature
from appstoremetadata_sdk.feature.test_feature import AppStoreMetadataTestFeature
from appstoremetadata_sdk.feature.timeout_feature import AppStoreMetadataTimeoutFeature


_FEATURES = {
    "base": lambda: AppStoreMetadataBaseFeature(),
    "ratelimit": lambda: AppStoreMetadataRatelimitFeature(),
    "retry": lambda: AppStoreMetadataRetryFeature(),
    "test": lambda: AppStoreMetadataTestFeature(),
    "timeout": lambda: AppStoreMetadataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
