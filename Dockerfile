# FROM node:buster AS builder
FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 

COPY . ./
RUN npm run build

EXPOSE 8000

CMD [ "npm", "run", "start" ]

# FROM nginx:1.19.0
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/dist .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]