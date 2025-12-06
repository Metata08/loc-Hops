-- Active: 1735344807906@@127.0.0.1@5432@lochops
-- =============================================================================
-- Script de création du schéma de base de données 'lochops'
-- SGBD : PostgreSQL 14+
-- Extensions : PostGIS 3+
-- Auteur : Antigravity (Architecte Base de Données)
-- Date : 2025-12-05
-- =============================================================================

-- 1. Configuration de l'environnement
-- Création de l'extension PostGIS si elle n'existe pas (nécessite des privilèges superuser)
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- Création du schéma
-- CREATE SCHEMA IF NOT EXISTS lochops;

-- Définition du chemin de recherche pour utiliser le schéma 'lochops' par défaut
SET search_path TO lochops;

-- =============================================================================
-- 2. Création des Tables
-- =============================================================================

-- Table : Hospital
-- Description : Représente l'entité principale de l'hôpital.
CREATE TABLE Hospital (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    address TEXT,
    boundary GEOMETRY(POLYGON, 4326)
);

-- Table : Building
-- Description : Bâtiments appartenant à un hôpital.
-- Relation : Composition forte avec Hospital (ON DELETE CASCADE).
CREATE TABLE Building (
    id SERIAL PRIMARY KEY,
    code VARCHAR UNIQUE,
    default_name VARCHAR,
    footprint GEOMETRY(POLYGON, 4326),
    hospital_id INT NOT NULL,
    CONSTRAINT fk_building_hospital
        FOREIGN KEY (hospital_id)
        REFERENCES Hospital(id)
        ON DELETE CASCADE
);

-- Table : Floor
-- Description : Étages ou niveaux d'un bâtiment.
-- Relation : Composition forte avec Building (ON DELETE CASCADE).
CREATE TABLE Floor (
    id SERIAL PRIMARY KEY,
    level_index INT NOT NULL,
    name VARCHAR,
    height_m NUMERIC(5,2),
    plan_geom GEOMETRY(MULTIPOLYGON, 4326),
    z_min_m NUMERIC(6,2),
    z_max_m NUMERIC(6,2),
    building_id INT NOT NULL,
    CONSTRAINT fk_floor_building
        FOREIGN KEY (building_id)
        REFERENCES Building(id)
        ON DELETE CASCADE
);

-- Table : Model3D
-- Description : Modèles 3D associés à un bâtiment ou un étage spécifique.
CREATE TABLE Model3D (
    id SERIAL PRIMARY KEY,
    description TEXT,
    file_path VARCHAR NOT NULL,
    format VARCHAR,
    building_id INT NOT NULL,
    floor_id INT,
    CONSTRAINT fk_model3d_building
        FOREIGN KEY (building_id)
        REFERENCES Building(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_model3d_floor
        FOREIGN KEY (floor_id)
        REFERENCES Floor(id)
        ON DELETE SET NULL
);

-- Table : Service
-- Description : Services médicaux ou administratifs (indépendants de la localisation physique).
CREATE TABLE Service (
    id SERIAL PRIMARY KEY,
    code VARCHAR UNIQUE NOT NULL,
    icon_name VARCHAR
);

-- Table : POI (Point of Interest)
-- Description : Points d'intérêt physiques (salles, guichets, entrées).
CREATE TABLE POI (
    id SERIAL PRIMARY KEY,
    type VARCHAR,
    is_entry_point BOOLEAN DEFAULT false,
    geom GEOMETRY(POINTZ, 4326) NOT NULL,
    z_m NUMERIC(6,2),
    floor_id INT,
    service_id INT,
    CONSTRAINT fk_poi_floor
        FOREIGN KEY (floor_id)
        REFERENCES Floor(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_poi_service
        FOREIGN KEY (service_id)
        REFERENCES Service(id)
        ON DELETE SET NULL
);

-- Table : NavNode
-- Description : Nœuds du graphe de navigation.
CREATE TABLE NavNode (
    id SERIAL PRIMARY KEY,
    kind VARCHAR,
    geom GEOMETRY(POINTZ, 4326) NOT NULL,
    floor_id INT NOT NULL,
    CONSTRAINT fk_navnode_floor
        FOREIGN KEY (floor_id)
        REFERENCES Floor(id)
        ON DELETE CASCADE
);

-- Table : NavEdge
-- Description : Arêtes du graphe de navigation reliant deux nœuds.
CREATE TABLE NavEdge (
    id SERIAL PRIMARY KEY,
    is_accessible BOOLEAN DEFAULT true,
    length_m NUMERIC(8,2),
    kind VARCHAR,
    geom GEOMETRY(LINESTRINGZ, 4326),
    node_from_id INT NOT NULL,
    node_to_id INT NOT NULL,
    CONSTRAINT fk_navedge_from
        FOREIGN KEY (node_from_id)
        REFERENCES NavNode(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_navedge_to
        FOREIGN KEY (node_to_id)
        REFERENCES NavNode(id)
        ON DELETE CASCADE
);

-- Table : Language
-- Description : Langues supportées pour les traductions.
CREATE TABLE Language (
    code VARCHAR(5) PRIMARY KEY,
    name VARCHAR NOT NULL
);

-- Table : ServiceTranslation
-- Description : Traductions des informations des services.
CREATE TABLE ServiceTranslation (
    service_id INT NOT NULL,
    lang_code VARCHAR(5) NOT NULL,
    label VARCHAR NOT NULL,
    description TEXT,
    PRIMARY KEY (service_id, lang_code),
    CONSTRAINT fk_servicetranslation_service
        FOREIGN KEY (service_id)
        REFERENCES Service(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_servicetranslation_language
        FOREIGN KEY (lang_code)
        REFERENCES Language(code)
        ON DELETE CASCADE
);

-- Table : POITranslation
-- Description : Traductions des labels des POI.
CREATE TABLE POITranslation (
    poi_id INT NOT NULL,
    lang_code VARCHAR(5) NOT NULL,
    label VARCHAR NOT NULL,
    PRIMARY KEY (poi_id, lang_code),
    CONSTRAINT fk_poitranslation_poi
        FOREIGN KEY (poi_id)
        REFERENCES POI(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_poitranslation_language
        FOREIGN KEY (lang_code)
        REFERENCES Language(code)
        ON DELETE CASCADE
);

-- Table : NavigationSession
-- Description : Enregistrement des sessions de navigation des utilisateurs.
CREATE TABLE NavigationSession (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    via_qr BOOLEAN DEFAULT false,
    via_print BOOLEAN DEFAULT false,
    path_geom GEOMETRY(MULTILINESTRING, 4326),
    hospital_id INT NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    poi_from_id INT NOT NULL,
    poi_to_id INT NOT NULL,
    CONSTRAINT fk_navigationsession_hospital
        FOREIGN KEY (hospital_id)
        REFERENCES Hospital(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_navigationsession_language
        FOREIGN KEY (language_code)
        REFERENCES Language(code)
        ON DELETE RESTRICT,
    CONSTRAINT fk_navigationsession_from
        FOREIGN KEY (poi_from_id)
        REFERENCES POI(id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_navigationsession_to
        FOREIGN KEY (poi_to_id)
        REFERENCES POI(id)
        ON DELETE RESTRICT
);

-- Fin du script
