import React, { useEffect, useState } from "react";
import "./couponCard.css";
import EditCouponModal from "../modals/CouponModal/EditCouponModal.jsx";
import { useSelector } from "react-redux";

const CouponCard = ({ coupon }) => {
  const [showModal, setShowModal] = useState(false);
  const { changeCouponsSliceFlag } = useSelector((state) => state.coupons);

  useEffect(() => {
    setShowModal(false);
  }, [changeCouponsSliceFlag]);

  const handleEdit = () => {
    setShowModal(true);
  };

  return (
    <div className="coupon-card">
      <div className="coupon-field">Código: {coupon.code}</div>
      <div className="coupon-field">Descuento: {coupon.percentage}%</div>
      <div className="coupon-field">Válido hasta: {coupon.expiryDate}</div>
      <button className="edit-button" onClick={handleEdit}>
        Editar
      </button>
      {showModal && (
        <EditCouponModal coupon={coupon} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default CouponCard;
