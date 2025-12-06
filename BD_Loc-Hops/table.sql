--  ATTENTION !!!: C'est juste pour vous montrerComment est la structure des tables des donnees fournies
-- A vous de jouer  , @Lala !

-- 1. Activer les extensions (OBLIGATOIRE)
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgrouting;

-- 2. Vérifier que vos tables existent (selon votre diagramme)
-- Je vous donne un schéma simplifié pour tester si vous ne l'avez pas encore créé
CREATE TABLE IF NOT EXISTS "NavNode" (
    id SERIAL PRIMARY KEY,
    geom geometry(POINT, 4326),
    floor_id integer,
    kind varchar
);

CREATE TABLE IF NOT EXISTS "NavEdge" (
    id SERIAL PRIMARY KEY,
    node_from_id integer,
    node_to_id integer,
    length_m numeric,
    geom geometry(LINESTRING, 4326),
    is_accessible boolean
);

CREATE TABLE IF NOT EXISTS "POI" (
    id SERIAL PRIMARY KEY,
    type varchar, -- ex: 'Radiologie'
    is_entry_point boolean,
    geom geometry(POINT, 4326),
    floor_id integer
);