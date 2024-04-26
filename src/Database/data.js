import img from "./userImg.jpg";

export const data = [
  {
    id: 1,
    nameProduct: "Nike Jordan 1",
    price: 100,
    urlImage:
      "https://nikearprod.vtexassets.com/arquivos/ids/680007-1200-1200?width=1200&height=1200&aspect=true",
    quantity: 1,
  },
  {
    id: 2,
    nameProduct: "Nike Blazer",
    price: 60,
    urlImage:
      "https://nikearprod.vtexassets.com/arquivos/ids/809171-1200-1200?width=1200&height=1200&aspect=true",
    quantity: 1,
  },
  {
    id: 3,
    nameProduct: "Nike Dunk",
    price: 80,
    urlImage:
      "https://nikearprod.vtexassets.com/arquivos/ids/658418-1200-1200?width=1200&height=1200&aspect=true",
    quantity: 1,
  },
  {
    id: 4,
    nameProduct: "Nike Jordan 4",
    price: 150,
    urlImage:
      "https://nikearprod.vtexassets.com/arquivos/ids/730755-1200-1200?width=1200&height=1200&aspect=true",
    quantity: 1,
  },
];

export const userData = {
  name: "Juan Pérez",
  email: "juan@example.com",
  img,
  lastLogin: "26/04/2024 14:35",
  walletBalance: 1234.56,
  sales: [],
  purchases: [
    {
      id: 4, //De compra
      nameProduct: "Nike Jordan 4",
      price: 150,
      urlImage:
        "https://nikearprod.vtexassets.com/arquivos/ids/730755-1200-1200?width=1200&height=1200&aspect=true",
      quantity: 1,
      timestamp: "1/4/2024",
    },
    {
      id: 3, //De compra
      nameProduct: "Nike Dunk",
      price: 80,
      urlImage:
        "https://nikearprod.vtexassets.com/arquivos/ids/658418-1200-1200?width=1200&height=1200&aspect=true",
      quantity: 1,
      timestamp: "5/4/2024",
    },
    {
      id: 4, //De compra
      nameProduct: "Nike Jordan 4",
      price: 150,
      urlImage:
        "https://nikearprod.vtexassets.com/arquivos/ids/730755-1200-1200?width=1200&height=1200&aspect=true",
      quantity: 1,
      timestamp: "1/4/2024",
    },
    {
      id: 3, //De compra
      nameProduct: "Nike Dunk",
      price: 80,
      urlImage:
        "https://nikearprod.vtexassets.com/arquivos/ids/658418-1200-1200?width=1200&height=1200&aspect=true",
      quantity: 1,
      timestamp: "5/4/2024",
    },
    {
      id: 3, //De compra
      nameProduct: "Nike Dunk",
      price: 80,
      urlImage:
        "https://nikearprod.vtexassets.com/arquivos/ids/658418-1200-1200?width=1200&height=1200&aspect=true",
      quantity: 1,
      timestamp: "5/4/2024",
    },
  ],
};
