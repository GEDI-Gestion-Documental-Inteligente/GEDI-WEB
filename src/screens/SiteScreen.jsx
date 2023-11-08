// SiteScreen.js
import React, { useEffect, useState } from "react";
import { miSite } from "../library/sideThunks";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";


export const SiteScreen = ({ setNodeData }) => {
    const [sitios, setSitios] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        cargarSitios()
    }, []);
    const cargarSitios = async () => {
        // "Token no válido"
        const infoSitios = await miSite()
        if (!infoSitios.ok &&
            (infoSitios.msg === 'Token no válido'
                || infoSitios.msg === 'Ticket no encontrado')) {
            console.clear()
            navigate('/')
            return;
        }
        setSitios([...infoSitios.sites.list.entries, ...infoSitios.sites.list.entries, ...infoSitios.sites.list.entries, ...infoSitios.sites.list.entries, ...infoSitios.sites.list.entries]);
    }

    const handleSetNode = (id) => {
        setNodeData({ guid: id })
        navigate('/nodes')
    }
    return (
        <div className="bg-slate-300 h-screen overflow-auto">
            <Navbar />
            <div className="mx-5 rounded-lg p-3 mt-5 grid  sm:grid-cols-2">
                {sitios.map((sitio, index) => (
                    <button key={index}
                        className={styles.btnCard}
                        onClick={() => handleSetNode(sitio.entry.guid)}
                    >
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2/5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2/5 lg:w-1/6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                        </svg>

                        <div className="w-full">
                            <p className="text-xl p-2">
                                {sitio.entry.title}
                            </p>
                            <p className="text-sm p-2">
                                {sitio.entry.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const styles = {
    btnCard: 'bg-slate-200 rounded-lg flex m-2 text-cyan-900 p-2 hover:text-cyan-600 shadow-cyan-950 shadow-md'
};
