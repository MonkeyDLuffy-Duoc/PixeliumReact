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


function App() {
  return (
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
      <Route path="/Register" element={<Register/>}/>
      </Route>
    </Routes>
  )
}

export default App
