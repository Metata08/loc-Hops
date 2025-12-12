# Fix: Affichage des Noms de Services

**Date:** 2025-12-07  
**Problème:** Les cartes de services affichaient les IDs (1, 2, 7, etc.) au lieu des noms (Réception, Urgences, etc.)

---

## 🔍 Diagnostic

### Problème Identifié

Dans `ServiceDirectory.tsx` ligne 91, le code utilisait:
```tsx
name: getServiceName(service.id, language),
```

Et la fonction `getServiceName` dans `useGLBServices.ts` retournait simplement:
```typescript
return id; // Retourne l'ID au lieu du nom!
```

### Cause Racine

Les services chargés depuis le backend ont déjà un champ `name` correctement formaté (ligne 131 dans `useGLBServices.ts`):
```typescript
const displayName = mapping ? mapping[1].fr : service.code;

mappedServices.push({
  id: String(representativePoi.id),
  name: displayName, // ✅ Nom déjà calculé!
  originalName: service.code,
  ...
});
```

Mais `ServiceDirectory` ignorait ce champ et appelait `getServiceName(id)` qui retournait juste l'ID.

---

## ✅ Solution Appliquée

### 1. Modification de `ServiceDirectory.tsx`

**Avant:**
```tsx
const displayServices = useMemo(() => {
  return services.map((service: GLBService) => {
    const iconName = getServiceIcon(service.id);
    // ...
    return {
      id: service.id,
      name: getServiceName(service.id, language), // ❌ Appel inutile
      color: getServiceColor(service.id),
      // ...
    };
  });
}, [services, language]);
```

**Après:**
```tsx
const displayServices = useMemo(() => {
  return services.map((service: GLBService) => {
    const iconName = getServiceIcon(service.originalName || service.id);
    // ...
    return {
      id: service.id,
      name: service.name, // ✅ Utilise directement le champ name
      color: getServiceColor(service.originalName || service.id),
      // ...
    };
  });
}, [services, language]);
```

**Changements:**
- Ligne 86: Utilise `service.originalName` pour déterminer l'icône (plus précis)
- Ligne 91: Utilise `service.name` directement au lieu d'appeler `getServiceName`
- Ligne 97: Utilise `service.originalName` pour les couleurs (plus fiable)

### 2. Amélioration de `useGLBServices.ts`

Pour les cas futurs, amélioration des fonctions utilitaires :

**`getServiceName`:**
```typescript
export function getServiceName(id: string, lang: "fr" | "en" | "wo" | "ar" = "fr") {
  // Try to find mapping by checking if ID matches any mapping keys
  for (const [key, translations] of Object.entries(serviceNameMappings)) {
    if (id.toLowerCase().includes(key.toLowerCase())) {
      return translations[lang];
    }
  }
  
  // If no mapping found, return the ID (fallback)
  return id;
}
```

**`getServiceIcon`:**
```typescript
export function getServiceIcon(id: string): string {
  const idLower = id.toLowerCase();
  
  if (idLower.includes('urgence') || idLower.includes('emergency')) return 'Ambulance';
  if (idLower.includes('cardio') || idLower.includes('heart')) return 'Heart';
  if (idLower.includes('mater') || idLower.includes('baby')) return 'Baby';
  if (idLower.includes('radio') || idLower.includes('camera')) return 'Camera';
  if (idLower.includes('pharma') || idLower.includes('pill')) return 'Pill';
  if (idLower.includes('labo') || idLower.includes('test')) return 'TestTube';
  if (idLower.includes('consult')) return 'Stethoscope';
  if (idLower.includes('chirur') || idLower.includes('surgery')) return 'Activity';
  // ... etc
  
  return 'Building'; // Default
}
```

---

## 📊 Résultat

### Avant
```
[Card 1]
Nom: 1
...

[Card 2]
Nom: 7
...
```

### Après
```
[Card 1]
Nom: Réception
...

[Card 2]
Nom: Urgences
...
```

---

## 🎯 Services Affichés

Selon les données du backend et les mappings:

| Code Service | Nom FR | Nom EN | Icône |
|-------------|---------|---------|-------|
| reception | Réception | Reception | Building |
| urgences | Urgences | Emergency | Ambulance |
| radiologie | Radiologie | Radiology | Camera |
| maternite | Maternité | Maternity | Baby |
| cardiologie | Cardiologie | Cardiology | Heart |
| chirurgie | Chirurgie | Surgery | Activity |
| consultation | Consultation | Consultation | Stethoscope |
| pharmacie | Pharmacie | Pharmacy | Pill |
| laboratoire | Laboratoire | Laboratory | TestTube |

---

## 🔍 Fichiers Modifiés

1. **`lochops_front/src/components/ServiceDirectory.tsx`**
   - Ligne 86: Utilise `service.originalName` pour l'icône
   - Ligne 91: Utilise `service.name` au lieu de `getServiceName()`
   - Ligne 97: Utilise `service.originalName` pour la couleur

2. **`lochops_front/src/hooks/useGLBServices.ts`**
   - Lignes 210-221: Amélioration de `getServiceName()` avec mapping
   - Lignes 223-237: Amélioration de `getServiceIcon()` avec détection par mots-clés

---

## ✅ Test

Pour vérifier le fix:

1. Rechargez la page (`Ctrl+Shift+R`)
2. Sélectionnez une langue (Français)
3. Allez sur la page des services
4. Vérifiez que les cartes affichent des noms (Réception, Urgences, etc.) au lieu de nombres

---

**Résolu par:** Antigravity  
**Date:** 2025-12-07  
**Durée:** ~5 minutes
