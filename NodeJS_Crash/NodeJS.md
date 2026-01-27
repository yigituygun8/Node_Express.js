Node.js is a powerful JavaScript runtime environment built on Chrome's V8 engine that allows developers to build scalable and efficient server-side applications. 

Mostly used for developing server-side applications, Node.js is known for its non-blocking, event-driven architecture, which makes it ideal for handling concurrent connections with high throughput.

Takes JS out of the browser and allows it to run on the server side.

Key Features of Node.js:
- **Asynchronous and Event-Driven**: All APIs of Node.js are asynchronous, meaning they are non-blocking. This allows handling multiple requests simultaneously without waiting for any single operation to complete.
- **Single-Threaded but Highly Scalable**: Node.js uses a single-threaded event loop to handle multiple clients concurrently. It can manage thousands of connections efficiently.
- **Fast Execution**: Built on the V8 JavaScript engine, Node.js compiles JavaScript code into machine code, resulting in fast execution.
- **NPM (Node Package Manager)**: Node.js comes with NPM, a vast ecosystem of open-source libraries and modules that can be easily integrated into applications.

What is Event Loop?:
- The event loop is a core part of Node.js's architecture that allows it to perform non-blocking I/O operations. It continuously checks for events and executes callback functions when events are triggered, enabling efficient handling of multiple operations without blocking the main thread.

Common Use Cases:
- Web Servers and APIs
- Server-rendered Apps
- Real-time Applications (e.g., chat applications, online gaming)
- Microservices (Small and independent services that work together)
- Command-line Tools
- Bots
- Web Scraping

What are environment variables?:
- Environment variables are dynamic values that can affect the way running processes behave on a computer. In Node.js, they are often used to store configuration settings, such as database connection strings, API keys, and other sensitive information that should not be hard-coded into the application. They can be accessed in Node.js using `process.env.VARIABLE_NAME`. We need to create a `.env` file to store these variables. No need to install dotenv package anymore.