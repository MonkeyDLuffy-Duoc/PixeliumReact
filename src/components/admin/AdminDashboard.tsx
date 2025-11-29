import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Importar componentes - RENOMBRAR LOS IMPORTS
import { CrearNoticia } from '../CrearNoticias';
import { CrearProducto } from '../CrearProducto';
import { UserManagement } from './UserManagement';
import { NewsManagement } from './NewsManagement';
import { ProductManagement } from './ProductManagement';
import { EditUser as EditUserComponent } from './EditUser'; // 🟡 RENOMBRADO
import { EditNoticia as EditNoticiaComponent } from './EditNoticia'; // 🟡 RENOMBRADO
import { EditProducto as EditProductoComponent } from './EditProducto'; // 🟡 RENOMBRADO

// Definimos los tipos de vista para la navegación
type AdminView = 'dashboard' | 'users' | 'news' | 'products' | 'create-product' | 'create-news' | 'edit-user' | 'edit-news' | 'edit-product';

// URLs base
const API_URL = "http://localhost:8080/api/v1";

// ========================================================
// COMPONENTE PRINCIPAL: AdminDashboard
// ========================================================

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [user, setUser] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);

  // 🛡️ Verificar Autenticación y Rol ADMIN al cargar
  useEffect(() => {
    const storedUserString = localStorage.getItem("usuario");
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      // Requerir Rol ADMIN
      if (storedUser.role !== 'ADMIN') {
        toast.error("Acceso denegado. Solo administradores.");
        navigate("/");
      }
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Función para manejar edición
  const handleEdit = (item: any, type: 'user' | 'news' | 'product') => {
    setEditItem(item);
    setCurrentView(`edit-${type}` as AdminView);
  };

  // Función para manejar creación
  const handleCreate = (type: 'news' | 'product') => {
    setEditItem(null);
    setCurrentView(`create-${type}` as AdminView);
  };

  // Función para volver a la lista
  const handleBackToList = (type: 'users' | 'news' | 'products') => {
    setEditItem(null);
    setCurrentView(type);
  };

  // Función para renderizar el componente activo
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <WelcomePanel user={user} />;
      
      // --- Vistas de Listado ---
      case 'users':
        return <UserManagement api_url={API_URL} user={user} onEdit={handleEdit} />;
      case 'news':
        return <NewsManagement api_url={API_URL} user={user} onEdit={handleEdit} onCreate={() => handleCreate('news')} />;
      case 'products':
        return <ProductManagement api_url={API_URL} user={user} onEdit={handleEdit} onCreate={() => handleCreate('product')} />;
      
      // --- Vistas de Creación ---
      case 'create-news':
        return <CrearNoticia onSuccess={() => handleBackToList('news')} onCancel={() => handleBackToList('news')} />;
      case 'create-product':
        return <CrearProducto onSuccess={() => handleBackToList('products')} onCancel={() => handleBackToList('products')} />;
      
      // --- Vistas de Edición ---
      case 'edit-user':
        return <EditUserComponent user={editItem} onSuccess={() => handleBackToList('users')} onCancel={() => handleBackToList('users')} api_url={API_URL} />;
      case 'edit-news':
        return <EditNoticiaComponent noticia={editItem} onSuccess={() => handleBackToList('news')} onCancel={() => handleBackToList('news')} />;
      case 'edit-product':
        return <EditProductoComponent producto={editItem} onSuccess={() => handleBackToList('products')} onCancel={() => handleBackToList('products')} />;
      
      default:
        return <WelcomePanel user={user} />;
    }
  };

  // Si el usuario no es admin o no está cargado, no mostramos el dashboard.
  if (!user || user.role !== 'ADMIN') return null;

  return (
    <main className="main-content pt-0">
      <div className="container-fluid hero-background py-0 pt-5" style={{minHeight: '100vh'}}>
        <div className="container my-5">
          <h1 className="text-center text-white mb-4 display-4">Panel de Administración</h1>
          <div className="row">
            {/* --- Menú Lateral (Navegación) --- */}
            <div className="col-lg-3 mb-4">
              <div className="card bg-dark text-white border-primary shadow-lg">
                <div className="card-header border-secondary">
                  <h5 className="mb-0 text-primary">Navegación</h5>
                </div>
                <div className="list-group list-group-flush">
                  <MenuLink label="Inicio" view="dashboard" currentView={currentView} setCurrentView={setCurrentView} icon="bi-grid" />
                  <MenuLink label="Gestión de Usuarios" view="users" currentView={currentView} setCurrentView={setCurrentView} icon="bi-people" />
                  <MenuLink label="Gestión de Noticias" view="news" currentView={currentView} setCurrentView={setCurrentView} icon="bi-newspaper" />
                  <MenuLink label="Gestión de Productos" view="products" currentView={currentView} setCurrentView={setCurrentView} icon="bi-box" />
                </div>
              </div>
            </div>

            {/* --- Contenido Principal --- */}
            <div className="col-lg-9">
              <div className="card bg-dark text-white p-4 border-primary shadow-lg">
                {renderView()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// ========================================================
// COMPONENTES AUXILIARES
// ========================================================

interface MenuLinkProps {
  label: string;
  view: AdminView;
  currentView: AdminView;
  setCurrentView: (view: AdminView) => void;
  icon: string;
}

const MenuLink = ({ label, view, currentView, setCurrentView, icon }: MenuLinkProps) => (
  <button 
    className={`list-group-item list-group-item-action bg-transparent text-white border-secondary ${currentView === view ? 'active bg-primary border-primary' : ''}`}
    onClick={() => setCurrentView(view)}
  >
    <i className={`bi ${icon} me-2`}></i>
    {label}
  </button>
);

const WelcomePanel = ({ user }: { user: any }) => (
  <div>
    <h2 className="text-primary mb-3">¡Bienvenido, {user.nombre.split(" ")[0]}!</h2>
    <p>Utiliza el menú lateral para gestionar los usuarios, productos y noticias de la plataforma. Tu rol es <strong>ADMIN</strong>.</p>
    <div className="row mt-4">
      <div className="col-md-4">
        <div className="card bg-secondary text-white">
          <div className="card-body text-center">
            <i className="bi bi-people display-4"></i>
            <h5>Usuarios</h5>
            <p>Gestiona usuarios y roles</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-secondary text-white">
          <div className="card-body text-center">
            <i className="bi bi-newspaper display-4"></i>
            <h5>Noticias</h5>
            <p>Administra contenido</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-secondary text-white">
          <div className="card-body text-center">
            <i className="bi bi-box display-4"></i>
            <h5>Productos</h5>
            <p>Controla el inventario</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ========================================================
// ELIMINA LOS COMPONENTES DE EDICIÓN LOCALES (PLACEHOLDERS)
// ========================================================

// ❌ ELIMINA ESTOS COMPONENTES QUE ESTÁN AL FINAL DEL ARCHIVO:
// - EditUser
// - EditNoticia  
// - EditProducto
// Ya no los necesitas porque ahora importas los componentes reales