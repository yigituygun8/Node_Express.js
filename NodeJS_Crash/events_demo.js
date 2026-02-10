import {EventEmitter} from 'events';

// EventEmitter is a class that allows us to create and handle "custom events" in Node.js. It provides methods to emit events and listen for them.

const emitter = new EventEmitter(); // EventEmitter instance created

function greetHandler() {
    console.log('Hello, welcome to the event demo!');
}

function farewellHandler() {
    console.log('Goodbye, thanks for visiting the event demo!');
}

// Registering event listeners for 'greet' and 'farewell' events. on() method is used to attach the event handlers to the respective events.
// greet (or any other name you want) is a custom event that we will emit later to trigger the greetHandler function. Similarly, farewell is another custom event for the farewellHandler function.
emitter.on("greet", greetHandler);
emitter.on("farewell", farewellHandler);
emitter.on("greet", () => {
    console.log("This is an additional handler for the greet event.");
});

// Emitting the 'greet' and 'farewell' events to trigger the respective handlers. emit() method is used to trigger the events.
emitter.emit("greet"); // This will call all the handlers registered for the 'greet' event, which includes greetHandler and the additional anonymous function that logs a message. They are done synchronously, meaning the code will wait for each handler to complete before moving on to the next one. So, the output will be in the order they were registered.
emitter.emit("farewell");

// You must call emit() for your custom events to trigger the handlers. If you don't call emit(), the handlers will not execute, and you won't see any output related to those events.

// Error. "error" is a reserved event in Node.js.
emitter.on("error", err => {
    console.error("An error occurred:", err);
});

emitter.emit("error", new Error("Something went wrong!")); // This will trigger the error event and log the error message to the console.