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

ENV API_MEETING_URL="adminmeeting-ms"
ENV API_MEETING_PORT=4000

ENV API_ADMINUSER_URL="adminuser-ms"
ENV API_ADMINUSER_PORT=4040

CMD [ "npm", "run", "start" ]
