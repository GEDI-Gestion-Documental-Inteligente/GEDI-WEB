import React from 'react'
import PeopleList from '../components/people/PeopleList'
import Navbar from '../components/NavBar'

function PeopleScreen() {



    return (
        <>
            <Navbar />
            <div className='bg-slate-300 p-4 h-full overflow-auto mt-14'
            >
                <PeopleList />
            </div>
        </>
    )
}

export default PeopleScreen