FROM node:20

WORKDIR /app

RUN apt install -y gcc make libpng-dev

COPY ./entrypoint.sh /tmp/entrypoint.sh

RUN chmod +x /tmp/entrypoint.sh

ENTRYPOINT ["/tmp/entrypoint.sh"]
