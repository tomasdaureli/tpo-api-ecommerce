import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCupons } from "../../../Features/Coupons/CuponsAction";
import Swal from "sweetalert2";
import "./CreateCouponModal.css";
import Alert from "../../utils/SweetAlerts2/Alert";

const CreateCouponModal = ({ onClose }) => {
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const expiry = new Date(expiryDate);
    const now = new Date();

    if (expiry <= now) {
      Alert("error", "La fecha de expiración debe estar en el futuro.");
      return;
    }

    dispatch(postCupons({ code, percentage, expiryDate }))
      .unwrap()
      .then((resp) => {
        Alert("success", "El Cupon a sido creado");
      });
    onClose();
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
              required
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <label>
            Monto:
            <input
              type="number"
              value={percentage}
              required
              onChange={(e) => setPercentage(e.target.value)}
            />
          </label>
          <label>
            Fecha de expiración:
            <input
              type="date"
              value={expiryDate}
              required
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
          <button type="submit">Crear Cupón</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCouponModal;
