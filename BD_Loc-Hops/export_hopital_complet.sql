-- EXPORT COMPLET : NOEUDS, ARETES ET POIS
BEGIN;

-- 1. Insertion des NavNode (Points de passage)
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-0.199, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(2.523, -2.699, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-0.199, -2.699, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(1.379, -2.699, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-9.597, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(1.379, 4.059, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(1.379, 22.388, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-20.692, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-24.195, 42.444, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-53.218, 42.444, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(1.379, 30.36, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-0.077, 22.388, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-0.091, 30.36, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(1.379, 42.444, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-17.223, 42.444, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-17.223, 40.066, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-24.195, 40.012, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-85.639, 42.444, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-53.218, 39.895, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-113.384, 42.444, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-85.639, 39.981, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-72.938, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-85.655, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-118.164, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-85.655, 11.393, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-118.164, 4.736, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-98.331, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-53.22, 10.23, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-53.22, 22.678, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-62.365, 10.23, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-84.459, 10.23, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-86.8, 10.23, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-107.785, 10.23, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-113.442, 10.23, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-9.597, -18.763, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-113.442, 8.576, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-9.597, -35.082, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-9.597, -53.04, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-9.597, -54.456, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-33.447, -54.456, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-40.514, -54.456, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-65.926, -54.456, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-73.02, -54.456, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-98.462, -54.456, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-105.537, -54.456, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-105.537, -52.192, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-98.462, -52.081, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-73.02, -52.081, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-65.926, -52.025, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-40.514, -43.393, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-33.447, -43.489, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-105.422, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-105.422, -3.946, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-98.331, -4.17, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-53.22, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-53.22, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-65.903, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-72.938, -4.071, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-65.903, -3.976, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-33.439, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-40.456, 2.25, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-40.456, -3.946, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-33.439, -3.946, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-20.692, 4.769, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(7.969, -2.699, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(7.969, 52.111, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-97.24, 52.111, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-97.24, 63.138, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-137.705, 63.138, 0.0), 4326), 1, 'connector');
INSERT INTO "NavNode" (geom, floor_id, kind) VALUES (ST_SetSRID(ST_MakePoint(-137.705, 21.226, 0.0), 4326), 1, 'connector');

-- 2. Insertion des NavEdge (Lignes du chemin)
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-0.199, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, 2.250, 0.000), 4326) LIMIT 1), 
    9.398, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-0.199 2.250 0.000, -9.597 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-0.199, -2.699, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-0.199, 2.250, 0.000), 4326) LIMIT 1), 
    4.949, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-0.199 -2.699 0.000, -0.199 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(2.523, -2.699, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, -2.699, 0.000), 4326) LIMIT 1), 
    1.144, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(2.523 -2.699 0.000, 1.379 -2.699 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, -2.699, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-0.199, -2.699, 0.000), 4326) LIMIT 1), 
    1.577, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(1.379 -2.699 0.000, -0.199 -2.699 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, -2.699, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 4.059, 0.000), 4326) LIMIT 1), 
    6.758, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(1.379 -2.699 0.000, 1.379 4.059 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 4.059, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 22.388, 0.000), 4326) LIMIT 1), 
    18.329, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(1.379 4.059 0.000, 1.379 22.388 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-20.692, 2.250, 0.000), 4326) LIMIT 1), 
    11.096, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-9.597 2.250 0.000, -20.692 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 22.388, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 30.360, 0.000), 4326) LIMIT 1), 
    7.971, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(1.379 22.388 0.000, 1.379 30.360 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-17.223, 42.444, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-24.195, 42.444, 0.000), 4326) LIMIT 1), 
    6.973, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-17.223 42.444 0.000, -24.195 42.444 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 30.360, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 42.444, 0.000), 4326) LIMIT 1), 
    12.085, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(1.379 30.360 0.000, 1.379 42.444 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 22.388, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-0.077, 22.388, 0.000), 4326) LIMIT 1), 
    1.456, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(1.379 22.388 0.000, -0.077 22.388 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 30.360, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-0.091, 30.360, 0.000), 4326) LIMIT 1), 
    1.47, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(1.379 30.360 0.000, -0.091 30.360 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(1.379, 42.444, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-17.223, 42.444, 0.000), 4326) LIMIT 1), 
    18.601, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(1.379 42.444 0.000, -17.223 42.444 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-24.195, 42.444, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.218, 42.444, 0.000), 4326) LIMIT 1), 
    29.022, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-24.195 42.444 0.000, -53.218 42.444 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-17.223, 42.444, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-17.223, 40.066, 0.000), 4326) LIMIT 1), 
    2.378, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-17.223 42.444 0.000, -17.223 40.066 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-24.195, 42.444, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-24.195, 40.012, 0.000), 4326) LIMIT 1), 
    2.432, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-24.195 42.444 0.000, -24.195 40.012 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.218, 42.444, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-85.639, 42.444, 0.000), 4326) LIMIT 1), 
    32.421, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-53.218 42.444 0.000, -85.639 42.444 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.218, 42.444, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.218, 39.895, 0.000), 4326) LIMIT 1), 
    2.549, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-53.218 42.444 0.000, -53.218 39.895 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-85.639, 42.444, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-113.384, 42.444, 0.000), 4326) LIMIT 1), 
    27.745, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-85.639 42.444 0.000, -113.384 42.444 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-85.639, 42.444, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-85.639, 39.981, 0.000), 4326) LIMIT 1), 
    2.463, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-85.639 42.444 0.000, -85.639 39.981 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-20.692, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-33.439, 2.250, 0.000), 4326) LIMIT 1), 
    12.747, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-20.692 2.250 0.000, -33.439 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-72.938, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-85.655, 2.250, 0.000), 4326) LIMIT 1), 
    12.717, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-72.938 2.250 0.000, -85.655 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-85.655, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-98.331, 2.250, 0.000), 4326) LIMIT 1), 
    12.676, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-85.655 2.250 0.000, -98.331 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-85.655, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-85.655, 11.393, 0.000), 4326) LIMIT 1), 
    9.143, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-85.655 2.250 0.000, -85.655 11.393 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-118.164, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-118.164, 4.736, 0.000), 4326) LIMIT 1), 
    2.487, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-118.164 2.250 0.000, -118.164 4.736 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 10.230, 0.000), 4326) LIMIT 1), 
    7.981, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-53.220 2.250 0.000, -53.220 10.230 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 10.230, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 22.678, 0.000), 4326) LIMIT 1), 
    12.448, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-53.220 10.230 0.000, -53.220 22.678 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 10.230, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-62.365, 10.230, 0.000), 4326) LIMIT 1), 
    9.145, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-53.220 10.230 0.000, -62.365 10.230 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-62.365, 10.230, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-84.459, 10.230, 0.000), 4326) LIMIT 1), 
    22.095, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-62.365 10.230 0.000, -84.459 10.230 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-84.459, 10.230, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-86.800, 10.230, 0.000), 4326) LIMIT 1), 
    2.341, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-84.459 10.230 0.000, -86.800 10.230 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-86.800, 10.230, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-107.785, 10.230, 0.000), 4326) LIMIT 1), 
    20.985, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-86.800 10.230 0.000, -107.785 10.230 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-107.785, 10.230, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-113.442, 10.230, 0.000), 4326) LIMIT 1), 
    5.657, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-107.785 10.230 0.000, -113.442 10.230 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, -18.763, 0.000), 4326) LIMIT 1), 
    21.013, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-9.597 2.250 0.000, -9.597 -18.763 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-113.442, 10.230, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-113.442, 8.576, 0.000), 4326) LIMIT 1), 
    1.655, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-113.442 10.230 0.000, -113.442 8.576 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, -18.763, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, -35.082, 0.000), 4326) LIMIT 1), 
    16.319, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-9.597 -18.763 0.000, -9.597 -35.082 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, -35.082, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, -53.040, 0.000), 4326) LIMIT 1), 
    17.958, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-9.597 -35.082 0.000, -9.597 -53.040 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, -53.040, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, -54.456, 0.000), 4326) LIMIT 1), 
    1.416, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-9.597 -53.040 0.000, -9.597 -54.456 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-9.597, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-33.447, -54.456, 0.000), 4326) LIMIT 1), 
    23.85, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-9.597 -54.456 0.000, -33.447 -54.456 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-33.447, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-40.514, -54.456, 0.000), 4326) LIMIT 1), 
    7.067, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-33.447 -54.456 0.000, -40.514 -54.456 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-40.514, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-65.926, -54.456, 0.000), 4326) LIMIT 1), 
    25.411, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-40.514 -54.456 0.000, -65.926 -54.456 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-65.926, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-73.020, -54.456, 0.000), 4326) LIMIT 1), 
    7.094, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-65.926 -54.456 0.000, -73.020 -54.456 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-73.020, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-98.462, -54.456, 0.000), 4326) LIMIT 1), 
    25.442, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-73.020 -54.456 0.000, -98.462 -54.456 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-98.462, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-105.537, -54.456, 0.000), 4326) LIMIT 1), 
    7.075, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-98.462 -54.456 0.000, -105.537 -54.456 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-105.537, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-105.537, -52.192, 0.000), 4326) LIMIT 1), 
    2.264, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-105.537 -54.456 0.000, -105.537 -52.192 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-98.462, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-98.462, -52.081, 0.000), 4326) LIMIT 1), 
    2.375, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-98.462 -54.456 0.000, -98.462 -52.081 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-73.020, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-73.020, -52.081, 0.000), 4326) LIMIT 1), 
    2.375, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-73.020 -54.456 0.000, -73.020 -52.081 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-65.926, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-65.926, -52.025, 0.000), 4326) LIMIT 1), 
    2.431, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-65.926 -54.456 0.000, -65.926 -52.025 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-40.514, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-40.514, -43.393, 0.000), 4326) LIMIT 1), 
    11.063, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-40.514 -54.456 0.000, -40.514 -43.393 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-33.447, -54.456, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-33.447, -43.489, 0.000), 4326) LIMIT 1), 
    10.967, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-33.447 -54.456 0.000, -33.447 -43.489 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-98.331, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-105.422, 2.250, 0.000), 4326) LIMIT 1), 
    7.091, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-98.331 2.250 0.000, -105.422 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-118.164, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-105.422, 2.250, 0.000), 4326) LIMIT 1), 
    12.742, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-118.164 2.250 0.000, -105.422 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-105.422, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-105.422, -3.946, 0.000), 4326) LIMIT 1), 
    6.196, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-105.422 2.250 0.000, -105.422 -3.946 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-98.331, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-98.331, -4.170, 0.000), 4326) LIMIT 1), 
    6.419, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-98.331 2.250 0.000, -98.331 -4.170 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-65.903, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-72.938, 2.250, 0.000), 4326) LIMIT 1), 
    7.034, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-65.903 2.250 0.000, -72.938 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-65.903, 2.250, 0.000), 4326) LIMIT 1), 
    12.683, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-53.220 2.250 0.000, -65.903 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-65.903, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 2.250, 0.000), 4326) LIMIT 1), 
    12.683, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-65.903 2.250 0.000, -53.220 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 2.250, 0.000), 4326) LIMIT 1), 
    0.0, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-53.220 2.250 0.000, -53.220 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-72.938, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-72.938, -4.071, 0.000), 4326) LIMIT 1), 
    6.32, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-72.938 2.250 0.000, -72.938 -4.071 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-65.903, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-65.903, -3.976, 0.000), 4326) LIMIT 1), 
    6.225, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-65.903 2.250 0.000, -65.903 -3.976 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-33.439, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-40.456, 2.250, 0.000), 4326) LIMIT 1), 
    7.017, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-33.439 2.250 0.000, -40.456 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-40.456, 2.250, 0.000), 4326) LIMIT 1), 
    12.764, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-53.220 2.250 0.000, -40.456 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-40.456, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-53.220, 2.250, 0.000), 4326) LIMIT 1), 
    12.764, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-40.456 2.250 0.000, -53.220 2.250 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-40.456, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-40.456, -3.946, 0.000), 4326) LIMIT 1), 
    6.196, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-40.456 2.250 0.000, -40.456 -3.946 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-33.439, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-33.439, -3.946, 0.000), 4326) LIMIT 1), 
    6.196, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-33.439 2.250 0.000, -33.439 -3.946 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-20.692, 2.250, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-20.692, 4.769, 0.000), 4326) LIMIT 1), 
    2.519, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-20.692 2.250 0.000, -20.692 4.769 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(7.969, -2.699, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(2.523, -2.699, 0.000), 4326) LIMIT 1), 
    5.446, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(7.969 -2.699 0.000, 2.523 -2.699 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(7.969, 52.111, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(7.969, -2.699, 0.000), 4326) LIMIT 1), 
    54.81, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(7.969 52.111 0.000, 7.969 -2.699 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-97.240, 52.111, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(7.969, 52.111, 0.000), 4326) LIMIT 1), 
    105.209, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-97.240 52.111 0.000, 7.969 52.111 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-97.240, 63.138, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-97.240, 52.111, 0.000), 4326) LIMIT 1), 
    11.027, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-97.240 63.138 0.000, -97.240 52.111 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-137.705, 63.138, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-97.240, 63.138, 0.000), 4326) LIMIT 1), 
    40.464, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-137.705 63.138 0.000, -97.240 63.138 0.000)'), 4326), 
    true
);
INSERT INTO "NavEdge" (node_from_id, node_to_id, length_m, geom, is_accessible) 
VALUES (
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-137.705, 21.226, 0.000), 4326) LIMIT 1), 
    (SELECT id FROM "NavNode" WHERE geom = ST_SetSRID(ST_MakePoint(-137.705, 63.138, 0.000), 4326) LIMIT 1), 
    41.912, 
    ST_SetSRID(ST_GeomFromText('LINESTRINGZ(-137.705 21.226 0.000, -137.705 63.138 0.000)'), 4326), 
    true
);

