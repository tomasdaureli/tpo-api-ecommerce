import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./User.css";
import { UserPnSList } from "./UserPnSList";
import defaultImg from "../../assets/imgs/User.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserByJWT } from "../../Features/User/UserAction";

export function User() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const [confirmationChange, setConfirmationChange] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      dispatch(getUserByJWT())
        .unwrap()
        .then((result) => {
          localStorage.setItem("USER", JSON.stringify(result));
        })
        .catch((error) => {
          console.error("Get user by jwt failed:", error);
        });
    };

    loadUser();
  }, [confirmationChange]);

  const refreshProducts = () => {
    setConfirmationChange((prev) => !prev);
  };

  function LogOut() {
    localStorage.removeItem("USER");
    localStorage.removeItem("access_token");
    navigate("/", { replace: true });
    window.location.reload();
  }
  return (
    <>
      {!user ? (
        <div>Cargando datos del usuario...</div>
      ) : (
        <div className="userData">
          <img
            className="userImage"
            src={user?.img ? user?.img : defaultImg}
            alt="User"
          />
          <div className="Udata">
            <h1>{user.name}</h1>
            <p>
              Email: {user.email}
              <br />
              Última conexión: {user.lastLogin ? user.lastLogin : "Just Now"}
            </p>
          </div>
          <button
            className="logoutButton"
            onClick={() => {
              LogOut();
            }}
          >
            Logout
          </button>
        </div>
      )}

      <UserPnSList user={user} refreshProducts={refreshProducts} />
    </>
  );
}
