import React, { useState } from 'react'
import { createPeople } from '../../library/peopleThunks';

function PeopleAdd({ handleClose }) {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const jobTitle = formData.get('job')
    const id = formData.get('username')
    const password = formData.get('password')
    const data = {
      id,
      password,
      firstName,
      lastName,
      email,
      jobTitle
    }
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      jobTitle.trim() !== "" &&
      id.trim() !== "" &&
      password.trim() !== ""
    ) {
      await createPeople(data);
      // onSubmit(); // Llama a la función onSubmit para cerrar el formulario o hacer otras acciones necesarias
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="p-2 w-3/4"
    >
      <form

        onSubmit={handleSubmit}>
        {/* <button className="iconButton" onClick={onSubmit}>
          <span>Close</span>
        </button> */}
        <h2 className="text-center text-lg mb-5">Crear una nueva persona</h2>
        <input
          className={style.input}
          name='firstName'
          placeholder="Nombre"
        />
        <input
          className={style.input}
          name='lastName'
          placeholder="Apellido"
        />
        <input
          className={style.input}
          name='email'
          placeholder="Correo electrónico"
        />
        <input
          className={style.input}
          name='job'
          placeholder="Cargo u ocupación"
        />
        <input
          className={style.input}
          name='username'
          placeholder="Username"
        />
        <input
          className={style.input}
          name='password'
          placeholder="Contraseña"
          type="password"
        />
        <div className="mx-auto w-3/4 gap-2 grid grid-cols-2">
          <button className="bg-lime-500 border-2 border-cyan-600 text-white p-3 rounded-lg hover:bg-lime-700 flex-inline" type='submit'>
            <span>Crear persona</span>
          </button>
          <button className="bg-red-500 border-2 border-cyan-600 text-white p-3 rounded-lg hover:bg-red-700 flex-inline" onClick={handleClose} >
            <span>Cancelar</span>
          </button>
        </div>
      </form>
    </div>
  );
}

const style = {
  input: ` block w-full border-2 my-2 p-2 bg-slate-200 border-b-2 border-b-cyan-700 transition-[border-radius] focus-visible:bg-cyan-50 focus-visible:rounded-lg focus-visible:text-slate-950 focus-visible:outline-none ease-in-out duration-300 text-slate-700/50 `
}
export default PeopleAdd