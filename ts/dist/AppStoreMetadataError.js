"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStoreMetadataError = void 0;
class AppStoreMetadataError extends Error {
    isAppStoreMetadataError = true;
    sdk = 'AppStoreMetadata';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AppStoreMetadataError = AppStoreMetadataError;
//# sourceMappingURL=AppStoreMetadataError.js.map