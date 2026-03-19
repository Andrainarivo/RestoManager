# 🍴 RestoManager API

**RestoManager** est une API REST robuste et sécurisée conçue avec **ExpressJs** (**NodeJs**), permettant la gestion complète d'un établissement de restauration.

Le projet met l'accent sur la **sécurité des données** et une **gestion granulaire des accès (RBAC)** pour les administrateurs, les différents types d'employés et les clients.

---

## 🔥 Fonctionnalités Clés

* **Gestion des Utilisateurs (RBAC) :** Système de rôles strict (Admin, Chef-Cuisinier, Cuisinier, Serveur, Client).
* **Sécurité Renforcée :
    1. Authentification via **JWT** (JSON Web Tokens) stockés dans des cookies sécurisés.
    2. Hachage des mots de passe avec **Bcrypt**.
    3. Validation stricte des entrées (sanitization) avec `express-validator`.
* **Gestion du Menu :** CRUD complet pour les plats avec catégories et gestion des prix.
* **Système de Réservations :** Validation des formats de date/heure et gestion des capacités.
* **Commandes & Stocks :** Suivi en temps réel des commandes et mise à jour automatique des stocks.
* **Architecture Propre :** Séparation claire des routes, contrôleurs, middlewares et configurations.

---

## 🛠️ Stack Technique

* **Runtime :** Node.js v22 (LTS)
* **Framework :** Express.js
* **Base de données :** MySQL 8.0+
* **Authentification :** JWT, Bcrypt
* **Validation :** Express-Validator

---

## 🚀 Installation et Configuration

### 1. Prérequis (Node.js via NVM)

```bash
# Installation de NVM (si nécessaire)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
source ~/.bashrc

# Installation de Node.js v22
nvm install 22
node -v # Doit afficher v22.x.x
```

### 2. Base de données MySQL

Connectez-vous à votre instance MySQL et exécutez le script suivant :

```sql
-- Création de la base de données
CREATE DATABASE IF NOT EXISTS gestion_resto;

-- Création de l'utilisateur dédié
CREATE USER IF NOT EXISTS 'admin_project'@'localhost' IDENTIFIED BY 'VOTRE_MOT_DE_PASSE_SECURISE';

-- Attribution des privilèges
GRANT ALL PRIVILEGES ON gestion_resto.* TO 'admin_project'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Installation du projet

```bash
git clone https://github.com/Andrainarivo/RestoManager.git
cd RestoManager/server
npm install
```

### 4. Variables d'environnement

Créez un fichier `.env` dans le dossier `server/` :

```env
PORT=3000
DB_HOST=localhost
DB_USER=admin_project
DB_PASS=VOTRE_MOT_DE_PASSE_SECURISE
DB_NAME=gestion_resto
ACCESS_TOKEN_SECRET=VOTRE_CLE_JWT_TRES_LONGUE_ET_ALEATOIRE
```

---

## 🛡️ Initialisation (Premier Administrateur)

Le système étant protégé, vous devez créer le premier compte administrateur via le script utilitaire fourni :

```bash
node scripts/seedAdmin.js
```

*Suivez les instructions interactives dans votre terminal pour configurer vos accès.*

---

## 📂 Structure du Projet

```text
server/
├── configs/        # Configuration DB et variables d'environnement
├── controllers/    # Logique métier (traitement des requêtes)
├── middlewares/    # Auth, Vérification des Rôles et Validations d'entrées
├── routes/         # Définition des points d'entrée (endpoints)
├── scripts/        # Scripts de maintenance et initialisation
└── server.js       # Point d'entrée principal de l'application
```

---

## 🧪 Tests de l'API

Une fois le serveur lancé (`npm start` ou `node server.js`), vous pouvez tester les routes.

### Exemple : Connexion Administrateur (cURL)

```bash
curl -X POST http://localhost:3000/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com", "password":"votre_password"}'
```

---

## 📝 Auteur

RALAIARISOA Andrainarivo
[ralaiarisoaandrainarivo@gmail.com]
