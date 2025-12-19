export interface AdminStats{
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  topProducts: {
    productId: string;
    name: string;
    sold: number;
    revenue: number;
  }[];
  recentOrders: {
    id: string;
    user: string;
    total: number;
    createdAt: string;
    status: string;
  }[];
}

export const mockAdminStats: AdminStats = {
  totalUsers: 1234,
  totalOrders: 56,
  totalRevenue: 7890, // chiffre total simulé

  topProducts: [
    { productId: '1', name: 'SSD 1TB Samsung', sold: 50, revenue: 7500 },
    { productId: '2', name: 'Casque Bluetooth Sony', sold: 35, revenue: 5250 },
    { productId: '3', name: 'Clavier Mécanique Logitech', sold: 40, revenue: 4000 },
    { productId: '4', name: 'Smartphone Xiaomi 12', sold: 25, revenue: 12500 },
    { productId: '5', name: 'Tablette Samsung Galaxy Tab', sold: 20, revenue: 10000 },
  ],

  recentOrders: [
    { id: '201', user: 'Alice', total: 350, createdAt: '2025-12-10T09:15:00Z', status: 'Pending' },
    { id: '202', user: 'Bob', total: 1200, createdAt: '2025-12-09T14:45:00Z', status: 'Shipped' },
    { id: '203', user: 'Charlie', total: 850, createdAt: '2025-12-08T11:30:00Z', status: 'Delivered' },
    { id: '204', user: 'David', total: 450, createdAt: '2025-12-07T16:20:00Z', status: 'Pending' },
    { id: '205', user: 'Eve', total: 600, createdAt: '2025-12-06T13:10:00Z', status: 'Shipped' },
  ],

};
