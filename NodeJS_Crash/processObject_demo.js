import "dotenv/config"; // This line imports the dotenv package and loads environment variables from a .env file into process.env. This allows you to manage configuration settings for your application in a separate file, keeping sensitive information like API keys and database credentials out of your source code.

// process is a global object in Node.js that provides information about the current Node.js process and allows you to interact with it. It contains properties and methods for working with the environment, handling input/output, and managing the lifecycle of the application.

// console.log(process); 
console.log(process.version); // Logs the Node.js version being used
console.log(process.argv); // Logs the command-line arguments passed to the Node.js process
// You can use argv for example to pass arguments when running the script, like: node processObject_demo.js arg1 arg2. For CLI applications, you can parse these arguments to customize the behavior of your application based on user input, what those flags mean.

console.log(process.env); // Logs the environment variables available to the Node.js process
console.log(process.env.USERDOMAIN); // Logs the value of the USERDOMAIN environment variable, which is typically the domain of the user running the process. This is just an example, and you can access any environment variable defined in your .env file or in the system environment variables using process.env.VARIABLE_NAME.


console.log(process.cwd()); // Logs the current working directory of the Node.js process. This is the directory from which the script is being executed, which can be different from the directory where the script is located. You can use this to read or write files relative to the current working directory. Windows-like
console.log(process.env.PWD); // Unix-like, PWD is the current working directory. This may not be available on all platforms, so it's generally safer to use process.cwd() for cross-platform compatibility.