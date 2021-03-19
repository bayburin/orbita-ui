FROM docker-hub.iss-reshetnev.ru/registry/frameworks/js/angular/angular-dev:10-alpine

RUN apk update && apk add bash

RUN mkdir -p /app
WORKDIR /app

RUN mkdir /tls
COPY .docker/tls/ /tls/

EXPOSE 4200

STOPSIGNAL SIGTERM
