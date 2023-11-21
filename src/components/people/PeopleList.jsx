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
                        className='text-lg my-2 border-2 border-cyan-700 p-2 rounded-lg flex'
                        key={person.entry.id}>
                        <p className='inline-block mx-1'>
                            {person.entry.firstName}
                        </p>
                        <p className='inline-block mx-1'>
                            {person.entry.LastName}
                        </p>
                        <p className='inline-block mx-1'>
                            {person.entry.id}
                        </p>
                        {canEdit && (
                            <Modal btnClass={'flex ms-auto border-cyan-700 border-2 p-1 rounded-lg hover:bg-cyan-500 h-10 '} btnName={<IconEdit />} child={PeopleEdit} data={{ id: person.entry.id, handleCargarGente }} />
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