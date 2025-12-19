import { User } from "./user";

export let mockUser: User = {
  id: 'u123',
  username: 'ZAIDEV',
  email: 'zaid@example.com',
  fullName: 'ZAID HANKRI',
  defaultAddress: {
    street: '24 Bloc Ergonomique',
    city: 'Paris',
    zip: '75010',
    country: 'France'
  },
  preferences: {
    newsletter: true,
    defaultMinRating: 3
  },
  orders: [
    {
      id: 'ord-101',
      date: '2025-03-20T14:00:00Z',
      status: 'livrée',
      items: [
        { productId: 1, name: 'Clé USB 128GB', quantity: 2, price: 2.5, total: 5 },
        { productId: 10, name: 'Projecteur LED HD', quantity: 3, price: 3.0, total: 9 },
        { productId: 6, name: 'Tablette Android 10', quantity: 5, price: 0.9, total: 4.5 }
      ],
      subTotal: 18.5,
      tax: 3.5,
      shippingFee: 5.9,
      total: 27.9
    },
    {
      id: 'ord-102',
      date: '2025-04-02T09:30:00Z',
      status: 'expédiée',
      items: [
        { productId: 3, name: 'Classeur Anneaux Rouge', quantity: 1, price: 4.5, total: 4.5 },
        { productId: 7, name: 'Surligneur Jaune Fluo', quantity: 2, price: 1.7, total: 3.4 }
      ],
      subTotal: 7.9,
      tax: 1.5,
      shippingFee: 3.0,
      total: 12.4
    }
  ]
};
