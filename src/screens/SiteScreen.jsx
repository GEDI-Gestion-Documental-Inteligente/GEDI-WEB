// SiteScreen.js
import React, { useEffect, useState } from "react";
import { miSite } from "../library/sideThunks";
import { useNavigate } from "react-router-dom";


export const SiteScreen = ({ setNodeData }) => {
    const [sitios, setSitios] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        cargarSitios()
    }, []);
    const cargarSitios = async () => {
        // "Token no válido"
        const infoSitios = await miSite()
        console.log(infoSitios);
        if (!infoSitios.ok &&
            (infoSitios.msg === 'Token no válido'
            || infoSitios.msg === 'Ticket no encontrado')) {
                console.clear()
                navigate('/')
                return;
        }
        setSitios(infoSitios.sites.list.entries);
    }

    const handleSetNode = (id) => {
        setNodeData({ guid: id })
        navigate('/nodes')
    }
    return (
        <div className="bg-red-200 max-w-lg lg:max-w-5xl mx-auto rounded-lg p-3 mt-5 grid grid-cols-3">
            {sitios.map((sitio, index) => (
                <button key={index}
                    className="bg-red-500 p-2 rounded-lg"
                    onClick={() => handleSetNode(sitio.entry.guid)}
                >{sitio.entry.title}</button>
            ))}
        </div>
    );
};

const styles = {
    container: {
        flex: 1,
        width: "auto",
        height: "100%",
        padding: 30,
        backgroundColor: "#4D6F5F",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
};
