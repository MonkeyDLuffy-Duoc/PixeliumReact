import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// --- Funciones auxiliares para RUT y validación ---
const formatRut = (rut: string): string => {
  const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (!cleanRut) return '';
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedBody}-${dv}`;
};

const validateRut = (rut: string): boolean => {
  const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleanRut.length < 2) return false;
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);
  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i), 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = sum % 11;
  let calculatedDv = 11 - remainder;
  let dvExpected = calculatedDv === 11 ? '0' : calculatedDv === 10 ? 'K' : calculatedDv.toString();
  return dvExpected === dv;
};

export const Register = () => {
  const navigate = useNavigate();
  const comunas = {
    "PA" : "Puente Alto", "LF" : "La Florida", "LP" : "La Pintana",
    "ST" : "Santiago", "CC" : "Cerrillos", "EL" : "El Bosque"
  };

  // Validadores
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
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad >= 14;
  };

  const [maxFecha, setMaxFecha] = useState('');
  const [formData, setFormData] = useState({
    nombre: '', rut: '', telefono: '', fechaNacimiento: '', correo: '', correo2: '',
    password: '', password2: '', comuna: '', correo3: ''
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  useEffect(() => {
    const hoy = new Date();
    const limiteEdad = new Date(hoy.getFullYear() - 14, hoy.getMonth(), hoy.getDate());
    setMaxFecha(limiteEdad.toISOString().split("T")[0]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let finalValue = value;
    if (id === 'rut') finalValue = formatRut(value);

    setFormData(prevData => ({ ...prevData, [id]: finalValue }));
    if (errors[id as keyof typeof errors]) {
      setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const { nombre, rut, telefono, fechaNacimiento, correo, correo2, password, password2, comuna, correo3 } = formData;
    let newErrors: Partial<typeof formData> = {};
    let hayError = false;

    // --- Validaciones (Igual que antes) ---
    if (!nombre.trim()) { newErrors.nombre = 'Obligatorio'; hayError = true; }
    else if (!soloLetrasEspacios(nombre.trim())) { newErrors.nombre = 'Solo letras'; hayError = true; }
    
    if (!rut.trim()) { newErrors.rut = 'Obligatorio'; hayError = true; }
    else if (!validateRut(rut.trim())) { newErrors.rut = 'Inválido'; hayError = true; }

    if (!telefono.trim()) { newErrors.telefono = 'Obligatorio'; hayError = true; }
    else if (!validPhone(telefono.trim())) { newErrors.telefono = 'Inválido'; hayError = true; }

    if (!fechaNacimiento) { newErrors.fechaNacimiento = 'Obligatorio'; hayError = true; }
    else if (!validarEdad(fechaNacimiento)) { newErrors.fechaNacimiento = '+14 años'; hayError = true; }

    if (!correo.trim()) { newErrors.correo = 'Obligatorio'; hayError = true; }
    else if (!(isDuocMail(correo) || isEstudianteMail(correo))) { newErrors.correo = 'Solo @duoc.cl'; hayError = true; }

    if (correo2 !== correo) { newErrors.correo2 = 'No coinciden'; hayError = true; }

    if (!password) { newErrors.password = 'Obligatorio'; hayError = true; }
    else if (!strongPassword(password)) { newErrors.password = 'Débil: 1 Mayús, 1 Num, 1 Símbolo'; hayError = true; }

    if (password2 !== password) { newErrors.password2 = 'No coinciden'; hayError = true; }

    if (!comuna) { newErrors.comuna = 'Seleccione una'; hayError = true; }
    
    if (!correo3.trim()) { newErrors.correo3 = 'Obligatorio'; hayError = true; }

    setErrors(newErrors);
    if (hayError) {
      toast.error("Corrija los errores", { icon: "⚠️" });
      return;
    }

    // --- ENVIAR AL BACKEND ---
    // Preparamos el objeto limpio para Java (sin confirmaciones)
    const usuarioParaBackend = {
      nombre,
      rut,
      telefono,
      fechaNacimiento,
      correo,
      password,
      comuna,
      correoReferido: correo3 // Mapeamos correo3 a correoReferido del Backend
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioParaBackend)
      });

      if (response.ok) {
        toast.success("Cuenta creada con éxito", {
          icon: <img src="/img/check.gif" alt="Éxito" style={{ width: "60px" }} />
        });
        // Limpiar y redirigir
        setFormData({ nombre: '', rut: '', telefono: '', fechaNacimiento: '', correo: '', correo2: '', password: '', password2: '', comuna: '', correo3: '' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorText = await response.text();
        toast.error("Error al registrar: " + errorText);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión con el servidor");
    }
  };

  return (
    <main className="main-content pt-0">
      <section className="hero-section text-center py-5">
        <div className="container-fluid hero-background">
          <div className="container">
            <div className="row justify-content-center">
              <div className="p-4 card bg-dark text-white col-lg-8">
                <h2 className="mb-4">Regístrate</h2>
                <form id="formRegistro" noValidate className="row g-3" onSubmit={handleSubmit}>
                   {/* ... (TUS INPUTS SE MANTIENEN IGUAL QUE TU CÓDIGO ORIGINAL) ... */}
                   {/* Para ahorrar espacio en el chat, asume que aquí van todos los inputs
                       Nombre, RUT, Teléfono, etc. tal como me los pasaste 
                       solo asegúrate de usar el 'formData' y 'handleChange' definidos arriba */}
                   
                   {/* Ejemplo de un input para confirmar que funciona: */}
                   <div className="col-12 col-md-6">
                      <label htmlFor="nombre" className="form-label">Nombre completo</label>
                      <input type="text" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                         id="nombre" value={formData.nombre} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.nombre}</div>
                   </div>
                   {/* ... RESTO DE TUS INPUTS ... */}
                   
                   <div className="col-12 col-md-6">
                        <label htmlFor="rut" className="form-label">RUT</label>
                        <input type="text" className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                            id="rut" value={formData.rut} onChange={handleChange} maxLength={12}/>
                        <div className="invalid-feedback">{errors.rut}</div>
                    </div>
                   
                   <div className="col-12 col-md-6">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                            id="telefono" value={formData.telefono} onChange={handleChange}/>
                        <div className="invalid-feedback">{errors.telefono}</div>
                   </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha Nacimiento</label>
                        <input type="date" className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
                            id="fechaNacimiento" max={maxFecha} value={formData.fechaNacimiento} onChange={handleChange}/>
                        <div className="invalid-feedback">{errors.fechaNacimiento}</div>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input type="email" className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                            id="correo" value={formData.correo} onChange={handleChange}/>
                        <div className="invalid-feedback">{errors.correo}</div>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="correo2" className="form-label">Confirmar Correo</label>
                        <input type="email" className={`form-control ${errors.correo2 ? 'is-invalid' : ''}`}
                            id="correo2" value={formData.correo2} onChange={handleChange}/>
                        <div className="invalid-feedback">{errors.correo2}</div>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password" value={formData.password} onChange={handleChange}/>
                        <div className="invalid-feedback">{errors.password}</div>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="password2" className="form-label">Confirmar Contraseña</label>
                        <input type="password" className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
                            id="password2" value={formData.password2} onChange={handleChange}/>
                        <div className="invalid-feedback">{errors.password2}</div>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="comuna" className="form-label">Comuna</label>
                        <select className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                            id="comuna" value={formData.comuna} onChange={handleChange}>
                            <option value="">Seleccione</option>
                            {Object.entries(comunas).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                        <div className="invalid-feedback">{errors.comuna}</div>
                    </div>

                    <div className="col-12 col-md-6 mx-auto">
                        <label htmlFor="correo3" className="form-label">Referido</label>
                        <input type="email" className={`form-control ${errors.correo3 ? 'is-invalid' : ''}`}
                            id="correo3" value={formData.correo3} onChange={handleChange}/>
                        <div className="invalid-feedback">{errors.correo3}</div>
                    </div>

                   <div className="col-12 mt-4">
                      <button className="btn btn-primary btn-lg" type="submit">Enviar</button>
                      <Link to="/login" className="btn btn-secondary btn-lg ms-2">Volver</Link>
                   </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}