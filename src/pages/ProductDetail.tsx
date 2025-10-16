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
            <img src="img/todos_voltereta.gif" alt="Gamer haciendo volteretas" className="img-fluid mt-4" style={{maxWidth: "600px"}}/>
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
                             <h5 className="card-title">Controlador Inalámbrico Xbox Series X|S</h5>

    <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="img-fluid d-block" src="assets/img/mando3.webp.png" style={{maxWidth: "547px"}} alt="..."/>
    </div>

        <div className="carousel-item">
      <img className="img-fluid d-block" src="assets/img/mando2.webp" style={{maxWidth: "547px"}} alt="..."/>
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
                                <p className="card-text">Ofrece una experiencia de juego cómoda con
                                                        botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.</p>
                                <div className="detalles-producto">
                                <div className="precio-producto">Precio Completo</div>
                                <button type="button" className="btn btn-outline-secondary">$79.990</button>
                                <div className="precio-producto">Precio especial registrados</div>
                                <button type="button" className="btn btn-outline-primary">$63.992</button>
                                <hr/>
                                </div>
                                <a href="productos.html" className="btn btn-primary">Agregar al carrito</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
    </div>
</section>
    </>
  )
}