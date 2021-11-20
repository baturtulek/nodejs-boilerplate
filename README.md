# RESTful API NodeJS Boilerplate

An opinionated boilerplate project for NodeJS for quickly building RESTful APIs using Node.js, Express, and Sequelize(Postgres).

## Features
* Centralized Config Mechanism. 
* Centralized & Automated Error Handling Mechanism
	* Predifined custom exceptions added in order to simplify Error Handling
	* Errors are automatically handled and send to the client in an descriptive manner.
*  Validate incoming requests using AJV.
	* Load all AJV Schemas during start process of the API to speed up validation process.
* Validate Environment Variables during start process of the API.
* Automatic Logging with Custom Transport support
  * Logs are printed to both 
    * console
    * postgres table. 
    * It can be arranged in environment variables.
* Predefined loggers added.
  * General Logger
  * Requests Logger
  * Errors Logger
  * Queries Logger
* Authentication using JWT.
* Sequelize and Postgres entegration.
  * Sequelize Models are automatically loaded during start process of the API.
* Routes are versioned and encapsulated
* Docker & Docker Compose Support
	* Healthcheck containers in production
* Dependency management using NPM


## Usage
* Postgres must be running in order to run nodejs-boilerplate API. 
* To run Postgres and PgAdmin in docker, run the following command. 
	```
	$ npm run docker-db-start
	```
* Run Postgres for test environment in docker container
	 ```
	$ npm run docker-test-start
	```
* Run everything in docker containers with healthchecking
	 ```
	$ npm run docker-prod-start
	```
* Install dependencies
	```
	npm install
	```
* Run locally
	```
	$ npm start
	```
* Run using nodemon (for development purposes)
	```
	$ nodemon
	```
* Run tests
	```
	$ npm run test
	```
* Run Prettier (only check)
	```
	$ npm run format
	```
* Run Prettier (modify files)
	```
	$ npm run format:fix
	```

## Environment Variables
```
NODE_ENV=development          # NODE Environment -> <development, production, test>
PORT=3001                     # API PORT

# JWT
TOKEN_SECRET=secret           # JWT Token Secret
TOKEN_EXPIRES_IN=20m          # JWT Token Expiration Duration

# PGAdmin
PG_ADMIN_MAIL=admin@app.com   # PGAdmin default mail address
PG_ADMIN_PASSWORD=11111       # PGAdmin default password
PG_ADMIN_PORT=5050            # PGAdmin Port

# DB Connection
DB_HOST=localhost             # Postgres host
DB_PORT=5432                  # Postgres Port
DB_NAME=app                   # Postgres DB Name
DB_USERNAME=root              # Postgres Username
DB_PASSWORD=root              # Postgres Passsword

# Logging
LOG_GENERAL=true              # Is log general enabled		
LOG_QUERIES=true              # Is log queries to console enabled
LOG_ERRORS_DB=true            # Is log errors to db table enabled
LOG_ERRORS_CONSOLE=true       # Is log errors to console enabled
LOG_REQUESTS_DB=true          # Is log queries to db table enabled
LOG_REQUESTS_CONSOLE=true     # Is log requests to console enabled
```

## Project Structure
 ```
/
  tests/
    |-- endpoints                       # Endpoint tests
    |-- middlewares                     # Middleware tests
    |-- services                        # Service tests
    |-- utils                           # Util tests
  src\
    |-- config                          # Configuration settings
    |-- controllers                     # Controllers
    |-- db                              # Sequelize Files
      |-- models                        # Sequelize Models
    |-- loggers                         # Winston logger
      |-- CustomTransports              # Custom Winston Transports for Custom logging
      |-- logger                        # Custom loggers
    |-- middlewares                     # Custom Middlewares
      |-- auth                          # Authentication Middlewares
      |-- error                         # Error Handling Middlewares
      |-- logger                        # Logger Middlewares
      |-- validation                    # Request Validation Middlewares
    |-- responses                       # Functions and classes necesssary for response
      |-- classes                       # Response classes
      |-- exceptions                    # Necessary exceptions for different use cases
      |-- messages                      # API response messages
      |-- success                       # Successful response body standardization
    |-- routes                          # Routes
      |-- v1                            # v1 Routes
    |-- services                        # Third Party Library codes (encapsulated)
    |-- utils                           # Utility functions
    |-- app.js                          # Express app
    |-- index.js                        # App entry point
  |-- .dockerignore                     # Docker configuration file
  |-- .editorconfig                     # Editor configuration file
  |-- .env                              # Environment variables
  |-- .env.test                         # Environment variables for testing environment
  |-- .prettierignore                   # Prettier configuration file
  |-- .prettierrc.json                  # Prettier configuration file
  |-- .travis.yml                       # Travic configuration file
  |-- docker-compose.db.yaml            # Docker Compose file for Postgres & PGAdmin
  |-- docker-compose.test.yaml          # Docker Compose file for Postgres for test env
  |-- docker-compose.production.yaml    # Docker Compose file for Postgres, PGAdmin & Nodejs APP
  |-- Dockerfile                        # Dockerfile
  |-- jest.config.js                    # Jest configuration file
  |-- LICENSE                           # Project License
  |-- nodemon.json                      # Nodemon configuration file
  |-- package.json                      # Node.js package definition file
```

