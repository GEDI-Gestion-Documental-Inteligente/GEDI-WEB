import React, { useState } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ btnName, btnClass, child: Child, data }) => {
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
            {isOpen && (
                <div className='fixed inset-0 overflow-y-auto'
                    onKeyUp={(key) => {
                        if (key.code === "Escape") {
                            handleClose()
                        }

                    }}>
                    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 w-screen h-screen" tabIndex={-1}
                        onClick={() => {
                            setIsOpen(false)
                        }}

                    >

                    </div>
                    <div className="mx-auto mt-20 w-[75vw] backdrop-blur-0 overflow-auto flex justify-center items-center">
                        <div className="bg-white container p-2 rounded-lg flex flex-col justify-center items-center gap-1">
                            <div className="fixed top-2 right-2">
                                <button className='bg-cyan-700 text-white rounded-lg py-2 px-3 hover:bg-cyan-400'
                                    onClick={() => {
                                        setIsOpen(false)
                                    }}>X</button>

                            </div>
                            <Child handleClose={handleClose} data={data} />
                            {/* 
                                Child es basicamente el hijo, de este componente que le 
                                damos como prop: el handleClose, entonces se puede
                                posicionar un botón para cerrar el modal,
                                un ejemplo sería:
                                const BodyConBotonCerrar = ({handleClose, data}) => {
                                    return (
                                        <>
                                            <div className='bodyModalEjemplo'>
                                                <div className=''>Otros elementos</div>
                                                <div>
                                                    Saludo: {data.saludo}
                                                </div>
                                                <button onClick={handleClose} >
                                                    Cerrar
                                                </button>
                                            </div>
                                        </>
                                    )
                                }
                                < Modal btnClass={'clasesEjemplo'}
                                    btnName={'nombreBotón'}
                                    child={BodyConBotonCerrar}
                                    data={{saludo: 'Hola'}} />
                            */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal