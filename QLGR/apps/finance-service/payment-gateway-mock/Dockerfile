FROM node:20-alpine
WORKDIR /app
COPY server.js .
RUN npm install express body-parser
EXPOSE 8080
CMD ["node", "server.js"]
