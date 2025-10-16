import React from 'react'

export const Register = () => {
  return (
    <>
    <main className="main-content pt-0">
        <section className="hero-section text-center py-5">
    <div className="container-fluid hero-background">
        <div className="container">
            <div className="row justify-content-center">
                <div className="p-4 card bg-dark text-white">
                    <h2 className="mb-4">Registrate</h2>
                    <div id="regAlert" className="alert d-none" role="alert"></div>
                    <form id="formRegistro" action="" method="post" className="row g-3" >
                    <div className="col-12 col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre completo</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" 
                        placeholder="Elsa Payo"/>
                    </div>
                    
                    <div className="col-12 col-md-6">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="telefono" placeholder="+56 9 1234 5678" />
                    </div>
                    
                    <div className="col-12 col-md-6">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                        <input type="date" className="form-control" id="fechaNacimiento" name="fechaNacimiento"/>
                    </div>
                    
                    <div className="col-12 col-md-6">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="correo" name="correo" 
                        placeholder="hola@example.com"/>
                    </div>

                    
                    <div className="col-12 col-md-6">
                      <label htmlFor="correo" className="form-label">Confirma tu correo</label>
                      <input type="email" className="form-control" id="correo2" name="correo" 
                      placeholder="hola@example.com"/>
                    </div>
                    
                    <div className="col-12 col-md-6">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" name="contrasena" 
                        placeholder="********"/>
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="contrasena" className="form-label">Confirma tu contraseña</label>
                      <input type="password" className="form-control" id="password2" name="contrasena" 
                      placeholder="********"/>
                    </div>
                    
                    <div className="col-12 col-md-6">
                        <label htmlFor="comuna" className="form-label">Comuna</label>
                        <select className="form-select" id="comuna" name="comuna" >
                        <option value="">Seleccione una comuna</option>                        
                        </select>
                    </div>
                    <div className="col-12 col-md-6 mx-auto">
                        <label htmlFor="correo" className="form-label">Referido</label>
                        <input type="email" className="form-control" id="correo3" name="correo" 
                        placeholder="hola@example.com"/>
                    </div>
                    <p></p>
                    

                    <div className="col-12">
                        <button className="btn btn-primary btn-lg mt-3 mb-4" type="submit">Enviar</button>
                        <a href="login.html" className="btn btn-secondary btn-lg mt-3 mb-4">Volver</a>
                    </div>
                    </form>
                </div>
            </div>      
            </div>
    </div>
        </section>
    </main>
    </>
  )
}
