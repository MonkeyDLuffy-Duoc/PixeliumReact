import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <footer className="text-center py-3">

        <div className="container text-center">
          <h2>¿Tienes alguna pregunta?</h2>
          <p>Contáctanos para más información o para una consulta.</p>
          <NavLink to="/Contact" className="btn btn-primary mt-3">Contactanos ahora</NavLink>
          <p></p>
          {/* Asegúrate de que la ruta de la imagen sea correcta en tu proyecto de React */}
          <img src="/img/mario.gif" alt="Mario saludando" className="img-fluid mt-4" style={{ maxWidth: "150px" }} />
        </div>

        {/* SECCIÓN CORREGIDA:
          Reemplazamos <i className="fab fa-whatsapp"></i> por <FontAwesomeIcon icon={faWhatsapp} />
          y agregamos rel="noopener noreferrer"
        */}
        <div className="d-flex justify-content-center gap-4 mt-3">
          {/* WhatsApp: antes 'fab fa-whatsapp' */}
          <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>

          {/* Instagram: antes 'fab fa-instagram' */}
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          {/* Twitch: antes 'fab fa-twitch' */}
          <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer" className="social-icon twitch">
            <FontAwesomeIcon icon={faTwitch} />
          </a>

          {/* MercadoLibre/Store: antes 'fas fa-store' */}
          <a href="https://www.mercadolibre.cl/" target="_blank" rel="noopener noreferrer" className="social-icon mercadolibre">
            <FontAwesomeIcon icon={faStore} />
          </a>
        </div>
        {/* FIN SECCIÓN CORREGIDA */}

        <p className="text-center">¡Síguenos en nuestras redes sociales!</p>
        <p>&copy; 2025 Level-UP Gamer. Todos los derechos reservados <img src="/img/pixelium.gif" style={{ maxWidth: "170px" }} /></p>
      </footer>
    </>
  )
}
