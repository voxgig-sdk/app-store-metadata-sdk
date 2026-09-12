import { AppStoreMetadataEntityBase } from '../AppStoreMetadataEntityBase';
import type { AppStoreMetadataSDK } from '../AppStoreMetadataSDK';
import type { Control } from '../types';
import type { App, AppLoadMatch } from '../AppStoreMetadataTypes';
declare class AppEntity extends AppStoreMetadataEntityBase<App> {
    constructor(client: AppStoreMetadataSDK, entopts: any);
    make(this: AppEntity): AppEntity;
    load(this: any, reqmatch?: AppLoadMatch, ctrl?: Control): Promise<AppEntity>;
}
export { AppEntity };
