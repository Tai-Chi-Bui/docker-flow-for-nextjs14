# Base stage
FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

########## Development stage
FROM base AS development

# Set environment variable
ENV NODE_ENV development

# This EXPOSE is entirely for documentation purposes. This doesn't actually force the PORT to be 3000.
EXPOSE $PORT

CMD ["npm", "run", "dev"]

########## Production stage
FROM base AS production

# Set environment variable
ENV NODE_ENV production

# Install only production dependencies
RUN npm ci --only=production

# Build the Next.js application
RUN npm run build

# Production image
FROM node:18-alpine AS production-image

WORKDIR /app

# Copy only the necessary files from the production stage
COPY --from=production /app/package*.json ./
COPY --from=production /app/.next ./.next
COPY --from=production /app/public ./public
COPY --from=production /app/node_modules ./node_modules

# Set environment variable
ENV NODE_ENV production

# This EXPOSE is entirely for documentation purposes. This doesn't actually force the PORT to be 3000.
EXPOSE $PORT

CMD ["npm", "start"]
