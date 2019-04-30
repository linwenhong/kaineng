# vending_machine/web
FROM nginx
LABEL maintainer="linwh@suancloud.cn"

RUN rm -rf /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html
