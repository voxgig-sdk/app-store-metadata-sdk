export interface App {
    appId?: string;
    appName?: string;
    bundleId?: string;
    category?: string;
    currency?: string;
    description?: string;
    developer?: string;
    iconUrl?: string;
    id?: string;
    price?: number;
    rating?: Record<string, any>;
    releaseDate?: string;
    reviews?: any[];
    screenshots?: any[];
    version?: string;
}
export interface AppLoadMatch {
    id: string;
    country?: string;
}
