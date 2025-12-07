import axios from 'axios';

// Configuration de base de l'API
// Assurez-vous que l'URL correspond à votre backend Django
const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Types pour les données du backend

export interface Service {
    id: number;
    code: string;
    icon_name?: string;
}

export interface POI {
    id: number;
    type?: string;
    is_entry_point: boolean;
    coordinates: [number, number, number]; // Flattened coordinates
    floor?: number;
    service?: number;
}

// Internal types for API response parsing
interface GeoJSONFeature {
    id: number;
    type: 'Feature';
    geometry: {
        type: 'Point';
        coordinates: [number, number, number];
    };
    properties: {
        type?: string;
        is_entry_point: boolean;
        floor?: number;
        service?: number;
        [key: string]: any;
    };
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T;
}

interface GeoJSONResponse {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
}

export interface NavigationResponse {
    type: 'Feature';
    geometry: {
        type: 'MultiLineString' | 'LineString';
        coordinates: number[][][]; // Array of paths, each path is array of [x, y, z]
    };
    properties: {
        start_poi: string;
        end_poi: string;
        start_node: number;
        end_node: number;
    };
}

// Fonctions d'aide pour les appels API

export const fetchServices = async (): Promise<Service[]> => {
    const response = await api.get<PaginatedResponse<Service[]> | Service[]>('/services/');
    // Handle DRF pagination
    if ('results' in response.data && Array.isArray(response.data.results)) {
        return response.data.results;
    }
    // Handle non-paginated response
    if (Array.isArray(response.data)) {
        return response.data;
    }
    return [];
};

export const fetchPOIs = async (): Promise<POI[]> => {
    const response = await api.get<PaginatedResponse<GeoJSONResponse>>('/pois/');

    // Extract features from the nested GeoJSON structure inside DRF pagination
    // Structure: { results: { type: "FeatureCollection", features: [...] } }
    let features: GeoJSONFeature[] = [];

    if (response.data.results && response.data.results.features) {
        features = response.data.results.features;
    }

    // Map to cleaner POI object
    return features.map(f => ({
        id: f.id,
        type: f.properties.type,
        is_entry_point: f.properties.is_entry_point,
        coordinates: f.geometry.coordinates,
        floor: f.properties.floor,
        service: f.properties.service
    }));
};

export const fetchNavigationRoute = async (fromPoiId: number | string, toPoiId: number | string) => {
    const response = await api.get<NavigationResponse>('/navigation-sessions/route/', {
        params: {
            from: fromPoiId,
            to: toPoiId,
        },
    });
    return response.data;
};
