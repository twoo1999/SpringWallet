FROM --platform=linux/arm64 node:18

WORKDIR /src

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "start"]
