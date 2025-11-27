import { useParams } from "react-router-dom";
// import { products } from "../data/products"; // <--- ELIMINAR: Ya no se usa data estática
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from "react"; // 1. IMPORTAR useEffect y useState

// 2. Definimos la interfaz (Asegúrate de que coincida con tu modelo Producto.java)
interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    imageSrc: string; // URL o nombre del archivo
    imageSrc2: string; 
    imageSrc3: string;
    imageSrc4: string;
}

// 3. URLs de la API (Asegúrate de que coincidan con Product.tsx)
const API_BASE_URL = "http://localhost:8080/api/v1/productos";
const IMAGE_URL = "http://localhost:8080/images/";

export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    
    // 4. ESTADO: Almacenar los detalles del producto cargado
    const [product, setProduct] = useState<Product | null>(null);

    // 5. EFECTO: Cargar el producto por ID al iniciar el componente
    useEffect(() => {
        if (id) {
            // Llama a http://localhost:8080/api/v1/productos/{id}
            fetch(`${API_BASE_URL}/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Producto no encontrado');
                    }
                    return response.json();
                })
                .then(data => setProduct(data))
                .catch(error => {
                    console.error("Error cargando producto:", error);
                    setProduct(null); // Establecer como null si falla la carga
                });
        }
    }, [id]); // Dependencia del ID de la URL

    // --- MANEJADORES Y LÓGICA ---
    
    const handleAddToCart = () => {
        if (product) {
            addToCart(product, 1);
            toast.success(`${product.title} agregado al carrito!`, {
                icon: '🛒',
                className: 'toast-agregado-ok',
            });
        }
    };
    
    // 6. CREAMOS UN ARRAY DE IMÁGENES PARA FACILITAR LA RENDERIZACIÓN DEL CARRUSEL
    // Filtramos las imágenes que tienen un nombre (no son null/undefined)
    const images = [
        product?.imageSrc, 
        product?.imageSrc2, 
        product?.imageSrc3, 
        product?.imageSrc4
    ].filter(src => src); // Filtra los valores vacíos o nulos

    // --- RENDERIZACIÓN ---

    // 7. Si product es null (por no encontrar o por error de carga), muestra el 404
    if (!product) {
        return (
            <main className="main-content pt-0">
                <section className="hero-section py-5">
                    <div className="container-fluid hero-background">
                        <div className="container text-center my-5 text-white">
                            <h1 className="display-4">Error 404</h1>
                            <p className="lead">Producto no encontrado.</p>
                            <div className="text-center">
                                <img src="/img/error.gif" 
                                    alt="Producto no encontrado" 
                                    className="img-fluid mt-4" 
                                    style={{maxWidth: "300px", width: "100%", height: "auto"}}/>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
    
    // 8. Renderización del detalle (usamos 'product' directamente ya que sabemos que existe)
    return (
        <>
        <section className="hero-section text-center py-5">
        <div className="container-fluid hero-background">
            <section className="featured-products py-0">

        <div className="container py-5 pt-0">
                    <div className="row text-center">
                        <div className="col-md-12 mb-4">
                            <div className="card bg-dark text-white">
                                    <h1 className="card-title">{product.title}</h1>

                                <Carousel>
                                    {/* 9. RECORREMOS EL ARRAY DE IMÁGENES PARA CREAR ITEMS DEL CARRUSEL */}
                                    {images.map((src, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="d-flex justify-content-center">
                                                <img
                                                    className="img-fluid" 
                                                    // CONSTRUIMOS LA URL COMPLETA
                                                    src={`${IMAGE_URL}${src}`} 
                                                    style={{ maxWidth: "750px", width: "100%", height: "auto", maxHeight: "400px", objectFit: 'contain' }} 
                                                    alt={`Imagen ${index + 1} de ${product.title}`}
                                                    onError={(e) => {
                                                        // Fallback por si la imagen física no existe
                                                        (e.target as HTMLImageElement).src = "/img/error.gif"; 
                                                    }}
                                                />
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                    {/* Mostrar un fallback si no hay imágenes */}
                                    {images.length === 0 && (
                                        <Carousel.Item>
                                            <div className="d-flex justify-content-center">
                                                <img
                                                    className="img-fluid" 
                                                    src="/img/no-image.png" 
                                                    style={{ maxWidth: "750px", width: "100%", height: "auto" }} 
                                                    alt="Imagen no disponible"
                                                />
                                            </div>
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                                <div className="card-body">
                                    <p className="card-text">{product.description}</p>
                                    <div className="detalles-producto">
                                        <div className="precio-producto">Precio Completo</div>
                                        <button type="button" className="btn btn-outline-secondary">
                                            {product.price.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}
                                        </button>
                                        <div className="precio-producto">Precio especial registrados</div>
                                        <button type="button" className="btn btn-outline-primary">
                                            {(product.price * 0.80).toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}
                                        </button>
                                        <hr/>
                                    </div>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={handleAddToCart}>Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
        <div className="container-fluid hero-background pt-2">
            {/* ... Sección "Te podría interesar" (se mantiene sin cambios) ... */}
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
        </div>
    </section>
        </div>
        </section>

        
    
        </>
    );
}