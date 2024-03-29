import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { infoUser } from '../library/authLogin';
import { IconLogOut } from '../layout/Icons';
function Navbar() {

    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState('')
    const rutas = [
        { ruta: '/sites', nombre: "Sites" },
        { ruta: '/people', nombre: "People" },
    ]

    const [rutasDisponibles, setRutasDisponibles] = useState(rutas)

    useEffect(() => {
        infoUser({ setUserInfo }).then((user) => {
            const rutaChatIA = rutasDisponibles.filter(e => e.nombre === 'ChatIA').length
            if (user?.id === 'admin' && !rutaChatIA) {
                setRutasDisponibles([...rutasDisponibles, { ruta: '/chat', nombre: 'ChatIA' }])
                console.log({ rutasDisponibles });
            }
            if (!user?.id) {
                localStorage.clear()
                navigate('/')
            }
        })
    }, [])
    const botonesNavegadores = (index, ruta, nombre) => {
        return (<button className={styles.link}
            key={index} onClick={() => navigate(ruta)}>{nombre}</button>)
    }

    return (
        <nav className='bg-cyan-900 p-3 text-slate-300 flex border-y-cyan-950 border-y-[3px] fixed top-0 w-full'>
            <ul className='flex me-auto'>
                {rutasDisponibles.map((linkElement, index) => (
                    <li className='mx-2' key={index}>
                        {botonesNavegadores(index, linkElement.ruta, linkElement.nombre)}
                    </li>
                ))}

            </ul>
            <ul className='flex mx-auto justify-content-center'>
                <li className='mx-2 text-lg'>
                    {userInfo?.id}
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
                        <IconLogOut />
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