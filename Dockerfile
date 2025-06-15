# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application
COPY . .

# App will run on port 3000
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]

