import {Link, NavLink } from "react-router-dom"

export const Noticias = () => {
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

        <section className="news-section">
            <div className="container py-5 pt-0">
                <h2 className="text-center mb-2 mt-0">Noticias del mundo gamer</h2>
                <div className="row text-center py-5 pb-0">
                    <div className="col-md-12 mb-12">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Nuevo RPG sorprende con mecánicas innovadoras y comunidad activa</h5>
                                <img src="img/ER3.webp" alt="Eternal Realms: Awakening" className="img-fluid mb-3"/>
                                <p className="card-text pl m-4">El nuevo título "Eternal Realms: Awakening", lanzado por el estudio independiente BrightPixel, ha causado sensación en la comunidad gamer. Su propuesta combina un mundo abierto dinámico con un sistema de decisiones que realmente afectan la historia y la evolución de los personajes.

Lo que más ha llamado la atención es su mecánica de eventos comunitarios, donde los jugadores de todo el mundo influyen en el curso del juego en tiempo real. Además, la personalización de personajes y la banda sonora orquestada han recibido elogios en foros y redes sociales.

Según datos preliminares, el juego alcanzó 2 millones de descargas en su primera semana, convirtiéndose en uno de los lanzamientos indie más exitosos del año.</p>
                                <a href="https://www-thegamer-com.translate.goog/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc" className="btn btn-primary">Ve la noticia completa aquí</a>
                            </div>
                        </div>
                    </div>
                    <p></p>
                    <div className="col-md-12 mb-12">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Récord en campeonato mundial de eSports</h5>
                                <img src="img/eSport.webp" alt="World eSports Championship 2025" className="img-fluid mb-3"/>
                                <p className="card-text pl m-4">El pasado fin de semana, el World eSports Championship 2025 se convirtió en uno de los eventos más vistos en la historia del gaming competitivo. Transmitido desde Tokio, el torneo reunió a los mejores equipos de títulos como Valorant, League of Legends y Counter-Strike 2.

La final de Valorant entre los equipos SkyBlaze y IronWolves alcanzó un pico de 8,5 millones de espectadores simultáneos, superando la marca histórica del año anterior.

Los organizadores anunciaron además que, gracias a los nuevos acuerdos de patrocinio, el premio acumulado llegó a los 15 millones de dólares, consolidando el campeonato como uno de los más lucrativos del sector.

Más allá de las cifras, lo que marcó el evento fue la enorme participación de la comunidad: foros, memes y transmisiones alternativas con streamers de renombre mantuvieron viva la conversación durante todo el fin de semana.</p>
                                <a href="https://www-thegamer-com.translate.goog/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc" target="_blank" className="btn btn-primary">Ve la noticia completa aquí</a>
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

        
    </main>
    </>
  )
}
