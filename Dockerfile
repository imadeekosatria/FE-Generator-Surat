FROM oven/bun:alpine AS builder
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install
COPY . .
ARG VITE_API_USERNAME
ARG VITE_API_PASSWORD
ENV VITE_API_USERNAME=$VITE_API_USERNAME
ENV VITE_API_PASSWORD=$VITE_API_PASSWORD
RUN bun run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
