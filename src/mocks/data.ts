// data.ts (Fichier Corrigé et Complété)

// Définition de l'interface pour un avis complet (Review)
export interface Review {
  user: number; // L'ID de l'utilisateur qui a laissé l'avis (utilisé pour le mock)
  value: number; // La note (rating)
  comment?: string; // Le commentaire optionnel
  createdAt?: string; // Ajouté pour les mocks de liste d'avis
}

export interface PaginatedReviews {
  count: number;
  results: Review[];
}

// Définition de l'interface pour un produit
export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  owner_id: number;
  // 'ratings' est utilisé pour la rétrocompatibilité (calcul de la note moyenne rapide)
  ratings: Review[];
  // 'reviews' est la nouvelle liste d'avis complets (pour GET /reviews/)
  reviews?: Review[]; 
  stock: number;
  image_url: string; 
  lowStockThreshold: number;
}

// Pour garantir la mutabilité nécessaire au POST MSW
export let products: Product[] = [ 
  {
    id: 1,
    name: 'Smartphone X Pro',
    price: 799.99,
    created_at: '2025-01-10T10:00:00Z',
    owner_id: 10,
    ratings: [{ user: 2, value: 5 }],
    reviews: [
      { user: 2, value: 5, comment: "Excellent smartphone, rapide et design.", createdAt: '2025-01-15T10:00:00Z' },
    ],
    stock: 15,
    image_url: 'https://picsum.photos/seed/electronic-1/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 2,
    name: 'Laptop UltraBook 14"',
    price: 1199.99,
    created_at: '2025-02-01T09:30:00Z',
    owner_id: 11,
    ratings: [{ user: 3, value: 4 }],
    reviews: [
      { user: 3, value: 4, comment: "Laptop léger et performant pour le travail.", createdAt: '2025-02-05T09:30:00Z' },
      { user: 5, value: 5, comment: "Très bon rapport qualité-prix.", createdAt: '2025-02-06T11:00:00Z' },
    ],
    stock: 8,
    image_url: 'https://picsum.photos/seed/electronic-2/400/300',
    lowStockThreshold: 2,
  },
  {
    id: 3,
    name: 'Console GameStation 5',
    price: 499.99,
    created_at: '2025-02-12T12:00:00Z',
    owner_id: 12,
    ratings: [{ user: 4, value: 5 }],
    reviews: [
      { user: 4, value: 5, comment: "Console très fluide avec de super jeux.", createdAt: '2025-02-20T12:00:00Z' },
    ],
    stock: 12,
    image_url: 'https://picsum.photos/seed/electronic-3/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 4,
    name: 'Écouteurs Sans Fil Bluetooth',
    price: 59.99,
    created_at: '2025-03-01T08:45:00Z',
    owner_id: 13,
    ratings: [{ user: 2, value: 4 }],
    reviews: [
      { user: 2, value: 4, comment: "Bonne qualité sonore et confortable.", createdAt: '2025-03-05T08:45:00Z' },
    ],
    stock: 25,
    image_url: 'https://picsum.photos/seed/electronic-4/400/300',
    lowStockThreshold: 5,
  },
  {
    id: 5,
    name: 'Clavier Mécanique Gaming',
    price: 89.99,
    created_at: '2025-03-05T07:20:00Z',
    owner_id: 14,
    ratings: [{ user: 1, value: 5 }],
    stock: 20,
    image_url: 'https://picsum.photos/seed/electronic-5/400/300',
    lowStockThreshold: 5,
  },
  {
    id: 6,
    name: 'Souris Gaming RGB',
    price: 49.99,
    created_at: '2025-03-10T14:10:00Z',
    owner_id: 15,
    ratings: [{ user: 3, value: 4 }],
    stock: 18,
    image_url: 'https://picsum.photos/seed/electronic-6/400/300',
    lowStockThreshold: 4,
  },
  {
    id: 7,
    name: 'Tablette Graphique Pro',
    price: 299.99,
    created_at: '2025-03-11T11:00:00Z',
    owner_id: 16,
    ratings: [{ user: 6, value: 5 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/electronic-7/400/300',
    lowStockThreshold: 2,
  },
  {
    id: 8,
    name: 'Smartwatch Series 6',
    price: 199.99,
    created_at: '2025-03-12T09:00:00Z',
    owner_id: 17,
    ratings: [{ user: 3, value: 4 }],
    stock: 22,
    image_url: 'https://picsum.photos/seed/electronic-8/400/300',
    lowStockThreshold: 5,
  },
  {
    id: 9,
    name: 'Enceinte Bluetooth Portable',
    price: 79.99,
    created_at: '2025-03-15T10:30:00Z',
    owner_id: 18,
    ratings: [{ user: 5, value: 5 }],
    stock: 30,
    image_url: 'https://picsum.photos/seed/electronic-9/400/300',
    lowStockThreshold: 8,
  },
  {
    id: 10,
    name: 'Disque Dur Externe 1TB',
    price: 99.99,
    created_at: '2025-03-20T16:00:00Z',
    owner_id: 19,
    ratings: [{ user: 7, value: 4 }],
    stock: 14,
    image_url: 'https://picsum.photos/seed/electronic-10/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 11,
    name: 'Moniteur 27" 4K UHD',
    price: 399.99,
    created_at: '2025-03-22T12:40:00Z',
    owner_id: 20,
    ratings: [{ user: 2, value: 5 }],
    stock: 8,
    image_url: 'https://picsum.photos/seed/electronic-11/400/300',
    lowStockThreshold: 2,
  },
  {
    id: 12,
    name: 'Casque VR Immersif',
    price: 349.99,
    created_at: '2025-03-25T13:00:00Z',
    owner_id: 21,
    ratings: [{ user: 8, value: 5 }],
    stock: 6,
    image_url: 'https://picsum.photos/seed/electronic-12/400/300',
    lowStockThreshold: 2,
  },
  {
    id: 13,
    name: 'Chargeur Rapide 65W',
    price: 29.99,
    created_at: '2025-04-01T07:00:00Z',
    owner_id: 10,
    ratings: [{ user: 9, value: 4 }],
    stock: 50,
    image_url: 'https://picsum.photos/seed/electronic-13/400/300',
    lowStockThreshold: 10,
  },
  {
    id: 14,
    name: 'Caméra de Sécurité Wi-Fi',
    price: 129.99,
    created_at: '2025-04-03T08:00:00Z',
    owner_id: 11,
    ratings: [{ user: 1, value: 5 }],
    stock: 12,
    image_url: 'https://picsum.photos/seed/electronic-14/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 15,
    name: 'Routeur Wi-Fi 6',
    price: 199.99,
    created_at: '2025-04-05T10:20:00Z',
    owner_id: 12,
    ratings: [{ user: 3, value: 4 }],
    stock: 20,
    image_url: 'https://picsum.photos/seed/electronic-15/400/300',
    lowStockThreshold: 5,
  },
  {
    id: 16,
    name: 'SSD NVMe 1TB',
    price: 159.99,
    created_at: '2025-04-10T14:00:00Z',
    owner_id: 13,
    ratings: [{ user: 6, value: 5 }],
    stock: 18,
    image_url: 'https://picsum.photos/seed/electronic-16/400/300',
    lowStockThreshold: 4,
  },
  {
    id: 17,
    name: 'Tablette Android 10',
    price: 249.99,
    created_at: '2025-04-12T12:30:00Z',
    owner_id: 14,
    ratings: [{ user: 5, value: 4 }],
    stock: 15,
    image_url: 'https://picsum.photos/seed/electronic-17/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 18,
    name: 'Projecteur LED HD',
    price: 329.99,
    created_at: '2025-04-15T11:10:00Z',
    owner_id: 15,
    ratings: [{ user: 8, value: 5 }],
    stock: 7,
    image_url: 'https://picsum.photos/seed/electronic-18/400/300',
    lowStockThreshold: 2,
  },
  {
    id: 19,
    name: 'Clé USB 128GB',
    price: 19.99,
    created_at: '2025-04-18T09:40:00Z',
    owner_id: 16,
    ratings: [{ user: 2, value: 4 }],
    stock: 60,
    image_url: 'https://picsum.photos/seed/electronic-19/400/300',
    lowStockThreshold: 10,
  },
  {
    id: 20,
    name: 'Station d’accueil USB-C',
    price: 79.99,
    created_at: '2025-04-20T15:00:00Z',
    owner_id: 17,
    ratings: [{ user: 9, value: 5 }],
    stock: 25,
    image_url: 'https://picsum.photos/seed/electronic-20/400/300',
    lowStockThreshold: 5,
  },
];
