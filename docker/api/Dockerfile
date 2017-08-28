FROM kriasoft/node-ci:8.4.0-alpine

EXPOSE 8080

RUN apk add --update alpine-sdk

ADD start-up.sh /start-up.sh

USER node

WORKDIR /usr/src/app
