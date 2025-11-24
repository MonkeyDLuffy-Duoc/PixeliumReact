import { useState } from "react";

export const CrearProducto = () => {
    // Estados del formulario
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Juegos de Mesa"); // Valor por defecto
    const [price, setPrice] = useState(""); // Usamos string para el input, luego convertimos
    const [archivo, setArchivo] = useState<File | null>(null);

    const [mensaje, setMensaje] = useState("");

    // Lista de categorías disponibles (puedes agregar más)
    const categorias = [
        "Juegos de Mesa",
        "Accesorios",
        "Consolas",
        "Computadores Gamers",
        "Sillas Gamers",
        "Mouse",
        "Mousepad",
        "Poleras Personalizadas"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!archivo) {
            setMensaje("⚠️ Por favor selecciona una imagen principal");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("file", archivo);

        try {
            const response = await fetch("http://localhost:8080/api/v1/productos", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setMensaje("✅ Producto creado exitosamente");
                // Resetear formulario
                setTitle("");
                setDescription("");
                setPrice("");
                setArchivo(null);
                (document.getElementById("fileInputProducto") as HTMLInputElement).value = "";
            } else {
                setMensaje("❌ Error al crear el producto");
            }
        } catch (error) {
            console.error(error);
            setMensaje("❌ Error de conexión");
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
                    <div className="card bg-dark text-white shadow-lg border-primary">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Agregar Nuevo Producto</h3>
                        </div>
                        <div className="card-body">
                            
                            {mensaje && (
                                <div className={`alert ${mensaje.includes("✅") ? "alert-success" : "alert-danger"}`}>
                                    {mensaje}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Título */}
                                <div className="mb-3">
                                    <label className="form-label">Nombre del Producto</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Ej: Play Station 5"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="row">
                                    {/* Precio */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Precio ($ CLP)</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            placeholder="Ej: 549990"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required 
                                        />
                                    </div>

                                    {/* Categoría */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Categoría</label>
                                        <select 
                                            className="form-select"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            {categorias.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea 
                                        className="form-control" 
                                        rows={3}
                                        placeholder="Detalles del producto..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required 
                                    ></textarea>
                                </div>

                                {/* Imagen */}
                                <div className="mb-4">
                                    <label className="form-label">Imagen Principal</label>
                                    <input 
                                        id="fileInputProducto"
                                        type="file" 
                                        className="form-control" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) 
                                                setArchivo(e.target.files[0]);
                                        }}
                                    />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Guardar Producto
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