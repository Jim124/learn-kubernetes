FROM node:22-alpine3.20
WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .
CMD [ "npm","start" ]