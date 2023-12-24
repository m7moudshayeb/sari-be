FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV MONGO_URI=process.env.MONGO_URI

CMD [ "npm", "start" ]