## Response Formats
* **Successful Response**
	* Send successful responses with successResponse() function. 
  		* By doing this, all successful responses have standardized HTTP Body format.
	* EX: return  res.status(httpStatus.OK).json(successResponse({ name: "test" }));
	* Format: 
	```
	{
	  "status": "success",
	  "data":  {
	    name: "test"
	  }
	}
	```

* **Error Response**
	* Surround every controller with try catch statement, and send error in catch statement to the next middleware which is the error handling middleware. 
  * Error will be automatically handled by the error handling middleware and send to the client.
	* EX: 
	```
	const example = (req, res, next) => {
	  try {
	    ...
	  } catch (error) {
        next(error);
	  }
	};
	```
	* Format
	```
	{
	  "status": "error",
	  "error": {
	    "code": 401,                                          # Http Status Code
	    "message": "Username or password is wrong.",          # Error Message
	    "stack": "Error: Username or password is wrong ..."   # Error Stack (only available in development environment)
	    }
	}
	```
	*  Usage of custom exceptions
		* You can throw errors using custom exceptions. By using custom exceptions, we can distinguish errors thrown by developer, or occured during the runtime of system (Internal Server Error) and send appropriate message to the client.
			* EX: 
			```
			throw authenticationException(INVALID_CREDENTIALS);
			```

## Third Party Libraries used in the Project
* [AJV](https://github.com/ajv-validator/ajv) - JSON schema validator
* [AJV-Formats](https://github.com/ajv-validator/ajv-formats) - JSON Schema formats for Ajv
* [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Optimized bcrypt in JavaScript with zero dependencies
* [Compression](https://github.com/expressjs/compression) - Node.js compression middleware
* [Cors](https://github.com/expressjs/cors) - Enable Cors in Nodejs
* [Dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from a `.env` file
* [Envalid](https://github.com/af/envalid) - Envalid is a library for validating and accessing environment variables
* [Express](https://github.com/expressjs/express) - Web framework
* [Helmet](https://github.com/helmetjs/helmet) - Secure your Express apps by setting various HTTP headers.
* [Http-status](https://github.com/adaltas/node-http-status) - Utility to interact with HTTP status codes.
* [JsonWebToken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JWT
* [Pg](https://github.com/brianc/node-postgres) - Non-blocking PostgreSQL client for Node.js
* [Sequelize](https://github.com/sequelize/sequelize) - Promise-based Nodejs ORM Tool
* [To-boolean](https://github.com/rafaelrinaldi/to-boolean) - Convert strings to boolean
* [Winston](https://github.com/winstonjs/winston) - Logger.
* [Winston-transport](https://github.com/winstonjs/winston-transport) - The base `TransportStream` implementation for `winston`.
* [Xss-clean](https://github.com/jsonmaur/xss-clean) - Node.js middleware to sanitize user input.
* [Nodemon](https://github.com/remy/nodemon) - Tool that restart Node.js application automatically when file changed in the directory
* [Prettier](https://github.com/prettier/prettier) - Code formatter
* [Jest](https://github.com/facebook/jest) - Test framework
* [Supertest](https://github.com/visionmedia/supertest) - Http Test module
* [Node-mocks-http](https://github.com/howardabrams/node-mocks-http) - Mock 'http' objects for testing


## Author
Ahmet Batur Tülek 
[GitHub](https://github.com/baturtulek)


## License
This project is released under the MIT License. See the `LICENSE` file for details.
