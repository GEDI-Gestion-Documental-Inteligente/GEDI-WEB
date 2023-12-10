import React, { useEffect, useRef, useState } from 'react'
import { uploadFileNode } from '../../library/nodeThunk';
import { useContextIdParent } from '../../hooks/useIdParent';
import { useNavigate } from 'react-router-dom';
import { AdjuntFile } from '../chat/AdjuntFile';
import Swal from 'sweetalert2'
function NodoUploadFile({ handleClose, data: fetchDataNode }) {
  const { idParent } = useContextIdParent()
  const navigate = useNavigate()
  const inputTitle = useRef()

  const [dataFile, setDatafile] = useState({
    name: '',
    type: '',
    size: '',
  })
  useEffect(() => {
    inputTitle.current.value = dataFile.name
  }, [dataFile])
  useEffect(() => {
    setDatafile({ ...dataFile, name: dataFile.name.replace(/\s/gi, '_') })
  }, [dataFile?.name?.trim()?.includes(' ')])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const filedata = formData.get('filedata')
    console.log(filedata)
    const name = dataFile.name
    const title = formData.get('title')
    const description = formData.get('description')
    // const typeDocument = formData.get('typeDocument')
    const nameFile = filedata.name.split('.')
    const typeDocument = nameFile[nameFile.length - 1]
    console.log({ nameFile, typeDocument })
    formData.append('typeDocument', typeDocument)
    const data = {
      filedata,
      name: name,
      title: `${title}${title.includes(typeDocument) ? '' : `.${typeDocument}`}`,
      description,
      typeDocument,
    }
    // console.log({ dataNode });
    // console.log({ dataFile });
    // console.log({ data });

    if (
      name.trim() !== "" &&
      title.trim() !== "" &&
      description.trim() !== "" &&
      typeDocument.trim() !== ""
    ) {
      await uploadFileNode(idParent, data).then(async () => {
        Swal.fire({
          title: '¡Archivo subido exitosamente!',
          timer: 4000,
          icon: 'success',
          didDestroy: async () => {
            await fetchDataNode(idParent)
            handleClose()


          }
        })
        return;
      }).catch(async (error) => {
        console.log({ error });

        Swal.fire({
          title: (await error.message.includes('409') ? 'El archivo ya existe' : 'Intente mas tarde'),
          timer: 6000,
          icon: 'error',
          didDestroy: async () => {
            await fetchDataNode(idParent)
            handleClose()


          }
        })
      });
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
          <h2 className="text-center text-lg mb-5">Crear una carpeta</h2>
          <AdjuntFile styleClass={`p-5 w-full text-center border-4
                border-cyan-700 border-dotted
                text-xl`} setDatafile={setDatafile} />
          <input
            className={style.input}
            name='title'
            ref={inputTitle}
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