import React, { useState } from 'react';

export const AdjuntFile = ({ styleClass, setDatafile }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [fileData, setFileData] = useState({
        type: '',
        name: '',
        size: '',
    });
    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        setIsUploaded(true);

        const files = e.dataTransfer.files;
        handleFiles(files);
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        setIsUploaded(true);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            console.log('Nombre del archivo:', files[i].name);
            console.log('Tipo de archivo:', files[i].type);
            console.log('Tamaño del archivo:', files[i].size, 'bytes');
            setFileData({
                type: files[i].type,
                name: files[i].name,
                size: `${((files[i].size / 1024) / 1024).toFixed(2)} Mb`,
            })
            setDatafile({
                type: files[i].type,
                name: files[i].name,
                size: `${((files[i].size / 1024) / 1024).toFixed(2)} Mb`,
            })
            // Aquí puedes realizar acciones adicionales con los archivos, como enviarlos a un servidor.
        }
    };

    return (
        <div
            className={`
                ${styleClass ? styleClass : `
                p-5 w-4/5 text-center border-4
                
                text-xl`}
                mx-auto
                 ${isDragging ? 'animate-pulse ease-in-out delay-200 hover:bg-cyan-300' : 'hover:bg-cyan-200 hover:cursor-pointer'} 
                 ${isUploaded ? 'border-cyan-700 border-2' : 'border-cyan-700 border-dotted'
                }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <label
                className='p-5 hover:cursor-pointer'
            >
                {isUploaded ?
                    (<>
                        ¡Archivo Subido!
                        <br />
                        {fileData.name}
                        <br />
                        {fileData.size}
                    </>) :
                    'Arrastra y suelta tus archivos aquí o selecciona desde tu dispositivo:'}
                <input
                    type="file"
                    name='filedata'
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                />
            </label>
        </div>
    );
};
