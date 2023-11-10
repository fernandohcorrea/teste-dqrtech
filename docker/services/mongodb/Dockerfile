FROM mongo:7.0-rc-jammy

ARG DK_UID=1000

ARG DK_GID=1000

USER root

RUN usermod -u ${DK_UID:-1000} mongodb && \
  groupmod -g ${DK_GID:-1000} mongodb

USER mongodb
