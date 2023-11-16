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
            const ifDocumentLibrary = fetchedNodes.filter(node => node.entry.name === 'documentLibrary')
            let nodesView = []
            if (ifDocumentLibrary.length === 1) {
                nodesView = ifDocumentLibrary
            } else {
                nodesView = fetchedNodes
            }
            setNodes(nodesView);
        } catch (error) {
            console.clear();
            navigate('/sites')
        }
    }
    useEffect(() => {
        fetchDataChildren();
    }, []);
    return (
        <div className='bg-slate-300 h-screen overflow-auto'>
            <Navbar />
            <NodoView datos={nodes} fetchNodeChildren={fetchDataChildren} nav={nav} setNav={setNav} />
        </div>
    )
}

export default NodeChildScreen