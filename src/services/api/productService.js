import mockProducts from "@/services/mockData/products.json";

let products = [...mockProducts];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const getAll = async () => {
  await delay();
  return [...products];
};

export const getById = async (id) => {
  await delay();
  const product = products.find(p => p.Id === id);
  if (!product) {
    throw new Error("Product not found");
  }
  return { ...product };
};

export const create = async (productData) => {
  await delay();
  const maxId = products.length > 0 ? Math.max(...products.map(p => p.Id)) : 0;
  const newProduct = {
    Id: maxId + 1,
    ...productData,
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  return { ...newProduct };
};

export const update = async (id, productData) => {
  await delay();
  const index = products.findIndex(p => p.Id === id);
  if (index === -1) {
    throw new Error("Product not found");
  }
  const updatedProduct = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString()
  };
  products[index] = updatedProduct;
  return { ...updatedProduct };
};

export const delete_ = async (id) => {
  await delay();
  const index = products.findIndex(p => p.Id === id);
  if (index === -1) {
    throw new Error("Product not found");
  }
  const deletedProduct = products[index];
  products.splice(index, 1);
  return { ...deletedProduct };
};

// Export delete with underscore to avoid conflict with reserved keyword
export { delete_ as delete };