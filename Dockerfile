FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

RUN npx nest build

CMD ["node", "dist/src/main"]
