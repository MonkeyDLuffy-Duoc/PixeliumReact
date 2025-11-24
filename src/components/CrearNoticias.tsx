import { useState } from "react";

export const CrearNoticia = () => {
    // Estados para guardar lo que escribe el usuario
    const [titulo, setTitulo] = useState("");
    const [detalle, setDetalle] = useState("");
    const [archivo, setArchivo] = useState<File | null>(null); // Aquí guardamos el archivo real

    // Estado para mensajes de éxito o error
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue sola

        if (!archivo) {
            setMensaje("¡Debes seleccionar una imagen!");
            return;
        }

        // 1. Crear el objeto FormData (necesario para enviar archivos)
        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("detalle", detalle);
        formData.append("file", archivo); // 'file' debe coincidir con el @RequestParam del Backend

        try {
            // 2. Enviar al Backend
            const response = await fetch("http://localhost:8080/api/v1/noticias", {
                method: "POST",
                body: formData, 
                // OJO: Al usar FormData, NO se pone el header 'Content-Type': 'application/json'
                // El navegador lo detecta automáticamente.
            });

            if (response.ok) {
                setMensaje("✅ Noticia creada con éxito");
                // Limpiar formulario
                setTitulo("");
                setDetalle("");
                setArchivo(null);
                // Truco para limpiar el input file visualmente
                (document.getElementById("fileInput") as HTMLInputElement).value = "";
            } else {
                setMensaje("❌ Error al guardar la noticia");
            }
        } catch (error) {
            console.error("Error:", error);
            setMensaje("❌ Error de conexión con el servidor");
        }
    };

    return (
        <>
        <section className="hero-section text-center py-5">
    <div className="container-fluid hero-background">
        <div className="row align-items-center">
    
    <div className="col-md-12 text-md-center pt-5">
        <h1 className="display-1">Level-UP Gamer</h1>
            <p className="lead">Tienda de productos gamers creada por gamers!</p>
        <div className="text-center">
            
        </div>
<div className="text-center">
  <img src="/img/todos_voltereta.gif" alt="Gamer haciendo volteretas" className="img-fluid mt-4" style={{maxWidth: "600px"}}/>
</div>
    </div>
        </div>
    </div>
        </section>
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card bg-dark text-white shadow-lg">
                        <div className="card-header">
                            <h3 className="mb-0">Crear Nueva Noticia</h3>
                        </div>
                        <div className="card-body">
                            
                            {/* Mensaje de alerta si existe */}
                            {mensaje && (
                                <div className={`alert ${mensaje.includes("✅") ? "alert-success" : "alert-danger"}`} role="alert">
                                    {mensaje}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Título */}
                                <div className="mb-3">
                                    <label className="form-label">Título de la Noticia</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Ej: Nuevo lanzamiento de..."
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Detalle */}
                                <div className="mb-3">
                                    <label className="form-label">Detalle / Contenido</label>
                                    <textarea 
                                        className="form-control" 
                                        rows={4}
                                        placeholder="Escribe aquí el cuerpo de la noticia..."
                                        value={detalle}
                                        onChange={(e) => setDetalle(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                {/* Imagen */}
                                <div className="mb-3">
                                    <label className="form-label">Imagen de Portada</label>
                                    <input 
                                        id="fileInput"
                                        type="file" 
                                        className="form-control" 
                                        accept="image/*" // Solo permite imágenes
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setArchivo(e.target.files[0]);
                                            }
                                        }}
                                    />
                                </div>

                                {/* Botón Enviar */}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Publicar Noticia
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};