import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const ModalMenu = ({ btnName, btnClass, child: Child, data, modalWidth, modalMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cordsModal, setCordsModal] = useState({ x: 0, y: 0 });

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                className={btnClass}
                onClick={(e) => {
                    const { clientX, clientY } = e;
                    setCordsModal({ x: clientX, y: clientY });
                    setIsOpen(true);
                }}
            >
                {btnName}
            </button>

            {isOpen &&
                createPortal(
                    <>
                        <div
                            className='fixed inset-0 overflow-y-auto'
                            onKeyUp={(key) => {
                                if (key.code === 'Escape') {
                                    handleClose();
                                }
                            }}
                        >
                            <div
                                className={`fixed inset-0 ${modalMenu ? '' : 'bg-black backdrop-blur-sm bg-opacity-30'} w-screen h-screen`}
                                tabIndex={-1}
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            ></div>
                            <div
                                className={`mx-auto ${modalMenu ? '' : 'mt-20'} ${modalWidth ?? 'w-[75vw] lg:w-[50vw]'} backdrop-blur-0 overflow-auto flex justify-center items-center`}
                                style={modalMenu ? { position: 'absolute', top: cordsModal.y, left: cordsModal.x } : {}}
                            >
                                <div className='bg-white container p-2 rounded-lg flex flex-col justify-center items-center gap-1'>
                                    <div className='fixed top-2 right-2'>
                                        <button
                                            className='bg-cyan-700 text-white rounded-lg py-2 px-3 hover:bg-cyan-400'
                                            onClick={() => {
                                                setIsOpen(false);
                                            }}
                                        >
                                            X
                                        </button>
                                    </div>
                                    <Child handleClose={handleClose} data={data} />
                                </div>
                            </div>
                        </div>
                    </>,
                    document.body
                )}
        </>
    );
};

export default ModalMenu;
