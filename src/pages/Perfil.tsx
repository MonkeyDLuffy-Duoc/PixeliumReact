import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export const Perfil = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    // Cargar datos del usuario al iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem("usuario");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Si no hay usuario, mandamos al login
            navigate("/login");
        }
    }, [navigate]);

    if (!user) return null; // O un spinner de carga

    return (
        <>
            <main className="main-content pt-0">
                {/* --- HERO SECTION --- */}
                <section className="hero-section text-center py-5">
                    <div className="container-fluid hero-background">
                        <div className="row align-items-center">
                            <div className="col-md-12 text-md-center pt-5">
                                <h1 className="display-1">Mi Perfil</h1>
                                <p className="lead">Bienvenido a tu base de operaciones, {user.nombre.split(" ")[0]}.</p>
                                <div className="text-center">
                                    <NavLink to="/Products" className="btn btn-primary mt-3">Ir a la Tienda</NavLink>
                                </div>
                                <div className="text-center">
                                    {/* Usamos un avatar genérico o podrías guardar la foto en el futuro */}
                                    <img src="/img/todos_voltereta.gif"
                                        alt="Avatar Gamer"
                                        className="img-fluid mt-4"
                                        style={{ maxWidth: "600px", width: "100%", height: "auto" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECCIÓN DE DATOS DEL USUARIO --- */}
                <section className="us-section">
                    <div className="container py-5 pt-0">
                        <h2 className="text-center mb-4 mt-0 text-white">Datos de Jugador</h2>

                        <div className="row justify-content-center py-3 pb-0">
                            <div className="col-lg-8 mb-4">

                                <div className="card bg-dark text-white shadow-lg">

                                    {/* HEADER */}
                                    <div className="card-header bg-transparent border-secondary text-center">
                                        <h4 className="mb-0 text-primary">Información Personal</h4>
                                    </div>

                                    {/* BODY */}
                                    <div className="card-body p-3">

    <div className="row g-2">

        {/* --- Campo: Nombre --- */}
        <div className="col-md-6">
            <div className="border border-secondary rounded bg-secondary bg-opacity-10 p-2 d-flex justify-content-between align-items-center">
                <span className="text-primary text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
                    Nombre:
                </span>
                <span className="text-white fw-semibold" style={{ fontSize: "1rem" }}>
                    {user.nombre}
                </span>
            </div>
        </div>

        {/* --- Campo: RUT --- */}
        <div className="col-md-6">
            <div className="border border-secondary rounded bg-secondary bg-opacity-10 p-2 d-flex justify-content-between align-items-center">
                <span className="text-primary text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
                    RUT:
                </span>
                <span className="text-white fw-semibold" style={{ fontSize: "1rem" }}>
                    {user.rut}
                </span>
            </div>
        </div>

        {/* --- Campo: Correo --- */}
        <div className="col-12">
            <div className="border border-secondary rounded bg-secondary bg-opacity-10 p-2 d-flex justify-content-between align-items-center">
                <span className="text-primary text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
                    Correo:
                </span>
                <span className="text-white fw-semibold" style={{ fontSize: "1rem" }}>
                    {user.correo}
                </span>
            </div>
        </div>

        {/* --- Campo: Teléfono --- */}
        <div className="col-md-6">
            <div className="border border-secondary rounded bg-secondary bg-opacity-10 p-2 d-flex justify-content-between align-items-center">
                <span className="text-primary text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
                    Teléfono:
                </span>
                <span className="text-white fw-semibold" style={{ fontSize: "1rem" }}>
                    {user.telefono || "No registrado"}
                </span>
            </div>
        </div>

        {/* --- Campo: Comuna --- */}
        <div className="col-md-6">
            <div className="border border-secondary rounded bg-secondary bg-opacity-10 p-2 d-flex justify-content-between align-items-center">
                <span className="text-primary text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
                    Comuna:
                </span>
                <span className="text-white fw-semibold" style={{ fontSize: "1rem" }}>
                    {user.comuna || "Santiago"}
                </span>
            </div>
        </div>

        {/* --- Campo: Fecha de nacimiento --- */}
        <div className="col-md-6">
            <div className="border border-secondary rounded bg-secondary bg-opacity-10 p-2 d-flex justify-content-between align-items-center">
                <span className="text-primary text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
                    Fecha Nacimiento:
                </span>
                <span className="text-white fw-semibold" style={{ fontSize: "1rem" }}>
                    {user.fechaNacimiento}
                </span>
            </div>
        </div>

        {/* --- Campo: Rol --- */}
        <div className="col-md-6">
            <div
                className={`rounded p-2 d-flex justify-content-between align-items-center border 
                    ${user.role === 'ADMIN'
                    ? 'border-danger bg-danger bg-opacity-10'
                    : 'border-success bg-success bg-opacity-10'}`}
            >
                <span className="text-primary text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
                    Rol:
                </span>
                <span
                    className={`fw-bold ${user.role === 'ADMIN' ? 'text-danger' : 'text-success'}`}
                    style={{ fontSize: "1rem" }}
                >
                    {user.role === 'ADMIN' ? 'ADMINISTRADOR' : 'JUGADOR'}
                </span>
            </div>
        </div>

    </div>

</div>


                                    {/* FOOTER */}
                                    <div className="card-footer bg-transparent border-secondary text-center py-2">
                                        <button className="btn btn-primary btn-sm px-4">Editar Perfil</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* --- SECCIÓN RECOMENDADOS (Mantenemos el estilo) --- */}
                <div className="container-fluid hero-background pt-2">
                    <section className="news-section py-0 bg-transparent text-white mb-0">
                        <div className="container-fluid hero-background pt-2">
                            <h2 className="text-center mb-4">Recomendado para ti</h2>
                            <div className="row text-center">
                                <div className="col-md-4 mb-4">
                                    <div className="card bg-dark text-white h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">Silla Gamer Secretlab Titan</h5>
                                            <div className="foto-producto mb-3">
                                                <img className="img-fluid rounded" style={{ maxWidth: "150px" }} src="img/silla gamer.webp" alt="silla gamer" />
                                            </div>
                                            <Link to="/product/7" className="btn btn-primary btn-sm">Ver Producto</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card bg-dark text-white h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">Play Station 5 slim</h5>
                                            <div className="foto-producto mb-3">
                                                <img className="img-fluid rounded" style={{ maxWidth: "150px" }} src="img/play_5.webp" alt="play_5" />
                                            </div>
                                            <Link to="/product/5" className="btn btn-primary btn-sm">Ver Producto</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card bg-dark text-white h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">Auriculares HyperX</h5>
                                            <div className="foto-producto mb-3">
                                                <img className="img-fluid rounded" style={{ maxWidth: "150px" }} src="img/HYPERXX.png" alt="Auriculares" />
                                            </div>
                                            <Link to="/product/4" className="btn btn-primary btn-sm">Ver Producto</Link>
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