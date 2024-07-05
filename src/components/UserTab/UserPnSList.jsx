import React, { useEffect, useState } from "react";
import "./User.css";
import { ProductBuyerCard } from "../Cards/productBuyerCard";
import { getProductsBySeller } from "../../api/productsApi";
import { ProductVendorCard } from "../Cards/productVendorCard";

export function UserPnSList({ user, refreshProducts }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [productsToSHow, setProductsToSHow] = useState({});
    const bulkSize = 4;
    useEffect(() => {
        const loadUser = async () => {
            if (user.role == "VENDEDOR") {
                await getProductsBySeller(user.id).then((data) =>
                    setProductsToSHow(data)
                );
            }
            if (user.role == "COMPRADOR") {
                setProductsToSHow(user?.buys);
            }
        };

        loadUser();
    }, [user]);
    const purchasesBulks = productsToSHow
        ? Array.from(
            { length: Math.ceil(productsToSHow.length / bulkSize) },
            (_, i) => productsToSHow.slice(i * bulkSize, i * bulkSize + bulkSize)
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
            {!user ? (
                <div>Cargando datos del usuario...</div>
            ) : (
                <div className="container">
                    <div className="userPurchases">
                        {user.role == "COMPRADOR" ? <p>Total de compras: {productsToSHow.length}</p> : <p>Total de productos: {productsToSHow.length}</p>}
                        <div className="pagination-container">
                            <button
                                className="page-button"
                                onClick={previousBulk}
                                disabled={currentIndex === 0}
                            >
                                Anterior
                            </button>
                            <div className="page-info">
                                Página: {currentIndex + 1} de {purchasesBulks.length}
                            </div>
                            <button
                                className="page-button"
                                onClick={nextBulk}
                                disabled={currentIndex === purchasesBulks.length - 1}
                            >
                                Siguiente
                            </button>
                        </div>
                        <div className="user-container-items">
                            {user.role == "COMPRADOR" ? (
                                <>
                                    {purchasesBulks[currentIndex]?.map((product) => (
                                        <ProductBuyerCard
                                            product={product}
                                            key={product.id}
                                            refreshProducts={refreshProducts}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    {purchasesBulks[currentIndex]?.map((product) => (
                                        <ProductVendorCard
                                            product={product}
                                            key={product.id}
                                            refreshProducts={refreshProducts}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
