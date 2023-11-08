import React from 'react'
import { useNavigate } from 'react-router-dom';

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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2/5 max-w-[35%]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <div className={styles.bodyCard}>
                        {/* <p className=''>{JSON.stringify(dato.entry)}</p> */}
                        <p className=''>({dato.entry.createdByUser.displayName})</p>
                        <p className=''>{dato.entry.isFolder ? 'Folder' : 'File'}</p>
                    </div>
                </button>
            )
        }
        if (nav.length) {
            return (
                <button
                    className={styles.card}
                    key={dato.entry.id}
                    onClick={() => {
                        setNav([...nav, dato.entry.parentId])
                        fetchNodeChildren(dato.entry.id)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2/5 max-w-[35%]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <div className={styles.bodyCard}>
                        {/* <p className=''>{JSON.stringify(dato.entry)}</p> */}
                        <p className=''>{dato.entry.name}</p>
                        <p className=''>({dato.entry.createdByUser.displayName})</p>
                        <p className=''>{dato.entry.isFolder ? 'Folder' : 'File'}</p>
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
        <>
            <div className="px-5">
                <button className={styles.btnBack}
                    onClick={handleBtnBack} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </button>
            </div>
            <div className={styles.containerCards}>
                {Vista}
            </div>
        </>
    )
}

const styles = {
    containerCards: ' mx-5 rounded-lg p-3 mt-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ',
    card: 'bg-slate-200 rounded-lg flex m-2 text-cyan-900 hover:text-cyan-600 shadow-cyan-950 shadow-md ',
    bodyCard: ' text-left w-full max-w-[70%] py-5 ps-3 text-xl  md:text-lg lg:text-xl ',
    btnBack: ' text-2xl inline-flex bg-cyan-800 p-3 rounded-lg mt-5 text-white ',
}
export default NodoView