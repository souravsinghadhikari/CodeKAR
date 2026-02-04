FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

# NO EXPOSE
# NO HTTP

CMD ["node", "slave/index.js"]
