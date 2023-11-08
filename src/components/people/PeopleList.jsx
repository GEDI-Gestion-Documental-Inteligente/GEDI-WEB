import React, { useEffect, useState } from 'react'
import { getPeople } from '../../library/peopleThunks'

function PeopleList() {
    const [people, setPeople] = useState([])

    const handleCargarGente = async () => {
        const response = await getPeople()
        setPeople(response)
        console.log(response);
    }

    useEffect(() => {
        handleCargarGente()
    }, [])

    return (
        <>
            <div>PeopleList</div>

            {people.map(person => (
                <p key={person.entry.id}>{person.entry.firstName}</p>
            )
            )}
        </>
    )
}

export default PeopleList