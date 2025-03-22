# Use Node.js LTS as base image
FROM node:20-alpine

# Set working directory
WORKDIR /data/api

# Create necessary directories with correct permissions
RUN mkdir -p /data/storage /data/api/node_modules && \
    chown -R node:node /data/storage /data/api

# Switch to non-root user
USER node

# Copy package files with correct ownership
COPY --chown=node:node api/package*.json ./

# Install dependencies
RUN npm install

# Copy application code with correct ownership
COPY --chown=node:node api/ ./

# Expose API port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start-server"]
