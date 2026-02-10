import crypto from "crypto";

// createHash() - to create a hash object
const hash = crypto.createHash("sha256"); // using SHA-256 algorithm
hash.update("password1234");
const hashedPassword = hash.digest("hex");
console.log("Hashed Password:", hashedPassword);

// randomBytes() - to generate random bytes to be used as a salt or for other purposes like generating random tokens, ids
crypto.randomBytes(16, (err, buffer) => {
    if (err) {
        throw err;
    }
    console.log("Random Bytes: ", buffer.toString("hex")); // prints random bytes in hexadecimal format
})

// createCipheriv() - to create a cipher object for encryption
// Note: In a real application, you should use a secure key and initialization vector (IV) and not hardcode them
// createDecipheriv() - to create a decipher object for decryption
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16); // 128-bit IV

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update("This is a secret message", "utf-8", "hex");
encrypted += cipher.final("hex"); // to complete the encryption process. hex is the output encoding format

console.log("Encrypted Message:", encrypted);

/*
P.S.: If you provide callback to the crypto functions, they will operate asynchronously. If you omit the callback, they will operate synchronously and return the result directly. In production code, it's generally recommended to use the asynchronous versions to avoid blocking the event loop, especially for operations that may take time, such as hashing or encryption.
*/

// Decryption
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf-8"); // from hex to utf-8
decrypted += decipher.final("utf-8"); // to complete the decryption process. utf-8 is the output encoding format
console.log("Decrypted Message:", decrypted);

/*
The same "key" AND "iv" are both critical for successful decryption.

If either the key or IV is different, decryption will fail or produce garbage output. Both must match exactly:

Key - The secret encryption key (32 bytes for AES-256)
IV - The initialization vector (16 bytes for AES-256-CBC)

In a real application, you would:
    Store the key securely (environment variables, key management system)
    Include the IV with the encrypted data (IV doesn't need to be secret, but must be unique for each encryption)
*/