
# Guide de Déploiement - TradConnect

Ce document détaille les étapes pour déployer la plateforme TradConnect sur différents environnements.

## 📦 Prérequis

- Node.js 18+
- npm ou yarn
- Git
- Compte GitHub
- Compte sur une plateforme de déploiement (Vercel, Netlify, ou similaire)

## 🚀 Déploiement sur Vercel (Recommandé)

### Étape 1: Préparation du code
```bash
# Cloner le repository
git clone <votre-repo-url>
cd tradconnect-platform

# Installer les dépendances
npm install

# Tester le build local
npm run build
```

### Étape 2: Configuration Vercel
1. Connectez-vous à [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configuration automatique détectée (Vite)
5. Cliquez sur "Deploy"

### Étape 3: Variables d'environnement
```bash
# Dans le dashboard Vercel, ajoutez ces variables :
VITE_API_URL=https://api.tradconnect.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_GOOGLE_CLIENT_ID=...
VITE_FACEBOOK_APP_ID=...
```

## 🌐 Déploiement sur Netlify

### Méthode 1: Déploiement automatique via Git
1. Connectez-vous à [netlify.com](https://netlify.com)
2. "New site from Git" → Sélectionnez votre repository
3. Configuration :
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Déployez

### Méthode 2: Déploiement manuel
```bash
# Build local
npm run build

# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déployer
netlify deploy --prod --dir=dist
```

## ☁️ Déploiement sur AWS S3 + CloudFront

### Étape 1: Build et préparation
```bash
npm run build
```

### Étape 2: Configuration S3
```bash
# Installer AWS CLI
npm install -g aws-cli

# Configurer AWS
aws configure

# Créer un bucket
aws s3 mb s3://tradconnect-app

# Upload des fichiers
aws s3 sync dist/ s3://tradconnect-app --delete
```

### Étape 3: Configuration CloudFront
1. Créer une distribution CloudFront
2. Origin : votre bucket S3
3. Behavior : Redirect HTTP to HTTPS
4. Error Pages : 404 → /index.html (pour SPA)

## 🐳 Déploiement avec Docker

### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Nginx pour servir les fichiers statiques
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Docker Compose
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://localhost:3000
    depends_on:
      - backend

  backend:
    image: tradconnect-api:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://...
```

## 📱 Configuration du Domaine Personnalisé

### DNS Configuration
```
Type    Name    Value                           TTL
A       @       192.168.1.1                    300
CNAME   www     tradconnect.vercel.app         300
CNAME   api     api.tradconnect.herokuapp.com  300
```

### SSL/TLS
- Vercel/Netlify : SSL automatique avec Let's Encrypt
- AWS : Utilisez AWS Certificate Manager
- Autres : Configurez Let's Encrypt ou certificat commercial

## 🔧 Variables d'Environnement

### Development (.env.local)
```env
VITE_API_URL=http://localhost:3000
VITE_APP_ENV=development
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_GOOGLE_CLIENT_ID=...
VITE_FACEBOOK_APP_ID=...
```

### Production (.env.production)
```env
VITE_API_URL=https://api.tradconnect.com
VITE_APP_ENV=production
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_GOOGLE_CLIENT_ID=...
VITE_FACEBOOK_APP_ID=...
```

## 📊 Monitoring et Analytics

### Intégration Google Analytics
```typescript
// src/lib/analytics.ts
import { gtag } from 'ga-gtag';

export const trackEvent = (action: string, category: string, label?: string) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
  });
};
```

### Sentry pour le monitoring d'erreurs
```bash
npm install @sentry/react

# Dans main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.VITE_APP_ENV,
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions (.github/workflows/deploy.yml)
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.API_URL }}
        VITE_STRIPE_PUBLIC_KEY: ${{ secrets.STRIPE_PUBLIC_KEY }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🔐 Sécurité

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.tradconnect.com;
  font-src 'self';
">
```

### Headers de sécurité
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 📋 Checklist de Déploiement

- [ ] Tests passés en local
- [ ] Build de production fonctionne
- [ ] Variables d'environnement configurées
- [ ] Domaine configuré
- [ ] SSL/TLS activé
- [ ] Analytics configuré
- [ ] Monitoring d'erreurs activé
- [ ] Sauvegarde automatique configurée
- [ ] Performance optimisée (Lighthouse score > 90)
- [ ] SEO configuré (meta tags, sitemap)
- [ ] Politique de confidentialité et CGU ajoutées

## 🆘 Dépannage

### Problèmes courants

1. **Build qui échoue** : Vérifiez les versions Node.js et les dépendances
2. **Variables d'environnement** : Préfixez avec `VITE_` pour Vite
3. **Routage SPA** : Configurez les redirections vers index.html
4. **Performance** : Activez la compression gzip/brotli
5. **CORS** : Configurez les en-têtes CORS côté API

### Commandes utiles
```bash
# Analyser la taille du bundle
npm run build && npx vite-bundle-analyzer dist

# Tester la performance
npm install -g lighthouse
lighthouse https://tradconnect.com --view

# Vérifier les liens cassés
npm install -g broken-link-checker
blc https://tradconnect.com -ro
```

---

Pour toute assistance : **deployment@tradconnect.com**
