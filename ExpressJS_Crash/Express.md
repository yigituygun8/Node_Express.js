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