# Schritt 1: Definieren des Basis-Images mit Node.js 20
FROM node:20.10.0

# Arbeitsverzeichnis im Container festlegen
WORKDIR ./my-react-ts-app

RUN ls -la
# Kopieren der package.json und package-lock.json (oder yarn.lock)
COPY package*.json ./

COPY tsconfig.json ./
# Alternativ, wenn Sie Yarn verwenden: COPY package.json yarn.lock ./

# Installieren von Abhängigkeiten
RUN npm install

COPY . .

# TypeScript-Compiler ausführen, um das Projekt zu bauen
RUN npm run build
# Für Yarn: RUN yarn build

EXPOSE 80

# Starten der Anwendung
CMD ["npm", "run", "preview", "--", "--host", "--port", "80"]
# Für Yarn: CMD ["yarn", "start"]
