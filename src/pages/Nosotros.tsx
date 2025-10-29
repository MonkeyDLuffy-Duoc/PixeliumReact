
import { Link, NavLink } from 'react-router-dom';
export const Nosotros = () => {
  return (
    <>
    <section className="hero-section text-center py-5">
    <div className="container-fluid hero-background">
        <div className="row align-items-center">
    
    <div className="col-md-12 text-md-center pt-5">
        <h1 className="display-1">Level-UP Gamer</h1>
            <p className="lead">Tienda de productos gamers creada por gamers!</p>
        <div className="text-center">
            <NavLink to="/Products" className="btn btn-primary mt-3">Descubre más</NavLink>
        </div>
<div className="text-center">
  <img src="img/todos_voltereta.gif" 
       alt="Gamer haciendo volteretas" 
       className="img-fluid mt-4" 
       style={{maxWidth: "600px", width: "100%", height: "auto"}}/>
</div>
    </div>
        </div>
    </div>
        </section>
    <section className="us-section">
            <div className="container py-5 pt-0">
                <h2 className="text-center mb-2 mt-0">Nosotros</h2>
                <div className="row text-center py-5 pb-0">
                    <div className="col-md-12 mb-12">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Nosotros</h5>
                                <p className="card-text pl m-4">Level-Up Gamer es una tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en Chile. Nació hace dos años, en plena pandemia, como respuesta a la creciente demanda de productos gamer en el país. Desde entonces, hemos trabajado constantemente para entregar un catálogo variado que incluye consolas de última generación, accesorios, computadores de alto rendimiento y sillas especializadas.</p>
                                <p className="card-text pl m-4">A pesar de no contar con una tienda física, nuestros despachos cubren todo el territorio nacional, llegando a miles de hogares de Arica a Punta Arenas. Nuestro compromiso es brindar no solo productos, sino también confianza, rapidez y una experiencia de compra segura y personalizada.</p>
                                <p className="card-text pl m-4">Lo que nos distingue es nuestra cercanía con la comunidad gamer, manteniéndonos atentos a las últimas tendencias, escuchando las necesidades de nuestros clientes y ofreciendo recomendaciones honestas y actualizadas.</p>
                                <h5 className="card-title">Nuestra misión</h5>
                                <p className="card-text pl m-4">Nuestra misión es proporcionar productos de alta calidad a los gamers de todo Chile, entregando una experiencia de compra única y centrada en el cliente. Nos enfocamos en garantizar precios competitivos, un servicio confiable y un acompañamiento cercano para que cada gamer encuentre exactamente lo que necesita.
                                Más que una tienda, buscamos ser un aliado en la construcción de la comunidad gamer, fomentando espacios de interacción, eventos digitales y consejos para mejorar la experiencia de juego.</p>
                                <h5 className="card-title">Nuestra visión</h5>
                                <p className="card-text pl m-4">Nuestra visión es convertirnos en la tienda online líder de productos gamer en Chile, siendo reconocidos por nuestra innovación constante, servicio al cliente excepcional y un sistema de fidelización único basado en gamificación.
Queremos que cada compra no sea solo una transacción, sino una experiencia que motive a nuestros clientes a seguir siendo parte de la familia Level-Up Gamer, recompensando su lealtad con beneficios, logros y sorpresas exclusivas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="container-fluid hero-background pt-2">
        <section className="news-section py-0 bg-transparent text-white mb-0">
            <div className="container-fluid hero-background pt-2">
                <h2 className="text-center mb-4">Te podría interesar</h2>
                <div className="row text-center">
                    <div className="col-md-4 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Silla Gamer Secretlab Titan</h5>
                                <div className="foto-producto">
                                    <img className="img-fluid rounded" style={{maxWidth: "175px"}} src="img/silla gamer.webp" alt="silla gamer"/>
                                </div>
                                <p className="card-text">Descripción breve del producto innovador.</p>
                                <Link to="/product/7" className="btn btn-primary">Ver Producto</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Play Station 5 slim</h5>
                                 <div className="foto-producto">
                                    <img className="img-fluid rounded" style={{maxWidth: "175px"}} src="img/play_5.webp" alt="play_5"/>
                                </div>
                                <p className="card-text">Descripción breve de otro producto esencial.</p>
                                <Link to="/product/5" className="btn btn-primary">Ver Producto</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Auriculares HyperX Cloud II</h5>
                                 <div className="foto-producto">
                                    <img className="img-fluid rounded" style={{maxWidth: "175px"}} src="img/HYPERXX.png" alt="Auriculares"/>
                                </div>
                                <p className="card-text">Descripción breve del último lanzamiento.</p>
                                <Link to="/product/4" className="btn btn-primary">Ver Producto</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    </>
  )
}
