import { useState, useEffect } from "react";

// We can create multiple components in a single file but we need to export only one component as default and the rest as named exports
// Components help us to break down the UI into smaller, reusable pieces which we can use anywhere. They can be functional or class-based, but functional components are more common in modern React development due to their simplicity and the introduction of hooks.
// JSX only accepts one parent element, so we can use a fragment (<>...</>) to wrap multiple elements without adding an extra node to the DOM.
// JSX only accepts expressions (things that return a value), not statements (like if, for, etc.). To include JavaScript logic in JSX, we can use the ternary operator or logical operators.
// You can use statements outside return to prepare data or perform calculations before rendering. For example, you can use an if statement to determine what to render based on certain conditions, and then return the appropriate JSX.

// we use curly braces to "destructure" the props object and get the title prop directly. 
// Without it, we pass (props) and access the title prop using props.title inside the component.
const Card = ({ title, actors }) => {
  const [hasLiked, setHasLiked] = useState(false); // we can use hooks to manage state in functional components. The paranthesis is for default value of the state variable. It returns an array with two elements: the current state value and a function to update that state. We can use array destructuring to assign these values to variables.
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`The user has ${hasLiked ? "liked" : "unliked"} the show: ${title}`);
  }, [hasLiked, title]); // useEffect is a hook that allows us to perform side effects in functional components. It takes a function as an argument and runs it after every render. We can also specify dependencies to control when the effect runs. If we want the effect to run only when hasLiked changes, we can pass [hasLiked] as the second argument to useEffect.
  // dependency array is used to optimize performance by preventing unnecessary re-runs of the effect. If we want the effect to run only once when the component mounts, we can pass an empty array [] as the second argument.

  // You can have multiple useEffect hooks in a single component to separate different concerns. For example, you can have one useEffect for logging and another for fetching data. Each useEffect will run independently based on its own dependencies.
  useEffect(() => {
    console.log(`The component for ${title} has mounted.`);
  }, []); // Very common use case (empty dependency array): This useEffect will run only once when the component mounts, and it will not run again on subsequent renders.


  return (
    <div onClick={() => setCount(count + 1)} style={{ // However, in complex UIs, it is better to use setCount(prevCount => prevCount + 1) to ensure that we are updating the state based on the previous value, which is important when multiple updates can happen in quick succession.
      border: "1px solid #4b5362",
      padding: "20px",
      margin: "10px",
      backgroundColor: hasLiked ? "#08a45e" : "#e26d76",
      borderRadius: "10px",
      minHeight: "100px",
    }}> {/* inline style syntax */}
      <h2>{title}</h2>
      <p>Actors: {actors.join(", ")}</p>
      <p>{count > 0 && <span>{count}</span>}</p>
      {/* We use curly braces to embed JavaScript expressions within JSX */}

      <button onClick={() => setHasLiked(!hasLiked)} style={{backgroundColor: hasLiked ? "#08a45e" : "#e26d76"}}>
        {hasLiked ? "Unlike" : "Like"}
      </button>
    </div>
  )
};

const App = () => {
  return (
    <div className="card-container">
      
      {/* we pass props to the component */}
      <Card title="Avengers: Endgame" actors={["Robert Downey Jr.", "Chris Evans"]} />
      <Card title="Succession" actors={["Jeremy Strong", "Sarah Snook"]} />
      <Card title="Eternal Sunshine of the Spotless Mind" actors={["Jim Carrey", "Kate Winslet"]} />
      <Card title="The Matrix" actors={["Keanu Reeves", "Laurence Fishburne"]} />
    </div>
  )

};

export default App;
// to export multiple components to use them in other files, we can use named exports
export { Card };

/*
The rule of thumb:
  Put state in the lowest component that needs it. 
  Only lift it up to a parent if multiple siblings need to share it.
------------------------------------------------------------------- 
These are equivalent USUALLY:
  setCount(count + 1)           // uses `count` from the render closure
  setCount(prev => prev + 1)   // uses the actual latest state React has
If multiple updates happen in the same render cycle (e.g., clicking very fast), count + 1 might use a stale value, 
while prev => prev + 1 always gets the latest queued state from React.
-------------------------------------------------------------------
Conditional rendering in React is the practice of displaying different UI elements or components based on specific conditions  (e.g., state, props, user role, or data availability)
1) if / else statements: 
  The most basic form of conditionality. These statements cannot be used directly inside the return statement's JSX, but can be used before it to set a variable to the desired JSX, which is then returned.
2) Ternary Operator (? :): This is ideal for simple if-else logic inside JSX as it is an expression that returns a value.
3) Logical AND Operator (&&): Useful when you want to render something only if a condition is true, and render nothing otherwise. If the condition is true, the expression on the right is rendered; if false, React renders nothing (e.g., false, null, or undefined).
  {messageCount && <p>You have {messageCount} messages</p>} -> if messageCount is 0, this renders "0" on screen! 0 is falsy, so the entire expression evaluates to 0, and React renders it. To avoid this, you can explicitly check for a non-zero value: {messageCount > 0 && <p>You have {messageCount} messages</p>}
-------------------------------------------------------------------
TODO: Search synthetic event system in React
*/