
export const Footer = () => {
  return (
    <>
        <footer className="text-center py-3">
        
            <div className="container text-center">
                <h2>¿Tienes alguna pregunta?</h2>
                <p>Contáctanos para más información o para una consulta.</p>
                <a href="contacto.html" className="btn btn-lg btn-primary mt-3">Contáctanos ahora</a>
                <p></p>
                <img src="assets/img/mario.gif" alt="Mario saludando" className="img-fluid mt-4" style={{maxWidth: "150px"}}/>
            </div>
            
            <div className="d-flex justify-content-center gap-4 mt-3">
                    <a href="https://web.whatsapp.com/" target="_blank" className="social-icon whatsapp">
                        <i className="fab fa-whatsapp"></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" className="social-icon instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.twitch.tv/" target="_blank" className="social-icon twitch">
                        <i className="fab fa-twitch"></i>
                    </a>
                    <a href="https://www.mercadolibre.cl/" target="_blank" className="social-icon mercadolibre">
                        <i className="fas fa-store"></i>
                    </a>
            </div>
            
            <p className="text-center">¡Síguenos en nuestras redes sociales!</p>
        <p>&copy; 2025 Level-UP Gamer. Todos los derechos reservados <img src="assets/img/pixelium.gif" style={{maxWidth: "170px"}}/></p>
    </footer>
    </>
  )
}
