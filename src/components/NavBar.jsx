import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate()

    const rutas = [
        { ruta: '/sites', nombre: "Sites" },
        { ruta: '/people', nombre: "People" },
    ]

    const botonesNavegadores = (index, ruta, nombre) => {
        return <button key={index} onClick={() => navigate(ruta)}>{nombre}</button>
    }

    return (
        <>
            <nav>
                {rutas.map((e, index) => (
                    botonesNavegadores(index, e.ruta, e.nombre)
                ))}
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;