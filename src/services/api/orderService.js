import mockOrders from "@/services/mockData/orders.json";

let orders = [...mockOrders];

const delay = () => new Promise(resolve => setTimeout(resolve, 400));

export const getAll = async () => {
  await delay();
  return [...orders];
};

export const getById = async (id) => {
  await delay();
  const order = orders.find(o => o.Id === id);
  if (!order) {
    throw new Error("Order not found");
  }
  return { ...order };
};

export const create = async (orderData) => {
  await delay();
  const maxId = orders.length > 0 ? Math.max(...orders.map(o => o.Id)) : 0;
  const newOrder = {
    Id: maxId + 1,
    ...orderData,
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  return { ...newOrder };
};

export const update = async (id, orderData) => {
  await delay();
  const index = orders.findIndex(o => o.Id === id);
  if (index === -1) {
    throw new Error("Order not found");
  }
  const updatedOrder = {
    ...orders[index],
    ...orderData,
    updatedAt: new Date().toISOString()
  };
  orders[index] = updatedOrder;
  return { ...updatedOrder };
};

export const delete_ = async (id) => {
  await delay();
  const index = orders.findIndex(o => o.Id === id);
  if (index === -1) {
    throw new Error("Order not found");
  }
  const deletedOrder = orders[index];
  orders.splice(index, 1);
  return { ...deletedOrder };
};

// Export delete with underscore to avoid conflict with reserved keyword
export { delete_ as delete };