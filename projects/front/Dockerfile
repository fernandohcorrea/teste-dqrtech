FROM node:18.16.0-alpine3.18

ARG DK_UID=1000

ARG DK_GID=1000

ARG DK_ENVIRONMENT='develop'

ENV NODE_ENV=${DK_ENVIRONMENT}

RUN apk --no-cache add shadow && \
  usermod -u ${DK_UID:-1000} node && \
  groupmod -g ${DK_GID:-1000} node

USER node

RUN mkdir /home/node/project

WORKDIR /home/node/project
