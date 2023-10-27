import React, { useEffect, useState } from 'react'
import { getNodeChildren } from '../library/nodeThunk';
import NodoView from '../components/NodoView';
import { useNavigate } from 'react-router-dom';

function NodeChildScreen({ nodeData }) {
    const [nodes, setNodes] = useState([]);

    const navigate = useNavigate()
    async function fetchDataChildren(id) {
        try {
            const fetchedNodes = await getNodeChildren(id || nodeData.guid);
            console.log({ fetchedNodes })
            setNodes(fetchedNodes);
        } catch (error) {
            navigate('/sites')
        }
    }
    useEffect(() => {
        fetchDataChildren();
    }, []);

    return (
        <>
            <div>hola</div>
            <NodoView datos={nodes} fetchNodeChildren={fetchDataChildren} />
        </>
    )
}

export default NodeChildScreen