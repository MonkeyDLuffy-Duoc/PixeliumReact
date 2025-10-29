import { Link } from 'react-router-dom';

export const OrderSuccess = () => {
  return (
    <main className="main-content pt-0">
      <section className="hero-section text-center py-5">
        <div className="container-fluid hero-background">
          <div className="container text-center my-5 text-white">
            {/* --- CAMBIO AQUÍ: Agregamos la clase 'neon-title-success' --- */}
            <h1 className="logo ms-2 text-white" style={{fontSize: '5rem'}}>¡Pago Exitoso!</h1> 
            
            <img src="/img/check.gif" 
                alt="Gamer haciendo volteretas" 
                className="img-fluid mt-4" 
                style={{maxWidth: "300px", width: "100%", height: "auto"}}/>
            <p className="lead mt-4 logo text-white">Tu orden ha sido procesada correctamente.</p>
            <p className='logo text-white'>Recibirás una confirmación en tu correo (simulado).</p>
            <Link to="/" className="btn btn-primary btn-lg mt-3">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};