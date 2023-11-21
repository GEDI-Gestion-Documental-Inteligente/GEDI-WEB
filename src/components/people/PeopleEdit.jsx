import React, { useEffect, useState } from 'react'
import { getPeople, updatePeople } from '../../library/peopleThunks';
import { useNavigate } from 'react-router-dom';

function PeopleEdit({ handleClose, data }) {7
    const navigate = useNavigate()
    const [peopleInfo, setPeopleInfo] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: ''
    })
    useEffect(() => {
        getPeople({ id: data.id })
            .then((people) => {
                setPeopleInfo(people)
            })
        // console.log({ data }); // data es lo que recibe del padre (modal) al ser llamado como child

    }, [])

    const handleInput = (e) => {
        setPeopleInfo({ ...peopleInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const email = formData.get('email')
        const jobTitle = formData.get('jobTitle')
        const id = formData.get('id')
        const dataEdit = {
            id,
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
            id.trim() !== ""
        ) {
            const editedData = await updatePeople(dataEdit);
            if(editedData.ok){
                data.handleCargarGente()
                handleClose()
            }
            // onSubmit(); // Llama a la función onSubmit para cerrar el formulario o hacer otras acciones necesarias
        } else {
            alert("Por favor, complete todos los campos.");
        }
    };

    return (
        <div className="p-2 w-full"
        >
            <form

                onSubmit={handleSubmit}>
                {/* <button className="iconButton" onClick={onSubmit}>
          <span>Close</span>
        </button> */}
                <h2 className="text-center text-lg mb-5">Editar persona</h2>
                <input
                    className={style.input}
                    name='firstName'
                    placeholder="Nombre"
                    value={peopleInfo.firstName}
                    onInput={handleInput}
                />
                <input
                    className={style.input}
                    name='lastName'
                    placeholder="Apellido"
                    value={peopleInfo.lastName}
                    onInput={handleInput}
                />
                <input
                    className={style.input}
                    name='email'
                    placeholder="Correo electrónico"
                    value={peopleInfo.email}
                    onInput={handleInput}
                />
                <input
                    className={style.input}
                    name='jobTitle'
                    placeholder="Cargo u ocupación"
                    value={peopleInfo.jobTitle}
                    onInput={handleInput}
                />
                <input
                    className={style.input}
                    name='id'
                    placeholder="Username"
                    value={peopleInfo.id}
                    onInput={handleInput}
                />
                <div className="mx-auto w-3/4 gap-2 grid grid-cols-2">
                    <button className="bg-lime-500 border-2 border-cyan-600 text-white p-3 rounded-lg hover:bg-lime-700 flex-inline" type='submit'>
                        <span>Guardar</span>
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
export default PeopleEdit