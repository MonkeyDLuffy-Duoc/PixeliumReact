import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { ProductDetail } from "./pages/ProductDetail";
import { Contact } from "./pages/Contact";
import { Route, Routes } from "react-router-dom";
import { Noticias } from "./pages/Noticias";
import { Nosotros } from "./pages/Nosotros";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import { ScrollToTop } from "./components/ScrollToTop";
import { CrearNoticia } from "./components/CrearNoticias";
import { CrearProducto } from "./components/CrearProducto";
import { Perfil } from "./pages/Perfil";
import { ProtectedRoute } from "./components/ProtectedRoute"; // 1. Importamos la protección

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Noticias" element={<Noticias/>}/>
        <Route path="/Nosotros" element={<Nosotros/>}/>
        <Route path="/Login" element={<Login/>}/>
        
        {/* 2. Protegemos el Perfil (Solo usuarios logueados) */}
        <Route path="/Perfil" element={
          <ProtectedRoute>
            <Perfil/>
          </ProtectedRoute>
        }/>
        
        <Route path="/Register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
        
        {/* 3. Protegemos Rutas de Admin (Solo rol ADMIN) */}
        <Route path="/admin/crear-producto" element={
          <ProtectedRoute requiredRole="ADMIN">
            <CrearProducto />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/crear-noticia" element={
          <ProtectedRoute requiredRole="ADMIN">
            <CrearNoticia />
          </ProtectedRoute>
        } />
        
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order-success" element={<OrderSuccess/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App