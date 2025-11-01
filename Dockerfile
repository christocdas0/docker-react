# Build stage
# Use Node.js Alpine-based image for a smaller footprint
FROM node:alpine as builder

# Set the working directory in the container
WORKDIR '/frontend'

# Copy package.json first to leverage Docker cache
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Production stage
# Use nginx as the production server
FROM nginx

# Copy the build output from builder stage to nginx's serve folder
COPY --from=builder /frontend/build /usr/share/nginx/html

# Expose port 80 for HTTP traffic (nginx's default port)
EXPOSE 80