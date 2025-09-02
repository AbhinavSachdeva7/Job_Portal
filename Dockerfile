# ---- Base Stage ----
# Start with a specific Node.js version
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# ---- Builder Stage ----
# This stage installs all dependencies and builds the TypeScript
FROM base AS builder
COPY package*.json ./
RUN npm install
COPY . .
# Generate Prisma Client
RUN npx prisma generate
# Build TypeScript to JavaScript
RUN npm run build

# ---- Production Stage ----
# This stage creates the final, small, secure image
FROM base AS production
# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
# Install *only* production dependencies
RUN npm install --only=production
# Copy the built code and Prisma schema
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/schema.prisma ./
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/.env ./
COPY --from=builder /usr/src/app/public ./public

# Expose port (add this before CMD)
EXPOSE 3000
# The command to start the application
CMD ["node", "dist/index.js"]



# Jenkins initial setup is required. An admin user has been created and a password generated.
# Please use the following password to proceed to installation:

# ed5768e1a8a746f58f105566196ed867

# This may also be found at: /var/jenkins_home/secrets/initialAdminPassword