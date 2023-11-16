import React, { useState } from 'react'

const Modal = ({ btnName, btnClass, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button className={btnClass}
                onClick={() => {
                    setIsOpen(true)
                }}>{btnName}</button>
            {isOpen && (
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
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal