import React, { useState } from 'react'
import './User.css'
import { ProductUserCard } from '../Cards/productUserCard';

export function UserPnSList({ user, refreshProducts }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const bulkSize = 4;

    const purchasesBulks = user?.buys
        ? Array.from({ length: Math.ceil(user.buys.length / bulkSize) }, (_, i) =>
            user.buys.slice(i * bulkSize, i * bulkSize + bulkSize)
        )
        : [];

    const previousBulk = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const nextBulk = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < purchasesBulks.length - 1 ? prevIndex + 1 : prevIndex
        );
    };
    return (
        <>
            {!user ? (<div>Cargando datos del usuario...</div>) : (<div className="container">
                <div className="userPurchases">
                    <p>Total de compras: {user?.buys?.length}</p>
                    <div className='pagination-container'>
                        <button className='page-button' onClick={previousBulk} disabled={currentIndex === 0}>
                            Anterior
                        </button>
                        <div className='page-info'>Página: {currentIndex + 1} de {purchasesBulks.length}</div>
                        <button className='page-button' onClick={nextBulk} disabled={currentIndex === purchasesBulks.length - 1}>
                            Siguiente
                        </button>
                    </div>
                    <div className='user-container-items'>
                        {purchasesBulks[currentIndex]?.map(product => (
                            <ProductUserCard product={product} key={product.id} refreshProducts={refreshProducts} />
                        ))}
                    </div>

                </div>
                <div className="userSales">
                    <p>Total de ventas: {user?.sales?.length}</p>

                </div>
            </div >)
            }

        </>


    );
}
