-- EXPORT BLENDER VERS POSTGIS
BEGIN;

-- Insertion des NavNode pour l'étage 1
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


-- Insertion des NavEdge
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
COMMIT;
