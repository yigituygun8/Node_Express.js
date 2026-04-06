import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  </BrowserRouter>,
)
