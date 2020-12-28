FROM debian:9

RUN apt-get update -yq && apt-get install nginx -yq && rm /var/www/html/index.nginx-debian.html

ADD . /var/www/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]