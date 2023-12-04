import React, { createContext, useState, useEffect} from 'react'

export const IdContext = createContext();

export const IdProvider = ({ children}) => {

    const [idParent, setIdParent] = useState('');

    const setter = (newId) => {
        setIdParent(newId);
    }
    return (
        <IdContext.Provider value={{idParent, setter}}>
            {children}
        </IdContext.Provider>
    )
}

