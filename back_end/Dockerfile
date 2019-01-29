FROM node:10.15.0-alpine

WORKDIR /app/cuidas-backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD [ "npm", "start" ]