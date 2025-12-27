# Corrections du Rendu 3D

## Problèmes Résolus

### 1. 🖼️ Transparence qui devient noire

**Problème** : Les parties transparentes des photos/textures apparaissaient en noir au lieu d'être transparentes.

**Cause** : Configuration incorrecte des matériaux transparents dans Three.js :
- `depthWrite` était activé pour les matériaux transparents
- `alphaTest` mal configuré
- Mode de blending incorrect
- Couleur de base noire qui assombrissait les textures

**Solution appliquée** :
```typescript
if (mat.transparent || mat.alphaTest > 0 || (mat.map && mat.map.format === THREE.RGBAFormat)) {
  mat.transparent = true;
  mat.side = THREE.DoubleSide;        // Rendre les deux côtés visibles
  mat.alphaTest = 0.1;                // Seuil pour éliminer pixels quasi-transparents
  mat.depthWrite = false;             // Éviter artefacts de profondeur
  mat.blending = THREE.NormalBlending;
  
  if (mat.map) {
    mat.map.encoding = THREE.sRGBEncoding;
    mat.needsUpdate = true;
  }
}
```

**Correction des couleurs noires** :
- Si le matériau a une texture : couleur blanche (0xffffff) pour ne pas assombrir
- Sinon : couleur grise (0xcccccc)

---

### 2. 📸 Effet Billboard (orientation vers caméra)

**Problème** : Les contraintes "Track To Camera" configurées dans Blender ne fonctionnaient pas dans le rendu Three.js.

**Cause** : Les contraintes Blender ne sont pas exportées dans les fichiers GLB. Il faut recréer cet effet en JavaScript.

**Solution appliquée** :

#### Étape 1 : Détection automatique des billboards
Les objets sont détectés par leur nom dans Blender :
```typescript
const name = child.name.toLowerCase();
if (name.includes('photo') || name.includes('panneau') || 
    name.includes('billboard') || name.includes('sign')) {
  billboardMeshes.push(child);
  child.userData.isBillboard = true;
}
```

#### Étape 2 : Animation billboard à chaque frame
```typescript
useFrame((state) => {
  billboardMeshesRef.current.forEach((mesh) => {
    if (mesh && camera) {
      const position = mesh.position.clone();
      mesh.lookAt(camera.position);  // Orienter vers la caméra
      mesh.position.copy(position);  // Restaurer la position
    }
  });
});
```

---

## 🎨 Personnalisation

### Changer les mots-clés de détection des billboards

Dans le fichier `Hospital3DMap.tsx`, ligne ~44, modifiez :
```typescript
if (name.includes('photo') || name.includes('panneau') || 
    name.includes('billboard') || name.includes('sign')) {
```

Ajoutez vos propres mots-clés selon les noms que vous utilisez dans Blender.

### Billboard vertical uniquement (rotation Y seulement)

Si vous voulez que les photos pivotent seulement horizontalement (comme un panneau debout), remplacez dans `useFrame` :

```typescript
// Remplacer :
mesh.lookAt(camera.position);

// Par :
const direction = new THREE.Vector3();
direction.subVectors(camera.position, mesh.position);
direction.y = 0; // Garder seulement la rotation horizontale
direction.normalize();
const angle = Math.atan2(direction.x, direction.z);
mesh.rotation.y = angle;
```

### Ajuster le seuil de transparence

Si certaines parties semi-transparentes disparaissent, ajustez `alphaTest` (ligne ~56) :
```typescript
mat.alphaTest = 0.1;  // Valeur entre 0 et 1
// 0.1 = très permissif (garde presque tout)
// 0.5 = moyen (élimine les pixels à 50% de transparence)
// 0.9 = strict (garde seulement les pixels quasi-opaques)
```

---

## 🔍 Débogage

### Vérifier quels objets sont détectés comme billboards

Ouvrez la console du navigateur (F12) et cherchez :
```
📸 Billboard détecté: [nom de l'objet]
📸 X billboards détectés
```

### Vérifier les matériaux transparents

Cherchez dans la console :
```
✨ Matériau transparent configuré: [nom de l'objet]
```

### Si les billboards ne fonctionnent pas

1. Vérifiez que le nom de vos objets dans Blender contient un des mots-clés
2. Vérifiez dans la console qu'ils sont bien détectés
3. Essayez de renommer un objet dans Blender avec "photo" ou "billboard"

---

## 📋 Checklist de vérification

- [ ] Les parties transparentes sont bien transparentes (pas noires)
- [ ] Les photos pivotent vers la caméra quand vous bougez la vue
- [ ] La console affiche le bon nombre de billboards détectés
- [ ] Les textures ont les bonnes couleurs
- [ ] Pas d'artefacts visuels (scintillement, z-fighting)

---

## 🛠️ Nommage dans Blender

Pour que la détection automatique fonctionne, nommez vos objets dans Blender :
- `Photo_01`, `Photo_Accueil`, etc.
- `Panneau_Direction`, `Panneau_Info`, etc.
- `Billboard_Pub`, etc.
- `Sign_Sortie`, etc.

Le système détecte automatiquement ces mots-clés (insensible à la casse).
