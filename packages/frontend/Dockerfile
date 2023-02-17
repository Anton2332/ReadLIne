FROM node:buster as dependencies
WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./tsconfig.json
COPY src ./src
COPY public ./public
COPY .env ./
COPY check-env.js ./check-env.js


RUN yarn install --frozen-lockfile

FROM node:buster as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE $PORT
CMD ["yarn", "start"]