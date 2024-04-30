import img from "./userImg.jpg";

export const data = [
  {
    "id": 1,
    "nameProduct": "Nike Jordan 1",
    "price": 100,
    "urlImage": "https://nikearprod.vtexassets.com/arquivos/ids/680007-1200-1200?width=1200&height=1200&aspect=true",
    "quantity": 1,
    "description": "El bordado de lujo y la paleta tenue aportan una sensación de frescura discreta al AJ1 Mid. La edición especial Swoosh agrega un toque de brillo a un calzado que se ve bien (y se siente bien) sin importar dónde lo uses.\nDatos del producto \n - La amortiguación Nike Air en el talón crea una amortiguación ligera y flexible.\n - La confección de la suela cupsole ofrece soporte de perfil bajo\n - La suela de goma sólida cuenta con ranuras flexibles en el antepié para brindar soporte al movimiento natural."
  },
  {
    id: 2,
    nameProduct: "Nike Blazer",
    price: 60,
    urlImage:
      "https://nikearprod.vtexassets.com/arquivos/ids/809171-1200-1200?width=1200&height=1200&aspect=true",
    quantity: 1,
    description: "Elogiado en las calles por su simplicidad y comodidad, el Blazer regresa con su estilo de básquetbol clásico. Con cuero impecable, cuello de corte low y una lengüeta expuesta, es un calzado básico imprescindible para tu guardarropa.\nBeneficios\nLa parte superior de cuero adquiere la suavidad perfecta con el paso del tiempo.\nEl calzado se diseñó originalmente para el básquetbol de alto rendimiento, por lo que tiene una confección duradera, costuras resistentes y cordones que permiten ponerte y quitarte el calzado con facilidad todo esto ofrece durabilidad y comodidad.\nEl cuello acolchado de corte low luce elegante y se siente genial.\nLa confección vulcanizada fusiona la suela a la parte superior, creando así una sensación de flexibilidad y comodidad.\nLa suela de goma con patrón de espiguilla aporta una tracción duradera y un estilo de herencia."
  },
  {
    id: 3,
    nameProduct: "Nike Dunk",
    price: 80,
    urlImage:
      "https://nikearprod.vtexassets.com/arquivos/ids/658418-1200-1200?width=1200&height=1200&aspect=true",
    quantity: 1,
    description: "El ícono del básquetbol de los 80, que se creó para la cancha pero conquistó las calles, vuelve con revestimientos perfectamente brillantes y colores del equipo clásicos. Con su diseño icónico de básquetbol, el clásico Nike Dunk Low canaliza el espíritu vintage de la década de los 80 y vuelve a las calles, al tiempo que su cuello acolchado de corte low te permite llevar tu juego a cualquier lugar con comodidad. \nBeneficios\n- El cuero impecable en la parte superior tiene un ligero brillo, con el tiempo alcanza una suave perfección y luce revestimientos duraderos que recuerdan al básquetbol de los 80.\n- La entresuela de espuma proporciona amortiguación ligera y una respuesta inmediata.\n- El cuello acolchado de corte low agrega un look elegante que se siente cómodo.\n- El contraste de colores audaz en las versiones selectas vuelve a los colores universitarios lanzados en 1985, lo que te permite elegir quién fue el rey y además representar a tu equipo.\n- La suela de goma con el clásico punto de giro aporta durabilidad, tracción y un estilo tradicional."
  },
  {
    id: 4,
    nameProduct: "Nike Jordan 4",
    price: 150,
    urlImage:
      "https://nikearprod.vtexassets.com/arquivos/ids/730755-1200-1200?width=1200&height=1200&aspect=true",
    quantity: 1,
    description: "Estilo llamativo, herencia icónica. Con materiales premium y un diseño llamativo, el Air Jordan 4 Retro actualiza uno de los estilos más queridos de Jordan."
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
