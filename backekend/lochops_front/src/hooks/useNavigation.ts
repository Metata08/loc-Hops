import { fetchNavigationRoute } from '@/lib/api';
import { useCallback, useState } from 'react';
import * as THREE from 'three';

export interface NavigationState {
    path: THREE.Vector3[] | null;
    loading: boolean;
    error: string | null;
}

export function useNavigation() {
    const [navigationState, setNavigationState] = useState<NavigationState>({
        path: null,
        loading: false,
        error: null,
    });

    const calculateRoute = useCallback(async (fromPoiId: string, toPoiId: string) => {
        if (!fromPoiId || !toPoiId) return;

        setNavigationState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const data = await fetchNavigationRoute(fromPoiId, toPoiId);

            if (data.geometry && data.geometry.coordinates) {
                // Convert GeoJSON coordinates to THREE.Vector3
                // Note: GeoJSON is usually [long, lat, elev] or [x, y, z]
                // Our backend seems to return [x, y, z] based on the PostGIS setup

                // Handle MultiLineString or LineString
                let points: number[][] = [];

                if (data.geometry.type === 'MultiLineString') {
                    // Flatten MultiLineString to a single path for simplicity (or handle segments)
                    // Assuming connected segments for now
                    data.geometry.coordinates.forEach((lineString: any) => {
                        points.push(...lineString);
                    });
                } else if (data.geometry.type === 'LineString') {
                    points = data.geometry.coordinates as any;
                }

                const pathVectors = points.map(coord => new THREE.Vector3(coord[0], coord[1], coord[2]));

                setNavigationState({
                    path: pathVectors,
                    loading: false,
                    error: null
                });
            } else {
                throw new Error("Invalid geometry data received");
            }

        } catch (err) {
            console.error("Navigation error:", err);
            setNavigationState({
                path: null,
                loading: false,
                error: err instanceof Error ? err.message : "Failed to calculate route"
            });
        }
    }, []);

    const clearRoute = useCallback(() => {
        setNavigationState({
            path: null,
            loading: false,
            error: null
        });
    }, []);

    return {
        ...navigationState,
        calculateRoute,
        clearRoute
    };
}
