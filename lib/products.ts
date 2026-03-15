import { Product, ProductStock } from "@/types";
import { fetchVercelApi } from "./fetchVercelApi";

export const fetchProducts: () => Promise<Product[]> = async () => {
  const response = await fetchVercelApi("/products");
  const { data } = await response.json();
  return data;
};

export const fetchProductById: (id: string) => Promise<Product> = async (
  id,
) => {
  const response = await fetchVercelApi(`/products/${id}`);
  const { data } = await response.json();
  return data;
};

export const fetchProductStock: (id: string) => Promise<ProductStock> = async (
  id,
) => {
  const response = await fetchVercelApi(`/products/${id}/stock`);
  const { data } = await response.json();
  return data;
};
