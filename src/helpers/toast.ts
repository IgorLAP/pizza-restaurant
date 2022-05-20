import { toast } from 'react-toastify';

export function showSucessToast(msg: string) {
  return toast.success(msg, {
    position: "bottom-left",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    delay: 500,
    theme: 'dark'
  });
}