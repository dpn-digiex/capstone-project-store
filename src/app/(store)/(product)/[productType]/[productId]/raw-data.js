const IMAGES_LIST = [
  'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/322612/s16/macbook-air-15-inch-m3-2024-xam-1-650x650.png',
  'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/322612/s16/macbook-air-13-inch-m3-2024-xam-2-650x650.jpg',
  'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/322612/s16/macbook-air-13-inch-m3-2024-xam-3-650x650.jpg',
  'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/322612/s16/macbook-air-13-inch-m3-2024-xam-4-650x650.jpg',
  'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/322612/s16/macbook-air-13-inch-m3-2024-xam-5-650x650.jpg',
  'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/322612/s16/macbook-air-13-inch-m3-2024-xam-5-650x650.jpg',
  'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/322612/s16/macbook-air-13-inch-m3-2024-xam-5-650x650.jpg'
]

export const COLOR_LIST = [
  {
    id: 'color-space-gray',
    name: 'Space Gray',
    hex: '#7D7E80'
  },
  {
    id: 'color-silver',
    name: 'Silver',
    hex: '#E3E4E6'
  },
  {
    id: 'color-starlight',
    name: 'Starlight',
    hex: '#F0E4D3'
  },
  {
    id: 'color-midnight',
    name: 'Midnight',
    hex: '#2E3642'
  }
]

export const VARIANTS_LIST = [
  {
    isDefault: true,
    id: 'version01',
    name: 'RAM 8GB - 256GB SSD',
    slug: 'ram-8gb-256gb-ssd'
  },
  {
    id: 'version02',
    name: 'RAM 8GB - 512GB SSD',
    slug: 'ram-8gb-512gb-ssd'
  },
  {
    id: 'version03',
    name: 'RAM 16GB - 512GB SSD',
    slug: 'ram-16gb-512gb-ssd'
  },
  {
    id: 'version04',
    name: 'RAM 16GB - 1TB SSD',
    slug: 'ram-16gb-1tb-ssd'
  }
]

// Product Schema
export const ProductSchema = {
  name: 'MacBook Air 13 inch M3',
  model: 'MacBook Air 13 inch M3',
  slug: 'macbook-air-13-inch-m3-2024',
  brand: 'Apple',
  category: 'macbook',
  descriptions: [],
  status: 'new',
  variants: [
    {
      versionId: 'version01',
      isDefault: true,
      name: 'RAM 8GB - 256GB SSD',
      specifications: {
        processor: 'Apple M1 Pro',
        memory: 'RAM 8GB',
        storage: '256GB SSD'
      },
      options: [
        {
          colorId: 'color-space-gray',
          color: 'Space Gray',
          hex: '#7D7E80',
          stock: 25,
          price: 27990000,
          discount: 0,
          pictures: IMAGES_LIST
        },
        {
          colorId: 'color-silver',
          color: 'Silver',
          hex: '#E3E4E6',
          stock: 25,
          price: 28990000,
          discount: 10,
          pictures: IMAGES_LIST
        },
        {
          colorId: 'color-starlight',
          color: 'Starlight',
          hex: '#F0E4D3',
          stock: 25,
          price: 29990000,
          discount: 20,
          pictures: IMAGES_LIST
        },
        {
          colorId: 'color-midnight',
          color: 'Midnight',
          hex: '#2E3642',
          stock: 25,
          price: 25990000,
          discount: 30,
          pictures: IMAGES_LIST
        }
      ]
    },
    {
      versionId: 'version02',
      name: 'RAM 8GB - 512GB SSD',
      specifications: {
        processor: 'Apple M1 Pro',
        memory: 'RAM 8GB',
        storage: '512GB SSD'
      },
      options: [
        {
          colorId: 'color-silver',
          color: 'Silver',
          hex: '#E3E4E6',
          stock: 25,
          price: 31990000,
          discount: 10,
          pictures: IMAGES_LIST
        },
        {
          colorId: 'color-starlight',
          color: 'Starlight',
          hex: '#F0E4D3',
          stock: 25,
          price: 31990000,
          discount: 20,
          pictures: IMAGES_LIST
        },
        {
          colorId: 'color-midnight',
          color: 'Midnight',
          hex: '#2E3642',
          stock: 25,
          price: 31990000,
          discount: 30,
          pictures: IMAGES_LIST
        }
      ]
    },
    {
      versionId: 'version03',
      name: 'RAM 16GB - 512GB SSD',
      specifications: {
        processor: 'Apple M1 Pro',
        memory: 'RAM 16GB',
        storage: '512GB SSD'
      },
      options: [
        {
          colorId: 'color-starlight',
          color: 'Starlight',
          hex: '#F0E4D3',
          stock: 25,
          price: 34990000,
          discount: 20,
          pictures: IMAGES_LIST
        },
        {
          colorId: 'color-midnight',
          color: 'Midnight',
          hex: '#2E3642',
          stock: 25,
          price: 34990000,
          discount: 30,
          pictures: IMAGES_LIST
        }
      ]
    },
    {
      versionId: 'version04',
      name: 'RAM 16GB - 1TB SSD',
      specifications: {
        processor: 'Apple M1 Pro',
        memory: 'RAM 16GB',
        storage: '1TB SSD'
      },
      options: [
        {
          colorId: 'color-space-gray',
          color: 'Space Gray',
          hex: '#7D7E80',
          stock: 25,
          price: 37990000,
          discount: 0,
          pictures: IMAGES_LIST
        },
        {
          colorId: 'color-silver',
          color: 'Silver',
          hex: '#E3E4E6',
          stock: 25,
          price: 37990000,
          discount: 10,
          pictures: IMAGES_LIST
        },
        {
          colorId: 'color-starlight',
          color: 'Starlight',
          hex: '#F0E4D3',
          stock: 25,
          price: 37990000,
          discount: 20,
          pictures: IMAGES_LIST
        }
      ]
    }
  ]
}

export const RAW_PRODUCT_DETAIL = {
  id: 'product01',
  isDefault: true,
  name: 'MacBook Air 13 inch M3',
  model: 'MacBook Air 13 inch M3',
  slug: 'macbook-air-13-inch-m3-2024',
  brand: 'Apple',
  category: 'macbook',
  descriptions: [],
  status: 'new',
  versionId: 'version01',
  currentPrice: 26990000,
  price: 27990000,
  discount: 12,
  image: 'https://cdn.tgdd.vn/Products/Images/44/322612/s16/macbook-air-15-inch-m3-2024-xam-1-650x650.png',
  variantOpts: VARIANTS_LIST,
  colorOpts: COLOR_LIST,
  images: IMAGES_LIST
}
