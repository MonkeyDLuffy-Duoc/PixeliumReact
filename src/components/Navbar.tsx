import { Link } from "react-router-dom"
import { NavLink, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react";

export const Navbar = () => {

  const { totalItems } = useCart();
  const [localSearch, setLocalSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    if (localSearch.trim() === '') return; // No buscar si está vacío
    
    // Navega a la página de productos con el query
    navigate(`/products?search=${localSearch}`);
  };

  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
          <div className="container-fluid">
            <div className="navbar-brand-group d-flex align-items-center">
              <img src="/img/logo.webp" alt="Logo" className="logo-image"/>
              <NavLink to="/" className="logo ms-2">Level-UP Gamer</NavLink>
              <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-links">
                <li className="nav-item"><NavLink className="nav-link" to="/Noticias">Noticias</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/Contact">Contacto</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/Nosotros">Nosotros</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/Login">Iniciar Sesión</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/Products">Productos</NavLink></li>
              </ul>

              <form 
                className="d-flex ms-lg-3 mt-2 mt-lg-0" 
                onSubmit={handleSearchSubmit} 
              >
                <input 
                  className="form-control me-2" 
                  type="search" 
                  placeholder="Buscar producto" 
                  aria-label="Search"
                  value={localSearch} 
                  onChange={(e) => setLocalSearch(e.target.value)} 
                />
                <button className="btn btn-primary" type="submit">Buscar</button>
              </form>

              {/* --- ICONO DE CARRITO --- */}
              <div className="d-flex align-items-center ms-lg-3 mt-2 mt-lg-0">
                
                {/* El 'style' se eliminó del Link porque ya no es necesario */}
                <Link to="/cart" className="position-relative text-decoration-none">
                  
                  <i className="bi bi-cart4 fs-3 text-white"></i> 
                  
                  {/* Badge de contador */}
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