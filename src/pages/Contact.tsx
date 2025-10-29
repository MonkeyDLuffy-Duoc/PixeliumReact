import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export const Contact = () => {

  // --- 1. DEFINICIÓN DE LÓGICA Y DATOS ---

  // Diccionario de comunas (de tu JS)
  const comunas = {
    "PA" : "Puente Alto",
    "LF" : "La Florida",
    "LR" : "La Reina",
    "LP" : "La Pintana",
    "LC" : "Las Condes",
    "PL" : "Peñalolén",
    "LG" : "La Granja",
    "EB" : "El Bosque",
    "MP" : "Maipú",
    "ST" : "Santiago"
  };

  // Funciones de validación (de tu JS)
  const soloLetrasEspacios = (str: string) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(str);
  const isDuocMail = (str: string) => /^[A-Za-z0-9-_.]+@duoc.cl$/.test(str);
  const isEstudianteMail = (str: string) => /^[A-Za-z0-9-_.]+@estudiantes.duoc.cl$/.test(str);
  const isEstudianteMail2 = (str: string) => /^[A-Za-z0-9-_.]+@duocuc.cl$/.test(str);
  // (Corregido para que sea obligatorio, ya que el input tiene 'required')
  const validPhone = (str: string) => /^[0-9+()-]{8,15}$/.test(str);

  // --- 2. MANEJO DE ESTADO ---

  const [formData, setFormData] = useState({
    ctonombre: '',
    ctocorreo: '',
    ctotelefono: '',
    ctocomuna: '',
    ctoasunto: ''
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  // --- 3. MANEJADORES ---

  // Manejador genérico para todos los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));

    // Limpia el error al corregir
    if (errors[id as keyof typeof errors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: ''
      }));
    }
  };

  // Manejador del submit (tu lógica de validación)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { ctonombre, ctocorreo, ctotelefono, ctocomuna, ctoasunto } = formData;
    let newErrors: Partial<typeof formData> = {};
    let hayError = false;

    // Validación de Nombre
    if (!ctonombre.trim()) {
      newErrors.ctonombre = 'El nombre es obligatorio.';
      hayError = true;
    } else if (!soloLetrasEspacios(ctonombre.trim()) || ctonombre.length > 40) {
      newErrors.ctonombre = 'Nombre inválido (máx. 40 caracteres, solo letras).';
      hayError = true;
    }

    // Validación de Correo
    if (!ctocorreo.trim()) {
      newErrors.ctocorreo = 'El correo es obligatorio.';
      hayError = true;
    } else if (!(isDuocMail(ctocorreo) || isEstudianteMail(ctocorreo) || isEstudianteMail2(ctocorreo))) {
      newErrors.ctocorreo = 'Debe ser un correo válido @duoc.cl, @duocuc.cl o @estudiantes.duoc.cl';
      hayError = true;
    }

    // Validación de Teléfono
    if (!ctotelefono.trim()) {
      newErrors.ctotelefono = 'El teléfono es obligatorio.';
      hayError = true;
    } else if (!validPhone(ctotelefono.trim())) {
      newErrors.ctotelefono = 'Formato de teléfono inválido (8-15 dígitos).';
      hayError = true;
    }

    // Validación de Comuna
    if (!ctocomuna) {
      newErrors.ctocomuna = 'Debes seleccionar una comuna.';
      hayError = true;
    }

    // Validación de Asunto
    if (!ctoasunto.trim()) {
      newErrors.ctoasunto = 'El asunto es obligatorio.';
      hayError = true;
    } else if (ctoasunto.length > 300) {
      newErrors.ctoasunto = 'El asunto no debe exceder los 300 caracteres.';
      hayError = true;
    }

    // --- Fin de validaciones ---

    setErrors(newErrors);

    if (hayError) {
      toast.error("Revise todos los campos", {
        icon: <img src="/img/error.gif" alt="Error" style={{ width: "60px" }} />
      });
      return;
    }

    // Éxito
    toast.success("Formulario enviado exitosamente", {
      icon: <img src="/img/check.gif" alt="Éxito" style={{ width: "60px" }} />
    });

    // Limpiamos formulario
    setFormData({
      ctonombre: '', ctocorreo: '', ctotelefono: '', ctocomuna: '', ctoasunto: ''
    });
    setErrors({});
  };

  // --- 4. RENDERIZADO DEL JSX ---

  return (
    <>
    <main className="main-content pt-0">
      {/* --- SECCIÓN HERO (Sin cambios) --- */}
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
                <img src="/img/todos_voltereta.gif" alt="Gamer haciendo volteretas" className="img-fluid mt-4" style={{maxWidth: "600px"}}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN CONTACTO (Modificada) --- */}
      <section id="contacto" className="p-4 bg-ldarkt"> {/* (Tenías un typo, 'bg-ldarkt', lo dejé por si es intencional) */}
          <div className="container">
          <div className="row justify-content-center">
              <div className="p-4 card bg-dark text-white">
                  <h2 className="mb-4">Contacto</h2>
                  
                  {/* El 'div' de alerta se elimina, lo maneja 'react-hot-toast' */}
                  
                  <form id='formContacto' className="row g-3" noValidate onSubmit={handleSubmit}>
                  
                  {/* Nombre */}
                  <div className="col-12 col-md-6">
                      <label htmlFor="ctonombre" className="form-label">Nombre completo</label>
                      <input type="text" 
                        className={`form-control ${errors.ctonombre ? 'is-invalid' : ''}`}
                        id="ctonombre" 
                        placeholder="Elsa Payo" 
                        value={formData.ctonombre}
                        onChange={handleChange}
                      /> 
                      <div className="invalid-feedback">{errors.ctonombre || 'Sólo letras y espacios, máximo 40 caracteres.'}</div>
                  </div>
                  
                  {/* Correo */}
                  <div className="col-12 col-md-6">
                      <label htmlFor="ctocorreo" className="form-label">Correo</label>
                      <input type="email" 
                        className={`form-control ${errors.ctocorreo ? 'is-invalid' : ''}`}
                        id="ctocorreo" 
                        placeholder="hola@example.com" 
                        value={formData.ctocorreo}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.ctocorreo || 'Debe ser un correo válido @duoc.cl o duoc estudiante'}</div>
                  </div>
                  
                  {/* Teléfono */}
                  <div className="col-12 col-md-6">
                      <label htmlFor="ctotelefono" className="form-label">Teléfono</label>
                      <input type="tel" 
                        className={`form-control ${errors.ctotelefono ? 'is-invalid' : ''}`}
                        id="ctotelefono" 
                        placeholder="+56 9 1234 5678" 
                        value={formData.ctotelefono}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.ctotelefono || 'Ingresa un teléfono válido (8-15 dígitos/símbolos).'}</div>
                  </div>
                  
                  {/* Comuna */}
                  <div className="col-12 col-md-6">
                      <label htmlFor="ctocomuna" className="form-label">Comuna</label>
                      <select 
                        className={`form-select ${errors.ctocomuna ? 'is-invalid' : ''}`}
                        id="ctocomuna" 
                        value={formData.ctocomuna}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione una comuna</option>
                        {/* Llenado dinámico de comunas */}
                        {Object.entries(comunas).map(([codigo, nombre]) => (
                          <option key={codigo} value={codigo}>{nombre}</option>
                        ))}
                      </select>
                      <div className="invalid-feedback">{errors.ctocomuna || 'Selecciona una comuna.'}</div>
                  </div>
                  
                  {/* Asunto */}
                  <div className="col-12">
                      <label htmlFor="ctoasunto" className="form-label">Asunto</label>
                      <textarea 
                        className={`form-control ${errors.ctoasunto ? 'is-invalid' : ''}`}
                        id="ctoasunto" 
                        rows={5} 
                        placeholder="Escribe tu mensaje aquí..." 
                        value={formData.ctoasunto}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.ctoasunto || 'Debes incluir un mensaje de máximo 300 caracteres.'}</div>
                  </div>

                  <div className="col-12">
                      <button className="btn btn-primary btn-lg" type="submit"> Enviar</button>
                  </div>
                  </form>
              </div>
          </div>      
          </div>
      </section>

      {/* --- SECCIÓN "TE PODRÍA INTERESAR" (Sin cambios) --- */}
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