import React from 'react'
import PeopleList from '../components/people/PeopleList'
import Navbar from '../components/NavBar'

function PeopleScreen() {

    

    return (
        <>
            <Navbar />
            <div className='mx-4 mt-2 p-2'
            >
                <PeopleList />
            </div>
        </>
    )
}

export default PeopleScreen