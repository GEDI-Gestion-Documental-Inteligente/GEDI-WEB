import React from 'react'
import { uploadFileNode } from '../../library/nodeThunk';
import { useContextIdParent } from '../../hooks/useIdParent';
import { useNavigate } from 'react-router-dom';

function NodoUploadFile({ handleClose }) {
    const { idParent } = useContextIdParent()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target);
      const filedata = formData.get('filedata')
      console.log(filedata)
      const name = formData.get('name')
      const title = formData.get('title')
      const description = formData.get('description')
      // const typeDocument = formData.get('typeDocument')
      const nameFile = filedata.name.split('.')
      const typeDocument = nameFile[nameFile.length - 1]
      console.log({nameFile, typeDocument})
      formData.append('typeDocument', typeDocument)
      const data = {
        filedata,
        name: `${name}.${typeDocument}`,
        title: `${title}.${typeDocument}`,
        description,
        typeDocument,
      }
      if (
        name.trim() !== "" &&
        title.trim() !== "" &&
        description.trim() !== "" &&
        typeDocument.trim() !== ""
      ) {
        await uploadFileNode(idParent, data).then(() => {
          navigate('/nodes')
          handleClose()
        });
        // onSubmit(); // Llama a la función onSubmit para cerrar el formulario o hacer otras acciones necesarias
      } else {
        alert("Por favor, complete todos los campos.");
      }
    };
  
    return (
      <>
        <div className="p-2 w-full">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-lg mb-5">Crear una carpeta</h2>
            <input type="file" name="filedata" />
            <input
              className={style.input}
              name='name'
              placeholder="Nombre"
            />
            <input
              className={style.input}
              name='title'
              placeholder="Titulo"
            />
            <input
              className={style.input}
              name='description'
              placeholder="Descripción"
            />
            <div className="mx-auto w-3/4 gap-2 grid grid-cols-2">
              <button className="bg-lime-500 border-2 border-cyan-600 text-white p-3 rounded-lg hover:bg-lime-700 flex-inline" type='submit'>
                <span>Subir Archivo</span>
              </button>
              <button className="bg-red-500 border-2 border-cyan-600 text-white p-3 rounded-lg hover:bg-red-700 flex-inline" onClick={handleClose} >
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

export default NodoUploadFile