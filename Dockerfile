FROM node:20-alpine

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier Prisma et générer le client
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN npx prisma generate

# Copier tout le reste
COPY . .

# Builder NestJS directement sans prisma generate
RUN npx nest build

EXPOSE 3000

CMD ["node", "dist/main"]
