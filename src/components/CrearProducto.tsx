import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const API_URL = "http://localhost:8080/api/v1";

// 🚨 ACTUALIZACIÓN: Agregar onCancel a la interfaz
interface CrearProductoProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CrearProducto = ({ onSuccess, onCancel }: CrearProductoProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Juegos de Mesa");
  const [price, setPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [archivoPrincipal, setArchivoPrincipal] = useState<File | null>(null);
  const [archivoDetalle2, setArchivoDetalle2] = useState<File | null>(null);
  const [archivoDetalle3, setArchivoDetalle3] = useState<File | null>(null);
  const [archivoDetalle4, setArchivoDetalle4] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem("token") || '');
  }, []);

  const categorias = [
    "Juegos de Mesa",
    "Accesorios",
    "Consolas",
    "Computadores Gamers",
    "Sillas Gamers",
    "Mouse",
    "Mousepad",
    "Poleras Personalizadas",
    "Otra"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!archivoPrincipal) {
      setMensaje("⚠️ Por favor selecciona una imagen principal");
      return;
    }

    if (!token) {
      setMensaje("❌ Error de autenticación. No se encontró el token.");
      return;
    }

    let finalCategory = category;
    if (category === "Otra") {
      if (!newCategory.trim()) {
        setMensaje("⚠️ Por favor ingresa el nombre de la nueva categoría.");
        return;
      }
      finalCategory = newCategory.trim();
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", finalCategory);
    formData.append("price", price);
    formData.append("filePrincipal", archivoPrincipal);
    if (archivoDetalle2) formData.append("fileDetalle2", archivoDetalle2);
    if (archivoDetalle3) formData.append("fileDetalle3", archivoDetalle3);
    if (archivoDetalle4) formData.append("fileDetalle4", archivoDetalle4);

    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok && response.status === 201) {
        toast.success(`Producto creado en ${finalCategory}. Redirigiendo...`);
        onSuccess();
      } else if (response.status === 403) {
        toast.error("Permiso denegado. Se requiere rol ADMIN.");
        setMensaje("❌ Error: Permiso denegado (403)");
      } else {
        const errorText = await response.text();
        toast.error(`Error al crear: ${errorText}`);
        setMensaje("❌ Error al crear el producto");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión con el servidor");
      setMensaje("❌ Error de conexión");
    }
  };

  return (
    <div className="p-0">
      <h3 className="mb-3 text-primary">Agregar Nuevo Producto</h3>
      
      {mensaje && (
        <div className={`alert ${mensaje.includes("✅") ? "alert-success" : "alert-danger"}`} role="alert">
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

          {/* Categoría Selector */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Categoría</label>
            <select 
              className="form-select" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "Otra" ? "➕ Otra (Escribir abajo)" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Nueva Categoría Input Condicional */}
        {category === "Otra" && (
          <div className="mb-3">
            <label className="form-label">Nombre de la Nueva Categoría</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ej: Juegos de Cartas Coleccionables" 
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)} 
              required={category === "Otra"} 
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
              id="fileInputPrincipal" 
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
              id="fileInputDetalle2" 
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
              id="fileInputDetalle3" 
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
              id="fileInputDetalle4" 
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

        {/* Botones */}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" className="btn btn-secondary me-md-2" onClick={onCancel}>
            <i className="bi bi-x-circle me-2"></i>Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-check-circle me-2"></i>Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};