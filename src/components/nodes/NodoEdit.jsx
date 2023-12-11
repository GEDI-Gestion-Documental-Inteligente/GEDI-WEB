import React, { useEffect, useState } from 'react'
import { createNode, getOneNode } from '../../library/nodeThunk';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
function NodoEdit({ handleClose, data: { nodeData } }) {

    const [nodeInfo, setNodeInfo] = useState({
        name: '',
        title: '',
        description: '',
    })
    useEffect(() => {
        // setNodeInfo({...data})
        getOneNode(nodeData.id).then(({ nodeData: info }) => {
            setNodeInfo({
                ...info,
                title: info.properties['cm:title'],
                description: info.properties['cm:description'],
            })
        })

        // const fetchNodeInfo = get
    }, [])
    const handleInput = (e) => {
        setNodeInfo({ ...nodeInfo, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const name = formData.get('name')
        const title = formData.get('title')
        const description = formData.get('description')
        const data = {
            name,
            title,
            description,
        }
        if (
            name.trim() !== "" &&
            title.trim() !== "" &&
            description.trim() !== ""
        ) {
            // await createNode(nodeId, data).then(() => {
            //     Swal.fire({
            //         title: '¡Carpeta creada exitosamente!',
            //         timer: 4000,
            //         icon: 'success',
            //         // didDestroy: async () => {
            //         //     await getOneNode(nodeId.id)
            //         // }
            //     })
            // });
            // onSubmit(); // Llama a la función onSubmit para cerrar el formulario o hacer otras acciones necesarias
        } else {
            Swal.fire({
                title: "Por favor, complete todos los campos.",
                icon: 'warning'
            })
        }
    };

    return (
        <>
            <div className="p-2 w-full">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center text-lg mb-5">Editar documento</h2>
                    <input
                        className={style.input}
                        name='name'
                        placeholder="Nombre"
                        autoFocus={true}
                        value={nodeInfo.name}
                        onInput={handleInput}
                    />
                    <input
                        className={style.input}
                        name='title'
                        placeholder="Titulo"
                        value={nodeInfo.title}
                        onInput={handleInput}
                    />
                    <input
                        className={style.input}
                        name='description'
                        placeholder="Descripción"
                        value={nodeInfo.description}
                        onInput={handleInput}

                    />
                    <div className="mx-auto w-3/4 gap-2 grid grid-cols-2">
                        <button className="bg-lime-600/80 border-2 border-cyan-600 text-white p-3 rounded-lg hover:bg-lime-700 flex-inline" type='submit'>
                            <span>Guardar cambios</span>
                        </button>
                        <button
                            type='button'
                            className="bg-red-500 border-2 border-cyan-600 text-white p-3 rounded-lg hover:bg-red-700 flex-inline" onClick={handleClose} >
                            <span>Cancelar</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
const style = {
    input: ` block w-full border-2 my-2 p-2 bg-slate-200 border-b-2 border-b-cyan-700 transition-[border-radius] focus-visible:bg-cyan-50 focus-visible:rounded-lg focus-visible:text-slate-950 focus-visible:outline-none ease-in-out duration-300 text-slate-700/50 `
}
export default NodoEdit