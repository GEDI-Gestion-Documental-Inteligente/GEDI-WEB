import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/NavBar";
import { IconAdjuntFile, IconCamera } from "../layout/Icons";

/* TODO: componetizar mejor este chat, es necesario
    para que al futuro pueda haber multiples chats de un solo usuario
 */

export const ChatScreen = () => {
    const [historyChat, setHistoryChat] = useState([]);
    const [mensajeActual, setMensajeActual] = useState({ from: "", message: "" });
    const [mensajeIA, setMensajeIA] = useState({ from: "IA", message: "Hola soy Alfredo IA, estoy aqui para ayudar!" });

    // agrega un elemento a un React.Dispatch
    const nuevoMensaje = (mensaje, history, setter) => {
        setter([...history, mensaje]);
    };

    // uso una referenica React para usarlo en el div
    // que contiene los mensajes
    const messagesContainerRef = useRef()

    useEffect(() => {
        // scrollea al ultimo mensaje
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }, [historyChat])

    useEffect(() => {
        // por cada cambio en mensajeIA agrega un nuevo mensaje al HistoryChat
        if (mensajeIA.message.trim() !== "") {
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
                {message}
            </div>
        );
    };
    // TODO: esta funcion debe estar en otro archivo fuera
    const preguntar = async ({ query }) => {
        /*
          const fetchito = await fetch(
          !  `${urlApiChat} ACA VA LA URL API CHAT`,
            {
               method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            }
        );
         */
        const fetchito = new Promise((resolve, reject) => {
            //! COMENTAR ESTA PROMESA
            setTimeout(ga => {
                resolve({ result: 'Hola como estass!!!' })
            }, 5001)
        })
        //? const message = await fetchito.json(); descomentar esto
        const message = await fetchito //! comentar esto
        setMensajeIA({ from: "IA", message: await message.result })
        setTimeout(async () => {
            if (await message) {
                setMensajeIA({ from: "IA", message: "" })
            }

        }, 1500)
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
                    </div>
                </div>
                <div className="h-min border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">
                        <span className="absolute inset-y-0 flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6 text-gray-600"
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
                        <input
                            type="text"
                            placeholder="Pregunta algo"
                            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                            value={mensajeActual.message}
                            onInput={handleInput}
                            onKeyUp={handleEnter}
                        />
                        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                            >
                                <IconAdjuntFile />
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
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
