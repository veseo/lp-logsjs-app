FROM node:16-slim

WORKDIR /files

ADD . .
RUN npm ci

EXPOSE 8080
CMD ["npm", "start"]
