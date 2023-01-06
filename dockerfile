### STAGE 1: Build ###
FROM node:14.13.1-alpine AS build
WORKDIR /app
COPY package.json ./
COPY . .
RUN rm -rf dockerfile .github .git .gitignore README.md
RUN npm install
RUN npm audit fix
CMD ["npm", "run", "dev"]