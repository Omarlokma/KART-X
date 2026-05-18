import axios from 'axios';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

// Loader for All Products page
export async function productsLoader() {
  const { data } = await axios.get(`${BASE_URL}/products`);
  return data.data;
}

// Loader for Single Product Details page
export async function productDetailsLoader({ params }) {
  const { data } = await axios.get(`${BASE_URL}/products/${params.id}`);
  return data.data;
}
