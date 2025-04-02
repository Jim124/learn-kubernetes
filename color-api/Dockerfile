FROM node:22-alpine3.20

COPY package*.json .

RUN npm ci

COPY . .
CMD [ "npm","start" ]