import React, { useEffect, useState } from "react";
import "./EditCouponModal.css";
import { useDispatch } from "react-redux";
import { patchCupon } from "../../../Features/Coupons/CuponsAction";

const EditCouponModal = ({ coupon, onClose }) => {
  const dispatch = useDispatch();

  const [code, setCode] = useState(coupon.code);
  const [percentage, setPercentage] = useState(coupon.percentage);
  const [expiryDate, setExpiryDate] = useState(coupon.expiry_date);

  useEffect(() => {
    if (coupon) {
      const formattedDate = new Date(coupon.expiryDate)
        .toISOString()
        .substring(0, 10);
      setExpiryDate(formattedDate);
    }
  }, [coupon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      patchCupon({ discount: { code, percentage, expiryDate }, id: coupon.id })
    )
      .unwrap()
      .then(() => {
        onClose();
      });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Código:
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <label>
            Descuento:
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </label>
          <label>
            Fecha de expiración:
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCouponModal;
