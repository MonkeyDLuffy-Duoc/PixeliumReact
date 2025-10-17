import { useParams } from "react-router-dom"
import { products } from "../data/products";

export const ProductDetail = () => {
    const { id } =useParams<{id: string}>();
    const pid =Number(id);
    const product = products.find((p) => p.id === pid);
  return (
    <>
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
            <img src="/img/todos_voltereta.gif" alt="Gamer haciendo volteretas" className="img-fluid mt-4" style={{maxWidth: "600px"}}/>
        </div>
    </div>
        </div>
    </div>
        </section>

    <section className="featured-products py-0">

    <div className="container py-5 pt-0">
                 <div className="row text-center">
                    <div className="col-md-12 mb-4">
                        <div className="card bg-dark text-white">
                             <h5 className="card-title">{product?.title}</h5>

    <div id="carouselExample" className="carousel slide">
<div className="carousel-inner">
  <div className="carousel-item active d-flex justify-content-center">
    <img
      className="img-fluid"src={product?.imageSrc} style={{ maxWidth: "750px", width: "100%", height: "auto" }} alt="..."/>
  </div>

  <div className="carousel-item d-flex justify-content-center">
    <img
      className="img-fluid" src={product?.imageSrc2} style={{ maxWidth: "750px", width: "100%", height: "auto" }} alt="..."/>
  </div>
</div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
                            <div className="card-body">
                                <p className="card-text">{product?.description}</p>
                                <div className="detalles-producto">
                                <div className="precio-producto">Precio Completo</div>
                                <button type="button" className="btn btn-outline-secondary">{product?.price}</button>
                                <div className="precio-producto">Precio especial registrados</div>
                                <button type="button" className="btn btn-outline-primary">${(product?.price)}</button>
                                <hr/>
                                </div>
                                <a href="productos.html" className="btn btn-primary">Agregar al carrito</a>
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
                                    <img className="img-fluid rounded" style={{maxWidth: "175px"}} src="/img/silla gamer.webp" alt="silla gamer"/>
                                </div>
                                <p className="card-text">Descripción breve del producto innovador.</p>
                                <a href="productos.html" className="btn btn-primary">Ver Producto</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Play Station 5 slim</h5>
                                 <div className="foto-producto">
                                    <img className="img-fluid rounded" style={{maxWidth: "175px"}} src="/img/play_5.webp" alt="play_5"/>
                                </div>
                                <p className="card-text">Descripción breve de otro producto esencial.</p>
                                <a href="productos.html" className="btn btn-primary">Ver Producto</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Auriculares HyperX Cloud II</h5>
                                 <div className="foto-producto">
                                    <img className="img-fluid rounded" style={{maxWidth: "175px"}} src="/img/HYPERXX.png" alt="Auriculares"/>
                                </div>
                                <p className="card-text">Descripción breve del último lanzamiento.</p>
                                <a href="productos.html" className="btn btn-primary">Ver Producto</a>
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