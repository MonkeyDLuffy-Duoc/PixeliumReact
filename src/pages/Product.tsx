import { Link } from "react-router-dom";
import { products } from "../data/products";

export const Product = () => {
  return (
    <>
    <main className="main-content pt-0">
      <section className="hero-section text-center py-5">
        <div className="container-fluid hero-background">
            <div className="row align-items-center">
      
              <div className="col-md-12 text-md-center pt-5">
                  <h1 className="display-1">Level-UP Gamer</h1>
                    <p className="lead">Tienda de productos gamers creada por gamers!</p>
                      <div className="text-center">
                        <a href="#" className="btn btn-primary mt-3">Descubre más</a>
                      </div>
                <div className="text-center">
                  <img src="/img/todos_voltereta.gif" 
                      alt="Gamer haciendo volteretas" 
                      className="img-fluid mt-4" 
                      style={{maxWidth: "600px", width: "100%", height:"auto"}}/>
                </div>
              </div>
            </div>
          </div>
        </section>
<div className="container">
    <div className="row text-center g-4">
        {products.map(p => (
            // AÑADIR la 'key' para evitar advertencias de React
            <div key={p.id} className="col-lg-4 col-md-6 col-12">
                <div className="card bg-dark text-white">
                    <div className="card-body">
                        <h5 className="card-title">{p.title}</h5>
                        <div className="foto-producto">
                            <img 
                                className="img-fluid rounded" 
                                style={{maxWidth: "175px"}} 
                                src={p.imageSrc} 
                                alt={p.title}
                            />
                        </div>
                        <p className="card-text">{p.description}</p>
                        <div className="detalles-producto">
                            <div className="precio-producto">Precio Completo</div>
                            {/* Formatear el precio para mejor visualización */}
                            <button type="button" className="btn btn-outline-secondary">
                                ${p.price.toLocaleString('es-CL')}
                            </button>
                            <div className="precio-producto">Precio especial registrados</div>
                            <button type="button" className="btn btn-outline-primary">
                                ${(p.price * 0.8).toLocaleString('es-CL')}
                            </button>
                            <hr/>
                        </div>
                        <Link className="btn btn-primary" to={`/product/${p.id}`}>Ver Producto</Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

        <section className="news-section py-0 bg-transparent text-white mb-0">
            <div className="container-fluid hero-background pt-2">
                <h2 className="text-center mb-4">Últimas Noticias</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Nuevo RPG sorprende con mecánicas innovadoras.</h5>
                                <img src="img/ER3.webp" alt="Eternal Realms: Awakening" className="img-fluid mb-3"/>
                                <p className="card-text">Eternal Realms: Awakening combina mundo abierto y decisiones que alteran la historia. En pocos días ya superó los 2 millones de descargas.</p>
                                <a href="noticias.html" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Récord en campeonato mundial de eSports</h5>
                                <img src="img/eSport.webp" alt="World eSports Championship 2025" className="img-fluid mb-3"/>
                                <p className="card-text">El World eSports Championship 2025 rompió récords con más de 8,5 millones de espectadores. El torneo repartió 15 millones en premios.</p>
                                <a href="noticias.html" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main> 
    </>
  )
}
