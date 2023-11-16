import * as React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import Hola from './screens/Hola';
import { SiteScreen } from './screens/SiteScreen';
import NodeChildScreen from './screens/NodeChildScreen';
import { useState } from 'react';
import PeopleScreen from "./screens/PeopleScreen";

export const urlBase = "http://localhost:4000/api"

function App() {
  const [currentNode, setCurrentNode] = useState({
    guid: ''
  })
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/sites' element={<SiteScreen setNodeData={setCurrentNode} />} />
        <Route path='/nodes' element={<NodeChildScreen nodeData={currentNode} />} />
        <Route path='/people' element={<PeopleScreen />} />
      </Routes>
    </>
  )
}

export default App
