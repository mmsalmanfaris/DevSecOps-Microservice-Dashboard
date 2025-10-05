# Stage 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve with Node.js proxy
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY proxy-server.js ./

COPY --from=build /app/build ./build

EXPOSE 80

CMD ["npm", "run", "serve"]
