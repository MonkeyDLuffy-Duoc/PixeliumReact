import { Link } from 'react-router-dom';

export const OrderSuccess = () => {
  return (
    <main className="main-content pt-0">
      <section className="hero-section text-center py-5">
        <div className="container-fluid hero-background">
          <div className="container text-center my-5 text-white">
            {/* --- CAMBIO AQUÍ: Agregamos la clase 'neon-title-success' --- */}
            <h1 className="logo ms-2 text-white" style={{fontSize: '5rem'}}>¡Pago Exitoso!</h1> 
            <i className="logo ms-2 bi bi-check-circle-fill text-white" style={{ fontSize: "8rem" }}></i>
            <p className="lead mt-4">Tu orden ha sido procesada correctamente.</p>
            <p>Recibirás una confirmación en tu correo (simulado).</p>
            <Link to="/" className="btn btn-primary btn-lg mt-3">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};