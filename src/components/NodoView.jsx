import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IconFile, IconBack, IconAddFolder, IconUploadFile } from '../layout/Icons';
import Modal from './Modal';
import NodeAdd from './nodes/NodoAdd'
import NodoUploadFile from './nodes/NodoUploadFile';
import { useContextIdParent } from '../hooks/useIdParent';
import ModalMenu from './ModalMenu';
import Swal from 'sweetalert2';
import reactizadoElSwal from 'sweetalert2-react-content'
import { calcularBytesAMbyes, calcularTiempoCreacion } from '../library/calculos';
import { urlBase } from '../App';
function NodoView({ datos, fetchNodeChildren, nav, setNav }) {
    const navigate = useNavigate()
    const { setter } = useContextIdParent()
    const swalConReact = reactizadoElSwal(Swal)
    console.log({ datos });
    const eliminarNode = () => {
        alert('eliminado')
    }
    const Vista = datos.alfrescoNodes.map((dato, index) => {
        if (dato.name === 'documentLibrary' && !nav.length) {
            return (
                <button
                    className='bg-slate-200 rounded-lg flex m-2 text-cyan-900 p-2 hover:text-cyan-600 shadow-cyan-950 shadow-md'
                    key={dato.id}
                    onClick={() => {
                        setNav([...nav, dato.parentId])
                        fetchNodeChildren(dato.id)
                        setter(dato.id)
                    }}>
                    <IconFile isFile={dato.isFile} nameIcon={dato.name.toLowerCase()} />
                    <div className={styles.bodyCard}>
                        <p className=''>{JSON.stringify(dato.mongoNodes)}</p>
                        <p className=''>({dato.createdByUser.displayName})</p>
                        <p className=''>{dato.isFolder ? 'Folder' : 'File'}</p>
                    </div>
                </button>
            )
        }
        if (nav.length && dato.name !== 'documentLibrary') {
            const datosA = dato.isFile && datos?.mongoNodes?.[index]?.path ? {
                href: datos?.mongoNodes?.[index]?.path ? `${urlBase.slice(0, urlBase.length - 4)}${datos?.mongoNodes?.[index]?.path}` : '',
                target: '_blank'
            } : {}
            return (
                <a
                    className={styles.card}
                    key={dato.id}
                    {...datosA}
                    onContextMenu={(e) => {
                        e.preventDefault()
                        //TODO: abrir un modal en la posición actual del Dclick para borrar, ver editar carpeta
                        swalConReact.fire({
                            title: dato.name,
                            html: <>
                                <button className="p-5 bg-cyan-700/50 w-full"
                                    onClick={() => {
                                        const { timeMessage } = calcularTiempoCreacion({ fechaCreado: dato.createdAt })
                                        swalConReact.fire({
                                            html: <div className='text-left'>
                                                <p>Creado por : {dato.createdByUser.displayName}</p>
                                                {dato?.content &&
                                                    <p>Peso del archivo :  {calcularBytesAMbyes({ bytes: dato.content.sizeInBytes }).mbytes} Mb
                                                    </p>}
                                                <br />
                                                <p>Creado hace: {timeMessage} </p>
                                                <br />
                                                <p>Nombre de documento: {dato.name}</p>
                                                <br />
                                                <p>Tipo de documento: {dato.isFile ? 'archivo' : 'carpeta'}</p>
                                            </div>
                                        })
                                    }}
                                >Ver más</button>
                                <br />
                                <button className="p-5 bg-cyan-900/20 w-full"
                                    onClick={() => {
                                        // TODO: en caso de editar
                                        swalConReact.fire({
                                            title: 'Modulo Editar Archivo'
                                        })
                                    }}
                                >Editar</button>
                                <br />
                                <button className="p-5 bg-red-500 w-full"
                                    onClick={() => {
                                        // TODO: en caso de eliminar
                                        eliminarNode()
                                    }}
                                >Eliminar</button>
                            </>,

                        })
                    }}
                    onClick={() => {
                        if (dato.isFolder) {
                            setNav([...nav, dato.parentId])
                            fetchNodeChildren(dato.id)
                            setter(dato.id)
                        }
                        if (dato.isFile) {
                            //TODO: EN CASO DE ARCHIVO OCURRE UN EVENTO
                            console.log(dato);
                        }
                    }}>

                    <IconFile isFile={dato.isFile} nameIcon={dato.name.toLowerCase()} />

                    <div className={styles.bodyCard}>
                        {/* <p className=''>{JSON.stringify(dato.}</p> */}
                        <p className=''>{dato.name}</p>
                        <p className=''>({dato.createdByUser.displayName})</p>
                        {/* <p className=''>{dato.isFolder ? 'Folder' : 'File'}</p> */}
                    </div>
                </a>
            )
        }
    });

    const handleBtnBack = () => {
        const backNav = nav.filter(e => {
            if (e !== nav[nav.length - 1]) {
                return e
            }
        });
        setNav(backNav);
        if (!nav.length) {
            navigate('/sites')
            return;
        }
        fetchNodeChildren(nav[nav.length - 1]);
        setter(nav[nav.length - 1])

    };

    return (
        <div className='mt-16'>
            <div className="px-5">
                <button className={styles.btnBack}
                    onClick={handleBtnBack} >
                    <IconBack />
                </button>
                {console.log({ datos: datos.alfrescoNodes })
                }
                {!(datos?.alfrescoNodes?.find(folder => folder.name === "documentLibrary") ?? false) &&
                    <>
                        <Modal btnName={<IconAddFolder />} btnClass={styles.btnAdd} child={NodeAdd} data={fetchNodeChildren} />
                        <Modal btnName={<IconUploadFile />} btnClass={styles.btnUpFile} child={NodoUploadFile} data={fetchNodeChildren} />
                    </>
                }
            </div>
            <div className={styles.containerCards}>
                {Vista}
            </div>
        </div>
    )
}

const styles = {
    containerCards: ' mx-5 rounded-lg p-3 mt-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ',
    card: 'bg-slate-200 rounded-lg flex m-2 p-2 text-cyan-900 hover:text-cyan-600 shadow-cyan-950 shadow-md cursor-pointer',
    bodyCard: ' text-left w-full max-w-[70%] py-5 ps-3 text-xl  md:text-lg lg:text-xl ',
    btnBack: ' text-2xl inline-flex bg-cyan-800 p-3 rounded-lg mt-5 text-white hover:bg-cyan-600 mx-2',
    btnAdd: ' text-2xl inline-flex bg-cyan-800 p-3 rounded-lg mt-5 text-white hover:bg-cyan-600 mx-2',
    btnUpFile: ' text-2xl inline-flex bg-cyan-800 p-3 rounded-lg mt-5 text-white hover:bg-cyan-600 mx-2',
}
export default NodoView