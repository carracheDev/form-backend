FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances et le schéma Prisma
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances (sans postinstall pour éviter l'erreur prisma)
RUN npm install --ignore-scripts

# Générer le client Prisma
RUN npx prisma generate

# Copier tout le reste
COPY . .

# Compiler TypeScript → dist/
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]
