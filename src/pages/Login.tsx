

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'; // Importamos el toast

export const Login = () => {

  // 1. REEMPLAZAMOS getElementById CON 'useState'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para manejar los mensajes de error de los inputs
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // 2. DATOS (Igual que en el JS)
  const usuarios = [
    { correo: "fullstack@duoc.cl", password: "Fullstack@123" }
  ];

  // Hook para redirigir
  const navigate = useNavigate();

  // 3. REEMPLAZAMOS 'mostrarAlert' CON 'react-hot-toast'
  // (Esta lógica ahora irá dentro del 'handleSubmit')

  // 4. REEMPLAZAMOS 'formLogin.addEventListener' CON 'handleSubmit'
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Esto se mantiene igual

    let hayError = false;
    let newErrors = { email: '', password: '' };

    // Validación de campos vacíos (como en tu JS)
    if (!email) {
      newErrors.email = 'Por favor completa este campo';
      hayError = true;
    }
    if (!password) {
      newErrors.password = 'Por favor completa este campo';
      hayError = true;
    }

    if (hayError) {
      setErrors(newErrors); // Actualiza los errores de los inputs
      // Mostramos el toast de error con el GIF
      toast.error("Por favor completa todos los campos", {
        icon: <img src="/img/error.gif" alt="Error" style={{ width: "60px" }} />
      });
      return;
    }

    // Buscamos al usuario (como en tu JS)
    const usuario = usuarios.find(u => u.correo === email && u.password === password);

    if (usuario) {
      // Éxito
      setErrors({ email: '', password: '' }); // Limpiamos errores
      
      // Mostramos toast de éxito con el GIF
      toast.success("¡Ingreso exitoso!", {
        icon: <img src="/img/check.gif" alt="Éxito" style={{ width: "60px" }} />
      });

      // Redirigimos con 'useNavigate' (como en tu JS)
      setTimeout(() => navigate('/home'), 3000); // Asumiendo que /home es tu 'index.html'

    } else {
      // Error de credenciales
      newErrors.email = 'Correo o contraseña incorrectos';
      newErrors.password = 'Correo o contraseña incorrectos';
      setErrors(newErrors);

      // Mostramos toast de error con tu GIF
      toast.error("Correo o contraseña incorrectos", {
        icon: <img src="/img/error.gif" alt="Error" style={{ width: "60px" }} />
      });
    }
  };


  return (
    <>
    <main className="main-content pt-0">
        <section className="hero-section text-center py-5">
    <div className="container-fluid hero-background">
        <div className="row justify-content-center">
            <div className="col-lg-5">
                <div className="text-center mb-4">
                    <h1 className="fw-bold">Iniciar sesion</h1>
                </div>
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card bg-dark p-4">
                        {/* ELIMINAMOS el 'div' de 'loginAlert', 
                          ya que 'react-hot-toast' se encarga 
                        */}
                        
                        {/* 5. CONECTAMOS EL FORMULARIO */}
                        <form id="formLogin" noValidate onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="loginCorreo" className="form-label">Ingresa tu correo</label>
                                {/* 6. CONECTAMOS LOS INPUTS AL ESTADO
                                  - 'value' lee el estado
                                  - 'onChange' actualiza el estado
                                  - 'className' se pone inválido si hay error
                                */}
                                <input 
                                  id="loginCorreo" 
                                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                  type="email" 
                                  placeholder="usuario@duoc.cl" 
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                {/* 7. MOSTRAMOS EL ERROR DEL ESTADO */}
                                <div className="invalid-feedback">
                                  {errors.email}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loginPass" className="form-label">Ingresa tu contraseña</label>
                                <input 
                                  id="loginPass" 
                                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                  type="password" 
                                  required 
                                  placeholder="***************"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="invalid-feedback">
                                  {errors.password}
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-4">
                                <button type="submit" className="btn btn-primary">Ingresar</button>
                                <p>No tienes una cuenta?</p>
                                <NavLink to="/Register" className="btn btn-secondary">Crear una cuenta</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </section>
    </main>
    </>
  )
}