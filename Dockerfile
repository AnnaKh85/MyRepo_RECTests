# This Docker file is for building this project on Codeship Pro
# https://documentation.codeship.com/pro/languages-frameworks/nodejs/

FROM cypress/base:18.16.1
RUN node --version
RUN npm --version
WORKDIR /home/node/app
COPY package.json package-lock.json ./
COPY app ./app
COPY serve.json ./
COPY scripts ./scripts
COPY cypress.config.js cypress ./
COPY cypress ./cypress

ENV CI=1

RUN npm ci
RUN npm run cy:run:qa:run