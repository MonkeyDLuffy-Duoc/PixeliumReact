import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hayError = false;
    let newErrors = { email: '', password: '' };

    if (!email) { newErrors.email = 'Requerido'; hayError = true; }
    if (!password) { newErrors.password = 'Requerido'; hayError = true; }

    if (hayError) {
      setErrors(newErrors);
      toast.error("Complete los campos", { icon: "⚠️" });
      return;
    }

    // --- CONEXIÓN CON BACKEND ---
    try {
      const response = await fetch("http://localhost:8080/api/v1/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, password: password })
      });

      if (response.ok) {
        // AHORA RECIBIMOS UN OBJETO CON { token, usuario }
        const data = await response.json(); 
        
        // 1. Guardamos el token para futuras peticiones seguras
        localStorage.setItem("token", data.token);

        // 2. Guardamos los datos del usuario para el perfil y navbar
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        toast.success(`¡Bienvenido ${data.usuario.nombre}!`, {
            icon: <img src="/img/check.gif" alt="Éxito" style={{ width: "60px" }} />
        });
        
        setTimeout(() => navigate('/'), 2000); // Ir al Home
      } else {
        setErrors({ email: 'Error', password: 'Error' });
        toast.error("Correo o contraseña incorrectos", {
            icon: <img src="/img/error.gif" alt="Error" style={{ width: "60px" }} />
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión");
    }
  };

  return (
    <main className="main-content pt-0">
      <section className="hero-section text-center py-5">
        <div className="container-fluid hero-background">
           <div className="row justify-content-center">
              <div className="col-lg-5">
                 <div className="text-center mb-4"><h1 className="fw-bold">Iniciar sesión</h1></div>
                 <div className="card shadow-sm border-0 rounded-4">
                    <div className="card bg-dark p-4">
                       <form noValidate onSubmit={handleSubmit}>
                          <div className="mb-3">
                             <label htmlFor="loginCorreo" className="form-label">Ingresa tu correo</label>
                             <input id="loginCorreo" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                type="email" placeholder="usuario@duoc.cl" 
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                             <div className="invalid-feedback">{errors.email}</div>
                          </div>
                          <div className="mb-3">
                             <label htmlFor="loginPass" className="form-label">Ingresa tu contraseña</label>
                             <input id="loginPass" className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                type="password" placeholder="********"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                             <div className="invalid-feedback">{errors.password}</div>
                          </div>
                          <div className="d-grid gap-2 mt-4">
                             <button type="submit" className="btn btn-primary">Ingresar</button>
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
  )
}