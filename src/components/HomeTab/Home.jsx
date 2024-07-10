import React from "react";
import "./Home.css";

export function Home() {
  // Datos simulados para productos y opiniones
  const products = [
    {
      id: 1,
      name: "Air Jordan 1 Mid SE Craft",
      image:
        "https://nikearprod.vtexassets.com/arquivos/ids/762497-1400-1400?v=638316091591130000&width=1400&height=1400&aspect=true",
      description:
        "¿Qué ocurre cuando le añades elegancia a un diseño clásico? El AJ1 Craft. La gamuza suave, la lona de cáñamo y el borde expuesto alrededor del cuello agregan una textura de buen gusto al calzado que ya conoces y te encanta. Y siguen siendo perfectos para el uso diario, con una cómoda confección de suela tipo cupsole y amortiguación Nike Air en la planta del pie.",
      price: "$260",
    },
    {
      id: 2,
      name: "Air Jordan 8 Retro",
      image:
        "https://nikearprod.vtexassets.com/arquivos/ids/785897-1400-1400?v=638336828828100000&width=1400&height=1400&aspect=true",
      description:
        "El AJ8 es un clásico que debutó durante la temporada del campeonato de MJ en 1992-93. Esta edición es la más reciente en una extensa línea de retornos, para lucir los detalles moldeados, coloridos, y las correas de mediopié que la hicieron un ícono.",
      price: "$252",
    },
    {
      id: 3,
      name: "Jordan Nu Retro 1 Low",
      image:
        "https://nikearprod.vtexassets.com/arquivos/ids/731610-1400-1400?v=638308284752000000&width=1400&height=1400&aspect=true",
      description:
        "20 años después, y estas 'low tops' están de vuelta. Inspirado en el logotipo original Wings y en el diseño del Jordan 1, este calzado para todos los días está listo para lo que sea. Úsalos con jeans holgados, patina en ellos, o simplemente póntelos porque sí. Depende de ti. La parte superior de cuero suave y el logotipo grande en relieve te ayudarán a destacarte, ya sea que estés elegante o no.",
      price: "$190",
    },
  ];

  const reviews = [
    {
      id: 1,
      avatar:
        "https://img.freepik.com/psd-premium/disenador-hombre-icono-3d-personas-avatar_431668-1343.jpg?size=626&ext=jpg",
      comment:
        "¡Increíbles zapatillas! ¡Las amo! Siempre compro en Ballers Store.",
      rating: 4,
    },
    {
      id: 2,
      avatar:
        "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671122.jpg?size=626&ext=jpg",
      comment:
        "Excelente atención al cliente y productos de calidad. ¡Volveré pronto!",
      rating: 5,
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a Ballers Store</h1>
      <section className="featured-products">
        <h2>Descubre nuestros productos destacados</h2>
        <p>
          Sumérgete en nuestra amplia selección de zapatillas Jordan, diseñadas
          para el rendimiento y el estilo urbano. Desde clásicos atemporales
          hasta lanzamientos exclusivos, cada par cuenta una historia única.
        </p>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="customer-reviews">
        <h2>Opiniones de nuestros clientes</h2>
        <div className="review-grid">
          {reviews.map((review) => (
            <div className="review" key={review.id}>
              <div className="avatar">
                <img src={review.avatar} alt="Avatar" />
              </div>
              <div className="details">
                <div className="rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className="star">
                      {index < review.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="comment">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
