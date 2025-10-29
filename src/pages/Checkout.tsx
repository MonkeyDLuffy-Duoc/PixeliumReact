// RUTA: src/pages/Checkout.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Checkout = () => {
  // Obtenemos el total y la función para limpiar el carrito
  const { totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Formateador de moneda
  const formatPrice = (price: number) => {
    return price.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenimos el envío del formulario

    // 1. Mostramos el spinner
    setIsProcessing(true);
    
    // 2. Simulamos una llamada a la API de pago (ej. 2.5 segundos)
    setTimeout(() => {
      // 3. Limpiamos el carrito
      clearCart();
      
      // 4. Redirigimos a la página de éxito
      navigate('/order-success');
      
    }, 2500);
  };

  // Si el carrito está vacío y llegan aquí, los regresamos
  if (totalPrice === 0 && !isProcessing) {
     navigate('/products');
     return null;
  }

  return (
    <main className="main-content pt-0">
      <section className="hero-section text-center py-5">
        <div className="container-fluid hero-background">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h1 className="fw-bold mb-4">Finalizar Compra</h1>
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card bg-dark p-4">
                  
                  {/* Si está procesando, muestra el spinner */}
                  {isProcessing ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
                        <span className="visually-hidden">Procesando...</span>
                      </div>
                      <h4 className="mt-4">Procesando tu pago...</h4>
                    </div>
                  ) : (
                    
                    /* Si NO está procesando, muestra el formulario */
                    <form onSubmit={handlePayment} noValidate>
                      <h5 className="text-start mb-3">Resumen del Pedido</h5>
                      <div className="d-flex justify-content-between fs-4 mb-3">
                        <span>Total a Pagar:</span>
                        <span className="fw-bold text-primary">{formatPrice(totalPrice)}</span>
                      </div>
                      <hr />

                      <h5 className="text-start mb-3 mt-4">Simulación de Pago</h5>
                      <div className="mb-3">
                        <label htmlFor="fakeCard" className="form-label">Número de Tarjeta (falso)</label>
                        <input id="fakeCard" className="form-control" type="text" defaultValue="4242 4242 4242 4242" disabled />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="fakeDate" className="form-label">Fecha Exp (falso)</label>
                          <input id="fakeDate" className="form-control" type="text" defaultValue="12/28" disabled />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="fakeCVC" className="form-label">CVC (falso)</label>
                          <input id="fakeCVC" className="form-control" type="text" defaultValue="123" disabled />
                        </div>
                      </div>
                      
                      <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Confirmar Pago
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};