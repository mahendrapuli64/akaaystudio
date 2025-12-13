# # Step 1: Use Node to build the React app
# FROM node:24-alpine AS build

# # Set working directory inside the container
# WORKDIR /app

# # Copy dependency files first for better caching
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the app source code
# COPY . .

# # Build the React app for production
# RUN npm run build

# # Step 2: Serve the app with Nginx
# FROM nginx:alpine

# # Copy build output from Node to Nginx's default HTML directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Step 1: Build React app
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
