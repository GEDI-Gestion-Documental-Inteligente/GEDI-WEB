import React, { useState } from 'react'
import { createPeople } from '../../library/peopleThunks';

function PeopleAdd(/* { onSubmit } */) {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const jobTitle = formData.get('job')
    const id = formData.get('id')
    const password = formData.get('password')
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      jobTitle !== "" &&
      id !== "" &&
      password !== ""
    ) {
      await createPeople({ formData });
      // onSubmit(); // Llama a la función onSubmit para cerrar el formulario o hacer otras acciones necesarias
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="modalOverlay" >
      <form className="container"
        onSubmit={handleSubmit}>
        {/* <button className="iconButton" onClick={onSubmit}>
          <span>Close</span>
        </button> */}
        <h2 className="title">Crear una nueva persona</h2>
        <input
          className="input"
          name='firstName'
          placeholder="Nombre"
        />
        <input
          className="input"
          name='lastName'
          placeholder="Apellido"
        />
        <input
          className="input"
          name='email'
          placeholder="Correo electrónico"
        />
        <input
          className="input"
          name='job'
          placeholder="Cargo u ocupación"
        />
        <input
          className="input"
          name='username'
          placeholder="ID"
        />
        <input
          className="input"
          name='password'
          placeholder="Contraseña"
          type="password"
        />
        <button className="button" type='submit'>
          <span>Crear persona</span>
        </button>
        {/* <button className="buttonCancel"  onClick={onSubmit} >
          <span>Cancelar</span>
        </button> */}
      </form>
    </div>
  );
}

export default PeopleAdd