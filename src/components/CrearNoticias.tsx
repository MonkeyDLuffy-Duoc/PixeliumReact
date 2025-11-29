import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const API_URL = "http://localhost:8080/api/v1";

// 🚨 ACTUALIZACIÓN: Agregar onCancel a la interfaz
interface CrearNoticiaProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CrearNoticia = ({ onSuccess, onCancel }: CrearNoticiaProps) => {
  const [titulo, setTitulo] = useState("");
  const [detalle, setDetalle] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem("token") || '');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!archivo) {
      setMensaje("⚠️ ¡Debes seleccionar una imagen!");
      return;
    }

    if (!token) {
      setMensaje("❌ Error de autenticación. No se encontró el token.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("detalle", detalle);
    formData.append("file", archivo);

    try {
      const response = await fetch(`${API_URL}/noticias`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok && response.status === 201) {
        toast.success("Noticia creada con éxito.");
        setMensaje("✅ Noticia creada con éxito");
        onSuccess();
      } else if (response.status === 403) {
        toast.error("Permiso denegado. Se requiere rol ADMIN.");
        setMensaje("❌ Error: Permiso denegado (403)");
      } else {
        const errorText = await response.text();
        toast.error(`Error al guardar: ${errorText}`);
        setMensaje("❌ Error al guardar la noticia");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error de conexión con el servidor");
      setMensaje("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="p-0">
      <h3 className="mb-3 text-primary">Crear Nueva Noticia</h3>
      
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
            accept="image/*" 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setArchivo(e.target.files[0]);
              }
            }} 
            required 
          />
        </div>

        {/* Botones */}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" className="btn btn-secondary me-md-2" onClick={onCancel}>
            <i className="bi bi-x-circle me-2"></i>Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-check-circle me-2"></i>Publicar Noticia
          </button>
        </div>
      </form>
    </div>
  );
};