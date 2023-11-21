import React from 'react'
import PeopleList from '../components/people/PeopleList'
import PeopleAdd from '../components/people/PeopleAdd'
import Modal from '../components/Modal'
import Navbar from '../components/NavBar'

function PeopleScreen() {

    return (
        <>
            <Navbar />
            <div className='mx-4 mt-2 p-2'
            >
                <PeopleList />
                <Modal btnClass={'block w-full text-center bg-cyan-800 hover:bg-cyan-600 text-white text-lg rounded-lg p-2'} btnName={'Agregar Persona'} child={PeopleAdd} />
            </div>
        </>
    )
}

export default PeopleScreen