# Stage 1: Build the React App
FROM node:22-alpine AS build

WORKDIR /usr/src/app
COPY webApp/package*.json ./
RUN npm install
COPY webApp/ ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY docker/configs/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
