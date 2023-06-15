# NodeJS JWT Authentication API

> Building JWT Authentication API With NodeJS and MondogDB using Cluster

```js
// we need start creating the `package.json`
npm init
```

```js
npm i express bcryptjs express-async-handler jsonwebtoken mongoose morgan
```

```js
npm i -D nodemon
```

---

## Setup environment

Let's create a new file `.env` and `.gitignore`

```js
// .env
PORT = 5050
MODE = development
```

```js
// .gitignore
.env
**/node_modules
```

---

## Update type in package.json

> "type": "module" in your package.json file, which instructs Node.js to treat .js files as ES Modules
> In brief: Replace `require` (CommonJS style) with `import` (ESM Style) from now on

```js
...
  "type": "module",
...
```

---

## Running server

```js
npm run dev

---

## Connecting to the MongoDb server Cluster

...
[nodemon] starting `node server.js`
Server running on: 5050
MongoDB is Connected successfully: ac-okc09tz-shard-00-01.ooedapl.mongodb.net
```

![MongoDb Cluster](./shared/imgs/mongodb-atlas.jpg)
