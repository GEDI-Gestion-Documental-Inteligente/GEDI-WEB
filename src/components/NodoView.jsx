import React from 'react'

function NodoView({ datos, fetchNodeChildren }) {
    
    const Vista = datos.map((dato) => (
        <button key={dato.entry.id} onClick={() => fetchNodeChildren(dato.entry.id)}>
            <div>
                <p>{dato.entry.name}</p>
                <p>{dato.entry.isFolder ? 'Folder' : 'File'}</p>
            </div>
        </button>
    ));
    return (
        <>
            <button onClick={()=>{
                fetchNodeChildren(datos[0].entry.parentId)
            }} >Back</button>
            {Vista}
        </>
    )
}

export default NodoView