import './App.css'
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import Hola from './screens/Hola';
import { SiteScreen } from './screens/SiteScreen';
import NodeChildScreen from './screens/NodeChildScreen';
import { useState } from 'react';

function App() {
  const [currentNode, setCurrentNode] = useState({
    guid: ''
  })
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/hola' element={<Hola />} />
        <Route path='/sites' element={<SiteScreen setNodeData={setCurrentNode} />} />
        <Route path='/nodes' element={<NodeChildScreen nodeData={currentNode} />} />
      </Routes>
    </>
  )
}

export default App
