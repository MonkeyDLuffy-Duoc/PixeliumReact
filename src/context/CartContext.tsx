
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react"; // 'ReactNode' es un tipo

// 2. Importa 'Product' explícitamente como un tipo
import type { Product } from "../data/products";

// 1. Definimos el tipo de un ítem en el carrito (Producto + cantidad)
export type CartItem = Product & {
  quantity: number;
};

// 2. Definimos la forma del Contexto
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

// 3. Creamos el Contexto
// El '!' al final le dice a TypeScript que confiaremos en que siempre tendrá un valor.
const CartContext = createContext<CartContextType>(null!);

// 4. Creamos el Hook personalizado para consumir el contexto fácilmente
export const useCart = () => {
  return useContext(CartContext);
};

// 5. Creamos el "Proveedor" del contexto
type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Lógica para agregar al carrito
  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      // a. Revisar si el producto ya existe
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // b. Si existe, actualizamos solo la cantidad
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // c. Si no existe, lo agregamos al array
        return [...prevItems, { ...product, quantity: quantity }];
      }
    });
  };

  // Lógica para eliminar un ítem
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Lógica para actualizar cantidad (ej. desde la página del carrito)
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      // Si la cantidad llega a 0, eliminar el ítem
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  // Lógica para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // 6. Valores derivados (calculados desde el estado)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 7. Entregamos los valores al Provider
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};