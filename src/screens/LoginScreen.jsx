import React, { useState } from 'react'
import { AuthLogin } from '../library/authLogin'

function LoginScreen() {

  const [data, setData] = useState({
    userId: "",
    password: ""
  })

  const handleLoguear = async () => {
    try {
      AuthLogin(data)
        .then((ticket) => {
          console.log(ticket)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
    }
  }

  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>Alfredo IA</h3>

        <input
          type="text"
          value={data.userId}
          onChange={(e) => setData({ ...data, userId: e.target.value })}
          style={styles.formInput}
          placeholder="Ingrese su usuario"
          placeholdertextcolor="#000000"
        ></input>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          style={styles.formInput}
          placeholder="Ingrese su contraseña"
          placeholdertextcolor="#000000"
        />

        <button style={styles.formButton} onClick={handleLoguear}>
          <p style={styles.textButton}>Ingresar</p>
        </button>

        {/* {isAuthenticated && <Text>Autenticado correctamente</Text>} */}
      </div>
    </div>
  )
}

const styles = {
  body: {
    backgroundColor: '#4D6F5F',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100vh', // Utilizamos '100vh' para ocupar toda la altura de la ventana en una aplicación web.
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 5,
    gap: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
    minWidth: 250,
    alignItems: "center"

  },
  formInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#797979"
  },
  formTitle: {
    textAlign: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#004725",
  },
  formButton: {
    backgroundColor: "#004725",
    borderRadius: 5,
    paddingVertical: 10,
    width: "100px",
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
};

export default LoginScreen