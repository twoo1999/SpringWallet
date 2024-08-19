FROM arm64v8/node:alpine

WORKDIR /src

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "start"]
