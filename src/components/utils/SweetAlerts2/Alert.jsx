import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Alert = (icon, title, position = "top-end", popup = "custom-popup") => {
  MySwal.fire({
    position,
    icon,
    title,
    toast: true,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    background: "#fff",
    color: "#333",
    iconColor: "rgb(48, 133, 214)",
    customClass: {
      popup,
      title: "custom-title",
    },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
      toast.clickc("mouseleave", Swal.close);
    },
  });
};

export default Alert;
