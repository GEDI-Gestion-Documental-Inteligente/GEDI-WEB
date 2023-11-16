import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { infoUser } from '../library/authLogin';

function Navbar() {

    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState('')
    const rutas = [
        { ruta: '/sites', nombre: "Sites" },
        { ruta: '/people', nombre: "People" },
    ]


    useEffect(() => {
        infoUser({ setUserInfo })
    }, [])
    const botonesNavegadores = (index, ruta, nombre) => {
        return (<button className={styles.link}
            key={index} onClick={() => navigate(ruta)}>{nombre}</button>)
    }

    return (
        <nav className='bg-cyan-900 p-3 text-slate-300 flex border-y-cyan-950 border-y-[3px]'>
            <ul className='flex me-auto'>
                {rutas.map((linkElement, index) => (
                    <li className='mx-2' key={index}>
                        {botonesNavegadores(index, linkElement.ruta, linkElement.nombre)}
                    </li>
                ))}

            </ul>
            <ul className='flex mx-auto justify-content-center'>
                <li className='mx-2 text-lg'>
                    {userInfo.id}
                </li>
            </ul>
            <ul className='flex ms-auto justify-content-end'>
                <li className='mx-2'>
                    <button className={styles.btnLogOut}
                        onClick={() => {
                            localStorage.clear()
                            navigate('/')
                        }}
                    >
                        <svg className="w-9 h-9 inline-flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>

    );
}

export default Navbar;

const styles = {
    navbar: '',
    link: ' text-lg hover:text-cyan-300 hover:underline ',
    btnLogOut: 'text-lg hover:text-cyan-300 hover:underline text-base'
}