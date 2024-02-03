# Schritt 1: Definieren des Basis-Images mit Node.js 20
FROM node:20

# Arbeitsverzeichnis im Container festlegen
WORKDIR /my-react-ts-app

# Kopieren der package.json und package-lock.json (oder yarn.lock)
COPY package*.json ./
# Alternativ, wenn Sie Yarn verwenden: COPY package.json yarn.lock ./

# Installieren von Abhängigkeiten
RUN npm install

COPY . .

# TypeScript-Compiler ausführen, um das Projekt zu bauen
RUN npm run build
# Für Yarn: RUN yarn build

# Exponieren des Ports, auf dem die App läuft (angepasst an Ihren Bedarf)
EXPOSE 3000

# Starten der Anwendung
CMD ["npm", "start"]
# Für Yarn: CMD ["yarn", "start"]
