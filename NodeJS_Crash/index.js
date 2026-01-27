// console.log(window); // not defined because window is a browser-specific object but we are in Node.js environment
// There is no DOM as well because there is no document
// console.log(global); // global is the Node.js equivalent of window
// console.log(process); // gives information about the current Node.js process
// console.log(__filename); // gives the full path of the current module
// console.log(__dirname); // gives the directory name of the current module

// CommonJS Syntax
// const { generateRandomNumber, celciusToFahrenheit } = require("./utils"); // Importing the function from utils.js
// console.log("Random Number:", generateRandomNumber());
// console.log("32°C in Fahrenheit:", celciusToFahrenheit(32));

// ES6 Module Syntax
import getPosts, {getPostLength} from "./postController.js"; // Importing the function from postController.js
const posts = getPosts();
console.log("Posts:", posts, "Total Posts:", getPostLength());

// Note: To use ES6 modules in Node.js, ensure that "type": "module" is set in package.json

