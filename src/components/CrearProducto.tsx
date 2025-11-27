import { useState } from "react";

export const CrearProducto = () => {
    // Estados del formulario
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Juegos de Mesa");
    const [price, setPrice] = useState("");
    const [newCategory, setNewCategory] = useState("");
    
    // ESTADOS PARA ARCHIVOS DE IMAGEN
    const [archivoPrincipal, setArchivoPrincipal] = useState<File | null>(null);
    const [archivoDetalle2, setArchivoDetalle2] = useState<File | null>(null);
    const [archivoDetalle3, setArchivoDetalle3] = useState<File | null>(null);
    const [archivoDetalle4, setArchivoDetalle4] = useState<File | null>(null);

    const [mensaje, setMensaje] = useState("");

    const categorias = [
        "Juegos de Mesa", "Accesorios", "Consolas", "Computadores Gamers", 
        "Sillas Gamers", "Mouse", "Mousepad", "Poleras Personalizadas", "Otra"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!archivoPrincipal) {
        setMensaje("⚠️ Por favor selecciona una imagen principal");
        return;
    }

    let finalCategory = category;
    if (category === "Otra") {
        if (!newCategory.trim()) {
            setMensaje("⚠️ Por favor ingresa el nombre de la nueva categoría.");
            return;
        }
        // Asignamos la nueva categoría limpia a finalCategory
        finalCategory = newCategory.trim(); 
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    
    // 🎯 CORRECCIÓN CLAVE: Usar finalCategory, que contiene el valor corregido ("Cartas")
    formData.append("category", finalCategory); 
    
    formData.append("price", price);
    
    // IMAGEN PRINCIPAL (Requerida)
    formData.append("filePrincipal", archivoPrincipal); 

    // IMÁGENES DE DETALLE (Opcionales)
    if (archivoDetalle2) formData.append("fileDetalle2", archivoDetalle2);
    if (archivoDetalle3) formData.append("fileDetalle3", archivoDetalle3);
    if (archivoDetalle4) formData.append("fileDetalle4", archivoDetalle4);

    try {
        const response = await fetch("http://localhost:8080/api/v1/productos", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            setMensaje(`✅ Producto creado exitosamente en la categoría: ${finalCategory}`); // Opcional, pero útil
            // Resetear formulario
            setTitle("");
            setDescription("");
            setPrice("");
            setNewCategory(""); // Resetear la nueva categoría
            setArchivoPrincipal(null);
            setArchivoDetalle2(null);
            setArchivoDetalle3(null);
            setArchivoDetalle4(null);
            // ... (código para resetear inputs de archivos)
            (document.getElementById("fileInputPrincipal") as HTMLInputElement).value = "";
            (document.getElementById("fileInputDetalle2") as HTMLInputElement).value = "";
            (document.getElementById("fileInputDetalle3") as HTMLInputElement).value = "";
            (document.getElementById("fileInputDetalle4") as HTMLInputElement).value = "";
            
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
                        <div className="card-header">
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

                                {category === "Otra" && (
                                    <div className="mb-3">
                                        <label className="form-label">Nombre de la Nueva Categoría</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Ej: Juegos de Cartas Coleccionables"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            required={category === "Otra"} // Solo es requerido si se seleccionó "Otra"
                                        />
                                    </div>
                                )}

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

                                {/* ZONA DE CARGA DE IMÁGENES */}
                                <div className="mb-4 p-3 border rounded">
                                    <h5 className="mb-3">Carga de Imágenes (Máx 4)</h5>
                                    
                                    {/* Imagen 1 (Principal - Requerida) */}
                                    <div className="mb-3">
                                        <label className="form-label">Imagen 1 (Principal - Requerida)</label>
                                        <input 
                                            id="fileInputPrincipal" // <-- ID para resetear
                                            type="file" 
                                            className="form-control" 
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) 
                                                    setArchivoPrincipal(e.target.files[0]);
                                            }}
                                            required={true}
                                        />
                                    </div>

                                    {/* Imagen 2 (Detalle - Opcional) */}
                                    <div className="mb-3">
                                        <label className="form-label">Imagen 2 (Detalle)</label>
                                        <input 
                                            id="fileInputDetalle2" // <-- ID para resetear
                                            type="file" 
                                            className="form-control" 
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) 
                                                    setArchivoDetalle2(e.target.files[0]);
                                            }}
                                        />
                                    </div>

                                    {/* Imagen 3 (Detalle - Opcional) */}
                                    <div className="mb-3">
                                        <label className="form-label">Imagen 3 (Detalle)</label>
                                        <input 
                                            id="fileInputDetalle3" // <-- ID para resetear
                                            type="file" 
                                            className="form-control" 
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) 
                                                    setArchivoDetalle3(e.target.files[0]);
                                            }}
                                        />
                                    </div>

                                    {/* Imagen 4 (Detalle - Opcional) */}
                                    <div>
                                        <label className="form-label">Imagen 4 (Detalle)</label>
                                        <input 
                                            id="fileInputDetalle4" // <-- ID para resetear
                                            type="file" 
                                            className="form-control" 
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) 
                                                    setArchivoDetalle4(e.target.files[0]);
                                            }}
                                        />
                                    </div>

                                </div>
                                {/* FIN ZONA DE CARGA DE IMÁGENES */}

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