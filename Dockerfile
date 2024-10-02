
FROM node:20.10.0

WORKDIR azureappservice.nicofilips/my-react-ts-app

RUN ls -la

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
