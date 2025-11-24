import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Interfaz que coincide con tu Backend + las imágenes extra
interface Producto {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  imageSrc: string;
  imageSrc2?: string;
  imageSrc3?: string;
  imageSrc4?: string;
}

export const Product = () => {

  const IMAGE_URL = "http://localhost:8080/images/"; 
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  // 1. ESTADO PARA DATOS DEL BACKEND
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. ESTADOS DE FILTRADO (Tu lógica original)
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(''); // String vacío para permitir "sin límite"

  // 3. EFECTO: CARGAR PRODUCTOS DESDE SPRING BOOT
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/productos")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando productos:", error);
        setLoading(false);
      });
  }, []);

  // 4. LÓGICA DE FILTRADO (Aplicada sobre los datos cargados)
  
  // Obtenemos categorías únicas de los productos cargados
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const normalizedSearch = searchTerm.toLowerCase();

  const filteredProducts = products.filter((p) => {
    // --- TU FILTRO DE PRECIO ORIGINAL ---
    // Si maxPrice está vacío, usamos Infinity, si no, lo convertimos a número
    const max = maxPrice === '' ? Infinity : Number(maxPrice);
    
    const priceFilter = p.price >= minPrice && p.price <= max;
    
    // Filtro de categoría
    const categoryFilter = (selectedCategory === "all" || p.category === selectedCategory);

    // Filtro de búsqueda (Buscador)
    // Agregamos protección (p.title ?) por si algún dato viene nulo de la BD
    const titleMatch = p.title ? p.title.toLowerCase().includes(normalizedSearch) : false;
    const descMatch = p.description ? p.description.toLowerCase().includes(normalizedSearch) : false;
    
    const searchFilter = searchTerm === '' ? true : (titleMatch || descMatch);

    // El producto debe cumplir TODAS las condiciones
    return priceFilter && categoryFilter && searchFilter;
  });

  // 5. MANEJADORES (HANDLERS) ORIGINALES
  const handleReset = () => {
    setSelectedCategory("all");
    setMinPrice(0);
    setMaxPrice('');
    setSearchParams({}); // Limpia la URL
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value === '' ? 0 : Number(value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value); // Guardamos como string para permitir borrar el input
  };

  if (loading) return <div className="text-center mt-5 text-white"><h2>Cargando inventario...</h2></div>;

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
                  <NavLink to="/Home" className="btn btn-primary mt-3">Descubre más</NavLink>
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

        {/* SECCIÓN DE FILTROS */}
        <div className="container my-4">
          <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 p-3 bg-dark text-white rounded shadow-sm">
            
            {/* FILTRO DE CATEGORIA */}
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="category" className="form-label mb-0 fw-bold">
                Categoría
              </label>
              <select
                name="category"
                id="category"
                className="form-select form-select-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "Todas" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* FILTRO DE PRECIO MIN Y MAX (RESTAURADO) */}
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <label htmlFor="minPrice" className="form-label mb-0">
                Mín $
              </label>
              <input
                id="minPrice"
                type="number"
                className="form-control form-control-sm"
                style={{ width: 110 }}
                value={minPrice}
                onChange={handleMinChange}
              />

              <label htmlFor="maxPrice" className="form-label mb-0">
                Máx $
              </label>
              <input
                id="maxPrice"
                type="number"
                placeholder="Sin límite"
                className="form-control form-control-sm"
                style={{ width: 110 }}
                value={maxPrice}
                onChange={handleMaxChange}
              />
              
              <button className="btn btn-outline-secondary btn-sm" onClick={handleReset}>
                Restablecer
              </button>
            </div>
          </header>
        </div>

        {/* LISTA DE PRODUCTOS */}
        <div className="container">
          <div className="row text-center g-4">
            
            {filteredProducts.map(p => (
              <div key={p.id} className="col-lg-4 col-md-6 col-12">
                <div className="card bg-dark text-white h-100">
                  <div className="card-body d-flex flex-column">
                    
                    <h5 className="card-title" style={{ minHeight: '3rem' }}>{p.title}</h5> 
                    
                    <div 
                      className="foto-producto d-flex align-items-center justify-content-center" 
                      style={{ minHeight: '190px' }}
                    >
                      <img 
                        className="img-fluid rounded" 
                        style={{ maxHeight: "175px", width: "auto", objectFit: 'contain' }} 
                        src={ IMAGE_URL} 
                        alt={p.title}
                        onError={(e) => {e.currentTarget.src = '/img/placeholder.png'}} // Fallback si falla la imagen
                      />
                    </div>
                    
                    <p className="card-text">{p.description}</p>
                    
                    <div className="mt-auto">
                      <div className="detalles-producto">
                        <div className="precio-producto">Precio Completo</div>
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
              </div>
            ))}

            {/* MENSAJE SIN RESULTADOS */}
            {filteredProducts.length === 0 && (
              <div className="col-12 text-center text-white">
                <h3 className="my-5">Sin resultados</h3>
                <div className="text-center">
                <img src="/img/error.gif" 
                  alt="Error" 
                  className="img-fluid mt-4" 
                  style={{maxWidth: "300px", width: "100%", height: "auto"}}/>
                </div>
                <h5 className="my-5">No se encontraron productos que coincidan con los filtros seleccionados.</h5>
              </div>
            )}
            
          </div>
        </div>

        {/* NOTICIAS (Estáticas) */}
        <section className="news-section py-0 bg-transparent text-white mb-0">
          <div className="container-fluid hero-background pt-2">
            <h2 className="text-center mb-4">Últimas Noticias</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Nuevo RPG sorprende con mecánicas innovadoras.</h5>
                                <img src="/img/ER3.webp" alt="Eternal Realms" className="img-fluid mb-3"/>
                                <p className="card-text">Eternal Realms: Awakening combina mundo abierto y decisiones que alteran la historia.</p>
                                <a href="#" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Récord en campeonato mundial de eSports</h5>
                                <img src="/img/eSport.webp" alt="eSports" className="img-fluid mb-3"/>
                                <p className="card-text">El World eSports Championship 2025 rompió récords con más de 8,5 millones de espectadores.</p>
                                <a href="#" className="btn btn-primary">Leer más</a>
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