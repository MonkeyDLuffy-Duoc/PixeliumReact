export const Body = () =>{
    return(
        <>
            <main className="main-content pt-0">
        <section className="hero-section text-center py-5">
    <div className="container-fluid hero-background">
        <div className="row align-items-center">
    
    <div className="col-md-12 text-md-center pt-5">
        <h1 className="display-1">Level-UP Gamer</h1>
            <p className="lead">Tienda de productos gamers creada por gamers!</p>
        <div className="text-center">
            <a href="productos.html" className="btn btn-primary mt-3">Descubre más</a>
        </div>
  <img src="/img/todos_voltereta.gif" 
       alt="Gamer haciendo volteretas" 
       className="img-fluid mt-4" 
       style={{maxWidth: "600px", width: "100%", height: "auto"}}/>
</div>
    </div>
        </div>
    </div>
        </section>

        <section className="featured-products py-0">
            <div className="container py-5 pt-0">
                <h2 className="text-center mb-4 mt-0">Productos Destacados</h2>
                <div className="row text-center py-5 pb-0">
                    <div className="col-md-4 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Xbox Series X</h5>
                                <img src="/img/mando xbox.webp" alt="Mando Xbox Series X" className="img-fluid mb-3"/>
                                <p className="card-text">Mando Xbox Series X</p>
                                <a href="ver_producto.html" className="btn btn-primary">Ver Producto</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Sillas</h5>
                                <img src="/img/silla gamer.webp" alt="Silla Gamer" className="img-fluid mb-3"/>
                                <p className="card-text">Silla ergonomica Secretlab Titan</p>
                                <a href="ver_producto_2.html" className="btn btn-primary">Ver Producto</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Mouses</h5>
                                <img src="/img/mouse_gamer.webp" alt="Mouse Logitech G502 HERO" className="img-fluid mb-3"/>
                                <p className="card-text">Mouse Logitech G502 HERO</p>
                                <a href="ver_producto_3.html" className="btn btn-primary">Ver Producto</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="news-section py-0 bg-transparent text-white mb-0">
            <div className="container-fluid hero-background pt-2">
                <h2 className="text-center mb-4">Últimas Noticias</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Nuevo RPG sorprende con mecánicas innovadoras.</h5>
                                <img src="/img/ER3.webp" alt="Eternal Realms: Awakening" className="img-fluid mb-3"/>
                                <p className="card-text">Eternal Realms: Awakening combina mundo abierto y decisiones que alteran la historia. En pocos días ya superó los 2 millones de descargas.</p>
                                <a href="noticias.html" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Récord en campeonato mundial de eSports</h5>
                                <img src="/img/eSport.webp" alt="World eSports Championship 2025" className="img-fluid mb-3"/>
                                <p className="card-text">El World eSports Championship 2025 rompió récords con más de 8,5 millones de espectadores. El torneo repartió 15 millones en premios.</p>
                                <a href="noticias.html" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="contact-section py-4">
            <div className="container text-center">
                <h2>¿Tienes alguna pregunta?</h2>
                <p>Contáctanos para más información o para una consulta.</p>
                <a href="contacto.html" className="btn btn-lg btn-primary mt-3">Contáctanos ahora</a>
                <p></p>
                <img src="/img/mario.gif" alt="Mario saludando" className="img-fluid mt-4" style={{maxWidth: "150px"}}/>
            </div>
            


            <div className="d-flex justify-content-center gap-4 mt-3">
                    <a href="https://web.whatsapp.com/" target="_blank" className="social-icon whatsapp">
                        <i className="fab fa-whatsapp"></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" className="social-icon instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.twitch.tv/" target="_blank" className="social-icon twitch">
                        <i className="fab fa-twitch"></i>
                    </a>
                    <a href="https://www.mercadolibre.cl/" target="_blank" className="social-icon mercadolibre">
                        <i className="fas fa-store"></i>
                    </a>
            </div>
            
            <p className="text-center">¡Síguenos en nuestras redes sociales!</p>
            
        </section>

    </main>
        </>
    )
}