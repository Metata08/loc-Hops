# 📱 Guide de création d'application mobile native pour Loc-Hops

Capacitor est maintenant configuré ! Voici les étapes pour créer votre APK Android et application iOS.

## 🚀 Étapes pour tester sur appareil physique ou émulateur

### 1️⃣ Exporter le projet vers Github
- Cliquez sur le bouton **"Export to Github"** dans Lovable
- Clonez le projet depuis votre repository Github :
```bash
git clone [votre-url-github]
cd [nom-du-projet]
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Ajouter les plateformes natives

**Pour Android :**
```bash
npx cap add android
npx cap update android
```

**Pour iOS (Mac uniquement avec Xcode) :**
```bash
npx cap add ios
npx cap update ios
```

### 4️⃣ Build le projet
```bash
npm run build
```

### 5️⃣ Synchroniser avec les plateformes natives
```bash
npx cap sync
```

### 6️⃣ Lancer l'application

**Sur Android :**
```bash
npx cap run android
```
*Note : Nécessite Android Studio installé*

**Sur iOS :**
```bash
npx cap run ios
```
*Note : Nécessite un Mac avec Xcode installé*

## 📦 Créer un APK pour distribution

### Pour Android :

1. Ouvrez le projet dans Android Studio :
```bash
npx cap open android
```

2. Dans Android Studio :
   - Menu **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - L'APK sera généré dans `android/app/build/outputs/apk/`

### Pour publier sur Google Play Store :
- Menu **Build** → **Generate Signed Bundle / APK**
- Suivez l'assistant pour créer un fichier AAB (Android App Bundle)

## 🔄 Après chaque modification de code

À chaque fois que vous faites un `git pull` après des modifications dans Lovable :

```bash
npm install          # Si de nouvelles dépendances
npm run build       # Reconstruire le projet
npx cap sync        # Synchroniser avec les plateformes natives
```

## 📱 Fonctionnalités natives disponibles

Avec Capacitor, vous avez maintenant accès à :
- 📸 Appareil photo
- 🔔 Notifications push
- 📍 Géolocalisation
- 🗄️ Stockage local
- 🔊 Synthèse vocale native
- 🎤 Reconnaissance vocale
- Et bien plus !

## 🆘 Problèmes courants

**Erreur "SDK not found" :**
- Assurez-vous d'avoir Android Studio installé
- Configurez la variable d'environnement `ANDROID_HOME`

**Erreur sur iOS :**
- Vérifiez que Xcode est installé (Mac uniquement)
- Ouvrez Xcode au moins une fois pour accepter les licences

## 📚 Ressources

- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Guide de publication Android](https://capacitorjs.com/docs/android/deploying-to-google-play)
- [Guide de publication iOS](https://capacitorjs.com/docs/ios/deploying-to-app-store)

---

✨ **Votre application Loc-Hops est maintenant prête pour le mobile !**
