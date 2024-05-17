FROM node:20.10.0 as Developpment

WORKDIR /authentification-service

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3005

CMD ["npm", "run", "start:dev"]

