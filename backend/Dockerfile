FROM node:18

# install dependencies
WORKDIR /app
COPY backend/package*.json ./
RUN npm install

# get the source code
COPY backend /app/

RUN npx tsc

CMD ["node", "build"]
