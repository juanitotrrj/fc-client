FROM nginx:alpine

RUN apk update && apk add supervisor openssh git nodejs npm

WORKDIR /

RUN git clone https://github.com/juanitotrrj/fc-client.git app

WORKDIR /app

RUN npm install --dev

RUN npm run-script build

RUN apk --no-cache add shadow

COPY build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY site.conf /etc/nginx/conf.d/default.conf

# Change nginx user to match the host system UID and GID and chown www directory
RUN usermod --non-unique --uid 1000 nginx && \
    groupmod --non-unique --gid 1000 nginx && \
    chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
