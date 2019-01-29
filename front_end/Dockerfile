FROM node:10.15.0-alpine

RUN npm install -g http-server

WORKDIR /app/cuidas-frontend

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]