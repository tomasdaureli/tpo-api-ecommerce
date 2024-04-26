import React, { useState, useEffect } from 'react'
import './User.css'
import { ProductUserCard } from '../Cards/productUserCard';

export function UserPnSList({ user }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const bulkSize = 4;

    const purchasesBulks = user?.purchases
        ? Array.from({ length: Math.ceil(user.purchases.length / bulkSize) }, (_, i) =>
            user.purchases.slice(i * bulkSize, i * bulkSize + bulkSize)
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
            {!user ? (<div>Cargando datos del usuario...</div>) : (<>
                <div class="container">
                    <div class="userPurchases">
                        <p>Total de compras: {user?.purchases?.length}</p>
                        <button onClick={previousBulk} disabled={currentIndex === 0}>
                            Anterior
                        </button>
                        <button onClick={nextBulk} disabled={currentIndex === purchasesBulks.length - 1}>
                            Siguiente
                        </button>
                        <div className='user-container-items'>
                            {purchasesBulks[currentIndex]?.map(product => (
                                <ProductUserCard product={product} />
                            ))}
                        </div>

                    </div>
                    <div class="userSales">
                        <p>Total de ventas: {user?.sales?.length}</p>

                    </div>
                </div >
            </>)
            }

        </>


    );
}
