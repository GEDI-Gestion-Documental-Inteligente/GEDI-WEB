import React, { useEffect, useState } from 'react'
import { getAllPeople } from '../../library/peopleThunks'
import { useNavigate } from 'react-router-dom';
import { IconEdit, IconOptions } from '../../layout/Icons';
import Modal from '../Modal';
import PeopleEdit from './PeopleEdit';
import { infoUser } from '../../library/authLogin';
import PeopleAdd from './PeopleAdd';

function PeopleList() {
    const [people, setPeople] = useState([])
    const [canEdit, setCanEdit] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    const navigate = useNavigate()
    const handleCargarGente = async () => {
        try {

            const userInfo = await infoUser({ setUserInfo })
            const response = await getAllPeople()
            setPeople(response)
            if (userInfo.id === 'admin') {
                // admin es en este caso pero luego debería
                // consultar un array y si su id está dentro del mismo
                // permitir editar personas
                setCanEdit(true)
            }
        } catch (error) {
            console.log(error);

            navigate('/')
        }
    }

    useEffect(() => {
        handleCargarGente()
    }, [])

    return (
        <>
            <h2 className='text-2xl text-center'>Lista de personas</h2>

            <div>
                {people.map(person => (
                    <div
                        className='my-2 border-2 border-cyan-700 p-2 rounded-lg grid grid-cols-2'
                        key={person.entry.id}>
                        <div className="container">
                            <p className='inline-block mx-1 font-bold'>
                                {person.entry.lastName} {person.entry.firstName}
                            </p>
                            <br />
                            <p className='inline-block ms-2'>
                                {person.entry.id}
                            </p>
                            <br />
                            <p className="inline-block ms-2">
                                Estado : {person.entry.enabled ? (
                                    <p className="inline-block text-lime-800 font-bold">Activo</p>
                                ) : (
                                    <p className="inline-block text-red-800/80 font-bold">Inactivo</p>

                                )}

                            </p>
                        </div>
                        {canEdit && (
                            <Modal btnClass={'flex ms-auto my-auto border-cyan-700 border-2 p-1 rounded-lg hover:bg-cyan-500 h-12 '} btnName={<IconEdit />} child={PeopleEdit} data={{ id: person.entry.id, handleCargarGente }} />
                        )}
                    </div>
                )
                )}
                {canEdit && (
                    <Modal btnClass={'block w-full text-center bg-cyan-800 hover:bg-cyan-600 text-white text-lg rounded-lg p-2'} btnName={'Agregar Persona'} child={PeopleAdd} />

                )}
            </div>
        </>
    )
}

export default PeopleList