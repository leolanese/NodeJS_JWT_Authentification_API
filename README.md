# NodeJS JWT Authentication API

> Building JWT Authentication API With NodeJS and MondogDB using Cluster

This codebase is essentially creating a Node.js-based REST API for user registration and login. The key concepts involved are JWT (JSON Web Tokens) and MongoDB, used for data persistence. 

## A brief overview:

- User Registration: The user provides their name, email, and password to register for an account. When the request is sent to the /user endpoint, the application first checks if a user with the provided email already exists in the MongoDB database. If not, the password is hashed for security reasons, and then the new user's data is stored in the database. Finally, a JWT is generated using the user's unique identifier (id), which can be used for authenticating future requests.

- User Login: The user provides their email and password to log in. When the request is sent to the /login endpoint, the application first finds the user in the MongoDB database by email. Then, it compares the provided password with the hashed password stored in the database using bcrypt. If they match, it means the password is correct. Finally, a JWT is generated for the user, similar to the registration process.

- JWT: JSON Web Tokens (JWTs) are a standard for securely transmitting information between parties as a JSON object. They are used here to handle user sessions. After a user logs in or registers, they receive a JWT. For subsequent requests that need authentication, the user sends this token in the headers. The server can then verify this token and allow the user to access protected routes.

- MongoDB Cluster: MongoDB, a NoSQL document database, is being used to persist user data. In this codebase, the MongoDB Atlas Cluster is being used, which is a fully-managed cloud database provided by MongoDB. It's scalable and allows you to distribute your data across multiple servers for high availability and performance.

This API is built following the MVC (Model-View-Controller) pattern and uses the Express.js framework for routing and middleware. It also uses the mongoose package to interact with MongoDB and enforce the data schema, and bcryptjs for hashing passwords. The jsonwebtoken package is used for creating JWTs and express-async-handler for handling asynchronous route handlers.

---

## Let's start the project

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

## Connecting to the MongoDb server Cluster

We need Node.js server to rung successfully on port 5050 and it also connected to MongoDB successfully. Just to mention, for simplicity MVC pattern will be in place

## Running server

```js
npm run dev

...
[nodemon] starting `node server.js`
Server running on: 5050
MongoDB is Connected successfully: ac-okc09tz-shard-00-01.ooedapl.mongodb.net
```

![MongoDb Cluster](./shared/imgs/mongodb-atlas.jpg)

---

## Testing API Requests/Responses

### Test POST (invalid)

![PostMan API POST testing](./shared/imgs/invalid.jpg)

### Test POST (valid register)

![Postman API POST valid register](./shared/imgs/register.jpg)

### Test POST (invalid register)

![Postman API POST invalid register](./shared/imgs/register-invalid.jpg)

### Test POST (login success after valid register)

![Postman API POST valid login](./shared/imgs/login-success.jpg)

### Test GET (login into private router successfully after register)

> TIP: We need to add Headers: `Key`: `Authorization` & `Value`: `<token-value-here>`

![Postman API GET valid](./shared/imgs/account.jpg)

---
### :100: <i>Thanks!</i>
#### Now, don't be an stranger. Let's stay in touch!

##### :radio_button: linkedin: <a href="https://www.linkedin.com/in/leolanese/" target="_blank">@LeoLanese</a>
##### :radio_button: Twitter: <a href="https://twitter.com/LeoLanese" target="_blank">@LeoLanese</a>
##### :radio_button: Portfolio: <a href="https://www.leolanese.com" target="_blank">www.leolanese.com</a>
##### :radio_button: DEV.to: <a href="https://www.dev.to/leolanese" target="_blank">dev.to/leolanese</a>
##### :radio_button: Blog: <a href="https://www.leolanese.com/blog" target="_blank">leolanese.com/blog</a>
##### :radio_button: Questions / Suggestion / Recommendation: developer@leolanese.com
