FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY .env.example .env
RUN npm install
COPY src ./src
RUN npm run build
EXPOSE 3002
CMD ["node", "dist/main.js"]
