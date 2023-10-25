// SiteScreen.js
import React, { useEffect, useState } from "react";
import { miSite } from "../library/sideThunks";
import { useNavigate } from "react-router-dom";


export const SiteScreen = ({setNodeData}) => {
    const [sitios,setSitios] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        cargarSitios()
    }, []);
    const cargarSitios=async()=>{
        setSitios(await miSite());
    }

    const handleSetNode = (id)=>{
        setNodeData({guid:id})
        navigate('/nodes')
    }
    return (
        <>
            {sitios.map((sitio,index) =>(
                <button key={index}
                 onClick={()=>handleSetNode(sitio.entry.guid)}
                >{sitio.entry.title}</button>
            ))}
        </>
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
