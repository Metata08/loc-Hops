# Guide d'Intégration API pour React

Ce document détaille les endpoints de l'API Django `lochops_backend` et comment les consommer dans une application React.

## URL de Base
En développement local : `http://localhost:8000/api/`

## Tableau Récapitulatif des Endpoints

| Fonctionnalité | Endpoint | Méthode | Description | Paramètres Clés |
| :--- | :--- | :--- | :--- | :--- |
| **Hôpitaux** | `/hospitals/` | `GET` | Liste tous les hôpitaux (GeoJSON). | - |
| **Bâtiments** | `/buildings/` | `GET` | Liste tous les bâtiments (GeoJSON). | `hospital` (ID) |
| **Étages** | `/floors/` | `GET` | Liste tous les étages (GeoJSON). | `building` (ID) |
| **Services** | `/services/` | `GET` | Liste les services médicaux. | - |
| **POIs** | `/pois/` | `GET` | Liste les Points d'Intérêt (GeoJSON). | `floor` (ID), `service` (ID) |
| **Détail POI** | `/pois/{id}/` | `GET` | Détails d'un POI spécifique. | - |
| **Navigation** | `/navigation-sessions/route/` | `GET` | Calcule l'itinéraire le plus court. | `from` (POI ID), `to` (POI ID) |

---

## Exemples d'Implémentation (React + Axios)

Assurez-vous d'avoir installé axios : `npm install axios`

### 1. Récupérer la liste des POIs pour un étage
```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PoiList = ({ floorId }) => {
  const [pois, setPois] = useState([]);

  useEffect(() => {
    const fetchPois = async () => {
      try {
        // Filtre par étage si floorId est fourni
        const url = floorId 
          ? `http://localhost:8000/api/pois/?floor=${floorId}`
          : 'http://localhost:8000/api/pois/';
          
        const response = await axios.get(url);
        // DRF GeoJSON retourne une FeatureCollection
        setPois(response.data.features); 
      } catch (error) {
        console.error("Erreur lors du chargement des POIs:", error);
      }
    };

    fetchPois();
  }, [floorId]);

  return (
    <ul>
      {pois.map((poi) => (
        <li key={poi.id}>
          {poi.properties.type} (ID: {poi.id})
        </li>
      ))}
    </ul>
  );
};

export default PoiList;
```

### 2. Calculer et Afficher un Itinéraire
```javascript
import React, { useState } from 'react';
import axios from 'axios';

const Navigation = () => {
  const [startId, setStartId] = useState('');
  const [endId, setEndId] = useState('');
  const [route, setRoute] = useState(null);

  const handleCalculateRoute = async () => {
    if (!startId || !endId) return;

    try {
      const response = await axios.get('http://localhost:8000/api/navigation-sessions/route/', {
        params: {
          from: startId,
          to: endId
        }
      });
      
      // La réponse est un objet GeoJSON Feature
      setRoute(response.data);
      console.log("Géométrie du chemin:", response.data.geometry);
      
    } catch (error) {
      console.error("Erreur de calcul d'itinéraire:", error);
      alert("Impossible de calculer l'itinéraire.");
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="ID Départ" 
        value={startId} 
        onChange={(e) => setStartId(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="ID Arrivée" 
        value={endId} 
        onChange={(e) => setEndId(e.target.value)} 
      />
      <button onClick={handleCalculateRoute}>Calculer Itinéraire</button>

      {route && (
        <div>
          <h3>Itinéraire trouvé !</h3>
          <p>Distance approximative : {route.properties.distance_m} m</p>
          {/* Ici vous passeriez route.geometry à votre composant de carte (Leaflet/Mapbox) */}
        </div>
      )}
    </div>
  );
};

export default Navigation;
```

### 3. Structure des Données GeoJSON
L'API utilise `djangorestframework-gis`, donc les réponses sont au format standard GeoJSON.

**Exemple de réponse `/api/pois/` (FeatureCollection) :**
```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "id": 1,
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-17.45, 14.75, 0.0] // [Lon, Lat, Z]
            },
            "properties": {
                "type": "Accueil",
                "is_entry_point": true,
                "floor": 1,
                "service": null,
                "translations": [
                    { "language": "fr", "label": "Accueil Principal" }
                ]
            }
        }
    ]
}
```

**Exemple de réponse `/api/navigation-sessions/route/` (Feature) :**
```json
{
    "type": "Feature",
    "geometry": {
        "type": "MultiLineString",
        "coordinates": [
            [ [-17.45, 14.75], [-17.46, 14.76] ], // Segment 1
            [ [-17.46, 14.76], [-17.47, 14.77] ]  // Segment 2
        ]
    },
    "properties": {
        "start_poi": 1,
        "end_poi": 5,
        "start_node": 10,
        "end_node": 25
    }
}
```
