import React from 'react'

function NodoView(props) {
    const { datos,fetchData } = props

    const Vista = datos.map((dato) => (
        <button key={dato.entry.id} onClick={() => fetchData(dato.entry.id)}>
            <div>
                <p>{dato.entry.name}</p>
                <p>{dato.entry.isFolder ? 'Folder' : 'File'}</p>
            </div>
        </button>
    ));
    return (
        <>
            {Vista}
        </>
    )
}

export default NodoView