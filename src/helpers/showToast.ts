import { toast } from 'react-toastify';

type ToastTypes = 'success' | 'error'

export function showToast(msg: string, type: ToastTypes) {
  return toast[type](msg, {
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