FROM node:16.5.0-alpine

# Create app directory
WORKDIR /unalmeet-gateway

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

ENV SHOW_ULRS=true
ENV PORT=3000

ENV API_TRANSMISSION_URL="transmission_ms"
ENV API_TRANSMISSION_PORT=8000

CMD [ "npm", "run", "start" ]