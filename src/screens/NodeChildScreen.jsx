import React, { useEffect, useState } from 'react'
import { getNodeChildren } from '../library/nodeThunk';
import NodoView from '../components/NodoView';

function NodeChildScreen({ nodeData }) {
    const [nodes, setNodes] = useState([]);

    async function fetchData(id) {
        const fetchedNodes = await getNodeChildren(id || nodeData.guid);
        setNodes(fetchedNodes);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>hola</div>
            <NodoView datos={nodes} fetchData={fetchData}/>
        </>
    )
}

export default NodeChildScreen