import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Define la interfaz de Usuario
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

interface UserManagementProps {
  api_url: string;
  user: UserItem;
  onEdit: (user: UserItem, type: 'user') => void;
}

export const UserManagement = ({ api_url, user: adminUser, onEdit }: UserManagementProps) => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState('');

  // Cargar usuarios
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const currentToken = localStorage.getItem("token") || '';
    setToken(currentToken);
    
    try {
      const response = await fetch(`${api_url}/usuarios`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          throw new Error("Permiso denegado. Acceso al listado falló.");
        }
        setUsers([]);
        return;
      }
      
      const data: UserItem[] = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("No se pudieron cargar los usuarios del servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Manejar eliminación
  const handleDelete = async (id: number) => {
    if (id === adminUser.id) {
      toast.error("No puedes eliminar tu propia cuenta de administrador.");
      return;
    }

    if (!window.confirm(`¿Estás seguro de que deseas eliminar al usuario ID ${id}?`)) {
      return;
    }

    try {
      const response = await fetch(`${api_url}/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 204) {
        toast.success("Usuario eliminado correctamente.");
        setUsers(prevUsers => prevUsers.filter(item => item.id !== id));
      } else if (response.status === 403) {
        toast.error("Permiso denegado. Se requiere rol ADMIN.");
      } else {
        throw new Error(`Fallo en la eliminación. Código: ${response.status}`);
      }
    } catch (err) {
      toast.error("Error al eliminar el usuario.");
    }
  };

  // Manejar cambio de rol
const handleRoleChange = async (userId: number, newRole: 'ADMIN' | 'USER') => {
    if (userId === adminUser.id) {
        toast.error("No puedes cambiar tu propio rol.");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("nombre", users.find(u => u.id === userId)?.nombre || '');
        formData.append("rut", users.find(u => u.id === userId)?.rut || '');
        formData.append("telefono", users.find(u => u.id === userId)?.telefono || '');
        formData.append("fechaNacimiento", users.find(u => u.id === userId)?.fechaNacimiento || '');
        formData.append("comuna", users.find(u => u.id === userId)?.comuna || '');
        formData.append("role", newRole); // 🆕 ENVIAR EL NUEVO ROL

        const response = await fetch(`${api_url}/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            toast.success(`Rol cambiado a ${newRole} correctamente.`);
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
        } else {
            const errorText = await response.text();
            toast.error(`Error al cambiar el rol: ${errorText}`);
        }
    } catch (error) {
        console.error('Error changing role:', error);
        toast.error("Error de conexión al cambiar el rol.");
    }
};

  if (loading) {
    return <div className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary mb-0">Gestión de Usuarios</h3>
        <span className="badge bg-secondary fs-6">Total: {users.length}</span>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-warning text-center">
          <i className="bi bi-people me-2"></i>
          No hay usuarios registrados en el sistema.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover text-white">
            <thead className="table-primary text-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Rol</th>
                <th scope="col" className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id} className={item.id === adminUser.id ? 'table-warning text-dark' : ''}>
                  <td>{item.id}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {item.avatarSrc && (
                        <img 
                          src={`http://localhost:8080/images/${item.avatarSrc}`} 
                          alt={item.nombre}
                          className="rounded-circle me-2"
                          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                        />
                      )}
                      {item.nombre}
                      {item.id === adminUser.id && (
                        <span className="badge bg-warning ms-2">Tú</span>
                      )}
                    </div>
                  </td>
                  <td>{item.correo}</td>
                  <td>{item.telefono || 'N/A'}</td>
                  <td>
                    <select 
                      value={item.role} 
                      onChange={(e) => handleRoleChange(item.id, e.target.value as 'ADMIN' | 'USER')}
                      className={`form-select form-select-sm ${item.id === adminUser.id ? 'bg-warning text-dark' : ''}`}
                      disabled={item.id === adminUser.id}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn btn-sm btn-info" 
                        onClick={() => onEdit(item, 'user')}
                        title="Editar usuario"
                      >
                        <i className="bi bi-pencil-fill"></i> Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleDelete(item.id)}
                        title="Eliminar usuario"
                        disabled={item.id === adminUser.id}
                      >
                        <i className="bi bi-trash-fill"></i> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Estadísticas */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h4>{users.filter(u => u.role === 'ADMIN').length}</h4>
              <p>Administradores</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h4>{users.filter(u => u.role === 'USER').length}</h4>
              <p>Usuarios Normales</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h4>{users.length}</h4>
              <p>Total Usuarios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};