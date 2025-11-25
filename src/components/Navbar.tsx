import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export const Navbar = () => {

  const { totalItems } = useCart();
  const [localSearch, setLocalSearch] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // 1. ESTADO PARA EL USUARIO
  const [user, setUser] = useState<any>(null); // Guardaremos el objeto usuario aquí
  
  const navigate = useNavigate();
  const location = useLocation(); // Hook para detectar cambio de rutas

  // 2. EFECTO: Se ejecuta cada vez que cambiamos de página (location)
  useEffect(() => {
    // Intentamos leer el usuario del LocalStorage
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error("Error al leer usuario", error);
            setUser(null);
        }
    } else {
        setUser(null);
    }
  }, [location]); // <--- La clave: se actualiza al navegar

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (localSearch.trim() === '') return; 
    navigate(`/products?search=${localSearch}`);
  };

  const closeMenu = () => setIsAdminOpen(false);

  // 3. FUNCIÓN PARA CERRAR SESIÓN
  const handleLogout = () => {
    localStorage.removeItem("usuario"); // Borramos datos
    setUser(null); // Limpiamos estado
    closeMenu();
    navigate("/login"); // Redirigimos al login
  };

  return (
    <>
      <style>{`
        .dropdown-item:hover, 
        .dropdown-item:focus, 
        .dropdown-item:active, 
        .dropdown-item.active {
          background-color: transparent !important;
          color: #0d6efd !important;
        }
      `}</style>

      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
          <div className="container-fluid">
            
            {/* --- LOGO Y BIENVENIDA --- */}
            <div className="navbar-brand-group d-flex align-items-center">
              <img src="/img/logo.webp" alt="Logo" className="logo-image"/>
              <NavLink to="/" className="logo ms-2">Level-UP Gamer</NavLink>
              
              {/* MENSAJE DE BIENVENIDA (Solo si hay usuario) */}
              {user && (
                  <Link to="/perfil" className="d-none d-md-flex flex-column ms-3 ps-3 border-start border-secondary text-decoration-none" title="Ir a mi perfil">
                      <span className="text-white" style={{fontSize: "0.85rem"}}>Bienvenido</span>
                      <span className="text-primary fw-bold" style={{fontSize: "0.9rem", marginTop: "-3px"}}>
                          {user.nombre}
                      </span>
                  </Link>
              )}

              <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-links align-items-center">
                
                {/* Mensaje móvil */}
                {user && (
                    <li className="nav-item d-md-none text-white my-2 text-center">
                        Hola, {user.nombre}
                    </li>
                )}

                <li className="nav-item"><NavLink className="nav-link" to="/Noticias">Noticias</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/Products">Productos</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/Contact">Contacto</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/Nosotros">Nosotros</NavLink></li>
                
                {/* --- ADMIN PANEL (Solo visible si hay usuario y es ADMIN) --- 
                    Nota: Si tu usuario no tiene rol 'ADMIN' en base de datos, 
                    puedes quitar la condición `&& user.role === 'ADMIN'` para probar.
                */}
                {user && (
                    <li className="nav-item dropdown">
                    <a 
                        className={`nav-link dropdown-toggle ${isAdminOpen ? 'show' : ''}`} 
                        href="#" 
                        role="button" 
                        onClick={(e) => {
                        e.preventDefault();
                        setIsAdminOpen(!isAdminOpen);
                        }}
                        aria-expanded={isAdminOpen}
                    >
                        Admin Panel
                    </a>
                    <ul className={`dropdown-menu dropdown-menu-dark ${isAdminOpen ? 'show' : ''}`} style={{ right: 0, left: 'auto' }}>
                        <li><NavLink className="dropdown-item" to="/admin/crear-noticia" onClick={closeMenu}>Crear Noticia</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/admin/crear-producto" onClick={closeMenu}>Crear Producto</NavLink></li>
                    </ul>
                    </li>
                )}

                {/* --- LOGIN / LOGOUT DINÁMICO --- */}
                {user ? (
                    // SI ESTÁ LOGUEADO: Muestra "Cerrar Sesión" en rojo
                    <li className="nav-item">
                        <button 
                            className="nav-link btn btn-link text-danger fw-bold border-0 bg-transparent" 
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>
                    </li>
                ) : (
                    // SI NO ESTÁ LOGUEADO: Muestra "Login"
                    <li className="nav-item"><NavLink className="nav-link" to="/Login">Login</NavLink></li>
                )}
                
              </ul>

              <form 
                className="d-flex ms-lg-3 mt-2 mt-lg-0" 
                onSubmit={handleSearchSubmit} 
              >
                <input 
                  className="form-control me-2" 
                  type="search" 
                  placeholder="Buscar..." 
                  aria-label="Search"
                  value={localSearch} 
                  onChange={(e) => setLocalSearch(e.target.value)} 
                />
                <button className="btn btn-primary" type="submit">Buscar</button>
              </form>

              {/* --- ICONO DE CARRITO --- */}
              <div className="d-flex align-items-center ms-lg-3 mt-2 mt-lg-0">
                <Link to="/cart" className="position-relative text-decoration-none">
                  <i className="bi bi-cart4 fs-3 text-white"></i> 
                  {totalItems > 0 && (
                    <span 
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                      style={{ fontSize: '0.65em' }}
                    >
                      {totalItems}
                      <span className="visually-hidden">items en el carrito</span>
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}