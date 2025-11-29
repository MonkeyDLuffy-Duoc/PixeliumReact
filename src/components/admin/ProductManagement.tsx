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

interface ProductManagementProps {
  api_url: string;
  user: any;
  onEdit: (product: ProductItem, type: 'product') => void;
  onCreate: () => void;
}

const IMAGE_URL = "http://localhost:8080/images/";

export const ProductManagement = ({ api_url, user, onEdit, onCreate }: ProductManagementProps) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const currentToken = localStorage.getItem("token") || '';
    setToken(currentToken);
    
    try {
      const response = await fetch(`${api_url}/productos`);
      if (!response.ok) {
        if (response.status === 404) {
          setProducts([]);
          return;
        }
        throw new Error('Error al cargar la lista de productos.');
      }
      const data: ProductItem[] = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("No se pudieron cargar los productos del servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      const response = await fetch(`${api_url}/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        toast.success("Producto eliminado correctamente.");
        setProducts(prevProducts => prevProducts.filter(item => item.id !== id));
      } else if (response.status === 403) {
        toast.error("Permiso denegado. Se requiere rol ADMIN.");
      } else {
        throw new Error(`Fallo en la eliminación. Código: ${response.status}`);
      }
    } catch (err) {
      toast.error("Error al eliminar el producto.");
    }
  };

  // Agrupar productos por categoría para estadísticas
  const productsByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
        <h3 className="text-primary mb-0">Gestión de Productos</h3>
        <div>
          <button className="btn btn-primary" onClick={onCreate}>
            <i className="bi bi-plus-circle me-2"></i>Crear Producto
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-warning text-center">
          <i className="bi bi-box me-2"></i>
          No hay productos publicados.
          <div className="mt-2">
            <button className="btn btn-sm btn-primary" onClick={onCreate}>
              Agregar Primer Producto
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover text-white">
              <thead className="table-primary text-dark">
                <tr>
                  <th scope="col" style={{ width: '5%' }}>ID</th>
                  <th scope="col" style={{ width: '10%' }}>Imagen</th>
                  <th scope="col" style={{ width: '20%' }}>Título</th>
                  <th scope="col" style={{ width: '15%' }}>Categoría</th>
                  <th scope="col" style={{ width: '15%' }}>Precio</th>
                  <th scope="col" style={{ width: '25%' }}>Descripción</th>
                  <th scope="col" style={{ width: '10%' }} className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img 
                        src={`${IMAGE_URL}${item.imageSrc}`} 
                        alt={item.title}
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        className="rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/img/error.gif";
                        }}
                      />
                    </td>
                    <td>
                      <strong>{item.title}</strong>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{item.category}</span>
                    </td>
                    <td>
                      <strong className="text-success">
                        {item.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                      </strong>
                    </td>
                    <td>
                      <div className="small">
                        {item.description.substring(0, 80)}...
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <button 
                          className="btn btn-sm btn-info" 
                          onClick={() => onEdit(item, 'product')}
                          title="Editar producto"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-danger" 
                          onClick={() => handleDelete(item.id)}
                          title="Eliminar producto"
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

          {/* Estadísticas */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h4>{products.length}</h4>
                  <p>Total Productos</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h4>{Object.keys(productsByCategory).length}</h4>
                  <p>Categorías</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <h4>
                    {products.reduce((sum, product) => sum + product.price, 0).toLocaleString('es-CL', {
                      style: 'currency',
                      currency: 'CLP'
                    })}
                  </h4>
                  <p>Valor Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Categorías */}
          <div className="mt-4">
            <h5 className="text-primary">Productos por Categoría</h5>
            <div className="row">
              {Object.entries(productsByCategory).map(([category, count]) => (
                <div key={category} className="col-md-3 mb-2">
                  <div className="card bg-dark border-secondary">
                    <div className="card-body py-2">
                      <div className="d-flex justify-content-between">
                        <span>{category}</span>
                        <span className="badge bg-primary">{count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};