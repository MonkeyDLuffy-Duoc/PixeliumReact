import { Link, NavLink } from "react-router-dom"
export const Contact = () => {
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
            <img src="img/todos_voltereta.gif" alt="Gamer haciendo volteretas" className="img-fluid mt-4" style={{maxWidth: "600px"}}/>
        </div>
    </div>
        </div>
    </div>
        </section>

        <section id="contacto" className="p-4 bg-ldarkt">
            <div className="container">
            <div className="row justify-content-center">
                <div className="p-4 card bg-dark text-white">
                    <h2 className="mb-4">Contacto</h2>
                    <div id="regAlert" className="alert d-none" role="alert"></div>
                    <form id='formContacto' className="row g-3" noValidate>
                    <div className="col-12 col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre completo</label>
                        <input type="text" className="form-control" id="ctonombre" name="nombre" placeholder="Elsa Payo" required/> 
                            
                        <div className="invalid-feedback">Sólo letras y espacios, máximo 40 caracteres.</div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="ctocorreo" name="correo" placeholder="hola@example.com" required/>
                        <div className="invalid-feedback">Debe ser un correo válido @duoc.cl o duoc estudiante</div>
                    </div>

                    
                    <div className="col-12 col-md-6">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="ctotelefono" name="telefono"
                            placeholder="+56 9 1234 5678" pattern="^[0-9+\s()-]{8,}$" required/>
                            <div className="invalid-feedback">Ingresa un teléfono válido (7-15 dígitos/símbolos).</div>
                    </div>
                    
                    <div className="col-12 col-md-6">
                        <label htmlFor="comuna" className="form-label">Comuna</label>
                        <select className="form-select" id="comuna" name="comuna" required>
                        <option value="">Seleccione una comuna</option>
                        </select>
                        <div className="invalid-feedback">Selecciona una comuna.</div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="asunto" className="form-label">Asunto</label>
                        <textarea className="form-control" id="ctoasunto" name="asunto" rows={5} placeholder="Escribe tu mensaje aquí..." required/>
                        <div className="invalid-feedback">Debes incluir un mensaje de máximo 300 carateres.</div>
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary btn-lg" type="submit"> Enviar</button>
                    </div>
                    </form>
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
  )
}
