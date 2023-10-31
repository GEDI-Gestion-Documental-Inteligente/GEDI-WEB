import React, { useState } from 'react'
import { AuthLogin } from '../library/authLogin'
import {  useNavigate } from 'react-router-dom';

function LoginScreen() {
  const navigate = useNavigate()

  const [data, setData] = useState({
    userId: "admin",
    password: "admin"
  })

  const handleLoguear = async () => {
    try {
      AuthLogin(data)
        .then((ticket) => {
          console.log(ticket)
          navigate('/sites')
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
    }
  }

  return (
    <div className={style.loginContainer} >
      <div className={style.loginContent}>
        <h3 className={style.loginTitle} >Alfredo IA</h3>

        <input
          type="text"
          value={data.userId}
          onChange={(e) => setData({ ...data, userId: e.target.value })}
          className={style.input}
          placeholder="Ingrese su usuario"
          placeholdertextcolor="#000000"
        ></input>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className={style.input}
          placeholder="Ingrese su contraseña"
          placeholdertextcolor="#000000"
        />

        <button className={[style.btn, style['btn:hover']]} onClick={handleLoguear}>
          <p >Ingresar</p>
        </button>
{/* 
        <button className={''} onClick={handleLoguear}>
          <p >Ingresar</p>
        </button> */}

        {/* {isAuthenticated && <Text>Autenticado correctamente</Text>} */}
        {/* <Link to="/sites">sitios</Link> */}
      </div>
    </div>
  )
}
const style = {
  loginContainer: ' bg-lime-700  mx-auto rounded-lg max-w-lg border-slate-200 border-2 mt-[35vh] ',
  loginContent:' grid grid-cols-1 mx-3 ',
  loginTitle: ' text-center text-2xl mt-5 text-white ',
  input: ' border-2 m-2 p-2 rounded-lg ',
  btn: ' border-slate-700 border-2 m-2 p-2 bg-blue-400 rounded-lg ',
  'btn:hover': ' hover:bg-blue-200 '
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