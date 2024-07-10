import React, { useState } from "react";
import "./couponCard.css";
import EditCouponModal from "../modals/CouponModal/EditCouponModal.jsx";

const CouponCard = ({ coupon }) => {
  const [showModal, setShowModal] = useState(false);

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
        <EditCouponModal coupon={coupon} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CouponCard;
