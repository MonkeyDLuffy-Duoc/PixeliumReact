import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface NewsItem {
  id: number;
  titulo: string;
  detalle: string;
  imageSrc: string;
  fechaCreacion?: string;
}

interface NewsManagementProps {
  api_url: string;
  user: any;
  onEdit: (news: NewsItem, type: 'news') => void;
  onCreate: () => void;
}

const IMAGE_URL = "http://localhost:8080/images/";

export const NewsManagement = ({ api_url, user, onEdit, onCreate }: NewsManagementProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    const currentToken = localStorage.getItem("token") || '';
    
    try {
      const response = await fetch(`${api_url}/noticias`);
      if (!response.ok) {
        if (response.status === 404) {
          setNews([]);
          return;
        }
        throw new Error('Error al cargar la lista de noticias.');
      }
      const data = await response.json();
      setNews(data);
      setToken(currentToken);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("No se pudieron cargar las noticias del servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta noticia?")) {
      return;
    }

    try {
      const response = await fetch(`${api_url}/noticias/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        toast.success("Noticia eliminada correctamente.");
        setNews(prevNews => prevNews.filter(item => item.id !== id));
      } else if (response.status === 403) {
        toast.error("Permiso denegado. Se requiere rol ADMIN.");
      } else {
        throw new Error(`Fallo en la eliminación. Código: ${response.status}`);
      }
    } catch (err) {
      toast.error("Error al eliminar la noticia.");
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
        <h3 className="text-primary mb-0">Gestión de Noticias</h3>
        <div>
          <button className="btn btn-primary" onClick={onCreate}>
            <i className="bi bi-plus-circle me-2"></i>Crear Noticia
          </button>
        </div>
      </div>

      {news.length === 0 ? (
        <div className="alert alert-warning text-center">
          <i className="bi bi-newspaper me-2"></i>
          No hay noticias publicadas.
          <div className="mt-2">
            <button className="btn btn-sm btn-primary" onClick={onCreate}>
              Crear Primera Noticia
            </button>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover text-white">
            <thead className="table-primary text-dark">
              <tr>
                <th scope="col" style={{ width: '5%' }}>ID</th>
                <th scope="col" style={{ width: '15%' }}>Imagen</th>
                <th scope="col" style={{ width: '25%' }}>Título</th>
                <th scope="col" style={{ width: '35%' }}>Detalle</th>
                <th scope="col" style={{ width: '10%' }}>Fecha</th>
                <th scope="col" style={{ width: '10%' }} className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img 
                      src={`${IMAGE_URL}${item.imageSrc}`} 
                      alt={item.titulo}
                      style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                      className="rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/img/error.gif";
                      }}
                    />
                  </td>
                  <td>
                    <strong>{item.titulo}</strong>
                  </td>
                  <td>
                    <div className="small">
                      {item.detalle.substring(0, 120)}...
                    </div>
                  </td>
                  <td>
                    {item.fechaCreacion ? new Date(item.fechaCreacion).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-1">
                      <button 
                        className="btn btn-sm btn-info" 
                        onClick={() => onEdit(item, 'news')}
                        title="Editar noticia"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleDelete(item.id)}
                        title="Eliminar noticia"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Resumen */}
      <div className="mt-3 text-end">
        <span className="text-muted">Total: {news.length} noticia(s)</span>
      </div>
    </div>
  );
};