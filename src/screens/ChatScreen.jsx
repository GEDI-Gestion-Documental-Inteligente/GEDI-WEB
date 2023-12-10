import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/NavBar";
import { IconAdjuntFile, IconCamera } from "../layout/Icons";
import Markdown from 'react-markdown'
/* TODO: componetizar mejor este chat, es necesario
    para que al futuro pueda haber multiples chats de un solo usuario
 */
import remarkGfm from 'remark-gfm'
import { configMessageIA } from "../layout/configMarkdownChat";
import { urlApiIA } from "../App";
import Modal from "../components/Modal";
import { AdjuntFile } from "../components/chat/AdjuntFile";
export const ChatScreen = () => {
    const [isLoadingResponse, setIsLoadingResponse] = useState(false)
    const [historyChat, setHistoryChat] = useState([]);
    const [mensajeActual, setMensajeActual] = useState({ from: "", message: "" });
    const [mensajeIA, setMensajeIA] = useState({ from: "IA", message: "Hola soy Alfredo IA, estoy aqui para ayudar!" });
    const markdown = "# Documento Aleatorio en Markdown \n## Introducción\nEste es un documento de ejemplo en formato Markdown, que incluirá una variedad de elementos como listas, tablas, títulos de diferentes tamaños y enlaces.\n\n## Listas\n### Lista Numerada\n1. Elemento 1\n2. Elemento 2\n3. Elemento 3\n\n### Lista con viñetas\n- Viñeta A\n- Viñeta B\n- Viñeta C\n\n## Tabla de Ejemplo\n| Encabezado 1 | Encabezado 2 | Encabezado 3 |\n|--------------|--------------|--------------|\n| Dato 1,1     | Dato 1,2     | Dato 1,3     |\n| Dato 2,1     | Dato 2,2     | Dato 2,3     |\n| Dato 3,1     | Dato 3,2     | Dato 3,3     |\n\n## Títulos de Distintos Tamaños\n### Título de Tercer Nivel\n#### Título de Cuarto Nivel\n##### Título de Quinto Nivel\n\n## Enlaces de Ejemplo\n- [Sitio de Ejemplo 1](http://www.ejemplo1.com)\n- [Sitio de Ejemplo 2](http://www.ejemplo2.com)\n"
    // agrega un elemento a un React.Dispatch
    const nuevoMensaje = (mensaje, history, setter) => {
        setter([...history, mensaje]);
    };



    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    // uso una referenica React para usarlo en el div
    // que contiene los mensajes
    const messagesContainerRef = useRef()

    useEffect(() => {
        // scrollea al ultimo mensaje
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }, [historyChat])

    useEffect(() => {
        // por cada cambio en mensajeIA agrega un nuevo mensaje al HistoryChat
        if (mensajeIA?.message?.trim() !== "") {
            nuevoMensaje(mensajeIA, historyChat, setHistoryChat)
        }

    }, [mensajeIA])

    const mensajeFormat = ({ from, message }, index) => {
        if (from === "user") {
            return (// formato mensaje en caso de from="user"
                <div
                    className="bg-slate-100 my-5 ms-auto w-[80%] p-2 rounded-lg"
                    key={index}
                >
                    {message}
                </div>
            );
        }
        return (// formato mensaje en caso de que no sea from="user"
            <div
                className="bg-cyan-800 my-5 me-auto w-[80%] p-2 rounded-lg text-white text-lg"
                key={index}
            >
                <Markdown remarkPlugins={[remarkGfm]} components={configMessageIA}>
                    {message}
                </Markdown>
            </div>
        );
    };
    // TODO: esta funcion debe estar en otro archivo fuera
    const preguntar = async ({ query }) => {
        // const response = await fetch(urlApiIA, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ query }),
        // });

        // const message = await response.json();
        // if (message?.detail?.includes('Please try again in 20s')) {
        //     setMensajeIA({ from: "IA", message: "No puedo contestar a esa pregunta, sé mas específico" });
        //     return;
        // }
        const message = new Promise((resolve, reject) => {
            setIsLoadingResponse(true)
            setTimeout(() => {
                resolve('Para crear una tabla con el nombre del alumno, la fecha de registro y si asistió o no, puedes seguir estos pasos:\n\n1. Crea una tabla con tres columnas: "Nombre del Alumno", "Fecha de Registro" y "Asistencia".\n2. Agrega una fila por cada alumno y completa la información correspondiente en cada columna.\n3. En la columna "Asistencia", puedes utilizar una marca o un símbolo para indicar si el alumno asistió o no. Por ejemplo, puedes utilizar un check (√) para indicar que el alumno asistió y dejar la celda vacía o utilizar una cruz (X) para indicar que el alumno no asistió.\n4. Puedes utilizar herramientas como Microsoft Excel, Google Sheets o cualquier otra hoja de cálculo para crear y gestionar la tabla.\n\nAquí tienes un ejemplo de cómo se vería la tabla:\n\n| Nombre del Alumno | Fecha de Registro | Asistencia |\n|-------------------|------------------|------------|\n| Juan Pérez        | 01/01/2022       | √          |\n| María Gómez       | 02/01/2022       | X          |\n| Pedro López       | 03/01/2022       | √          |\n| Ana Rodríguez     | 04/01/2022       |            |\n\nRecuerda que esta es solo una sugerencia y puedes adaptar la tabla según tus necesidades y preferencias.\n\nClaro, aquí tienes nuevamente el archivo del Instituto Politécnico Formosa:\n\n- [Instituto Politécnico Formosa.pdf](content/Instituto_Politécnico_Formosa.pdf)\n\nAhora, hablemos sobre el Instituto Politécnico Formosa. Es un organismo descentralizado de la Administración Pública, relacionado con el poder ejecutivo a través del Ministerio de Cultura y Educación de la Provincia de Formosa. Fue establecido en el Decreto Nº 18 del 2018.\n\nEl Instituto Politécnico Formosa tiene capacidad de derecho público y privado para realizar todos los actos y contratos necesarios para el logro de sus fines. Su director es el Ing. Rubén Oscar Fernández y la directora de carreras es la Dra. Alicia Noemí Alcaraz.\n\nFue creado como una institución educativa de avanzada orientada a desarrollar procesos sistemáticos de formación que articulen el estudio y el trabajo, la investigación y la práctica. Tiene como finalidad promover la formación de profesionales altamente capacitados en diversas áreas.\n\nSi tienes alguna pregunta específica sobre el Instituto Politécnico Formosa, estaré encantado de ayudarte.')
            }, 5000)
        })
        if (await message) {
            setIsLoadingResponse(false)
            setMensajeIA({ from: "IA", message: await message });
        }

        setTimeout(() => {
            setMensajeIA({ from: "IA", message: "" });
        }, 1500);
    };

    const enviarMsjYPreguntar = () => {
        // proceso de cargar el mensaje al historial y preguntar
        // por ultimo limpia el mensajeActual
        nuevoMensaje(
            mensajeActual,
            historyChat,
            setHistoryChat
        );
        preguntar({ query: mensajeActual.message })
        setMensajeActual({ from: "", message: "", });
    }

    const handleInput = (e) => {
        setMensajeActual({
            from: "user",
            message: e.target.value,
        });
    };
    const handleEnter = (key) => {
        if (
            key.code === "Enter" &&
            mensajeActual.message.trim() !== ""
            && !key.shiftKey
        ) {
            enviarMsjYPreguntar()
        }
    }
    const handleClickEnviar = (e) => {
        if (mensajeActual.message.trim() !== "") {
            enviarMsjYPreguntar()
        }
    }
    return (
        <div className="">
            <Navbar />
            <div className="bg-cyan-950/60 mx-auto w-4/5 md:w-3/4 p-10 rounded-lg border-2 border-cyan-700 mt-20 h-[80vh]">
                <h3 className="text-center text-2xl text-white  border-b-2">
                    Alfredo IA
                </h3>
                <div
                    ref={messagesContainerRef}
                    className="h-3/6 sm:h-4/5 overflow-y-auto rounded-lg ">
                    <div
                        className="container bg-slate-300/20 w-full p-5 mx-auto rounded-lg">
                        {historyChat.map((mensaje, index) =>
                            mensajeFormat(mensaje, index)
                        )}
                        {isLoadingResponse && (
                            <div className="text-center">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-min border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">
                        <span className="absolute inset-y-0 flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-200 ease-in-out text-gray-500 hover:bg-cyan-600/20 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6 text-cyan-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                    ></path>
                                </svg>
                            </button>
                        </span>
                        <textarea
                            placeholder="Pregunta algo"
                            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md pt-3 pe-[20vw] resize-none overflow-hidden focus-visible:overflow-y-auto"
                            value={mensajeActual.message}
                            onInput={handleInput}
                            onKeyUp={handleEnter}
                            inputMode="text"
                            autoFocus={true}
                            rows="2">
                        </textarea>
                        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <Modal btnClass={"inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-cyan-600 hover:bg-cyan-600/20 focus:outline-none"}
                                btnName={<IconAdjuntFile />}
                                child={AdjuntFile}
                                modalFloat={true}
                            />
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-cyan-600 hover:bg-cyan-600/20 focus:outline-none"
                            >
                                <IconCamera />
                            </button>
                            {/* <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button> */}
                            <button
                                onClick={handleClickEnviar}
                                type="button"
                                className="inline-flex items-center justify-center rounded-full py-2 px-3 me-2 transition duration-500 ease-in-out text-white bg-cyan-800 hover:bg-cyan-500 focus:outline-none"
                            >
                                <span className="font-bold">Enviar</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="mx-auto h-6 ml-2 transform rotate-90"
                                >
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
