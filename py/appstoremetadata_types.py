# Typed models for the AppStoreMetadata SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class App:
    app_id: Optional[str] = None
    app_name: Optional[str] = None
    bundle_id: Optional[str] = None
    category: Optional[str] = None
    currency: Optional[str] = None
    description: Optional[str] = None
    developer: Optional[str] = None
    icon_url: Optional[str] = None
    price: Optional[float] = None
    rating: Optional[dict] = None
    release_date: Optional[str] = None
    review: Optional[list] = None
    screenshot: Optional[list] = None
    version: Optional[str] = None


@dataclass
class AppLoadMatch:
    id: str