-- 3. Insertion des POI (Lieux identifiés)

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Accueil', 
    false, 
    ST_SetSRID(ST_MakePoint(-0.003, 0.001, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Cons1', 
    false, 
    ST_SetSRID(ST_MakePoint(-2.604, 25.088, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Cons2', 
    false, 
    ST_SetSRID(ST_MakePoint(-2.617, 33.059, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Reedu1', 
    false, 
    ST_SetSRID(ST_MakePoint(-19.749, 42.766, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Reedu2', 
    false, 
    ST_SetSRID(ST_MakePoint(-26.722, 42.712, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Radiologie', 
    false, 
    ST_SetSRID(ST_MakePoint(-55.744, 42.595, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'HopJour', 
    false, 
    ST_SetSRID(ST_MakePoint(-88.165, 42.681, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Urgences.002', 
    false, 
    ST_SetSRID(ST_MakePoint(-115.91, 45.144, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Urgences.001', 
    false, 
    ST_SetSRID(ST_MakePoint(-120.69, 7.436, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Urgences', 
    false, 
    ST_SetSRID(ST_MakePoint(-140.231, 23.926, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Urgences.003', 
    false, 
    ST_SetSRID(ST_MakePoint(-115.968, 12.93, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'HopJour.001', 
    false, 
    ST_SetSRID(ST_MakePoint(-88.181, 14.093, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Radiologie.001', 
    false, 
    ST_SetSRID(ST_MakePoint(-55.747, 25.378, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Reedu', 
    false, 
    ST_SetSRID(ST_MakePoint(-23.219, 7.469, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Administration', 
    false, 
    ST_SetSRID(ST_MakePoint(-12.123, -16.063, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Pediatrie', 
    false, 
    ST_SetSRID(ST_MakePoint(-42.982, -1.246, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Pediatrie.001', 
    false, 
    ST_SetSRID(ST_MakePoint(-35.966, -1.246, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Pediatrie.002', 
    false, 
    ST_SetSRID(ST_MakePoint(-35.973, -40.789, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Pediatrie.003', 
    false, 
    ST_SetSRID(ST_MakePoint(-43.04, -40.693, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Hospitalisation1', 
    false, 
    ST_SetSRID(ST_MakePoint(-75.464, -1.371, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Hospitalisation1.001', 
    false, 
    ST_SetSRID(ST_MakePoint(-68.43, -1.276, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Hospitalisation1.002', 
    false, 
    ST_SetSRID(ST_MakePoint(-68.452, -49.325, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Hospitalisation1.003', 
    false, 
    ST_SetSRID(ST_MakePoint(-75.546, -49.381, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Hospitalisation2', 
    false, 
    ST_SetSRID(ST_MakePoint(-107.948, -1.246, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Hospitalisation2.001', 
    false, 
    ST_SetSRID(ST_MakePoint(-100.857, -1.47, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Hospitalisation2.002', 
    false, 
    ST_SetSRID(ST_MakePoint(-100.988, -49.381, 1.704), 4326), 
    1
);

INSERT INTO "POI" (type, is_entry_point, geom, floor_id)
VALUES (
    'Hospitalisation2.003', 
    false, 
    ST_SetSRID(ST_MakePoint(-108.064, -49.492, 1.704), 4326), 
    1
);
COMMIT;
