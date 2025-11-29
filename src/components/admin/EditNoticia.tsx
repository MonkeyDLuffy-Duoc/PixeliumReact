import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface NewsItem {
  id: number;
  titulo: string;
  detalle: string;
  imageSrc: string;
  fechaCreacion?: string;
}

interface EditNoticiaProps {
  noticia: NewsItem;
  onSuccess: () => void;
  onCancel: () => void;
}

const API_URL = "http://localhost:8080/api/v1";
const IMAGE_URL = "http://localhost:8080/images/";

export const EditNoticia = ({ noticia, onSuccess, onCancel }: EditNoticiaProps) => {
  const [formData, setFormData] = useState({
    titulo: noticia.titulo,
    detalle: noticia.detalle
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token") || '';

  useEffect(() => {
    setFormData({
      titulo: noticia.titulo,
      detalle: noticia.detalle
    });
    setImagePreview(`${IMAGE_URL}${noticia.imageSrc}`);
  }, [noticia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titulo", formData.titulo);
      formDataToSend.append("detalle", formData.detalle);
      
      if (imageFile) {
        formDataToSend.append("file", imageFile);
      }

      const response = await fetch(`${API_URL}/noticias/${noticia.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        toast.success('Noticia actualizada correctamente');
        onSuccess();
      } else {
        const errorText = await response.text();
        toast.error(`Error al actualizar: ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating news:', error);
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary mb-0">Editar Noticia</h3>
        <button className="btn btn-outline-secondary" onClick={onCancel}>
          <i className="bi bi-arrow-left me-2"></i>Volver
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="card bg-dark border-secondary mb-4">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Título de la Noticia *</label>
                  <input
                    type="text"
                    name="titulo"
                    className="form-control bg-dark text-white border-secondary"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contenido *</label>
                  <textarea
                    name="detalle"
                    className="form-control bg-dark text-white border-secondary"
                    rows={8}
                    value={formData.detalle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark border-secondary mb-4">
              <div className="card-header border-secondary">
                <h5 className="text-primary mb-0">Imagen de Portada</h5>
              </div>
              <div className="card-body text-center">
                {imagePreview && (
                  <div className="mb-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-fluid rounded mb-3"
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Cambiar Imagen</label>
                  <input
                    type="file"
                    className="form-control bg-dark text-white border-secondary"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <small className="text-muted">Formatos: JPG, PNG, GIF. Máx: 5MB</small>
              </div>
            </div>

            <div className="card bg-dark border-secondary">
              <div className="card-header border-secondary">
                <h5 className="text-primary mb-0">Información</h5>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <strong>ID:</strong> {noticia.id}
                </div>
                <div className="mb-2">
                  <strong>Fecha Creación:</strong> 
                  <br />
                  {noticia.fechaCreacion ? new Date(noticia.fechaCreacion).toLocaleDateString('es-CL') : 'N/A'}
                </div>
                <div className="mb-2">
                  <strong>Imagen Actual:</strong> 
                  <br />
                  <small className="text-muted">{noticia.imageSrc}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Guardando...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Actualizar Noticia
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};