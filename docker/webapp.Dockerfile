# Stage 1: Build the React App
FROM node:22.14.0 AS build

WORKDIR /data/www
COPY ../webapp/package*.json ./
RUN npm install
COPY ../webapp/ ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

COPY /configs/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /data/www/dist/ /data/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
