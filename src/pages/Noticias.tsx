import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";


// 1. Definimos la estructura de datos que viene del Back
interface Noticia {
    id: number;
    titulo: string;
    detalle: string;
    imagen: string; // El nombre del archivo, ej: "foto1.jpg"
}

export const Noticias = () => {

    // 2. Estado para guardar las noticias
    const [noticias, setNoticias] = useState<Noticia[]>([]);

    // URL base de tu backend (ajusta el puerto si no es 8080)
    const API_URL = "http://localhost:8080/api/v1/noticias";
    const IMAGE_URL = "http://localhost:8080/images/"; 

    // 3. Cargar datos al iniciar el componente
    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setNoticias(data))
            .catch(error => console.error("Error cargando noticias:", error));
    }, []);

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
                                        style={{ maxWidth: "600px", width: "100%", height: "auto" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="news-section">
                    <div className="container py-5 pt-0">
                        <h2 className="text-center mb-2 mt-0">Noticias del mundo gamer</h2>
                        <div className="row text-center py-5 pb-0">
                            
                            {/* 4. AQUÍ ES DONDE OCURRE LA MAGIA: Renderizado Dinámico */}
                            {noticias.length === 0 ? (
                                <p className="text-white">Cargando noticias...</p>
                            ) : (
                                noticias.map((noticia) => (
                                    <div key={noticia.id} className="col-md-12 mb-12">
                                        <div className="card bg-dark text-white mb-4"> {/* Agregué mb-4 para espacio entre cards */}
                                            <div className="card-body">
                                                <h5 className="card-title">{noticia.titulo}</h5>
                                                
                                                {/* Construimos la URL de la imagen */}
                                                {noticia.imagen && (
                                                    <img 
                                                        src={`${IMAGE_URL}${noticia.imagen}`} 
                                                        alt={noticia.titulo} 
                                                        className="img-fluid mb-3"
                                                        style={{maxHeight: "400px", objectFit: "cover"}} 
                                                    />
                                                )}
                                                
                                                <p className="card-text pl m-4">
                                                    {noticia.detalle}
                                                </p>
                                                
                                                {/* Si tuvieras un link externo en la BD, lo usarías aquí. 
                                                    Por ahora dejo un link genérico o podrías agregar el campo 'url' a tu BD */}
                                                <button className="btn btn-primary">Leer más</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            
                        </div>
                    </div>
                </section>

                {/* Sección estática de productos (se mantiene igual por ahora) */}
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
    );
};