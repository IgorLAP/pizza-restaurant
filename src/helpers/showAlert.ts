import Swal from 'sweetalert2'

type showConfirmAlertParameters = {
  title?: string;
  text?: string;
  confirmBtnTxt?: string;
  id?: string;
}

export function showConfirmAlert({ title, text, confirmBtnTxt, id }: showConfirmAlertParameters) {
  return Swal.fire({
    title: title || `Delete product with id: ${id.slice(0,5)}...?`,
    text: text || "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#30d643',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmBtnTxt || 'Yes, delete it!'
  })
}

export function showSimpleSuccessAlert(title: string, msg: string) {
  return Swal.fire(
    title,
    msg,
    'success'
  )
}

export function showSimpleErrorAlert(title: string, msg: string) {
  return Swal.fire(
    title,
    msg,
    'error'
  )
}