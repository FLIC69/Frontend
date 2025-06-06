###########
# Stage 1: Build Vite
###########
FROM node:18-alpine AS builder
WORKDIR /app

# 1. Copy package files & install dependencies
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then npm install -g yarn && yarn install; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  else npm install; \
  fi

# 2. Copy the rest of your source and build
COPY . .
RUN npm run build
# (or `yarn build` / `pnpm run build` if you use those)

###########
# Stage 2: nginx HTTPS only
###########
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# 1. Remove default HTML to make space
RUN rm -rf ./*

# 2. Copy the compiled Vite bundle
COPY --from=builder /app/dist /usr/share/nginx/html

# 3. Copy our custom nginx.conf (with only port 443)
COPY nginx.conf /etc/nginx/nginx.conf

# 4. Expose only port 443
EXPOSE 8443

# 5. Start nginx (foreground)
CMD ["nginx", "-g", "daemon off;"]
