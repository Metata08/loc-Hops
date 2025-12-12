# Centrage du Modèle 3D sur le Point d'Accueil

**Date:** 2025-12-07  
**Fichier:** `Hospital3DMap.tsx`

---

## 🎯 Objectif

Centrer le modèle 3D sur le **point d'accueil/réception** au lieu du centre géométrique du bâtiment. Cela rend la navigation plus intuitive car le point (0, 0) correspond à l'accueil.

---

## ✨ Modifications Appliquées

### 1. Ajout de la Prop `receptionPosition`

**Composant `GLBModel` :**
```tsx
const GLBModel = ({ modelPath, highlightServices, receptionPosition }: {
  modelPath: string;
  highlightServices?: string[];
  receptionPosition?: [number, number, number];  // ← NOUVEAU
}) => {
  // ...
}
```

### 2. Logique de Positionnement Conditionnelle

```typescript
// Si on a les coordonnées du point d'accueil, centrer sur celui-ci
if (receptionPosition && receptionPosition.length === 3) {
  // Centrer sur le point d'accueil
  scene.position.x = -receptionPosition[0];
  scene.position.z = -receptionPosition[2];
  scene.position.y = -box.min.y;  // Base sur la grille
  
  console.log("✅ Modèle 3D chargé - CENTRÉ SUR L'ACCUEIL");
} else {
  // Centrer sur le centre géométrique (comportement par défaut)
  scene.position.x = -center.x;
  scene.position.z = -center.z;
  scene.position.y = -box.min.y;
  
  console.log("✅ Modèle 3D chargé - CENTRÉ GÉOMÉTRIQUEMENT");
}
```

### 3. Passage des Coordonnées

**Dans `Hospital3DMap` :**
```tsx
// Récupération de la position d'accueil (ID '1')
const startPosition: [number, number, number] = servicePositions['1'] || [0, 0, 3];

// ...

// Passage au composant GLBModel
<GLBModel
  modelPath={modelPath}
  highlightServices={selectedService ? [selectedService] : []}
  receptionPosition={startPosition}  // ← NOUVEAU
/>
```

### 4. Mise à Jour des Dépendances

```tsx
useEffect(() => {
  // ... configuration du modèle ...
}, [scene, highlightServices, receptionPosition]);  // ← receptionPosition ajouté
```

---

## 📊 Résultat

### Console - Avec Coordonnées d'Accueil
```
✅ Modèle 3D chargé - CENTRÉ SUR L'ACCUEIL: {
  meshes: "11 total, 11 visibles",
  receptionPosition: {
    original: [x, y, z],
    afterScale: [...]
  },
  position: { x: -x, y: 0, z: -z },
  note: "Modèle centré sur le point d'accueil"
}
```

### Console - Sans Coordonnées d'Accueil (Fallback)
```
✅ Modèle 3D chargé - CENTRÉ GÉOMÉTRIQUEMENT: {
  meshes: "11 total, 11 visibles",
  center: { x, y, z },
  position: { x: -x, y: 0, z: -z },
  note: "Modèle centré géométriquement (pas de coordonnées d'accueil)"
}
```

---

## 🎮 Comportement

### Avant
- Le modèle était centré sur son centre géométrique
- Le point (0, 0) était au milieu du bâtiment
- L'accueil pouvait être décalé par rapport au centre

### Après
- Le modèle est centré sur le point d'accueil
- Le point (0, 0) correspond à l'accueil
- **Navigation plus intuitive** : "d'où je suis (accueil) vers où je veux aller"
- Les coordonnées relatives sont cohérentes avec le plan

---

## 🔍 Points d'Intérêt

### Ordre des Opérations

1. **Échelle appliquée AVANT positionnement** : `scene.scale.setScalar(scale)`
2. **Positionnement X/Z** : Basé sur `receptionPosition`
3. **Positionnement Y** : Base du modèle sur la grille (`-box.min.y`)

### Coordonnées

- **`receptionPosition`** : Coordonnées du point d'accueil dans le système du modèle GLB
- **`scene.position`** : Position de la scène dans le système Three.js
- **Relation** : `scene.position = -receptionPosition` pour que l'accueil soit à (0, 0, 0)

---

## ✅ Test

Pour vérifier que le centrage fonctionne :

1. **Rechargez la page** (`Ctrl+Shift+R`)
2. **Vérifiez la console** :
   - Devrait afficher `CENTRÉ SUR L'ACCUEIL` (pas `CENTRÉ GÉOMÉTRIQUEMENT`)
3. **Visuellement** :
   - Le point d'accueil devrait être proche du centre de la grille
   - Le marqueur "Réception" ou "Accueil" devrait être proche de (0, 0)

---

## 📝 Fichiers Modifiés

**`Hospital3DMap.tsx`**

- **Ligne 17** : Ajout de `receptionPosition` dans la signature de `GLBModel`
- **Lignes 78-169** : Logique de positionnement conditionnelle
- **Ligne 194** : Ajout de `receptionPosition` dans les dépendances
- **Ligne 603** : Passage de `receptionPosition` au composant

---

**Auteur:** Antigravity  
**Date:** 2025-12-07  
**Statut:** ✅ Centrage sur l'accueil implémenté
