# At Home Remote

Variant of the HomeRemote home automation dashboard, that is only accessible from the local network.

[![Publish to Docker Hub](https://github.com/mdvanes/at-home-remote/actions/workflows/publish.yml/badge.svg?branch=qwik)](https://github.com/mdvanes/at-home-remote/actions/workflows/publish.yml)


## Usage

### With Docker Compose

Create a docker-compose.yml with:

```
services:
  at-home-remote:
    image: ghcr.io/mdvanes/at-home-remote:main
    volumes:
      - ./data:/usr/src/app/data
      - ./.env:/usr/src/app/.env
    restart: unless-stopped
  nginx:
    image: nginx:latest
    ports:
      - 3044:443
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
      - ./auth:/etc/nginx/auth
    restart: unless-stopped 
```

Set up a `.env` file based on the example file in this repo.

Create certs:

```
mkdir -p certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./certs/nginx.key -out ./certs/nginx.crt
```
Create basic authentication user:

```
mkdir -p auth
htpasswd -c ./auth/.htpasswd <USERNAME>
```

Copy nginx.conf from this repo to the dir where the docker-compose.yml is.

start with `docker-compose up -d`

### Build manually

- `npm i`
- `npm run build`
- `npx dotenvx run -- node dist/analog/server/index.mjs`

# Analog App

This project was generated with [Analog](https://analogjs.org), the fullstack meta-framework for Angular.

## Setup

Run `npm install` to install the application dependencies.

## Development

Run `npm start` for a dev server. Navigate to `http://localhost:5173/`. The application automatically reloads if you change any of the source files.

## Build

Run `npm run build` to build the client/server project. The client build artifacts are located in the `dist/analog/public` directory. The server for the API build artifacts are located in the `dist/analog/server` directory.

## Test

Run `npm run test` to run unit tests with [Vitest](https://vitest.dev).

## Community

- Visit and Star the [GitHub Repo](https://github.com/analogjs/analog)
- Join the [Discord](https://chat.analogjs.org)
- Follow us on [Twitter](https://twitter.com/analogjs)
- Become a [Sponsor](https://github.com/sponsors/brandonroberts)

## TODO

- http://localhost:5173/api/v1/hello
- https://hookdeck.com/webhooks/guides/complete-guide-to-webhook-security
  - https -> https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04
  - ?

// NOTE: http://192.168.0.8:3044/api/webhooks/homesec/toggle
