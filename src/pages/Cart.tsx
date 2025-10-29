import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Cart = () => {
  // Consumimos el contexto
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  // Formateador de moneda
  const formatPrice = (price: number) => {
    return price.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  // Si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      // Añadimos la misma estructura que Login.tsx
      <main className="main-content pt-0">
        <section className="hero-section text-center py-5">
          <div className="container-fluid hero-background">
            <div className="container text-center my-5 text-white">
              <h1 className="display-4">Tu carrito está vacío</h1>
              <p className="lead">Parece que aún no has agregado productos.</p>
              <i className="bi bi-cart-x" style={{ fontSize: "5rem" }}></i>
              <br />
              <Link to="/products" className="btn btn-primary btn-lg mt-4">
                Ver Productos
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Si el carrito SÍ tiene ítems
  return (
    // Añadimos la misma estructura que Login.tsx
    <main className="main-content pt-0">
      <section className="hero-section py-5"> {/* Quitamos text-center de aquí para alinear el contenido */}
        <div className="container-fluid hero-background">
          <div className="container my-4 text-white">
            {/* Añadimos text-center solo al título */}
            <h1 className="mb-4 text-center">Tu Carrito de Compras</h1>

            <div className="row g-4">
              {/* Columna de Productos */}
              <div className="col-lg-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="card bg-dark text-white mb-3 shadow-sm">
                    <div className="row g-0">
                      <div className="col-md-3 d-flex align-items-center justify-content-center">
                        <img
                          src={item.imageSrc}
                          className="img-fluid rounded-start p-3"
                          alt={item.title}
                          style={{ maxHeight: "150px", objectFit: "contain" }}
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title">{item.title}</h5>
                            {/* --- CAMBIO 1 --- */}
                            {/* Cambiamos 'btn-outline-danger' por 'btn-outline-secondary' */}
                            <button
                              className="btn btn-sm btn-outline-secondary" // <-- CAMBIADO
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </div>
                          <p className="card-text text-primary fs-5">
                            {formatPrice(item.price)}
                          </p>
                          <div className="d-flex align-items-center">
                            <label htmlFor={`quantity-${item.id}`} className="me-2">Cantidad:</label>
                            <input
                              type="number"
                              id={`quantity-${item.id}`}
                              className="form-control form-control-sm bg-dark text-white"
                              style={{ width: "70px" }}
                              value={item.quantity}
                              min="1"
                              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            />
                          </div>
                          <p className="card-text mt-2 mb-0 fw-bold">
                            Subtotal: {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Columna de Resumen */}
              <div className="col-lg-4">
                <div className="card bg-dark text-white shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fs-3">Resumen del Pedido</h5>
                    <hr />
                    <div className="d-flex justify-content-between fs-4">
                      <span>Total:</span>
                      <span className="fw-bold text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="d-grid gap-2 mt-4">
                      <Link to="/checkout" className="btn btn-primary btn-lg">
                        Ir a Pagar
                      </Link>
                      
                      {/* --- CAMBIO 2 --- */}
                      {/* Cambiamos 'btn-outline-danger' por 'btn-secondary' */}
                      <button
                        className="btn btn-secondary" // <-- CAMBIADO
                        onClick={clearCart}
                      >
                        Vaciar Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};