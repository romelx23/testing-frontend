import Swal from "sweetalert2";

const initialState={
    email: "",
    password: "",
    password2: "",
    name:""
}

export const validateForm=(values=initialState)=>{
    const {email,password,password2,name}=values;
    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(password!==password2){
        Swal.fire({
          title: 'Error',
          icon:'error',
          text: 'Las Contraseñas deben ser iguales',
        })
        return false;
      }
}