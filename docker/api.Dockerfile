# Use Node.js 12.22.12 as base image
FROM node:22.14.0

# Set the working directory inside the container
WORKDIR /data/api

# Copy package.json and package-lock.json first (for better caching)
COPY ../api/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY ../api/ ./

# Expose the application port (Change if needed)
#EXPOSE ${API_PORT}

# Start the server
CMD ["npm", "run", "start-server"]