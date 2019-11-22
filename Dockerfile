FROM node:12.13.0-alpine

ARG environment
ENV environment=${environment}
ENV PORT=8000
#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN apk update && apk upgrade && \
  # echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
  # echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
  npm set progress=false && npm config set depth 0 && \
  npm i --only=production && npm cache clean --force && \
  npm install node-sass

COPY . .

RUN apk --no-cache add curl
EXPOSE 8000
CMD [ "npm", "run", "start" ]