# activity-hub

**Created:** 13.01.2021, **last update:** 28.01.2021

### Goals:

1. Become familiar with JavaScript; enter the world of web development.
2. Learn REST API concept and HTTP methods.
3. Send requests via postman, without any front-end involved.
4. Learn about user authentication/authorization. 
5. Learn how to connect and store data in MongoDB Atlas database.
6. ~~Write a documentation.~~ **Not finished yet.**
7. ~~Write integration tests.~~ **Not finished yet.**

### Technology stack and dependencies:

- **Node.js -** a JavaScript runtime built on Chrome's V8 JavaScript engine
- **Express** - web application framework that provides set of features for web applications (including running HTTP server).
- **Body-parser** - middleware for parsing json data and pass them to req.body
- **CORS** - Cross-Origin Resource Sharing - allows to send requests to different addresses.
- **MongoDB Atlas** - cloud database services
- **Mongoose** - for modelling MongoDB data
- **Morgan** - middleware to log http requests
- **SwaggerUi**  - for making a documentation
- **Jsonwebtoken** - authentication using jwt tokens
- **bcryptjs**- a library for hashing user passwords

### Project structure:

i**ndex.js -** index of the app

1. Creating express server.
2. Assigning routes for routing.
3. Logging http requests.
4. Using CORS.
5. Connecting to the database.

**routes/activities.js & routes/users.js -r**outing that calls relevant methods in middleware and controllers directories.

1. If needed the auth methods from middleware/auth is called.
2. Each time relevant method from controllers directory is called.

**middleware/auth.js**

1. auth method verifies the user, if the token is valid, save user id in req.userId.
2. minimumPermissionLevelRequired takes as param permission level (1-user, 2-moderator, 3-admin)
3. onlySameUserOrAdminCanDoThisAction -self-explanatory
4. Each time if the requirements are fulfilled next() function is called, otherwise sending appropriate code error.

**controllers/users/js & controllers/activities.js -** operations that correspond to relevant queries

**models/user.js i activitiy.js** - mongoose models (model-schema structure)

.**env** - environmental variables

**swagger.json**  - api documentation structure - **not finished yet**

**package.**