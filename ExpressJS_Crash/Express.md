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