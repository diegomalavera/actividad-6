FROM node:18 AS builder
WORKDIR /application-api
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY src ./src
RUN npm run build

FROM node:18-slim
WORKDIR /application-api
COPY --from=builder /application-api/dist ./dist
COPY --from=builder /application-api/node_modules ./node_modules
COPY --from=builder /application-api/package*.json ./

EXPOSE 3000

CMD ["node", "dist/index.js"]
