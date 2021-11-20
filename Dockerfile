FROM node:14-alpine

RUN apk add dumb-init

RUN apk --no-cache add curl

WORKDIR /srv

COPY COPY --chown=node:node package.json /
COPY COPY --chown=node:node package-lock.json /

RUN npm ci

COPY COPY --chown=node:node . /

USER node

ENTRYPOINT [ "dumb-init",  "node", "./src/index" ]
