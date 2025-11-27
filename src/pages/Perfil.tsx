import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Interfaz del usuario (Asegúrate de que coincida con tu modelo Usuario.java)
interface User {
    id: number;
    nombre: string;
    rut: string; // Necesario para enviar al backend
    telefono: string;
    fechaNacimiento: string;
    correo: string; // Estático
    comuna: string;
    role: string; // Estático
    avatarSrc?: string; // Nombre del archivo guardado
}

// URLs
const AVATAR_URL = "http://localhost:8080/avatars/";
const API_URL = "http://localhost:8080/api/v1/usuarios";

export const Perfil = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    // Estados de edición
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Partial<User>>({});
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // Cargar datos al iniciar
    useEffect(() => {
        const storedUserString = localStorage.getItem("usuario");
        if (storedUserString) {
            const storedUser = JSON.parse(storedUserString);
            setUser(storedUser);
            // Inicializamos los datos de edición con todos los datos del usuario
            setEditData(storedUser); 
        } else {
            navigate("/login");
        }
    }, [navigate]);

    if (!user) return null;

    // URL para mostrar el avatar (previsualización o actual)
    const avatarUrl = user.avatarSrc
        ? `${AVATAR_URL}${user.avatarSrc}`
        : "/img/avatar-default.png";

    // Handlers edición de campos de texto
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    // Handler para seleccionar archivo de avatar
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        }
    };

    // --- FUNCIÓN PRINCIPAL DE ACTUALIZACIÓN (PRUEBA DE ENVÍO) ---
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // 1. OBTENER TOKEN Y VALIDAR
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Sesión expirada. Por favor, inicia sesión de nuevo.");
            navigate("/login");
            return;
        }

        setLoading(true);
        const formData = new FormData();

        // 2. CAMPOS DE TEXTO: Asegurar que se envíen TODOS los campos que el backend espera
        // Usamos (editado || original) para garantizar que el valor no sea undefined
        formData.append("nombre", editData.nombre || user.nombre);
        formData.append("rut", user.rut); // <-- Debe enviarse, aunque no se edite.
        formData.append("telefono", editData.telefono || user.telefono);
        formData.append("fechaNacimiento", editData.fechaNacimiento || user.fechaNacimiento);
        formData.append("comuna", editData.comuna || user.comuna);

        // 3. ARCHIVO: Adjuntar avatar si existe
        if (avatarFile) {
            formData.append("avatar", avatarFile); // 'avatar' debe coincidir con @RequestParam en Java
        }

        try {
            const response = await fetch(`${API_URL}/${user.id}`, {
                method: "PUT",
                headers: {
                    // Solo el token para permitir que el navegador establezca multipart/form-data
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const updatedUser: User = await response.json();
                toast.success("¡Perfil actualizado con éxito!");

                // ACTUALIZAR LOCALSTORAGE y ESTADO
                localStorage.setItem("usuario", JSON.stringify(updatedUser));

                setUser(updatedUser);
                setEditData(updatedUser);
                setAvatarFile(null);
                setIsEditing(false);

            } else {
                // Manejo de errores específicos del servidor
                const errorText = await response.text();
                if (response.status === 401 || response.status === 403) {
                     toast.error("Acceso denegado. Por favor, vuelve a iniciar sesión.");
                     localStorage.removeItem("token");
                     localStorage.removeItem("usuario");
                     navigate("/login");
                } else {
                    toast.error(`Error al guardar: ${errorText}`);
                }
            }
        } catch (err) {
            // Error de red (TypeError: Failed to fetch)
            console.error("Fetch Error:", err);
            toast.error("❌ Error de conexión al servidor (Verifique puerto 8080).");
        } finally {
            setLoading(false);
        }
    };

    /* ========================================================
       RENDERIZACIÓN
    ======================================================== */

    return (
        <>
            <main className="main-content pt-0">

                {/* --- HERO --- */}
                <section className="hero-section text-center py-5">
                    <div className="container-fluid hero-background">
                        <h1 className="display-1">Mi Perfil</h1>
                        <p className="lead">
                            Bienvenido a tu base, {user.nombre.split(" ")[0]}.
                        </p>

                        {/* AVATAR */}
                        <div className="mt-4 mb-3 d-flex justify-content-center">
                            <img
                                src={avatarUrl}
                                alt="Avatar"
                                className="rounded-circle border border-5 border-primary shadow"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/img/avatar-default.png";
                                }}
                            />
                        </div>

                        
                    </div>
                </section>

                {/* ===============================================================
                    SECCIÓN PRINCIPAL: DATOS o EDITAR
                   =============================================================== */}

                <section className="us-section">
                    <div className="container py-5 pt-0">

                        {/* TITULO */}
                        <h2 className="text-center mb-4 mt-0 text-white">
                            Datos de Jugador
                        </h2>

                        {/* =======================
                            SI NO ESTÁ EDITANDO
                           ======================= */}
                        {!isEditing && (
                            <div className="row justify-content-center py-3">
                                
                                    <div className="card bg-dark text-white col-8">

                                        <div className="card-header text-center border-secondary">
                                            <h4 className="text-primary mb-0">
                                                Información Personal
                                            </h4>
                                        </div>

                                        <div className="card-body p-3">
                                            <div className="row g-2">

                                                {/* Nombre */}
                                                <InfoRow label="Nombre" value={user.nombre} />

                                                {/* Rut */}
                                                <InfoRow label="RUT" value={user.rut} />

                                                {/* Correo */}
                                                <InfoRow label="Correo" value={user.correo} full />

                                                {/* Teléfono */}
                                                <InfoRow label="Teléfono" value={user.telefono} />

                                                {/* Comuna */}
                                                <InfoRow label="Comuna" value={user.comuna} />

                                                {/* Fecha nacimiento */}
                                                <InfoRow label="Fecha Nacimiento" value={user.fechaNacimiento} />

                                                {/* Rol */}
                                                <div className="col-md-6">
                                                    <div className={`rounded p-2 d-flex justify-content-between align-items-center border ${user.role === 'ADMIN' ? 'border-danger bg-danger bg-opacity-10' : 'border-success bg-success bg-opacity-10'}`}>
                                                        <span className="text-primary text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
                                                            Rol:
                                                        </span>
                                                        <span className={`fw-bold ${user.role === 'ADMIN' ? 'text-danger' : 'text-success'}`}>
                                                            {user.role === 'ADMIN' ? "ADMINISTRADOR" : "JUGADOR"}
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="card-footer text-center border-secondary">
                                            <button
                                                className="btn btn-primary px-4"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                Editar Perfil
                                            </button>
                                        </div>

                                    </div>
                                
                            </div>
                        )}

                        {/* =======================
                            MODO EDICIÓN
                           ======================= */}
                        {isEditing && (
                            <div className="row justify-content-center py-3 fade-in">
                                

                                    <div className="card bg-dark text-white">

                                        <div className="text-center border-secondary">
                                            <h4 className="text-primary mb-0">Editar Perfil</h4>
                                        </div>

                                        <form onSubmit={handleUpdate}>
                                            <div className="card-body p-3">                         
                                                

                                                {/* Avatar */}
                                                <div className="text-center mb-4">
                                                    
                                                    {/* CONTENEDOR RELATIVO PARA EL ÍCONO */}
                                                    <div 
                                                        className="card bg-dark position-relative d-inline-block rounded-circle"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => document.getElementById('avatar-file-input')?.click()} // Permite clickear la imagen
                                                    >
                                                        <img
                                                            src={avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl}
                                                            alt="Previsualización de Avatar"
                                                            className="rounded-circle border border-4 border-info shadow-lg"
                                                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                                        />
                                                        
                                                        {/* ÍCONO DE CÁMARA O CAMBIO */}
                                                        <span 
                                                            className="position-absolute bottom-0 end-0 translate-middle badge rounded-pill bg-primary p-2"
                                                            title="Cambiar foto de perfil"
                                                        >
                                                            <i className="bi bi-camera-fill" style={{ fontSize: '0.8rem' }}></i>
                                                        </span>
                                                    </div>

                                                    {/* INPUT DE ARCHIVO (OCULTO y asociado al click) */}
                                                    <input
                                                        type="file"
                                                        id="avatar-file-input" // Añadimos ID
                                                        className="form-control mt-3"
                                                        accept="image/*"
                                                        onChange={handleAvatarChange}
                                                        style={{ display: 'none' }} // Ocultamos la barra de input
                                                    />
                                                    
                                                    <p className="form-text text-muted mt-2">
                                                        Haz clic en la imagen o selecciona un archivo para cambiar tu avatar.
                                                    </p>
                                                </div>

                                                {/* Campos */}
                                                <div className="row">
                                                    <EditInput name="nombre" label="Nombre" value={editData.nombre} onChange={handleEditChange} />

                                                    <EditInput name="telefono" label="Teléfono" value={editData.telefono} onChange={handleEditChange} />

                                                    {/* Rut (no editable) */}
                                                    <StaticInput label="RUT" value={user.rut} />

                                                    <EditInput name="comuna" label="Comuna" value={editData.comuna} onChange={handleEditChange} />

                                                    <EditInput 
                                                    name="fechaNacimiento" 
                                                    label="Fecha Nacimiento" 
                                                    value={editData.fechaNacimiento} // <-- Usar el valor directo
                                                    onChange={handleEditChange} 
                                                    type="date" // <-- Mantiene el calendario
                                                    />

                                                    <StaticInput label="Correo" value={user.correo} />
                                                </div>

                                            </div>

                                            <div className="card-footer text-center border-secondary">

                                                <button
                                                    type="button"
                                                    className="btn btn-secondary me-2 px-4"
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setAvatarFile(null);
                                                    }}
                                                >
                                                    Cancelar
                                                </button>

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary px-4"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Guardando..." : "Guardar Cambios"}
                                                </button>

                                            </div>
                                        </form>

                                    </div>
                                
                            </div>
                        )}

                    </div>
                </section>

                {/* RECOMENDADOS */}
                <Recomendados />
            </main>
        </>
    );
};

