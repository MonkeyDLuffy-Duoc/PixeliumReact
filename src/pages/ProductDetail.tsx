import { useParams } from "react-router-dom"
import { products } from "../data/products";

export const ProductDetail = () => {
    const { id } =useParams<{id: string}>();
    const pid =Number(id);
    const product = products.find((p) => p.id === pid);
  return (
    <>
    <h1>Detalle</h1>
    <h2>{product?.title}</h2>
    <h2>{product?.price}</h2>
    </>
  )
}