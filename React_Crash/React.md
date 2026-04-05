React is a JavaScript library for building user interfaces. It was developed by Facebook and is widely used for creating web applications. React allows developers to create reusable UI components, manage the state of their applications efficiently, and build complex user interfaces with ease.

Key features of React include:
1. **Component-Based Architecture**: React encourages developers to build applications using reusable components. Each component can manage its own state and can be composed together to create complex UIs.
2. **JSX Syntax**: React uses JSX, a syntax extension that allows developers to write HTML-like code within JavaScript. This makes it easier to create and visualize the structure of the UI components.
3. **Unidirectional Data Flow**: React follows a unidirectional data flow, meaning that data flows in one direction from parent components to child components. This makes it easier to understand and debug the application.
4. **Virtual DOM**: React uses a virtual DOM to optimize rendering performance. When the state of a component changes, React updates the virtual DOM and then efficiently updates the actual DOM to reflect those changes. In React 19, the virtual DOM has been further optimized to improve performance and reduce memory usage.

What is JSX?
- JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows developers to write HTML-like code within their JavaScript files. JSX makes it easier to create and visualize the structure of the UI components. When using JSX, you can write code that looks like HTML, but it is actually JavaScript under the hood. For example:

```jsx
const element = <h1>Hello, world!</h1>;
```

Components: Reusable piece of code that can be used to build elements on the page.
    - Functional Components: These are simple JavaScript functions that return JSX. They are stateless and do not have lifecycle methods.
    - Class Components: These are ES6 classes that extend the React.Component class. They can have state and lifecycle methods, making them more powerful than functional components.

    - Class components have been largely replaced by functional components and not recommended with the introduction of React Hooks, which allow functional components to manage state and side effects without needing to convert them into class components.

    
State: Represents the data that a component manages internally. Changing the state of a component will trigger a re-render, allowing the UI to update based on the new state. Could be a form input data, fetched data, UI-related data like whether a dropdown is open or closed, etc. There is also global state, which is shared across multiple components and can be managed using libraries like Redux or Context API.
It is like a brain of the component, it holds the data that can change over time and affects how the component renders. State is mutable, meaning that it can be updated using the `setState` method in class components or the `useState` hook in functional components. When the state changes, React will re-render the component to reflect the new state in the UI.

Props: Short for "properties," props are read-only data that are passed from a parent component to a child component. They allow components to communicate with each other and share data. Props are immutable, meaning that a child component cannot modify the props it receives from its parent.

Hooks: Allows us to use state and other React features within functional components. Some common hooks include:
    - useState: Allows you to add state to a functional component.
    - useEffect: Allows you to perform side effects in a functional component, such as fetching data or subscribing to events.
    - useRef: Allows you to create a mutable reference that persists across renders, which can be used to access DOM elements or store mutable values.
    - useReducer: Allows you to manage complex state logic in a functional component by using a reducer function, similar to how Redux works.   
    - useContext: Allows you to access the context value in a functional component. (deprecated and replaced with use in React 19)

What is context?
Context is a way to pass data through the component tree without having to pass props down manually at every level. It allows you to share values like themes, user information, or any other data that needs to be accessible by multiple components in the application. Context is created using the `React.createContext()` function and can be consumed using the `useContext` hook in functional components or the `Context.Consumer` component in class components. In React 19, the use of context has been simplified with the introduction of the `use` hook, which allows you to access context values directly within functional components without needing to wrap them in a consumer component.

SPA, SSR, SSG:
- SPA (Single Page Application): A web application that loads a single HTML page and dynamically updates the content as the user interacts with the app. SPAs rely heavily on JavaScript to manage the user interface and provide a seamless user experience without full page reloads. JS loads the entire UI including routes. Not SEO friendly.
- SSR (Server-Side Rendering): A technique where the server generates the HTML for a web page on the server and sends it to the client. This allows for faster initial page loads and better SEO, as search engines can easily crawl the content. In React, SSR can be implemented using frameworks like Next.js or Remix.
- SSG (Static Site Generation): A method of generating static HTML pages at build time. This approach allows for fast page loads and improved SEO, as the content is pre-rendered and can be easily crawled by search engines. In React, SSG can also be implemented using frameworks like Next.js or Gatsby.

Build Tools:
- Webpack: A popular module bundler that takes your JavaScript files and their dependencies and bundles them into a single file (or multiple files) that can be included in your HTML. Webpack also supports features like code splitting, hot module replacement, and tree shaking to optimize the performance of your application.
- Create React App (CRA): A command-line tool that sets up a new React project with a pre-configured build setup using Webpack. CRA provides a simple and efficient way to get started with React development without having to worry about the underlying build configuration. It includes features like hot module replacement, code splitting, and optimized production builds out of the box.
- Vite: A modern build tool built on top of ESBuild that provides a faster and more efficient development experience compared to traditional bundlers like Webpack. Vite uses native ES modules in the browser during development, which allows for faster hot module replacement and improved performance. It also supports features like code splitting and tree shaking for optimized production builds.

Vite vs Babel:
- Vite is a build tool that provides a faster and more efficient development experience by leveraging native ES modules in the browser during development. It uses ESBuild under the hood for fast bundling and transformation of code. Vite also supports features like hot module replacement, code splitting, and tree shaking for optimized production builds.
- Babel, on the other hand, is a JavaScript compiler that allows developers to write modern JavaScript code and transpile it to a version that is compatible with older browsers. Babel can be used in conjunction with build tools like Webpack or Vite to transform and bundle JavaScript code for production. While Babel focuses on transpiling JavaScript code, Vite provides a complete development and build toolchain for modern web applications.

App.jsx -> This is the main component of the React application. It serves as the root component that renders the entire UI. In this file, you can define the structure of your application, import and use other components, manage state, and handle any logic related to the overall application. The App component is typically rendered inside the index.html file through the main.jsx entry point, which allows it to serve as the central hub for your React application.
main.jsx -> This file serves as the entry point for the React application. It is responsible for rendering the App component into the DOM. In this file, you typically import the necessary dependencies, such as React and ReactDOM, and then use ReactDOM to render the App component into a specific DOM element (usually with an id of "root") defined in the index.html file. This setup allows your React application to be mounted and displayed in the browser when you run the development server or build the application for production.
App.css -> This file contains the styles for the App component. You can define CSS rules here to style the elements rendered by the App component and its child components. By importing this CSS file into your App.jsx, you can apply the defined styles to your React components, allowing you to customize the appearance of your application.
index.css -> This file contains global styles for the entire application. You can define CSS rules here that will apply to all components in your React application. By importing this CSS file into your main.jsx or App.jsx, you can ensure that the styles defined in index.css are applied throughout your application, providing a consistent look and feel across all components.

Debouncing: A technique used to limit the rate at which a function is executed. In the context of a search input, debouncing can be used to delay the execution of the search function until the user has stopped typing for a certain amount of time (e.g., 500ms). This helps to reduce the number of API calls made while the user is typing and improves performance by only fetching data when necessary. In React, you can implement debouncing using the `useEffect` hook and `setTimeout` function to manage the timing of when the search function is called based on user input. Do not forget to clear the timeout in the cleanup function of the `useEffect` hook to prevent memory leaks and unnecessary updates.