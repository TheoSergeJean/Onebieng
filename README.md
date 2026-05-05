# OnéBieng 

Application mobile de sport et nutrition développée avec React Native et Expo.

---

## Aperçu

| Login | Accueil | Nutrition |
|-------|---------|-----------|
| ![Login](assets/screenshots/Login.jpg) | ![Home](assets/screenshots/Home.jpg) | ![Nutrition](assets/screenshots/Food1.jpg) |

| Recherche d'aliments | Détail d'un ingrédient | Recherche d'exercices |
|----------------------|------------------------|----------------------|
| ![Food2](assets/screenshots/Food2.jpg) | ![Ingredient](assets/screenshots/Ingredient.jpg) | ![NewProg1](assets/screenshots/NewProg1.jpg) |

| Création de programme | Mes programmes | Détail d'un programme | Détail d'un exercice |
|-----------------------|----------------|----------------------|----------------------|
| ![NewProg2](assets/screenshots/NewProg2.jpg) | ![MyProg](assets/screenshots/MyProg.jpg) | ![Prog](assets/screenshots/Prog.jpg) | ![Exercise](assets/screenshots/Exercise.jpg) |

---

## Fonctionnalités

- Authentification par email / mot de passe via Firebase
- Création de programmes sportifs personnalisés
- Recherche d'exercices filtrés par type, muscle ciblé et niveau de difficulté
- Consultation et suppression de ses programmes
- Calcul des besoins caloriques journaliers (formule de Harris-Benedict)
- Recherche d'aliments et consultation de leurs valeurs nutritionnelles

---

## Technologies utilisées

- [React Native](https://reactnative.dev/) — framework mobile
- [Expo](https://expo.dev/) — environnement de développement
- [Firebase](https://firebase.google.com/) — authentification et base de données (Firestore)
- [API Ninjas](https://api-ninjas.com/) — données sur les exercices sportifs
- [Spoonacular](https://spoonacular.com/food-api) — données nutritionnelles

---

## Installation

### Prérequis

- [Node.js](https://nodejs.org/)
- [Expo Go](https://expo.dev/client) sur votre téléphone
- Un compte [API Ninjas](https://api-ninjas.com/) et [Spoonacular](https://spoonacular.com/food-api) pour obtenir vos clés API

### Étapes

1. Cloner le projet

```bash
git clone https://github.com/TheoSergeJean/Onebieng.git
cd Onebieng
```

2. Installer les dépendances

```bash
npm install
```

3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet en vous basant sur `.env.example` :

```env
EXPO_PUBLIC_API_NINJA_KEY=votre_clé_api_ninjas
EXPO_PUBLIC_SPOONACULAR_KEY=votre_clé_spoonacular
```

4. Lancer l'application

```bash
npx expo start --lan
```

Scannez le QR code avec Expo Go (Android) ou l'appareil photo (iOS). Assurez-vous que votre téléphone et votre ordinateur sont sur le même réseau WiFi.

---

## Améliorations potentielles

- Modification d'un programme existant
- Suivi de l'historique des séances
- Graphiques de progression nutritionnelle

---

## Auteur

**Théo Biron** — projet réalisé en 2ème année d'école d'ingénieur avec modifications ultérieures
