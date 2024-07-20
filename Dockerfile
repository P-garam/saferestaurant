# Use the official Node.js image.
FROM node:20

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json first.
COPY server/package.json ./server/package.json
COPY server/package-lock.json ./server/package-lock.json

# Install dependencies.
RUN cd server && npm install

# Copy the rest of the application code.
COPY server/ ./server/
COPY frontend/ ./frontend/

# Set environment variables (if any).
ENV NODE_ENV=production

# Expose the port the app runs on.
EXPOSE 3003

# Run the server.
CMD ["node", "server/server.js"]
