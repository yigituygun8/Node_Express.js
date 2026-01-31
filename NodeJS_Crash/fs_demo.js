import fs from 'fs';

// readFile() -> Asynchronous read with a callback
fs.readFile("./test.txt", "utf-8", (err, data) => {
    if(err) throw err;
    console.log("Asynchronous read:\n", data);
});

// readFileSync() -> Synchronous read which blocks the event loop. For example if you are reading a large file, it will block other operations until the file is completely read.
const data = fs.readFileSync("./test.txt", "utf-8");
console.log("Synchronous read:\n", data);

/*
If you have a long-running synchronous task (like a big loop or a slow readFileSync), it will block everything—including async callbacks—until it’s done.
Async code lets other things happen while it waits, so it doesn’t block the event loop.
*/

// readFile with Promises (import fs from 'fs/promises';)
import fsPromises from 'fs/promises';
// fsPromises.readFile("./test.txt", "utf-8").then(data => {
//     console.log("Promise-based read:\n", data);
// }).catch(err => {
//     console.error("Error reading file:", err);
// }); // then and catch method
// You can also use async/await with fsPromises inside an async function: ,
const readFile = async () => {
    try {
        const data = await fsPromises.readFile("./test.txt", "utf-8");
        console.log("Async/Await read:\n", data);
    } catch(err) { 
        console.error("Error reading file:", err);
    }
};

readFile();

// writeFile() -> again there are 4 variants: callback-based, synchronous, promise-based, and async/await. - if file does not exist, it will be created. Replaces the file if it already exists.
const writeFile = async () => {
    try {
        await fsPromises.writeFile("./test.txt", "The file has been overwritten.\n");
        console.log("File written successfully.");
    } catch (err){
        console.error("Error writing file:", err);
    }
}

writeFile();
readFile(); // to see the changes made by writeFile

// appendFile() -> to add data to the end of a file without overwriting existing content.
const appendFile = async () => {
    try {
        await fsPromises.appendFile("./test.txt", "This line is appended.\n");
        console.log("Data appended successfully."); 
    } catch (err){
        console.error("Error appending to file:", err);
    };
};

appendFile();
readFile(); // to see the changes made by appendFile

// unlink() -> to delete a file.

// createReadStream() and createWriteStream() -> to handle large files efficiently by reading/writing them in chunks using streams.

// rename() -> to rename or move a file from one location to another. (like mv command in Linux)