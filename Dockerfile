FROM node:20-alpine3.18 as build

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

FROM node:20-alpine3.18 as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "npx", "dotenvx", "run", "--", "node", "dist/analog/server/index.mjs"]