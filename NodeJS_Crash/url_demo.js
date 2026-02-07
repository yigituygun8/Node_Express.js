import url from "url";

// The URL module in Node.js provides utilities for URL resolution and parsing. It can be used to work with URLs in a way that is consistent across different environments.

const urlString = "https://www.google.com/search?q=hello+world";

// URL Object: The URL constructor creates a new URL object from a given URL string. It provides properties and methods to access different parts of the URL.
const myURL = new URL(urlString);
console.log("URL Object:", myURL); // Gives lots of information about the URL
console.log("Search Params: ", myURL.searchParams);
// or
const params = new URLSearchParams(myURL.search);
console.log("Search Params (using URLSearchParams): ", params);
console.log("Search Query: ", params.get("q")); // We cannot use params.q because it is not a property of the URLSearchParams object, but rather a query parameter that we need to access using the get() method.

params.append("lang", "en"); // add new query parameter
console.log("Updated Search Params: ", params);
console.log(params.toString());

// format() method returns a URL string from a URL object. It is used to convert a URL object back into a string representation. Opposite of parse() method or URL constructor.
const formattedURL = url.format(myURL);
console.log("\nFormatted URL:", formattedURL); // Output: https://www.google.com/search?q=hello+world

// parse() method parses a URL string and returns a URL object. It is used to break down a URL into its components, such as protocol, hostname, pathname, etc.
// But it is deprecated, not a standard. Instead, URL constructor (new URL()) is recommended for parsing URLs in modern JavaScript.

// import.meta.url is a property that provides the URL of the current module. It is available in ES modules and can be used to get the URL of the current file. 
// This is particularly useful for resolving relative paths in ES modules, as __dirname and __filename are not available in ES modules. 
// It is not part of the URL module, but it is related to working with URLs in the context of modules.
console.log("\nMeta URL: ", import.meta.url);

// fileURLToPath() method converts a file URL to a file path. It is used to convert the URL of the current module (import.meta.url) into a file path that can be used with the file system.
console.log("File Path: ", url.fileURLToPath(import.meta.url));

console.log("Reverse: ", url.pathToFileURL(url.fileURLToPath(import.meta.url))); // It converts the file path back to a URL object. 
// Difference between using new URL and url.pathToFileURL() is that second one encodes special characters in the file path, while new URL does not. 
// So if your file path contains special characters, it is recommended to use url.pathToFileURL() to ensure that the resulting URL is properly encoded.
// Refer to doc details for more information.

// Loop through search params
for (const [key, value] of params) {
    console.log(`Key: ${key}, Value: ${value}`);
}