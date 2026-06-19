# Tests Login/Register - ChaiseHub API

## 🚀 Exécuter les tests automatisés

```bash
# Tout les tests E2E
npm run test:e2e

# Seulement les tests des comptes
npm run test:e2e -- account.e2e-spec
```

---

## 🧪 Tests cURL - Login

### ✅ Cas 1 : Login réussi (Alice)

```bash
curl -X POST http://localhost:3000/accounts/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@demo.com",
    "passwordHash": "alice123"
  }'
```

**Réponse attendue (200 OK):**

```json
{
  "id": 2,
  "username": "alice",
  "email": "alice@demo.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

---

### ✅ Cas 2 : Login réussi (Admin)

```bash
curl -X POST http://localhost:3000/accounts/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.admin",
    "passwordHash": "admin"
  }'
```

**Réponse attendue (200 OK):**

```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@admin.admin",
  "role": "admin",
  "isActive": true,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

---

### ❌ Cas 3 : Login échoué - Email incorrect

```bash
curl -X POST http://localhost:3000/accounts/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@demo.com",
    "passwordHash": "password123"
  }'
```

**Réponse attendue (400 Bad Request):**

```json
{
  "message": "Email ou mot de passe incorrect",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### ❌ Cas 4 : Login échoué - Mauvais mot de passe

```bash
curl -X POST http://localhost:3000/accounts/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@demo.com",
    "passwordHash": "wrongpassword"
  }'
```

**Réponse attendue (400 Bad Request):**

```json
{
  "message": "Email ou mot de passe incorrect",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 🧪 Tests cURL - Register

### ✅ Cas 1 : Inscription réussie

```bash
curl -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nouveau_user",
    "email": "nouveau@demo.com",
    "passwordHash": "password123",
    "role": "user",
    "isActive": true
  }'
```

**Réponse attendue (201 Created):**

```json
{
  "id": 10,
  "username": "nouveau_user",
  "email": "nouveau@demo.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

---

### ❌ Cas 2 : Inscription échouée - Email en doublon

```bash
curl -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user_random",
    "email": "alice@demo.com",
    "passwordHash": "password123",
    "role": "user",
    "isActive": true
  }'
```

**Réponse attendue (400 Bad Request):**

```json
{
  "message": "Cet email est déjà utilisé",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### ❌ Cas 3 : Inscription échouée - Username en doublon

```bash
curl -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "email": "alice_new@demo.com",
    "passwordHash": "password123",
    "role": "user",
    "isActive": true
  }'
```

**Réponse attendue (400 Bad Request):**

```json
{
  "message": "Ce nom d'utilisateur est déjà utilisé",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 📋 Comptes par défaut pour test

| Username | Email             | Mot de passe | Rôle  |
| -------- | ----------------- | ------------ | ----- |
| admin    | admin@admin.admin | admin        | admin |
| alice    | alice@demo.com    | alice123     | user  |
| baptiste | baptiste@demo.com | baptiste123  | user  |
| camille  | camille@demo.com  | camille123   | user  |
| dylan    | dylan@demo.com    | dylan123     | user  |

---

## 🔍 Validations

### Login (POST /accounts/login)

- ✅ Email valide requis
- ✅ Mot de passe requis
- ✅ Vérification email + mot de passe
- ✅ Le mot de passe n'est PAS retourné

### Register (POST /accounts)

- ✅ Username unique requis
- ✅ Email unique requis
- ✅ Mot de passe requis
- ✅ Gestion des doublons (email/username)
- ✅ Le mot de passe n'est PAS retourné

### Get By ID (GET /accounts/:id)

- ✅ ID doit être un entier positif
- ✅ Validation NaN
- ✅ Retour 404 si compte n'existe pas
