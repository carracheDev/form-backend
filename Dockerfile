FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer TOUTES les dépendances (y compris devDependencies)
RUN npm install

# Copier le schéma Prisma
COPY prisma ./prisma/

# Générer le client Prisma
RUN npx prisma generate

# Copier tout le reste
COPY . .

# Compiler TypeScript → dist/
RUN npm run build

# Vérifier que dist/main.js existe
RUN ls -la dist/

EXPOSE 3001

CMD ["node", "dist/main"]
