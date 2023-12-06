import * as React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import Hola from './screens/Hola';
import { SiteScreen } from './screens/SiteScreen';
import NodeChildScreen from './screens/NodeChildScreen';
import { useState } from 'react';
import PeopleScreen from "./screens/PeopleScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { IdProvider } from "./context/IdParentContext";

export const urlBase = "http://localhost:4000/api"
export const urlApiIA = "http://localhost:4005/chat"

function App() {
  const [currentNode, setCurrentNode] = useState({
    guid: ''
  })
  return (
    <IdProvider>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/sites' element={<SiteScreen setNodeData={setCurrentNode} />} />
        <Route path='/nodes' element={<NodeChildScreen nodeData={currentNode} />} />
        <Route path='/people' element={<PeopleScreen />} />
        <Route path='/chat' element={<ChatScreen />} />
      </Routes>
    </IdProvider>
  )
}

export default App
