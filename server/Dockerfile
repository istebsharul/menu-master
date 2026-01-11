##################################
# Base
##################################
FROM node:20-alpine AS base

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./

##################################
# Dependencies
##################################
FROM base AS deps
RUN npm ci

##################################
# Development
##################################
FROM deps AS dev

ENV NODE_ENV=development

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]

##################################
# Production
##################################
FROM base AS prod

RUN npm ci --omit=dev

COPY . .

# Security: non-root user
RUN addgroup -S app && adduser -S app -G app \
    && chown -R app:app /app

USER app

EXPOSE 5000

CMD ["node", "src/index.js"]
