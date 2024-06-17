FROM node:18.13.0 0-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
EXPOSE 5000
CMD ["npm","start"]