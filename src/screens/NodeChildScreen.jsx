import React, { useEffect, useState } from 'react'
import { getNodeChildren } from '../library/nodeThunk';
import NodoView from '../components/NodoView';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

function NodeChildScreen({ nodeData }) {
    const [nodes, setNodes] = useState([]);
    const [nav, setNav] = useState([]);
    const navigate = useNavigate()
    async function fetchDataChildren(id) {
        try {
            const fetchedNodes = await getNodeChildren(id || nodeData.guid);
            setNodes(fetchedNodes);
        } catch (error) {
            console.clear();
            navigate('/sites')
        }
    }
    useEffect(() => {
        fetchDataChildren();
    }, []);
    return (
        <>
            <Navbar />
            <NodoView datos={nodes} fetchNodeChildren={fetchDataChildren} nav={nav} setNav={setNav} />
        </>
    )
}

export default NodeChildScreen