jet Backend - Formulaire d'Authentification

Ce projet est une application backend NestJS avec Prisma ORM et une base de données PostgreSQL.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v18 ou supérieur)
- **npm** ou **yarn**
- **PostgreSQL** (base de données)
- **Git**

## Installation des dépendances

```bash
# Se déplacer dans le dossier backend
cd backend

# Installer les dépendances
npm install
```

## Configuration de la base de données

### 1. Créer un fichier `.env`

Créez un fichier `.env` à la racine du dossier `backend` avec les variables suivantes :

```env
# URL de connexion à la base de données PostgreSQL
DATABASE_URL="postgresql://UTILISATEUR:MOT_DE_PASSE@localhost:5432/NOM_DE_LA_BD?schema=public"

# Port du serveur (optionnel, par défaut 3000)
PORT=3000
```

Remplacez les valeurs par vos informations :
- `UTILISATEUR` : votre nom d'utilisateur PostgreSQL
- `MOT_DE_PASSE` : votre mot de passe PostgreSQL
- `NOM_DE_LA_BD` : le nom de la base de données (à créer)

### 2. Créer la base de données

Connectez-vous à PostgreSQL et créez la base de données :

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE nom_de_la_bd;

# Quitter psql
\q
```

## Configuration de Prisma

### 1. Générer le client Prisma

Après avoir configuré le fichier `.env`, générez le client Prisma :

```bash
npx prisma generate
```

### 2. Appliquer les migrations

Pour créer les tables dans la base de données :

```bash
npx prisma migrate dev
```

Cette commande va appliquer la migration existante (`20260215143154_init`) et créer les tables.

### 3. Vérifier la base de données (optionnel)

Vous pouvez visualiser votre base de données avec Prisma Studio :

```bash
npx prisma studio
```

## Lancer le projet

### Mode développement (avec hot-reload)

```bash
npm run start:dev
```

Le serveur sera disponible sur `http://localhost:3000`

### Mode production

```bash
# Compiler le projet
npm run build

# Lancer en production
npm run start:prod
```

### Mode simple

```bash
npm run start
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm install` | Installer les dépendances |
| `npm run build` | Compiler le projet |
| `npm run start` | Lancer l'application |
| `npm run start:dev` | Lancer en mode développement avec hot-reload |
| `npm run start:debug` | Lancer en mode débogage |
| `npm run start:prod` | Lancer en mode production |
| `npm run test` | Exécuter les tests unitaires |
| `npm run test:e2e` | Exécuter les tests e2e |
| `npm run test:cov` | Exécuter les tests avec couverture |
| `npm run lint` | Linter le code |
| `npm run format` | Formater le code |
| `npx prisma generate` | Générer le client Prisma |
| `npx prisma migrate dev` | Appliquer les migrations |
| `npx prisma studio` | Ouvrir Prisma Studio |

## Structure du projet

```
backend/
├── prisma/
│   ├── schema.prisma       # Schéma de la base de données
│   └── migrations/        # Migrations Prisma
├── src/
│   ├── main.ts            # Point d'entrée de l'application
│   ├── app.module.ts      # Module principal
│   ├── app.controller.ts  # Contrôleur principal
│   ├── app.service.ts     # Service principal
│   └── prisma/
│       └── prisma.service.ts  # Service Prisma
├── .env                   # Variables d'environnement
├── package.json           # Dépendances du projet
└── tsconfig.json          # Configuration TypeScript
```

## Modèle de données

Le schéma Prisma définit un modèle `User` avec les champs suivants :

| Champ | Type | Description |
|-------|------|-------------|
| `id` | Int | Identifiant unique (auto-incrémenté) |
| `email` | String | Adresse email (unique) |
| `name` | String | Nom de l'utilisateur |
| `password` | String | Mot de passe (hashé) |
| `emailVerified` | Boolean | Statut de vérification de l'email |
| `verifyToken` | String? | Token de vérification de l'email |
| `createdAt` | DateTime | Date de création |
| `updatedAt` | DateTime | Date de mise à jour |

## Dépannage

### Erreur de connexion à la base de données

Vérifiez que :
1. PostgreSQL est en cours d'exécution
2. Le fichier `.env` est correctement configuré
3. La base de données existe
4. Les informations d'identification sont correctes

### Erreur avec Prisma

```bash
# Supprimer le cache et régénérer
rm -rf node_modules/.prisma
rm -rf dist
npm install
npx prisma generate
npx prisma migrate dev
```

### Erreur de compilation TypeScript

```bash
npm run build
```

## Commandes rapides pour démarrer

```bash
cd backend

# 1. Installer les dépendances
npm install

# 2. Configurer le fichier .env
# (voir section Configuration ci-dessus)

# 3. Générer le client Prisma
npx prisma generate

# 4. Appliquer les migrations
npx prisma migrate dev

# 5. Lancer le serveur
npm run start:dev
```

Le projet sera accessible à l'adresse : **http://localhost:3000**

## Documentation utile

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

# form-backend
