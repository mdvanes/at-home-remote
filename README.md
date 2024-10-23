# At Home Remote

Variant of the HomeRemote home automation dashboard, that is only accessible from the local network. Uses Nx, Analog and Angular Material.

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

### With Docker Compose (for Kronaby)

The Kronaby app can't use webhooks with (self signed) https nor with basic authentication. So in that case use:

Create a docker-compose.yml with:

```
services:
  at-home-remote:
    image: ghcr.io/mdvanes/at-home-remote:main
    ports:
      - 3044:3000
    volumes:
      - ./data:/usr/src/app/data
      - ./.env:/usr/src/app/.env
    restart: unless-stopped
```

start with `docker-compose up -d`

### Build manually

- `npm i`
- `npm run build`
- `npx dotenvx run -- node dist/analog/server/index.mjs`


### Start for local development

- Start development server: `npx nx serve at-home-remote`
- Start Storybook: `npx nx storybook components`
- Ng Generate: `npx nx g @angular/material:dashboard dashboard --project at-home-remote` (instead of `ng generate @angular/material:dashboard dashboard`)
- List generators: `npx nx list @nx/angular`
- Generate lib: `npx nx g @nx/angular:lib study --directory=libs/feature/study`
- Generate missing storybook stories: `npx nx g @nx/angular:stories --project=components`
- Adding Matero to the project. Instead of `ng add ng-matero` use `npx nx add ng-matero --project at-home-remote`

---

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/ZnZbFYBosI)


## Run tasks

To run tasks with Nx use:

```sh
npx nx <target> <project-name>
```

For example:

```sh
npx nx build myproject
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

To install a new plugin you can use the `nx add` command. Here's an example of adding the React plugin:
```sh
npx nx add @nx/react
```

Use the plugin's generator to create new projects. For example, to create a new React app or library:

```sh
# Genenerate an app
npx nx g @nx/react:app demo

# Generate a library
npx nx g @nx/react:lib some-lib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
