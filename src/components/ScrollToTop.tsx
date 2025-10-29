// RUTA: src/components/ScrollToTop.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  // Extrae el "pathname" (ej: "/products") de la URL actual
  const { pathname } = useLocation();

  // Este 'Efecto' se ejecutará CADA VEZ que el 'pathname' cambie
  useEffect(() => {
    // Manda la ventana al inicio (top: 0, left: 0)
    window.scrollTo(0, 0);
  }, [pathname]); // El efecto depende del 'pathname'

  // Este componente no renderiza nada en la pantalla
  return null; 
};