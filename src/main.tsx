
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './context/CartContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Toaster
          position="bottom-right" // Posición en la pantalla
          toastOptions={{
            // Estilos para el tema oscuro
            style: {
              background: '#343a40', // Color 'dark' de Bootstrap
              color: '#14b9ebff', // Texto blanco
              
            },
          }}
        />
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)