/* ========================================================
   COMPONENTES AUXILIARES (Para mantener el código limpio)
======================================================== */

const InfoRow = ({ label, value, full = false }: { label: string, value: string | undefined, full?: boolean }) => (
    <div className={full ? "col-12" : "col-md-6"}>
        <div className="border border-secondary rounded bg-secondary bg-opacity-10 p-2 d-flex justify-content-between">
            <span className="text-primary text-uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
                {label}:
            </span>
            <span className="text-white fw-semibold" style={{ fontSize: "1rem" }}>
                {value || "No registrado"}
            </span>
        </div>
    </div>
);

const EditInput = ({ name, label, value, onChange, type = "text" }: any) => (
    <div className="col-md-6 mb-3">
        <label className="form-label text-primary">{label}</label>
        <input
            type={type} // Permite que sea "date"
            name={name}
            value={value || ""}
            onChange={onChange}
            className="form-control"
        />
    </div>
);

const StaticInput = ({ label, value }: { label: string, value: string | undefined }) => (
    <div className="col-md-6 mb-3">
        <label className="form-label text-primary">{label}</label>
        <input type="text" className="form-control" value={value} disabled />
    </div>
);

const Recomendados = () => (
    <div className="container-fluid hero-background pt-2">
        <section className="news-section py-0 bg-transparent text-white mb-0">
          <div className="container-fluid hero-background pt-2">
            <h2 className="text-center mb-4">Últimas Noticias</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Nuevo RPG sorprende con mecánicas innovadoras.</h5>
                                <img src="/img/ER3.webp" alt="Eternal Realms: Awakening" className="img-fluid mb-3"/>
                                <p className="card-text">Eternal Realms: Awakening combina mundo abierto y decisiones que alteran la historia. En pocos días ya superó los 2 millones de descargas.</p>
                                <a href="noticias.html" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Récord en campeonato mundial de eSports</h5>
                                <img src="/img/eSport.webp" alt="World eSports Championship 2025" className="img-fluid mb-3"/>
                                <p className="card-text">El World eSports Championship 2025 rompió récords con más de 8,5 millones de espectadores. El torneo repartió 15 millones en premios.</p>
                                <a href="noticias.html" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);