import { Routes, Route } from "react-router"; // BrowserRouter is a component that uses the HTML5 history API to keep your UI in sync with the URL. It is the most common router used in React applications and is suitable for most use cases. It allows you to navigate between different pages in your app without reloading the page, and it also provides features like nested routes, route parameters, and more. You can wrap your entire app in a BrowserRouter component to enable routing throughout your application.
import MoviePage from "./components/MoviePage.jsx";
import App from "./App.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      {/* Will add profile route later */}
    </Routes>
  );
};

export default AppRoutes;
