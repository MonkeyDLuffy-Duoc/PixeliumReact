import { useParams } from "react-router-dom"
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import Carousel from 'react-bootstrap/Carousel';

export const ProductDetail = () => {
    const { id } =useParams<{id: string}>();
    const pid =Number(id);
    const product = products.find((p) => p.id === pid);
    const { addToCart } = useCart();
    
    const handleAddToCart = () => {
      // Nos aseguramos que el producto exista antes de agregarlo
      if (product) {
      addToCart(product, 1);
      
      toast.success(`${product.title} agregado al carrito!`, {
        icon: '🛒',
        
        // 👇 AQUÍ USAS LA CLASE DE TU index.css
        className: 'toast-agregado-ok',
      });
    }
  };
    if (!product) {
      return (
        <main className="main-content pt-0">
      <section className="hero-section py-5"> {/* Quitamos text-center de aquí para alinear el contenido */}
        <div className="container-fluid hero-background">
          <div className="container my-4 text-white">
        <div className="container text-center my-5 text-white">
          <h1 className="display-4">Error 404</h1>
          <p className="lead">Producto no encontrado.</p>
          <div className="text-center">
          <img src="/img/error.gif" 
          alt="Gamer haciendo volteretas" 
          className="img-fluid mt-4" 
          style={{maxWidth: "300px", width: "100%", height: "auto"}}/>
          </div>
        </div>
            </div>
        </div>
        </section>
        </main>
      )
    }
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

                            <Carousel>
                              <Carousel.Item>
                                <div className="d-flex justify-content-center">
                                  <img
                                    className="img-fluid"src={product?.imageSrc2} 
                                    style={{ maxWidth: "750px", width: "100%", height: "auto" }} 
                                    alt="..."
                                  />
                                </div>
                              </Carousel.Item>
                              
                              <Carousel.Item>
                                <div className="d-flex justify-content-center">
                                  <img
                                    className="img-fluid" src={product?.imageSrc3} 
                                    style={{ maxWidth: "750px", width: "100%", height: "auto" }} 
                                    alt="..."
                                  />
                                </div>
                              </Carousel.Item>
                            </Carousel>
                            <div className="card-body">
                                <p className="card-text">{product?.description}</p>
                                <div className="detalles-producto">
                                <div className="precio-producto">Precio Completo</div>
                                <button type="button" className="btn btn-outline-secondary">{((product?.price ?? 0)).toLocaleString('es-CL', 
                                {style: 'currency',currency: 'CLP'})}</button>
                                <div className="precio-producto">Precio especial registrados</div>
                                <button type="button" className="btn btn-outline-primary">{((product?.price ?? 0) * 0.80).toLocaleString('es-CL', 
                                {style: 'currency',currency: 'CLP'})}</button>
                                <hr/>
                                </div>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={handleAddToCart}>Agregar al carrito</button>
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