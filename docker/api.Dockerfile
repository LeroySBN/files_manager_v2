# Use Node.js 12.22.12 as base image
FROM node:22.14.0

WORKDIR /data/api
COPY ../api/package*.json ./
RUN npm install
COPY ../api/ ./
EXPOSE 5000
CMD ["npm", "run", "start-server"]
