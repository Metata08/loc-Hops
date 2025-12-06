-- Active: 1735344807906@@127.0.0.1@5432@lochops
-- Enable pgRouting extension
CREATE EXTENSION IF NOT EXISTS pgrouting;

-- Function to calculate shortest path between two nodes using Dijkstra
-- Returns a set of edges with their geometry, ordered by the path sequence.
CREATE OR REPLACE FUNCTION calculate_path(start_node_id INT, end_node_id INT)
RETURNS TABLE (
    seq INT,
    path_seq INT,
    node INT,
    edge INT,
    cost NUMERIC,
    agg_cost NUMERIC,
    geom GEOMETRY
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        pgr.seq,
        pgr.path_seq,
        pgr.node,
        pgr.edge,
        pgr.cost,
        pgr.agg_cost,
        e.geom
    FROM pgr_dijkstra(
        -- Edges query: Must return id, source, target, cost
        'SELECT id, node_from_id AS source, node_to_id AS target, length_m AS cost FROM "NavEdge" WHERE is_accessible = true',
        start_node_id,
        end_node_id,
        directed := false
    ) AS pgr
    LEFT JOIN "NavEdge" e ON pgr.edge = e.id
    ORDER BY pgr.seq;
END;
$$ LANGUAGE plpgsql;
