import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IconFile, IconCSV, IconDOC, IconFolder, IconJPG, IconMP3, IconMP4, IconPDF, IconPNG, IconPPT, IconXLS, IconBack } from '../layout/Icons';

function NodoView({ datos, fetchNodeChildren, nav, setNav }) {
    const navigate = useNavigate()
    const Vista = datos.map((dato) => {
        if (dato.entry.name === 'documentLibrary' && !nav.length) {
            return (
                <button
                    className='bg-slate-200 rounded-lg flex m-2 text-cyan-900 p-2 hover:text-cyan-600 shadow-cyan-950 shadow-md'
                    key={dato.entry.id}
                    onClick={() => {
                        setNav([...nav, dato.entry.parentId])
                        fetchNodeChildren(dato.entry.id)
                    }}>
                    <IconFile isFile={dato.entry.isFile} nameIcon={dato.entry.name.toLowerCase()} />
                    <div className={styles.bodyCard}>
                        {/* <p className=''>{JSON.stringify(dato.entry)}</p> */}
                        <p className=''>({dato.entry.createdByUser.displayName})</p>
                        <p className=''>{dato.entry.isFolder ? 'Folder' : 'File'}</p>
                    </div>
                </button>
            )
        }
        if (nav.length && dato.entry.name !== 'documentLibrary') {
            return (
                <button
                    className={styles.card}
                    key={dato.entry.id}
                    onClick={() => {
                        if (dato.entry.isFolder) {
                            setNav([...nav, dato.entry.parentId])
                            fetchNodeChildren(dato.entry.id)
                        }
                        if (dato.entry.isFile) {
                            // ! EN CASO DE ARCHIVO OCURRE UN EVENTO
                        }
                    }}>

                    <IconFile isFile={dato.entry.isFile} nameIcon={dato.entry.name.toLowerCase()} />

                    <div className={styles.bodyCard}>
                        {/* <p className=''>{JSON.stringify(dato.entry)}</p> */}
                        <p className=''>{dato.entry.name}</p>
                        <p className=''>({dato.entry.createdByUser.displayName})</p>
                        {/* <p className=''>{dato.entry.isFolder ? 'Folder' : 'File'}</p> */}
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
    }
    return (
        <div className='mt-16'>
            <div className="px-5">
                <button className={styles.btnBack}
                    onClick={handleBtnBack} >
                    <IconBack />
                </button>
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
    btnBack: ' text-2xl inline-flex bg-cyan-800 p-3 rounded-lg mt-5 text-white hover:bg-cyan-600 ',
}
export default NodoView