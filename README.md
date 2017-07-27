<h1 align="center">
  <br>
  <a href="http://github.com/MallCloud/contracts-api"><img src="https://github.com/MallCloud/contracts-api/blob/master/Logo.png" alt="Markdownify" width="200"></a>
  <br>
  contracts-api
  <br>
</h1>

<h4 align="center">API for communicating with <a href="https://github.com/MallCloud/contracts" target="_blank">Ethereum Contracts</a></h4>


<p align="center">

  <a href="https://codeclimate.com/github/MallCloud/contracts-api">
    <img src="https://codeclimate.com/github/MallCloud/contracts-api/badges/gpa.svg" alt="code climate">
  </a>
  <a href="https://codeclimate.com/github/MallCloud/contracts-api/coverage">
    <img src="https://codeclimate.com/github/MallCloud/contracts-api/badges/coverage.svg" alt="test coverage">
  </a>
  <a href="https://codeclimate.com/github/MallCloud/contracts-api">
    <img src="https://codeclimate.com/github/MallCloud/contracts-api/badges/issue_count.svg" alt="issue count">
  </a>  

</p>


### Prerequisites

* [Docker](https://www.docker.com/community-edition) Community Edition v17 or higher


### Getting Started

Just clone the repo and run `docker-compose up`:

```bash
git clone https://github.com/MallCloud/contracts-api
cd example-api                  # Change current directory to the newly created one
docker-compose up               # Launch Docker containers with the Node.js API app running inside
yarn docker-db-seed             # Seed the database with some test data
```

The API server must become available at [http://localhost:8080/graphql](http://localhost:8080/graphql)
([live demo][demo]).

Once the Docker container named `api` is started, the Docker engine executes `node tools/run.js`
command that installs Node.js dependencies, migrates database schema to the latest version,
compiles Node.js app from source files (see [`src`](./src)) and launches it with "live reload"
on port `8080`.

If you need to manually rollback and re-apply the latest database migration file, run the following:

```bash
yarn docker-db-rollback         # Rollbacks the latest migration
yarn docker-db-migrate          # Migrates database to the latest version (see /migrates folder)
yarn docker-db-seed             # Seeds database with test data (see /seeds folder)
```

In order to open a shell from inside the running "api" container, run:

```bash
docker-compose exec api /bin/sh
```

Similarly, if you need to open a PostgreSQL shell ([psql][psql]), execute this command:

```bash
docker-compose exec db psql <db> -U postgres
```

For the full list of automation scripts available in this project, please reffer to "scripts"
section in the [`package.json`](./package.json) file and the [`tools`](./tools) folder.

### Testing

```bash
yarn lint                       # Find problematic patterns in code
yarn check                      # Check source code for type errors
yarn docker-test                # Run unit tests once inside a Docker container
yarn docker-test-watch          # Run unit tests in watch mode inside a Docker container
```

### Debugging

In order to run the app with [V8 inspector][v8debug] enabled, simply replace `node tools/run.js`
with `node --inspect=0.0.0.0:9229 tools/run.js` in either [`docker-compose.yml`](docker-compose.yml)
file or, even better, in `docker-compose.override.yml`. Then restart the app (`docker-compose up`) and
[attach your debugger][vsdebug] to `127.0.0.1:9230` (see [`.vscode/launch.json`](./vscode/launch.json)).

### Deployment

Customize the deployment script found in `tools/publish.js` if needed. Then whenever you need to
deploy your app to a remote server simply run:

```bash
node tools/publish <host>       # where <host> is the name of your web server (see ~/.ssh/config)
```

### Directory Layout

```bash
.
├── /build/                     # The compiled output (via Babel)
├── /config/                    # Configuration files (for Docker containers etc.)
├── /locales/                   # Localization resources (i18n)
├── /migrations/                # Database schema migrations
├── /seeds/                     # Scripts with reference/sample data
├── /src/                       # Node.js application source files
│   ├── /routes/                # Express routes, e.g. /login/facebook
│   ├── /schema/                # GraphQL schema, types, fields and mutations
│   │   └── /index.js           # Exports GraphQL schema object
│   ├── /app.js                 # Express.js application
│   ├── /db.js                  # Database access and connection pooling (via Knex)
│   ├── /passport.js            # Passport.js authentication strategies
│   ├── /redis.js               # Redis client
│   └── /server.js              # Node.js server (entry point)
├── /test/                      # Unit, integration and load tests
├── /tools/                     # Build automation scripts and utilities
├── docker-compose.yml          # Defines Docker services, networks and volumes
├── docker-compose.override.yml # Overrides per developer environment (not under source control)
├── Dockerfile                  # Commands for building a Docker image for production
└── package.json                # The list of project dependencies
```
