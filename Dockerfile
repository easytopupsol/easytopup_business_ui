# syntax=docker/dockerfile:1
# Production multi-stage Next.js 16 / Node 22 build.
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
# A lockfile can be added later; npm ci is used automatically when present.
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi
# Confirm font CSS is actually present so missing install is caught here, not by next build.
RUN for weight in 400 500 600 700 800 900; do \
      test -f "node_modules/@fontsource/poppins/${weight}.css" || exit 1; \
    done

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* variables are compiled into the browser bundle during next build.
ARG NEXT_PUBLIC_SITE_URL=https://easytopup.shop
ARG NEXT_PUBLIC_CUSTOMER_URL=https://easytopup.shop/customer
ARG NEXT_PUBLIC_AGENT_URL=https://easytopup.shop/agent
ARG NEXT_PUBLIC_DEALER_URL=https://easytopup.shop/dealer
ARG NEXT_PUBLIC_WHATSAPP_NUMBER=6597835517
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_CUSTOMER_URL=${NEXT_PUBLIC_CUSTOMER_URL} \
    NEXT_PUBLIC_AGENT_URL=${NEXT_PUBLIC_AGENT_URL} \
    NEXT_PUBLIC_DEALER_URL=${NEXT_PUBLIC_DEALER_URL} \
    NEXT_PUBLIC_WHATSAPP_NUMBER=${NEXT_PUBLIC_WHATSAPP_NUMBER}
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nextjs && \
    adduser --system --uid 1001 --ingroup nextjs nextjs
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
