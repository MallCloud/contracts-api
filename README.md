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
  <a href="https://travis-ci.org/MallCloud/contracts-api"
    <img src="https://travis-ci.org/MallCloud/contracts-api.svg?branch=master" alt="build">
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

### Contract Deployment

Docker based setup sets up private ethereum nodes that can be used in order to deploy smart contracts. The following instructions can be used in order to perform the deployment :

There are 3 separate consoles that need to be opened with separate instructions put into them. They are mentioned here as Console 1, Console 2 & Console 3

1. **[Console 1]** In the `contracts-api` repository, run `docker-compose up`.
2. **[Console 2]** Run `docker exec -it bootstrap geth attach ipc://root/.ethereum/devchain/geth.ipc`.
3. **[Console 2]** A wallet(ethereum account) needs to be used in this step. An already available account may be used here or a separate account may be created.

    When a new account is created (for ease; use Metamask), the following steps need to be taken :
    1. Keep the account address and private key at hand.
    2. **[Console 2]** In console, run `web3.personal.importRawKey("<Private Key>","<New Password>")`.
    This will add your account into the private node.

4. **[Console 2]** After an account is setup, it needs to be unlocked. Run `web3.personal.unlockAccount(<account_address>, <password>, <timeduration>)`. For time duration, you may use any arbitrary number (I use 1500000000).
5. **[Console 2]** Run `miner.setEtherbase(<account_address>)`.
6. **[Console 2]** Run `miner.start()`.
After the mining process starts, this kind of logs can be seen on the console :
```
eth_1        | INFO [09-01|19:51:53] Generating DAG in progress               epoch=0 percentage=1 elapsed=1m49.014s
```
You will need to wait until it becomes `percentage=100` before running further commands.

7. In `contracts-api/truffle.js`, in networks.development.from, replace the address with your <account_address>.
8. **[Console 3]** In `contracts-api` directory, run `truffle compile --all`.
9. **[Console 3]** Run `truffle migrate`.

Now the contracts have been successfully deployed to ethereum nodes. Hurray!!

### Known Problem

There might be such errors coming up on running `docker-compose up` :
```
api_1        | Error: Cannot find module './build/Release/scrypt'
api_1        |     at Function.Module._resolveFilename (module.js:489:15)
api_1        |     at Function.Module._load (module.js:439:25)
api_1        |     at Module.require (module.js:517:17)
api_1        |     at require (internal/module.js:11:18)
api_1        |     at Object.<anonymous> (/usr/src/app/node_modules/scrypt/index.js:3:20)
api_1        |     at Module._compile (module.js:573:30)
api_1        |     at Module._extensions..js (module.js:584:10)
api_1        |     at Object.require.extensions.(anonymous function) [as .js] (/usr/src/app/node_modules/babel-register/lib/node.js:152:7)
api_1        |     at Module.load (module.js:507:32)
api_1        |     at tryModuleLoad (module.js:470:12)
api_1        |     at Function.Module._load (module.js:462:3)
api_1        |     at Module.require (module.js:517:17)
api_1        |     at require (internal/module.js:11:18)
api_1        |     at Object.<anonymous> (/usr/src/app/node_modules/scrypt.js/node.js:1:14)
api_1        |     at Module._compile (module.js:573:30)
api_1        |     at Module._extensions..js (module.js:584:10)
```

In order to remove such errors, follow these instructions :

```
$ rm -rf ./node_modules
$ yarn add ethereumjs-testrpc
$ docker-compose run --rm --no-deps api yarn install
# In this list, check if `ethereumjs-testrpc` is present. Continue if yes, repeat step 2 if no
$ docker-compose run --rm --no-deps api ls ./node_modules
$ docker-compose up
```

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
├── /migrationsData/                # Database schema migrationsData
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
