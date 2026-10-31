

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=F97316&center=true&vCenter=true&width=800&lines=Savoria+Bistro+%26+Cellar;Week+3+Documentation" alt="Savoria Bistro & Cellar Week 3 Documentation" />
</p>

# Savoria Bistro & Cellar  Week 3 Documentation

> Full-stack restaurant web application with real backend, PostgreSQL database, authentication, and live deployment.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Stack Technique](#2-stack-technique)
3. [Technologies & Outils](#3-technologies--outils)
4. [Architecture du Projet](#4-architecture-du-projet)
5. [Structure des Fichiers](#5-structure-des-fichiers)
6. [Schéma de la Base de Données](#6-schéma-de-la-base-de-données)
7. [Flux d'Authentification](#7-flux-dauthentification)
8. [Flux des Données  Menu](#8-flux-des-données--menu)
9. [Flux des Réservations](#9-flux-des-réservations)
10. [API Reference](#10-api-reference)
11. [Variables d'Environnement](#11-variables-denvironnement)
12. [Lancer le Projet en Local](#12-lancer-le-projet-en-local)
13. [Déploiement](#13-déploiement)

---

## 1. Project Overview

**Savoria Bistro & Cellar** est un site web restaurant single-page construit en React, connecté à un backend Express + PostgreSQL. L'application permet aux utilisateurs de :

- Consulter le menu servi depuis une vraie base de données
- Créer un compte et se connecter (sessions persistantes)
- Réserver une table (données enregistrées en base)
- Voir l'état connecté / déconnecté en temps réel dans le header

---

## 2. Stack Technique

| Couche | Technologie | Version |
|---|---|---|
| Frontend UI | ![React](https://img.shields.io/badge/React-18.3.x-61DAFB?style=flat&logo=react&logoColor=white&labelColor=20232A) | 18.3.x |
| Build tool | ![Vite](https://img.shields.io/badge/Vite-5.4.x-646CFF?style=flat&logo=vite&logoColor=white&labelColor=1a1a2e) | 5.4.x |
| CSS | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.x-38BDF8?style=flat&logo=tailwindcss&logoColor=white&labelColor=0f172a) | 3.4.x |
| Runtime | ![Node.js](https://img.shields.io/badge/Node.js-18+-5FA04E?style=flat&logo=nodedotjs&logoColor=white&labelColor=1a1a1a) | 18+ |
| Backend | ![Express](https://img.shields.io/badge/Express-4.19.x-000000?style=flat&logo=express&logoColor=white&labelColor=333333) | 4.19.x |
| Base de données | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=flat&logo=postgresql&logoColor=white&labelColor=1a1a2e) | 15+ |
| Hébergement DB | ![Neon](https://img.shields.io/badge/Neon-Serverless-00E599?style=flat&logo=neon&logoColor=black&labelColor=0a0a0a) |  |
| Driver SQL | ![pg](https://img.shields.io/badge/node--postgres-8.12.x-4169E1?style=flat&logo=postgresql&logoColor=white&labelColor=1a1a2e) | 8.12.x |
| Sessions | ![express-session](https://img.shields.io/badge/express--session-1.18.x-000000?style=flat&logo=express&logoColor=white&labelColor=333333) | 1.18.x |
| Hashage | ![bcrypt](https://img.shields.io/badge/bcryptjs-2.4.x-FF6B35?style=flat&logo=npm&logoColor=white&labelColor=1a1a1a) | 2.4.x |
| Variables d'env | ![dotenv](https://img.shields.io/badge/dotenv-16.4.x-ECD53F?style=flat&logo=dotenv&logoColor=black&labelColor=1a1a1a) | 16.4.x |
| Déploiement backend | ![Railway](https://img.shields.io/badge/Railway-backend-0B0D0E?style=flat&logo=railway&logoColor=white&labelColor=7B2FBE) |  |
| Déploiement frontend | ![Vercel](https://img.shields.io/badge/Vercel-frontend-000000?style=flat&logo=vercel&logoColor=white&labelColor=333333) |  |
| Versioning | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white&labelColor=1a1a1a) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white&labelColor=333333) |  |

---

## 3. Technologies & Outils

### Frontend

**React 18**
Bibliothèque UI. Utilisée pour composer les composants (`Header`, `Menu`, `Reservation`, `AuthModal`), gérer l'état local avec `useState` et les effets de bord (fetch, scroll) avec `useEffect`.

**Vite**
Build tool et serveur de développement. Remplace Create React App  beaucoup plus rapide. Configuré avec un proxy `/api → localhost:3001` pour éviter les erreurs CORS en développement.

**Tailwind CSS**
Framework CSS utility-first. Toute la mise en page et le design sont construits avec des classes Tailwind directement dans le JSX. PostCSS est utilisé comme processeur.

### Backend

**Node.js**
Runtime JavaScript côté serveur. Exécute le code Express sans navigateur.

**Express**
Framework web minimaliste. Gère le routing (`/api/auth`, `/api/menu`, `/api/reservations`), les middlewares (CORS, JSON parsing, sessions).

**node-postgres (pg)**
Driver officiel PostgreSQL pour Node.js. Utilisé via un `Pool` de connexions pour interroger la base Neon.

**express-session + connect-pg-simple**
Gestion des sessions HTTP. Les sessions sont stockées dans la table `user_sessions` de Postgres  elles survivent aux redémarrages du serveur et aux rechargements de page.

**bcryptjs**
Hashage des mots de passe avec salt. Les mots de passe ne sont jamais stockés en clair  uniquement le hash bcrypt (cost factor 12).

**dotenv**
Charge les variables `DATABASE_URL`, `SESSION_SECRET`, `PORT` depuis le fichier `.env` (jamais committé).

### Base de données

**PostgreSQL via Neon**
Base relationnelle hébergée. Neon offre un tier gratuit avec connexions SSL. Trois tables : `users`, `menu_items`, `reservations` + la table de sessions auto-créée.

### DevOps & Déploiement

**Railway**  déploiement du serveur Express. Lit les variables d'environnement via le dashboard. Détecte automatiquement Node.js via Nixpacks.

**Vercel**  déploiement du client React. Le fichier `vercel.json` configure le rewrite SPA (toutes les routes → `index.html`).

**Git + GitHub**  versioning. Le `.gitignore` exclut `node_modules/`, `dist/`, `.env` et tous les fichiers de secrets.

---

## 4. Architecture du Projet

```mermaid
graph TB
    subgraph Internet
        USER[👤 Utilisateur<br/>Navigateur]
    end

    subgraph Vercel["☁️ Vercel (Frontend)"]
        CLIENT[React App<br/>Vite Build]
    end

    subgraph Railway["🚂 Railway (Backend)"]
        SERVER[Express Server<br/>Node.js]
        ROUTES_AUTH["/api/auth"]
        ROUTES_MENU["/api/menu"]
        ROUTES_RES["/api/reservations"]
    end

    subgraph Neon["🐘 Neon (PostgreSQL)"]
        DB[(PostgreSQL<br/>Database)]
        T1[users]
        T2[menu_items]
        T3[reservations]
        T4[user_sessions]
    end

    USER -->|HTTPS requests| CLIENT
    CLIENT -->|fetch /api/*<br/>+ session cookie| SERVER
    SERVER --> ROUTES_AUTH
    SERVER --> ROUTES_MENU
    SERVER --> ROUTES_RES
    ROUTES_AUTH -->|SELECT / INSERT| T1
    ROUTES_AUTH -->|READ / WRITE| T4
    ROUTES_MENU -->|SELECT| T2
    ROUTES_RES -->|INSERT / SELECT| T3
```

---

## 5. Structure des Fichiers

```
savoria/
├── client/                          ← React + Vite + Tailwind
│   ├── src/
│   │   ├── App.jsx                  ← Auth state global + session check
│   │   ├── main.jsx                 ← Point d'entrée React
│   │   ├── index.css                ← Directives Tailwind
│   │   ├── components/
│   │   │   ├── Header.jsx           ← Navbar + Sign In / Sign Out
│   │   │   ├── Hero.jsx             ← Section hero + CTA Member Sign In
│   │   │   ├── About.jsx            ← Philosophie, chef, purveyors
│   │   │   ├── Menu.jsx             ← Fetch /api/menu + filtre catégorie
│   │   │   ├── MenuItem.jsx         ← Carte individuelle (props)
│   │   │   ├── Reservation.jsx      ← Form → POST /api/reservations
│   │   │   ├── GuestStepper.jsx     ← Composant contrôlé +/- invités
│   │   │   ├── AuthModal.jsx        ← Modal signup / login
│   │   │   └── Footer.jsx           ← Horaires, contact, newsletter
│   │   └── data/
│   │       └── menuItems.js         ← Données legacy (conservé, non utilisé)
│   ├── index.html
│   ├── vite.config.js               ← Proxy /api → localhost:3001
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vercel.json                  ← Rewrite SPA pour Vercel
│
├── server/                          ← Express + Postgres
│   ├── index.js                     ← App Express, middlewares, démarrage
│   ├── db.js                        ← Pool pg connecté via DATABASE_URL
│   ├── schema.sql                   ← DDL : CREATE TABLE IF NOT EXISTS
│   ├── seed.js                      ← Peuple menu_items depuis les données
│   ├── routes/
│   │   ├── auth.js                  ← signup, login, logout, /me
│   │   ├── menu.js                  ← GET /api/menu + GET /api/menu/:id
│   │   └── reservations.js          ← POST + GET /mine
│   ├── .env.example                 ← Template variables (sans secrets)
│   ├── railway.toml                 ← Config déploiement Railway
│   └── Procfile                     ← web: node index.js
│
├── package.json                     ← Scripts racine (install:all, dev, seed)
└── .gitignore                       ← Exclut .env, node_modules, dist
```

---

## 6. Schéma de la Base de Données

```mermaid
erDiagram
    users {
        SERIAL id PK
        VARCHAR name
        VARCHAR email UK
        VARCHAR password
        TIMESTAMPTZ created_at
    }

    menu_items {
        SERIAL id PK
        VARCHAR category
        VARCHAR name
        NUMERIC price
        TEXT description
        TEXT_ARRAY tags
        VARCHAR pairing
        BOOLEAN signature
        TIMESTAMPTZ created_at
    }

    reservations {
        SERIAL id PK
        INTEGER user_id FK
        VARCHAR name
        VARCHAR email
        VARCHAR phone
        INTEGER guests
        DATE date
        VARCHAR time_slot
        VARCHAR seating
        TEXT notes
        TIMESTAMPTZ created_at
    }

    user_sessions {
        VARCHAR sid PK
        JSON sess
        TIMESTAMPTZ expire
    }

    users ||--o{ reservations : "place"
    users ||--o{ user_sessions : "has"
```

**Explication des choix :**

- `users.password` → jamais le mot de passe en clair, toujours le hash bcrypt
- `reservations.user_id` → nullable (`ON DELETE SET NULL`) : les invités non connectés peuvent aussi réserver
- `menu_items.tags` → type `TEXT[]` (tableau Postgres) pour stocker `['Vegetarian', 'GF Available']` nativement
- `user_sessions` → créée automatiquement par `connect-pg-simple` au démarrage (`createTableIfMissing: true`)

---

## 7. Flux d'Authentification

```mermaid
sequenceDiagram
    participant B as Navigateur (React)
    participant S as Express Server
    participant DB as PostgreSQL

    Note over B,DB: ── SIGNUP ──────────────────────────
    B->>S: POST /api/auth/signup {name, email, password}
    S->>DB: SELECT id FROM users WHERE email = ?
    DB-->>S: rows[]
    alt email déjà utilisé
        S-->>B: 409 { error: "email exists" }
    else nouveau compte
        S->>S: bcrypt.hash(password, 12)
        S->>DB: INSERT INTO users (name, email, password_hash)
        DB-->>S: { id, name, email }
        S->>S: req.session.userId = id
        S-->>B: 201 { user } + Set-Cookie: session
    end

    Note over B,DB: ── LOGIN ───────────────────────────
    B->>S: POST /api/auth/login {email, password}
    S->>DB: SELECT * FROM users WHERE email = ?
    DB-->>S: user row
    S->>S: bcrypt.compare(password, hash)
    alt mot de passe incorrect
        S-->>B: 401 { error: "invalid credentials" }
    else OK
        S->>S: session.regenerate() → nouveau session ID
        S->>S: req.session.userId = id
        S-->>B: 200 { user } + Set-Cookie: session
    end

    Note over B,DB: ── PAGE REFRESH ────────────────────
    B->>S: GET /api/auth/me (cookie envoyé automatiquement)
    S->>DB: SELECT id, name, email FROM users WHERE id = session.userId
    DB-->>S: user row
    S-->>B: 200 { user }
    B->>B: setUser(user) → header affiche "Welcome, Elena"

    Note over B,DB: ── LOGOUT ──────────────────────────
    B->>S: POST /api/auth/logout
    S->>S: session.destroy()
    S-->>B: 200 + Clear-Cookie
    B->>B: setUser(null) → header affiche "Sign In"
```

---

## 8. Flux des Données  Menu

```mermaid
sequenceDiagram
    participant B as Menu.jsx (React)
    participant S as Express /api/menu
    participant DB as menu_items (Postgres)

    Note over B: Composant monte (useEffect)
    B->>S: GET /api/menu
    S->>DB: SELECT * FROM menu_items ORDER BY id
    DB-->>S: 9 rows
    S-->>B: JSON Array [{id, category, name, price, ...}]
    B->>B: setMenuItems(data) → rendu des cartes

    Note over B: Utilisateur clique "Starters"
    B->>S: GET /api/menu?category=starters
    S->>DB: SELECT * FROM menu_items WHERE category = 'starters'
    DB-->>S: 3 rows
    S-->>B: JSON Array (3 items)
    B->>B: setMenuItems(data) → re-rendu filtré
```

---

## 9. Flux des Réservations

```mermaid
sequenceDiagram
    participant B as Reservation.jsx
    participant S as Express /api/reservations
    participant DB as reservations (Postgres)

    B->>B: Utilisateur remplit le formulaire
    B->>S: POST /api/reservations<br/>{name, email, phone, guests, date, ...}<br/>+ cookie session (si connecté)
    S->>S: Valider les champs requis
    S->>S: userId = req.session.userId || null
    S->>DB: INSERT INTO reservations (...)<br/>RETURNING id, name, date
    DB-->>S: { id: 1, name: "Elena", date: "2026-11-15" }
    S-->>B: 201 { message, reservation }
    B->>B: setSubmitted(true) → affiche confirmation

    Note over B,DB: ── Voir ses réservations ────────────
    B->>S: GET /api/reservations/mine<br/>(cookie session requis)
    alt non connecté
        S-->>B: 401 { error: "must be logged in" }
    else connecté
        S->>DB: SELECT * FROM reservations<br/>WHERE user_id = session.userId
        DB-->>S: rows[]
        S-->>B: 200 JSON Array
    end
```

---

## 10. API Reference

### Auth

| Méthode | Route | Body | Réponse |
|---|---|---|---|
| `POST` | `/api/auth/signup` | `{ name, email, password }` | `201 { user }` |
| `POST` | `/api/auth/login` | `{ email, password }` | `200 { user }` |
| `POST` | `/api/auth/logout` |  | `200 { message }` |
| `GET` | `/api/auth/me` |  (cookie) | `200 { user }` ou `401` |

### Menu

| Méthode | Route | Query | Réponse |
|---|---|---|---|
| `GET` | `/api/menu` | `?category=starters\|mains\|desserts` | `200 [menu_items]` |
| `GET` | `/api/menu/:id` |  | `200 menu_item` ou `404` |

### Reservations

| Méthode | Route | Body | Auth | Réponse |
|---|---|---|---|---|
| `POST` | `/api/reservations` | `{ name, email, phone, guests, date, ... }` | Optionnel | `201 { reservation }` |
| `GET` | `/api/reservations/mine` |  | Requis | `200 [reservations]` |

### Health

| Méthode | Route | Réponse |
|---|---|---|
| `GET` | `/api/health` | `200 { status: "ok", timestamp }` |

---

## 11. Variables d'Environnement

Fichier `server/.env` (ne jamais committer) :

```env
# Neon Postgres  copier depuis le dashboard Neon
DATABASE_URL=postgres://user:password@host/dbname?sslmode=require

# Secret session  chaîne longue et aléatoire
SESSION_SECRET=remplacer_par_une_vraie_chaine_secrete

# Port Express
PORT=3001

# URL du client React (Vercel en production)
CLIENT_ORIGIN=http://localhost:5173
```

Le fichier `server/.env.example` est committé comme template sans valeurs réelles.

---

## 12. Lancer le Projet en Local

### Prérequis

- Node.js 18+
- Un compte [Neon](https://neon.tech) avec une base créée

### Installation

```bash
# Installer les dépendances client et server
npm run install:all

# Ou séparément :
npm install --prefix client
npm install --prefix server
```

### Configuration

```bash
# Créer le .env depuis le template
cp server/.env.example server/.env

# Éditer server/.env avec tes vraies valeurs :
# DATABASE_URL=postgres://...
# SESSION_SECRET=une_longue_chaine_aleatoire
```

### Peupler la base

```bash
# Lance le seed (crée les tables + insère les 9 plats)
npm run seed
# ou : node server/seed.js
```

### Démarrer

```bash
# Terminal 1  serveur Express (port 3001)
npm run dev:server

# Terminal 2  client React (port 5173)
npm run dev:client
```

Ouvrir [http://localhost:5173](http://localhost:5173)

> Le proxy Vite redirige automatiquement les appels `/api/*` vers `localhost:3001`.

---

## 13. Déploiement

```mermaid
graph LR
    subgraph GitHub
        REPO[restaurant-fullstack-week3<br/>main branch]
    end

    subgraph Railway["Railway  Backend"]
        direction TB
        RW_BUILD[Nixpacks détecte Node.js]
        RW_ENV[Variables d'env :<br/>DATABASE_URL<br/>SESSION_SECRET<br/>NODE_ENV=production<br/>CLIENT_ORIGIN]
        RW_SERVER[node index.js<br/>:3001]
        RW_BUILD --> RW_ENV --> RW_SERVER
    end

    subgraph Vercel["Vercel  Frontend"]
        direction TB
        VCL_BUILD[vite build → dist/]
        VCL_CONF[vercel.json :<br/>SPA rewrite /*]
        VCL_ENV[Env var :<br/>VITE_API_URL]
        VCL_BUILD --> VCL_CONF
    end

    subgraph Neon["Neon  PostgreSQL"]
        PGDB[(savoria_db)]
    end

    REPO -->|Auto-deploy on push| Railway
    REPO -->|Auto-deploy on push| Vercel
    Railway -->|DATABASE_URL SSL| Neon
    Vercel -->|HTTPS fetch /api| Railway
```

### Étapes Railway (server)

1. Nouveau projet → "Deploy from GitHub repo"
2. Root directory : `server`
3. Ajouter les variables d'environnement dans Railway Dashboard
4. Le déploiement se lance automatiquement

### Étapes Vercel (client)

1. Importer le repo GitHub
2. Root directory : `client`
3. Framework preset : Vite
4. Ajouter `VITE_API_URL=https://ton-backend.railway.app`
5. Déployer

### Après déploiement

Mettre à jour `CLIENT_ORIGIN` sur Railway avec l'URL Vercel finale (ex: `https://savoria.vercel.app`) pour que le CORS autorise les requêtes cross-origin.

---

## Sécurité  Points Clés

| Mesure | Implémentation |
|---|---|
| Mots de passe hashés | `bcrypt.hash(password, 12)`  jamais de plaintext |
| Sessions sécurisées | `httpOnly: true`, `secure: true` en prod, `sameSite: none` cross-origin |
| Session fixation | `req.session.regenerate()` après login |
| Secrets exclus de git | `.env` dans `.gitignore`, `.env.example` sans valeurs |
| SQL injection | Paramètres préparés `$1, $2, ...`  jamais de concaténation string |
| CORS restreint | `origin: CLIENT_ORIGIN`  pas de wildcard `*` en prod |
| Message d'erreur neutre | Login renvoie "Invalid email or password" sans préciser lequel |

---

*Savoria Bistro & Cellar  Practicum Week 3  Full Stack Node.js + React + PostgreSQL*
