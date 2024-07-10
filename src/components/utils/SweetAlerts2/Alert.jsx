import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Alert = (icon, title) => {
  MySwal.fire({
    position: "top-end",
    icon,
    title,
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#fff",
    color: "#333",
    iconColor: "rgb(48, 133, 214)",
    customClass: {
      popup: "custom-popup",
      title: "custom-title",
    },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export default Alert;
