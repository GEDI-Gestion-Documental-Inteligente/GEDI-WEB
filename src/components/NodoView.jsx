import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IconFile, IconBack, IconAddFolder, IconUploadFile } from '../layout/Icons';
import Modal from './Modal';
import NodeAdd from './nodes/NodoAdd'
import NodoUploadFile from './nodes/NodoUploadFile';
import { useContextIdParent } from '../hooks/useIdParent';

function NodoView({ datos, fetchNodeChildren, nav, setNav }) {
    const navigate = useNavigate()
    const { setter } = useContextIdParent()
    console.log({datos});
    const Vista = datos.alfrescoNodes.map((dato) => {
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
            return (
                <button
                    className={styles.card}
                    key={dato.id}
                    onContextMenu={(e) => {
                        e.preventDefault()
                    }}
                    onAuxClickCapture={(e) => {
                        e.preventDefault()
                        //TODO: abrir un modal en la posición actual del Dclick para borrar, ver editar carpeta
                    }}
                    onClick={() => {
                        if (dato.isFolder) {
                            setNav([...nav, dato.parentId])
                            fetchNodeChildren(dato.id)
                            setter(dato.id)
                        }
                        if (dato.isFile) {
                            //TODO: EN CASO DE ARCHIVO OCURRE UN EVENTO
                        }
                    }}>

                    <IconFile isFile={dato.isFile} nameIcon={dato.name.toLowerCase()} />

                    <div className={styles.bodyCard}>
                        {/* <p className=''>{JSON.stringify(dato.}</p> */}
                        <p className=''>{dato.name}</p>
                        <p className=''>({dato.createdByUser.displayName})</p>
                        {/* <p className=''>{dato.isFolder ? 'Folder' : 'File'}</p> */}
                    </div>
                </button>
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
                {!datos.alfrescoNodes.find(folder => folder.name === "documentLibrary") &&
                    <>
                        <Modal btnName={<IconAddFolder />} btnClass={styles.btnAdd} child={NodeAdd} />
                        <Modal btnName={<IconUploadFile />} btnClass={styles.btnUpFile} child={NodoUploadFile} />
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
    card: 'bg-slate-200 rounded-lg flex m-2 p-2 text-cyan-900 hover:text-cyan-600 shadow-cyan-950 shadow-md ',
    bodyCard: ' text-left w-full max-w-[70%] py-5 ps-3 text-xl  md:text-lg lg:text-xl ',
    btnBack: ' text-2xl inline-flex bg-cyan-800 p-3 rounded-lg mt-5 text-white hover:bg-cyan-600 mx-2',
    btnAdd: ' text-2xl inline-flex bg-cyan-800 p-3 rounded-lg mt-5 text-white hover:bg-cyan-600 mx-2',
    btnUpFile: ' text-2xl inline-flex bg-cyan-800 p-3 rounded-lg mt-5 text-white hover:bg-cyan-600 mx-2',
}
export default NodoView