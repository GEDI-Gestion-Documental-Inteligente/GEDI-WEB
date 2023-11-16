import React, { useState } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ btnName, btnClass, child: Child }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <>
            <button className={btnClass}
                onClick={() => {
                    setIsOpen(true)
                }}>{btnName}</button>
            {isOpen && createPortal(
                <div className='fixed inset-0'>
                    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 w-screen h-screen" tabIndex={-1}
                        onClick={() => {
                            setIsOpen(false)
                        }}>

                    </div>
                    <div className="mx-auto mt-20 w-[75vw] backdrop-blur-0 overflow-auto flex justify-center items-center">
                        <div className="bg-white container p-2 rounded-lg flex flex-col justify-center items-center gap-2">
                            <div className="flex ms-auto">
                                <button className='bg-cyan-700 text-white rounded-lg p-2'
                                    onClick={() => {
                                        setIsOpen(false)
                                    }}>X</button>

                            </div>
                            <Child handleClose={handleClose} />
                            {/* 
                                Child es basicamente el hijo, de este componente que le 
                                damos como prop: el handleClose, entonces se puede
                                posicionar un botón para cerrar el modal,
                                un ejemplo sería:
                                const BodyConBotonCerrar = ({handleClose}) => {
                                    return (
                                        <>
                                            <div className='bodyModalEjemplo'>
                                                <div className=''>Otros elementos</div>

                                                <button onClick={handleClose} >
                                                    Cerrar
                                                </button>
                                            </div>
                                        </>
                                    )
                                }
                                < Modal btnClass={'clasesEjemplo'}
                                    btnName={'nombreBotón'}
                                    child={BodyConBotonCerrar} />
                            */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal