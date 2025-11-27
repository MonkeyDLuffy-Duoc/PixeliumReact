import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string; // Rol necesario (ej: "ADMIN")
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    // Leemos el usuario del localStorage
    const storedUser = localStorage.getItem("usuario");
    const user = storedUser ? JSON.parse(storedUser) : null;

    // 1. Si no hay usuario logueado -> Login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Si se requiere rol y el usuario no lo tiene -> 403 FORBIDDEN
    if (requiredRole && user.role !== requiredRole) {
        return (
            <main className="main-content pt-0">
                <section className="hero-section text-center py-5">
                    <div className="container-fluid hero-background d-flex align-items-center justify-content-center" style={{minHeight: "80vh"}}>
                        <div className="card bg-dark text-white p-5">
                            <h1 className="logo-403 display-1 text-danger fw-bold">403</h1>
                            <h2 className="logo mb-4">ACCESO DENEGADO</h2>
                            <p className="logo lead">Lo sentimos, esta área es zona restringida solo para Admins.</p>
                            <img src="/img/error.gif" alt="Access Denied" className="img-fluid mx-auto my-3" style={{maxWidth: "150px"}}/>
                            <div className="mt-4">
                                <a href="/" className=" btn btn-primary">Volver al Inicio</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    // 3. Si todo bien -> Mostrar la página
    return <>{children}</>;
};