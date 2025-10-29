import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// --- NUEVO: Funciones auxiliares para el RUT ---

/**
 * Formatea un RUT (ej: 123456789 -> 12.345.678-9)
 */
const formatRut = (rut: string): string => {
  // Limpia el RUT de todo excepto números y 'k'
  const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (!cleanRut) return '';

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  // Formatea el cuerpo con puntos
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedBody}-${dv}`;
};

/**
 * Valida un RUT chileno (Algoritmo Módulo 11)
 */
const validateRut = (rut: string): boolean => {
  const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleanRut.length < 2) return false;

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  let sum = 0;
  let multiplier = 2;

  // Recorre el cuerpo de atrás hacia adelante
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i), 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  let calculatedDv = 11 - remainder;

  let dvExpected: string;
  if (calculatedDv === 11) {
    dvExpected = '0';
  } else if (calculatedDv === 10) {
    dvExpected = 'K';
  } else {
    dvExpected = calculatedDv.toString();
  }

  return dvExpected === dv;
};


// --- Tu componente Register ---

export const Register = () => {
  const navigate = useNavigate();
  const comunas = {
    "PA" : "Puente Alto", "LF" : "La Florida", "LP" : "La Pintana",
    "ST" : "Santiago", "CC" : "Cerrillos", "EL" : "El Bosque"
    // ... (Tu lista completa de comunas) ...
  };

  // --- (Funciones de validación de tu JS) ---
  const soloLetrasEspacios = (str: string) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(str);
  const isDuocMail = (str: string) => /^[A-Za-z0-9-_.]+@duoc.cl$/.test(str);
  const isEstudianteMail = (str: string) => /^[A-Za-z0-9-_.]+@estudiantes.duoc.cl$/.test(str);
  const validPhone = (str: string) => /^[0-9+()-]{8,15}$/.test(str);
  const strongPassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
  const validarEdad = (fecha: string) => {
    if (!fecha) return false;
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad >= 14;
  };

  const [maxFecha, setMaxFecha] = useState('');

  // NUEVO: Añadido 'rut' al estado
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '', // <-- NUEVO
    telefono: '',
    fechaNacimiento: '',
    correo: '',
    correo2: '',
    password: '',
    password2: '',
    comuna: '',
    correo3: '' // Referido
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  useEffect(() => {
    const hoy = new Date();
    const limiteEdad = new Date(hoy.getFullYear() - 14, hoy.getMonth(), hoy.getDate());
    setMaxFecha(limiteEdad.toISOString().split("T")[0]);
  }, []);

  // NUEVO: 'handleChange' modificado para formatear el RUT mientras se escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    let finalValue = value;
    // Si el campo es el RUT, aplica el formato
    if (id === 'rut') {
      finalValue = formatRut(value);
    }

    setFormData(prevData => ({
      ...prevData,
      [id]: finalValue
    }));

    if (errors[id as keyof typeof errors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    const { 
      nombre, rut, // <-- NUEVO
      telefono, fechaNacimiento, correo, correo2, 
      password, password2, comuna, correo3 
    } = formData;

    let newErrors: Partial<typeof formData> = {};
    let hayError = false;

    // --- Validación de Nombre ---
    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
      hayError = true;
    } else if (!soloLetrasEspacios(nombre.trim()) || nombre.length < 2 || nombre.length > 30) {
      newErrors.nombre = 'Nombre inválido (2-30 caracteres, solo letras).';
      hayError = true;
    }

    // --- NUEVO: Validación de RUT ---
    if (!rut.trim()) {
      newErrors.rut = 'El RUT es obligatorio.';
      hayError = true;
    } else if (!validateRut(rut.trim())) {
      newErrors.rut = 'El RUT ingresado no es válido.';
      hayError = true;
    }
    
    // --- Validación de Teléfono ---
    if (!telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio.';
      hayError = true;
    } else if (!validPhone(telefono.trim())) {
      newErrors.telefono = 'Formato de teléfono inválido (8-15 dígitos).';
      hayError = true;
    }
    
    // --- (Resto de validaciones: fecha, correo, password, etc...) ---
    if (!fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha es obligatoria.';
      hayError = true;
    } else if (!validarEdad(fechaNacimiento)) {
      newErrors.fechaNacimiento = 'Debes tener al menos 14 años.';
      hayError = true;
    }
    if (!correo.trim()) {
      newErrors.correo = 'El correo es obligatorio.';
      hayError = true;
    } else if (!(isDuocMail(correo.trim()) || isEstudianteMail(correo.trim()))) {
      newErrors.correo = 'Debe ser un correo @duoc.cl o @estudiantes.duoc.cl';
      hayError = true;
    }
    if (!correo2.trim()) {
      newErrors.correo2 = 'Debes confirmar tu correo.';
      hayError = true;
    } else if (correo2.trim() !== correo.trim()) {
      newErrors.correo2 = 'Los correos no coinciden.';
      hayError = true;
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria.';
      hayError = true;
    } else if (!strongPassword(password)) {
      newErrors.password = 'Contraseña débil (mín. 8 caracteres, 1 mayús, 1 minús, 1 núm, 1 símbolo).';
      hayError = true;
    }
    if (!password2) {
      newErrors.password2 = 'Debes confirmar tu contraseña.';
      hayError = true;
    } else if (password2 !== password) {
      newErrors.password2 = 'Las contraseñas no coinciden.';
      hayError = true;
    }
    if (!comuna) {
      newErrors.comuna = 'Debes seleccionar una comuna.';
      hayError = true;
    }
    if (!correo3.trim()) {
      newErrors.correo3 = 'El correo de referido es obligatorio.';
      hayError = true;
    } else if (!(isDuocMail(correo3.trim()) || isEstudianteMail(correo3.trim()))) {
      newErrors.correo3 = 'El correo de referido debe ser @duoc.';
      hayError = true;
    }
    // --- Fin validaciones ---

    setErrors(newErrors);

    if (hayError) {
      toast.error("Revise todos los campos", {
        icon: <img src="/img/error.gif" alt="Error" style={{ width: "60px" }} />
      });
      return;
    }

    toast.success("Cuenta creada con éxito", {
      icon: <img src="/img/check.gif" alt="Éxito" style={{ width: "60px" }} />
    });

    // Limpiamos formulario
    setFormData({
      nombre: '', rut: '', telefono: '', fechaNacimiento: '', correo: '', correo2: '',
      password: '', password2: '', comuna: '', correo3: ''
    });

    setTimeout(() => navigate('/login'), 3000);
  };


  return (
    <>
    <main className="main-content pt-0">
        <section className="hero-section text-center py-5">
    <div className="container-fluid hero-background">
        <div className="container">
            <div className="row justify-content-center">
                <div className="p-4 card bg-dark text-white">
                    <h2 className="mb-4">Registrate</h2>
                    
                    <form id="formRegistro" noValidate className="row g-3" onSubmit={handleSubmit}>
                    
                    {/* Nombre */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre completo</label>
                        <input type="text" 
                          className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                          id="nombre"
                          placeholder="Elsa Payo"
                          value={formData.nombre}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.nombre}</div>
                    </div>
                    
                    {/* NUEVO: Campo RUT */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="rut" className="form-label">RUT</label>
                        <input type="text" 
                          className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                          id="rut"
                          placeholder="12.345.678-9"
                          value={formData.rut}
                          onChange={handleChange}
                          maxLength={12} // 12.345.678-K
                        />
                        <div className="invalid-feedback">{errors.rut}</div>
                    </div>

                    {/* Teléfono */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" 
                          className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                          id="telefono" 
                          placeholder="+56 9 1234 5678" 
                          value={formData.telefono}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.telefono}</div>
                    </div>
                    
                    {/* Fecha Nacimiento */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                        <input type="date" 
                          className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
                          id="fechaNacimiento" 
                          max={maxFecha}
                          value={formData.fechaNacimiento}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.fechaNacimiento}</div>
                    </div>
                    
                    {/* Correo */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input type="email" 
                          className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                          id="correo" 
                          placeholder="usuario@duoc.cl"
                          value={formData.correo}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.correo}</div>
                    </div>

                    {/* Correo 2 (Confirmación) */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="correo2" className="form-label">Confirma tu correo</label>
                      <input type="email" 
                        className={`form-control ${errors.correo2 ? 'is-invalid' : ''}`}
                        id="correo2" 
                        placeholder="usuario@duoc.cl"
                        value={formData.correo2}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.correo2}</div>
                    </div>
                    
                    {/* Password */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" 
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          id="password" 
                          placeholder="********"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback" style={{ whiteSpace: 'pre-wrap' }}>{errors.password}</div>
                    </div>

                    {/* Password 2 (Confirmación) */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="password2" className="form-label">Confirma tu contraseña</label>
                      <input type="password" 
                        className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
                        id="password2" 
                        placeholder="********"
                        value={formData.password2}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.password2}</div>
                    </div>
                    
                    {/* Comuna */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="comuna" className="form-label">Comuna</label>
                        <select 
                          className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                          id="comuna"
                          value={formData.comuna}
                          onChange={handleChange}
                        >
                          <option value="">Seleccione una comuna</option> 
                          {Object.entries(comunas).map(([codigo, nombre]) => (
                            <option key={codigo} value={codigo}>{nombre}</option>
                          ))}
                        </select>
                        <div className="invalid-feedback">{errors.comuna}</div>
                    </div>
                    
                    {/* Correo 3 (Referido) */}
                    <div className="col-12 col-md-6 mx-auto">
                        <label htmlFor="correo3" className="form-label">Referido</label>
                        <input type="email" 
                          className={`form-control ${errors.correo3 ? 'is-invalid' : ''}`}
                          id="correo3" 
                          placeholder="referido@duoc.cl"
                          value={formData.correo3}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.correo3}</div>
                    </div>
                    <p></p>
                    
                    {/* Botones */}
                    <div className="col-12">
                        <button className="btn btn-primary btn-lg mt-3 mb-4" type="submit">Enviar</button>
                        <Link to="/login" className="btn btn-secondary btn-lg mt-3 mb-4 ms-2">Volver</Link>
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