Minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
Used for building server-side web applications and APIs. It simplifies the process of handling HTTP requests, routing, middleware, and more.
Very fast and unopinionated, which means it doesn't impose any specific structure or way of doing things, giving developers the freedom to choose their own tools and libraries.


It offers:
    A robust routing system
    HTTP helpers (redirection, caching, etc.)
    Support for middleware to respond to HTTP requests
    A templating engine for dynamic HTML rendering
    Error handling middleware

Opinionated vs Unopinionated:
Suggested ways to do things - Different ways to do the same thing
Usually offer a lot of bells and whistles - Includes bare necessities
Strict folder structure - Structure folders how you want
Built-in features - Rely on third-party libraries for additional features
Ruby on Rails, Django - Express, Flask

env file:
A file that contains environment variables, which are key-value pairs used to configure the application.
Commonly used to store sensitive information such as database credentials, API keys, and other configuration settings that should not be hardcoded in the source code.
The .env file is typically used in development and testing environments, and it should not be committed to version control to prevent exposing sensitive information. Instead, it should be added to the .gitignore file to ensure it is not included in the repository.

Route Files:
In Express.js, route files are used to define the routes for your application. They help to organize your code by separating the route definitions from the main server file (e.g., server.js). This makes it easier to manage and maintain your application as it grows in complexity.
A route file typically exports a router object that contains the route definitions. You can then import this router into your main server file and use it to handle requests for specific routes. This modular approach allows you to keep your code clean and organized, especially when dealing with a large number of routes.

Middlware Functions:
Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. They can execute any code, make changes to the request and response objects, end the request-response cycle, or call the next middleware function in the stack. For example, you can use middleware for logging, authentication, error handling, and more. Middleware functions are executed in the order they are defined in the application, and they can be used to perform tasks before or after the main route handler is executed. The routes we put in routes folder are also considered middleware, as they handle specific routes and can perform actions before sending a response back to the client.
To use middleware, you can use the app.use() method to mount the middleware function at a specific path. For example, if you want to use a middleware function for all routes, you can simply call app.use(middlewareFunction). If you want to use it for specific routes, you can specify the path as the first argument, like app.use('/api', middlewareFunction), which will apply the middleware to all routes that start with '/api'.

Controller Functions:
Controller functions are responsible for handling the logic of a specific route. They receive the request and response objects as parameters and perform the necessary operations to process the request and generate a response. Controller functions typically interact with the database, perform data validation, and return the appropriate response to the client. They are often organized in separate files or folders to keep the codebase clean and maintainable. In Express.js, you can define controller functions in a separate file and export them, then import them into your route files to handle specific routes. This separation of concerns allows for better organization and easier maintenance of your application as it grows in complexity. For example, you might have a userController.js file that contains functions for handling user-related routes, such as creating a new user, retrieving user information, updating user data, and deleting a user. These functions can then be imported into your route files and used to handle the corresponding routes for user operations. It aligns with MVC architecture, where controllers are responsible for handling the business logic and interactions between the model (data) and the view (presentation/API response).

Middleware vs Controller:
Middleware functions are used to perform tasks that are common across multiple routes, such as authentication, logging, or error handling. They can be applied to all routes or specific routes, and they are executed in the order they are defined in the application. Middleware functions can modify the request and response objects, and they can also end the request-response cycle if necessary.
Controller functions, on the other hand, are responsible for handling the specific logic of a particular route. They receive the request and response objects and perform the necessary operations to process the request and generate a response. Controller functions typically interact with the database, perform data validation, and return the appropriate response to the client.