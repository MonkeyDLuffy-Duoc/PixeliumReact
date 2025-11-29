import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface UserItem {
  id: number;
  nombre: string;
  correo: string;
  rut: string;
  role: 'ADMIN' | 'USER';
  comuna: string;
  telefono: string;
  fechaNacimiento: string;
  avatarSrc?: string;
}

interface EditUserProps {
  user: UserItem;
  onSuccess: () => void;
  onCancel: () => void;
  api_url: string;
}

export const EditUser = ({ user, onSuccess, onCancel, api_url }: EditUserProps) => {
  const [formData, setFormData] = useState<UserItem>(user);
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const token = localStorage.getItem("token") || '';

  useEffect(() => {
    setFormData(user);
    if (user.avatarSrc) {
      setAvatarPreview(`${api_url.replace('/api/v1', '')}/avatars/${user.avatarSrc}`);
    }
  }, [user, api_url]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("rut", formData.rut);
      formDataToSend.append("telefono", formData.telefono);
      formDataToSend.append("fechaNacimiento", formData.fechaNacimiento);
      formDataToSend.append("comuna", formData.comuna);
      formDataToSend.append("role", formData.role);
      
      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }

      const response = await fetch(`${api_url}/usuarios/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        toast.success('Usuario actualizado correctamente');
        onSuccess();
      } else {
        const errorText = await response.text();
        toast.error(`Error al actualizar: ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary mb-0">Editar Usuario: {user.nombre}</h3>
        <button className="btn btn-outline-secondary" onClick={onCancel}>
          <i className="bi bi-arrow-left me-2"></i>Volver
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="card bg-dark border-secondary mb-4">
              <div className="card-header border-secondary">
                <h5 className="text-primary mb-0">Información Personal</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control bg-dark text-white border-secondary"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">RUT *</label>
                    <input
                      type="text"
                      name="rut"
                      className="form-control bg-dark text-white border-secondary"
                      value={formData.rut}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="text"
                      name="telefono"
                      className="form-control bg-dark text-white border-secondary"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Comuna</label>
                    <input
                      type="text"
                      name="comuna"
                      className="form-control bg-dark text-white border-secondary"
                      value={formData.comuna}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      name="fechaNacimiento"
                      className="form-control bg-dark text-white border-secondary"
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Rol *</label>
                    <select
                      name="role"
                      className="form-select bg-dark text-white border-secondary"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="USER">Usuario</option>
                      <option value="ADMIN">Administrador</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark border-secondary mb-4">
              <div className="card-header border-secondary">
                <h5 className="text-primary mb-0">Avatar</h5>
              </div>
              <div className="card-body text-center">
                {avatarPreview && (
                  <div className="mb-3">
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="img-fluid rounded-circle mb-3"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Cambiar Avatar</label>
                  <input
                    type="file"
                    className="form-control bg-dark text-white border-secondary"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <small className="text-muted">Formatos: JPG, PNG, GIF. Máx: 5MB</small>
              </div>
            </div>

            <div className="card bg-dark border-secondary">
              <div className="card-header border-secondary">
                <h5 className="text-primary mb-0">Información del Sistema</h5>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <strong>ID:</strong> {user.id}
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> {user.correo}
                </div>
                <div className="mb-2">
                  <strong>Rol Actual:</strong> 
                  <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-success'} ms-2`}>
                    {user.role}
                  </span>
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
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};