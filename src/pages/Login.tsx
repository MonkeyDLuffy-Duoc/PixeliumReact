import React from 'react'
import { NavLink } from 'react-router-dom'

export const Login = () => {
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
                    <div id="loginAlert" className="alert d-none" role="alert"></div>
                        <div id="loginAlert" className="alert d-none" role="alert"></div>
                        <form id="formLogin" noValidate>
                            <div className="mb-3">
                                <label htmlFor="loginCorreo" className="form-label">Ingresa tu correo</label>
                                <input id="loginCorreo" className="form-control" type="email" placeholder="usuario@duoc.cl" required/>
                                <div className="invalid-feedback">Ingresa tu correo @duoc.cl</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loginPass" className="form-label">Ingresa tu contraseña</label>
                                <input id="loginPass" className="form-control" type="password" required placeholder="***************"/>
                                <div className="invalid-feedback">Ingresa tu contraseña.</div>
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
