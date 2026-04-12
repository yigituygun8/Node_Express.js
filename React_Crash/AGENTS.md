# Repository Guidelines

## Project Structure & Module Organization
This is a Vite-based React app. Application code lives in `src/`, with `main.jsx` bootstrapping the app and `routes.jsx` defining route-level wiring. Reusable UI is kept in `src/components/` (`MovieCard.jsx`, `Search.jsx`, `Spinner.jsx`), while shared styles live in `src/index.css` and `src/App.css`. Static assets belong in `public/` and are referenced by absolute paths such as `/logo.png` or `/no-movie.png`. Appwrite helpers and external-service calls are centralized in `src/appwrite.js`.

## Build, Test, and Development Commands
- `npm install`: install project dependencies.
- `npm run dev`: start the Vite dev server with hot reload.
- `npm run build`: create a production bundle in `dist/`.
- `npm run preview`: serve the production build locally for a final check.
- `npm run lint`: run ESLint across the repository.

Run commands from the repository root.

## Coding Style & Naming Conventions
Use ES modules, React function components, and JSX in `.jsx` files. Follow the existing codebase style: 2-4 space indentation is present today, so prefer consistent formatting within the file you edit rather than reformatting unrelated code. Name components in `PascalCase`, helper functions in `camelCase`, and keep asset filenames lowercase with hyphens when possible. ESLint is configured in `eslint.config.js`; fix lint issues before opening a PR.

## Testing Guidelines
There is currently no automated test runner configured in `package.json`. Until one is added, treat `npm run lint`, `npm run build`, and manual verification in `npm run dev` as the minimum validation set. When adding tests later, place them next to the feature or under a dedicated `src/__tests__/` folder and use names like `MovieCard.test.jsx`.

## Commit & Pull Request Guidelines
Recent commits use short, descriptive messages such as `Added helper functions for favorites functionality`. Keep commits focused and written in the imperative style. For pull requests, include:
- a brief summary of the user-facing change,
- notes about any env or Appwrite configuration updates,
- screenshots or short recordings for UI changes,
- the commands you ran to verify the work.

## Security & Configuration Tips
Environment values are stored in `.env.local` through `VITE_` variables. Do not commit secrets. If you add a new variable, document its purpose in `README.md` and keep Appwrite IDs and endpoints out of hard-coded source.
