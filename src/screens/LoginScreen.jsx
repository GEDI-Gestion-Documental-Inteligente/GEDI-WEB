import React, { useEffect, useState } from 'react'
import { AuthLogin } from '../library/authLogin'
import { useNavigate } from 'react-router-dom'
import { miSite } from '../library/sideThunks'
import Swal from 'sweetalert2'
function LoginScreen() {
  const navigate = useNavigate()
  const [mensajeException, setMensajeException] = useState("")
  useEffect(() => {
    logear()
    console.clear();
  }, [])
  const logear = async () => {
    // "Token no válido"
    const infoSitios = await miSite()
    if (!infoSitios.ok &&
      (infoSitios.msg === 'Token no válido'
        || infoSitios.msg === 'Ticket no encontrado')) {
      // console.clear()
      return;
    }
    navigate('/sites')
  }
  const handleLoguear = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target)
      const userId = formData.get('username')
      const password = formData.get('password')
      const data = {
        userId,
        password
      }
      AuthLogin(data)
        .then((res) => {
          if (res?.error?.includes('NetworkError')) {
            Swal.fire({
              title: 'Network Error',
              text: 'Hubo un error con la conexión, intente mas tarde.',
              icon: 'error',
            })
          }
          if (!res?.ok && res?.error?.includes('details')) {
            Swal.fire({
              title: 'Inicio de sesión',
              text: 'Existen campos vacíos',
              icon: 'error',
              timer: 6000,
            })
          }
          console.log({ res });

          if (!res?.ok && res?.error?.includes('failed')) {
            Swal.fire({
              title: 'Inicio de sesión',
              text: 'Nombre de usuario o contraseña incorrectos',
              icon: 'error',
              timer: 6000,
            })
          }
          if (res?.ticket) {
            Swal.fire({
              title: 'Inicio de sesión',
              text: 'Autenticado correctamente.',
              icon: 'success',
              timer: 1500,
              didDestroy: navigate('/sites')
            })
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
    }
  }

  return (
    <div className="bg-cyan-900 flex h-screen overflow-auto">
      <form className={style.loginContainer}
        onSubmit={handleLoguear} >
        <div className={style.loginContent}>
          <h3 className={style.loginTitle} >GEDI</h3>

          <input
            type="text"
            name='username'
            className={style.input}
            placeholder="Ingrese su usuario"
            placeholdertextcolor="#000000"
          ></input>
          <input
            type="password"
            name='password'
            className={style.input}
            placeholder="Ingrese su contraseña"
            placeholdertextcolor="#000000"
          />

          <button
            className={style.btn}
            type='submit'>
            <p >Ingresar</p>
          </button>
          {/* 
        <button className={''} onClick={handleLoguear}>
          <p >Ingresar</p>
        </button> */}
          {/* {isAuthenticated && <Text>Autenticado correctamente</Text>} */}
          {/* <Link to="/sites">sitios</Link> */}
        </div>
      </form>
    </div>
  )
}
const style = {
  loginContainer: ' bg-slate-200 m-auto rounded-lg max-w-lg p-[50px] max-h-lg',
  loginContent: ' grid grid-cols-1 mx-3 ',
  loginTitle: ' text-center text-2xl mt-5 text-cyan-800 ',
  input: ` border-2 m-2 p-2 bg-slate-200 border-b-2 border-b-cyan-700 transition-[border-radius] focus-visible:rounded-lg focus-visible:text-slate-950 focus-visible:outline-none ease-in-out duration-300 text-slate-700/50`,
  btn: ' border-cyan-950 border-2 m-2 p-2 bg-cyan-900 rounded-lg hover:bg-cyan-600 text-white '
}
// const styles = {
//   body: {
//     backgroundColor: '#4D6F5F',
//     margin: 0,
//     padding: 0,
//     width: '100%',
//     height: '100vh', // Utilizamos '100vh' para ocupar toda la altura de la ventana en una aplicación web.
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   formContainer: {
//     display: "flex",
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     gap: 20,
//     paddingHorizontal: 30,
//     paddingVertical: 30,
//     minWidth: 250,
//     alignItems: "center"

//   },
//   formInput: {
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: "#797979"
//   },
//   formTitle: {
//     textAlign: "center",
//     padding: 10,
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "#004725",
//   },
//   formButton: {
//     backgroundColor: "#004725",
//     borderRadius: 5,
//     paddingVertical: 10,
//     width: "100px",
//   },
//   textButton: {
//     textAlign: "center",
//     color: "white",
//     fontSize: 15,
//     fontWeight: "bold",
//   },
// };

export default LoginScreen