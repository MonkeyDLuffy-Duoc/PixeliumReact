import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface ProductItem {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  imageSrc: string;
  imageSrc2?: string;
  imageSrc3?: string;
  imageSrc4?: string;
}

interface EditProductoProps {
  producto: ProductItem;
  onSuccess: () => void;
  onCancel: () => void;
}

const API_URL = "http://localhost:8080/api/v1";
const IMAGE_URL = "http://localhost:8080/images/";

export const EditProducto = ({ producto, onSuccess, onCancel }: EditProductoProps) => {
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

  const [formData, setFormData] = useState({
    title: producto.title,
    description: producto.description,
    category: producto.category,
    price: producto.price.toString(),
    newCategory: ""
  });

  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token") || '';

  useEffect(() => {
    setFormData({
      title: producto.title,
      description: producto.description,
      category: producto.category,
      price: producto.price.toString(),
      newCategory: ""
    });

    // Cargar previews de imágenes existentes
    const previews = [];
    if (producto.imageSrc) previews.push(`${IMAGE_URL}${producto.imageSrc}`);
    if (producto.imageSrc2) previews.push(`${IMAGE_URL}${producto.imageSrc2}`);
    if (producto.imageSrc3) previews.push(`${IMAGE_URL}${producto.imageSrc3}`);
    if (producto.imageSrc4) previews.push(`${IMAGE_URL}${producto.imageSrc4}`);
    setImagePreviews(previews);
  }, [producto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFiles = [...imageFiles];
      newFiles[index] = file;
      setImageFiles(newFiles);

      const reader = new FileReader();
      reader.onload = (e) => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = e.target?.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalCategory = formData.category === "Otra" ? formData.newCategory : formData.category;

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", finalCategory);
      formDataToSend.append("price", formData.price);

      // Agregar imágenes que hayan cambiado
      if (imageFiles[0]) formDataToSend.append("filePrincipal", imageFiles[0]);
      if (imageFiles[1]) formDataToSend.append("fileDetalle2", imageFiles[1]);
      if (imageFiles[2]) formDataToSend.append("fileDetalle3", imageFiles[2]);
      if (imageFiles[3]) formDataToSend.append("fileDetalle4", imageFiles[3]);

      const response = await fetch(`${API_URL}/productos/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        toast.success('Producto actualizado correctamente');
        onSuccess();
      } else {
        const errorText = await response.text();
        toast.error(`Error al actualizar: ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary mb-0">Editar Producto</h3>
        <button className="btn btn-outline-secondary" onClick={onCancel}>
          <i className="bi bi-arrow-left me-2"></i>Volver
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="card bg-dark border-secondary mb-4">
              <div className="card-header border-secondary">
                <h5 className="text-primary mb-0">Información del Producto</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Nombre del Producto *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control bg-dark text-white border-secondary"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio ($ CLP) *</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control bg-dark text-white border-secondary"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Categoría *</label>
                    <select
                      name="category"
                      className="form-select bg-dark text-white border-secondary"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat === "Otra" ? "➕ Otra (Especificar abajo)" : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.category === "Otra" && (
                  <div className="mb-3">
                    <label className="form-label">Nombre de la Nueva Categoría *</label>
                    <input
                      type="text"
                      name="newCategory"
                      className="form-control bg-dark text-white border-secondary"
                      value={formData.newCategory}
                      onChange={handleChange}
                      required={formData.category === "Otra"}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Descripción *</label>
                  <textarea
                    name="description"
                    className="form-control bg-dark text-white border-secondary"
                    rows={5}
                    value={formData.description}
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
                <h5 className="text-primary mb-0">Imágenes del Producto</h5>
              </div>
              <div className="card-body">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="mb-3">
                    <label className="form-label">
                      Imagen {index + 1} {index === 0 && '(Principal)'}
                    </label>
                    
                    {imagePreviews[index] && (
                      <div className="mb-2">
                        <img
                          src={imagePreviews[index]}
                          alt={`Preview ${index + 1}`}
                          className="img-fluid rounded mb-2"
                          style={{ maxHeight: '100px', objectFit: 'cover' }}
                        />
                      </div>
                    )}

                    <input
                      type="file"
                      className="form-control bg-dark text-white border-secondary"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                    />
                  </div>
                ))}
                <small className="text-muted">
                  Formatos: JPG, PNG, GIF. Máx: 5MB por imagen
                </small>
              </div>
            </div>

            <div className="card bg-dark border-secondary">
              <div className="card-header border-secondary">
                <h5 className="text-primary mb-0">Información</h5>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <strong>ID:</strong> {producto.id}
                </div>
                <div className="mb-2">
                  <strong>Categoría Actual:</strong> 
                  <span className="badge bg-secondary ms-2">{producto.category}</span>
                </div>
                <div className="mb-2">
                  <strong>Precio Actual:</strong> 
                  <br />
                  {producto.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </div>
                <div className="mb-2">
                  <strong>Imágenes:</strong> 
                  <br />
                  <small className="text-muted">
                    {[producto.imageSrc, producto.imageSrc2, producto.imageSrc3, producto.imageSrc4]
                      .filter(Boolean).length} imagen(es) cargadas
                  </small>
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
                Actualizar Producto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};