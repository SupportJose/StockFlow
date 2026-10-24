FROM node:24.7-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_BASE_PATH=/
ENV VITE_BASE_PATH=${VITE_BASE_PATH}
RUN npm run build

FROM nginx:1.28-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 10000
