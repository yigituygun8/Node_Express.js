function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; // [1, 100]
}

function celciusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

// If we use CommonJS module system in Node.js, we export the function like this:
// module.exports = { generateRandomNumber, celciusToFahrenheit };

// If we use ES6 module system in Node.js, we export the function like this:
export { generateRandomNumber, celciusToFahrenheit };