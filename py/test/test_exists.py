# ProjectName SDK exists test

import pytest
from appstoremetadata_sdk import AppStoreMetadataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AppStoreMetadataSDK.test(None, None)
        assert testsdk is not None
