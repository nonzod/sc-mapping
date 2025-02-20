FROM node:22.9.0

WORKDIR /app

COPY .output/ .

EXPOSE 3000

CMD [ "node", "/app/server/index.mjs" ]