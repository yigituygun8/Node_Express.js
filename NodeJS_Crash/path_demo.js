// Path module in Node.js provides utilities for working with file and directory paths. It can be used to handle and transform file paths in a way that is consistent across different operating systems.
import path from "path";

const filePath = "./dir1/dir2/test.txt"; // it is not real but it is just for demonstration

// basename() method returns the last portion of a path, which is typically the file name.
const baseName = path.basename(filePath);
console.log("Base Name:", baseName); // Output: test.txt

// dirname() method returns the directory name of a path, which is everything except the last portion (the file name).
console.log("Directory Name:", path.dirname(filePath)); // Output: ./dir1/dir2

// extname() method returns the extension of the file name in a path, including the dot.
console.log("Extension Name:", path.extname(filePath)); // Output: .txt

// parse() method returns an object whose properties represent significant elements of the path. It provides a structured way to access different parts of the path.
const parsedPath = path.parse(filePath);
console.log("Parsed Path:", parsedPath);

// If you use CommonJS, you can use __dirname and __filename. In ES modules, you can use import.meta.url to get the current module's URL and then convert it to a file path using the fileURLToPath function from the 'url' module.

import { fileURLToPath } from "url";
console.log("Meta URL: "  + import.meta.url);

const filePath2 = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath2);
console.log("File Path:", filePath2); // Output: The full path to the current file
console.log("Directory Name:", dirPath); // Output: The directory containing the current file

// join() method joins all given path segments together using the platform-specific separator as a delimiter (\ for Windows, / for Mac and Linux), then normalizes the resulting path.
const joinedPath = path.join(dirPath, "dir1", "dir2", "test.txt");
console.log("Joined Path:", joinedPath); // Output: The full path to the test.txt file in the dir1/dir2 directory

// resolve() method resolves a sequence of paths or path segments into an absolute path. It processes the sequence from right to left, prepending each segment until an absolute path is constructed.
const resolvedPath = path.resolve("dir1", "dir2", "test.txt");
console.log("Resolved Path:", resolvedPath); // Output: The absolute path to the test.txt file in the dir1/dir2 directory