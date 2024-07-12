import React, { useEffect, useState } from "react";
import "./User.css";
import { ProductBuyerCard } from "../Cards/productBuyerCard";
import { ProductVendorCard } from "../Cards/productVendorCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySeller } from "../../Features/Products/ProductAction";
import Paginator from "../utils/Paginator/Paginator";
import { getCoupons } from "../../Features/Coupons/CuponsAction";
import CouponCard from "../Cards/cuponCard";
import CreateCouponModal from "../modals/CouponModal/CreateCouponModal ";

export function UserPnSList() {
  const dispatch = useDispatch();
  const { coupons, couponsStatus, couponsError, changeCouponsSliceFlag } =
    useSelector((state) => state.coupons);
  const { user, status, buys } = useSelector((state) => state.user);

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentCuponIndex, setCurrentCuponIndex] = useState(0);
  const [productsToShow, setProductsToShow] = useState({});

  const [showCreateModal, setShowCreateModal] = useState(false);

  const bulkSize = 4;

  useEffect(() => {
    if (user?.role === "VENDEDOR") {
      setShowCreateModal(false);
      dispatch(
        getProductsBySeller({
          sellerId: user.id,
          nombre: null,
          category: null,
          subcategory: null,
          actives: null,
        })
      )
        .unwrap()
        .then((products) => {
          setProductsToShow(products);
        });
      dispatch(getCoupons());
    }
    if (user?.role === "COMPRADOR") {
      setProductsToShow(buys);
    }
  }, [status, user?.id, user?.role, , changeCouponsSliceFlag, dispatch]);

  const openCreateModal = () => setShowCreateModal(true);

  const purchasesBulks = productsToShow
    ? Array.from(
        { length: Math.ceil(productsToShow.length / bulkSize) },
        (_, i) => productsToShow.slice(i * bulkSize, i * bulkSize + bulkSize)
      )
    : [];
  const couponsBulks = coupons
    ? Array.from({ length: Math.ceil(coupons.length / bulkSize) }, (_, i) =>
        coupons.slice(i * bulkSize, i * bulkSize + bulkSize)
      )
    : [];
  return (
    <>
      {!user ? (
        <div>Cargando datos del usuario...</div>
      ) : (
        <div
          className="container"
          style={
            user?.role === "VENDEDOR"
              ? {
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateAreas: '"userPurchases userCupons"',
                }
              : {}
          }
        >
          <div className="userPurchases">
            {user?.role == "COMPRADOR" ? (
              <p>Total de compras: {productsToShow.length}</p>
            ) : (
              <p>Total de productos: {productsToShow.length}</p>
            )}
            <Paginator
              currentIndex={currentProductIndex}
              purchasesBulks={purchasesBulks}
              setCurrentIndex={setCurrentProductIndex}
            />
            <div className="user-container-items">
              {user?.role == "COMPRADOR" ? (
                <>
                  {purchasesBulks[currentProductIndex]?.map(
                    (product, index) => (
                      <ProductBuyerCard product={product} key={index} />
                    )
                  )}
                </>
              ) : (
                <>
                  {purchasesBulks[currentProductIndex]?.map(
                    (product, index) => (
                      <ProductVendorCard product={product} key={index} />
                    )
                  )}
                </>
              )}
            </div>
          </div>
          {user?.role === "VENDEDOR" && (
            <div className="userCupons">
              <p>Cupones: {user?.sales?.length}</p>
              <button className="create-cupon-button" onClick={openCreateModal}>
                Crear Cupón
              </button>
              {showCreateModal && (
                <CreateCouponModal setShowCreateModal={setShowCreateModal} />
              )}
              <Paginator
                currentIndex={currentCuponIndex}
                purchasesBulks={couponsBulks}
                setCurrentIndex={setCurrentCuponIndex}
              />
              {couponsBulks[currentCuponIndex]?.map((coupon, index) => (
                <CouponCard key={index} coupon={coupon} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
