FROM node:18 AS builder
WORKDIR /application-web
COPY package*.json ./
COPY tsconfig.json ./
COPY webpack.config.js ./
RUN npm install
COPY src ./src
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /application-web/dist /usr/share/nginx/html

EXPOSE 80
