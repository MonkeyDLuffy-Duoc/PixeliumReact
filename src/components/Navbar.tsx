import React from 'react'

export const Navbar = () => {
  return (
    <>
        <header className="header">
  <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
    <div className="container-fluid">


      <div className="navbar-brand-group d-flex align-items-center">
        <img src="assets/img/logo.webp" alt="Logo" className="logo-image"/>
        <a href="index.html" className="logo ms-2">Level-UP Gamer</a>
      <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      </div>

      

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-links">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
               data-bs-toggle="dropdown" aria-expanded="false">
              Productos
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Accesorios</a></li>
              <li><a className="dropdown-item" href="#">Consolas</a></li>
              <li><a className="dropdown-item" href="#">Computadoras Gamers</a></li>
              <li><a className="dropdown-item" href="#">Sillas Gamers</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="productos.html">Ver más</a></li>
            </ul>
          </li>
          <li className="nav-item"><a className="nav-link" href="noticias.html">Noticias</a></li>
          <li className="nav-item"><a className="nav-link" href="contacto.html">Contacto</a></li>
          <li className="nav-item"><a className="nav-link" href="nosotros.html">Nosotros</a></li>
          <li className="nav-item"><a className="nav-link" href="login.html">Iniciar Sesión</a></li>
        </ul>

        <form className="d-flex ms-lg-3 mt-2 mt-lg-0">
          <input className="form-control me-2" type="search" placeholder="Buscar producto" aria-label="Search"/>
          <button className="btn btn-primary" type="submit">Buscar</button>
            <a href="carrito_compra.html" className="ms-3">
            <i className="bi bi-cart4 fs-3"></i>
                </a>
        </form>
      </div>
    </div>
  </nav>
</header>
    </>
  )
}
