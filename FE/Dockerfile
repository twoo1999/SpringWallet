FROM node:18-alpine

WORKDIR /src

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "start"]
