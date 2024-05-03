import React from 'react'
import "./Home.css"

export function Home() {

    return (
        
    <div>
        <h1>Bienvenido a Ballers Store</h1>
        <section id="colección">
            <h2>Descubre nuestros productos destacados</h2>
            
            <p>Sumérgete en nuestra amplia selección de zapatillas Jordan, diseñadas para el rendimiento y el estilo urbano. Desde clásicos atemporales hasta lanzamientos exclusivos, cada par cuenta una historia única.</p>
            <br />
            <div className='zapatillas'>
                

                <div className='zapatilla'>
                <img src="https://nikearprod.vtexassets.com/arquivos/ids/762497-1400-1400?v=638316091591130000&width=1400&height=1400&aspect=true" alt="Jordan 1" />
                <h3>Air Jordan 1 Mid SE Craft</h3>
                <p>¿Qué ocurre cuando le añades elegancia a un diseño clásico? El AJ1 Craft. La gamuza suave, la lona de cáñamo y el borde expuesto alrededor del cuello agregan una textura de buen gusto al calzado que ya conoces y te encanta. Y siguen siendo perfectos para el uso diario, con una cómoda confección de suela tipo cupsole y amortiguación Nike Air en la planta del pie.</p>
                <p>Precio: $260</p>
                </div>


                <div className='zapatilla'>
                <img src="https://nikearprod.vtexassets.com/arquivos/ids/785897-1400-1400?v=638336828828100000&width=1400&height=1400&aspect=true" alt="Jordan 1" />
                <h3>Air Jordan 8 Retro</h3>
                <p>El AJ8 es un clásico que debutó durante la temporada del campeonato de MJ en 1992-93. Esta edición es la más reciente en una extensa línea de retornos, para lucir los detalles moldeados, coloridos, y las correas de mediopié que la hicieron un ícono.</p>
                <p>Precio: $252</p>
                </div>



                <div className='zapatilla'>
                <img src="https://nikearprod.vtexassets.com/arquivos/ids/731610-1400-1400?v=638308284752000000&width=1400&height=1400&aspect=true" alt="Jordan 1" />
                <h3>Jordan Nu Retro 1 Low</h3>
                <p>20 años después, y estas "low tops" están de vuelta. Inspirado en el logotipo original Wings y en el diseño del Jordan 1, este calzado para todos los días está listo para lo que sea. Úsalos con jeans holgados, patina en ellos, o simplemente póntelos porque sí. Depende de ti. La parte superior de cuero suave y el logotipo grande en relieve te ayudarán a destacarte, ya sea que estés elegante o no.</p>
                <p>Precio: $190</p>
                </div>

            </div>

            <section id="opiniones">
            <h2 style={{ marginBottom: '20px' }}>Opiniones de nuestros clientes</h2>

            <div className="opiniones-container">
                <div className="opinion">
                    <div className="avatar">
                        <img src="https://img.freepik.com/psd-premium/disenador-hombre-icono-3d-personas-avatar_431668-1343.jpg?size=626&ext=jpg" alt="Avatar" />
                    </div>
                    <div className="details">
                        <div className="rating">
                            <span className="star">&#9733;</span>
                            <span className="star">&#9733;</span>
                            <span className="star">&#9733;</span>
                            <span className="star">&#9733;</span>
                            <span className="star">&#9734;</span>
                        </div>
                        <p className="comment">"¡Increíbles zapatillas! ¡Las amo! Siempre compro en Ballers Store."</p>
                    </div>
                </div>
            </div>
                <div className="opinion">
                    <div className="avatar">
                        <img src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671122.jpg?size=626&ext=jpg" alt="Avatar" />
                    </div>
                    <div className="details">
                        <div className="rating">
                            <span className="star">&#9733;</span>
                            <span className="star">&#9733;</span>
                            <span className="star">&#9733;</span>
                            <span className="star">&#9733;</span>
                            <span className="star">&#9733;</span>
                        </div>
                        <p className="comment">"Excelente atención al cliente y productos de calidad. ¡Volveré pronto!"</p>
                    </div>
                </div>
                


            </section>


        </section>


    </div>









    )
}