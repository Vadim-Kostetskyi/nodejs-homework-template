FROM node

WORKDIR /app

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/app.js"]
