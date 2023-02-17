# build backend
FROM node:buster AS build

WORKDIR /app

COPY package.json  ./

RUN yarn install --frozen-lockfile

COPY nest-cli.json ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
COPY .env ./.env
COPY check-env.js ./check-env.js

RUN yarn prisma generate
RUN yarn run build

# run backend
FROM node:buster AS run

WORKDIR /app

COPY package.json ./
COPY .env ./
COPY check-env.js ./check-env.js

RUN yarn install --frozen-lockfile --production=true

COPY --from=build /app/dist ./dist

CMD ["node", "--enable-source-maps", "dist/main.js"]