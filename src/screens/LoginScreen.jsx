import React, { useEffect, useState } from 'react'
import { AuthLogin } from '../library/authLogin'
import { useNavigate } from 'react-router-dom'
import { miSite } from '../library/sideThunks'

function LoginScreen() {
  const navigate = useNavigate()

  const [data, setData] = useState({
    userId: "admin",
    password: "admin"
  })
  useEffect(() => {
    logear()
  })
  const logear = async () => {
    // "Token no válido"
    const infoSitios = await miSite()
    if (!infoSitios.ok &&
      (infoSitios.msg === 'Token no válido'
        || infoSitios.msg === 'Ticket no encontrado')) {
      console.clear()
      return;
    }
    navigate('/sites')
  }
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
    <div className="bg-cyan-900 flex h-screen overflow-auto">
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

          <button
            className={style.btn}
            onClick={handleLoguear}>
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