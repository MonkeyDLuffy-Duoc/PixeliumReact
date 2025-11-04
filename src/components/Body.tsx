import { Link, NavLink } from "react-router-dom"

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
                <NavLink to="/Products" className="btn btn-primary mt-3">Descubre más</NavLink>
            </div>
          <div className="text-center">
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
                              
                              {/* Asumiendo que el Mando Xbox es el ID 3 de tu products.ts */}
                              <Link to="/product/3" className="btn btn-primary">Ver Producto</Link>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 mb-4">
                      <div className="card bg-dark text-white">
                          <div className="card-body">
                              <h5 className="card-title">Sillas</h5>
                              <img src="/img/silla gamer.webp" alt="Silla Gamer" className="img-fluid mb-3"/>
                              <p className="card-text">Silla ergonomica Secretlab Titan</p>
                              

                              {/* Asumiendo que la Silla Secretlab es el ID 7 */}
                              <Link to="/product/7" className="btn btn-primary">Ver Producto</Link>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 mb-4">
                      <div className="card bg-dark text-white">
                          <div className="card-body">
                              <h5 className="card-title">Mouses</h5>
                              <img src="/img/mouse_gamer.webp" alt="Mouse Logitech G502 HERO" className="img-fluid mb-3"/>
                              <p className="card-text">Mouse Logitech G502 HERO</p>
                              
                              {/* Asumiendo que el Mouse G502 es el ID 8 */}
                              <Link to="/product/8" className="btn btn-primary">Ver Producto</Link>
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
                              
                              {/* 5. Usamos Link a /Noticias */}
                              <Link to="/Noticias" className="btn btn-primary">Leer más</Link>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-3 mb-4">
                      <div className="card bg-dark text-white">
                          <div className="card-body">
                              <h5 className="card-title">Récord en campeonato mundial de eSports</h5>
                              <img src="/img/eSport.webp" alt="World eSports Championship 2025" className="img-fluid mb-3"/>
                              <p className="card-text">El World eSports Championship 2025 rompió récords con más de 8,5 millones de espectadores. El torneo repartió 15 millones en premios.</p>
                              
                              {/* 6. Usamos Link a /Noticias */}
                              <Link to="/Noticias" className="btn btn-primary">Leer más</Link>
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