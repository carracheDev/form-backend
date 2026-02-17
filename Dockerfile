FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci --ignore-scripts

RUN npx prisma generate

COPY . .

RUN npx nest build

EXPOSE 3000

CMD ["node", "dist/main"]
