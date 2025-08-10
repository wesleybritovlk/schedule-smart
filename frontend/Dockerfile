# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG BUILD_CONFIG=production
RUN npm run build -- --configuration=$BUILD_CONFIG

# Stage 2: Final Image
FROM nginx:1.29-alpine
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
LABEL maintainer="Wesley Brito <wesley.brito@evig.com.br>"
EXPOSE 80
LABEL maintainer="Wesley Brito <wesley.brito@evig.com.br>"
CMD ["nginx","-g","daemon off;"]
