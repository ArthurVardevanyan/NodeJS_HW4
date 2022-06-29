FROM registry.access.redhat.com/ubi9/nodejs-16:1-44

# Create app directory
WORKDIR /opt/app-root/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]