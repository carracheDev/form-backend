FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

RUN npx nest build

RUN ls -la dist/

CMD ["node", "dist/main"]
