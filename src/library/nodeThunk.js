import axios from 'axios';
import { urlBase } from '../App';
// TODO: PASAR TODO A POO, por una sola clase que trabaje

export const getNodeChildren = async(id) => {
  try {
    const ticket = localStorage.getItem('ticket'); // Obtener el ticket desde AsyncStorage

    if (!ticket) {
      throw new Error('Ticket no encontrado'); // Manejar caso donde no haya ticket
    }
    const myheaders = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ticket,
      },
    };

    const response = await axios.get(
      `${urlBase}/nodes/${id}/childrens`,
      myheaders,
    );
    return {
      alfrescoNodes: response.data.nodes.list.entries.map((e) => e.entry),
      mongoNodes: response.data.nodesMongo,
    };
  } catch (error) {
    console.log(error);
    throw error; // Asegúrate de propagar el error para que el slice pueda manejarlo
  }
};
export const createNode = async(id, data) => {
  //crea carpetas
  try {
    const ticket = localStorage.getItem('ticket'); // Obtener el ticket desde AsyncStorage

    if (!ticket) {
      throw new Error('Ticket no encontrado'); // Manejar caso donde no haya ticket
    }
    console.log(ticket);

    // console.log(JSON.stringify(data));
    const response = await axios.post(
      `${urlBase}/nodes/${id}/create-folder`,
      data,
      { headers: { Authorization: ticket } },
    );
  } catch (error) {
    console.log(error);
    throw error; // Asegúrate de propagar el error para que el slice pueda manejarlo
  }
};

export const uploadFileNode = async(id, data) => {
  try {
    const ticket = localStorage.getItem('ticket'); // Obtener el ticket desde AsyncStorage

    if (!ticket) {
      throw new Error('Ticket no encontrado'); // Manejar caso donde no haya ticket
    }
    console.log(ticket);

    // console.log(JSON.stringify(data));
    await axios.post(`${urlBase}/nodes/${id}/upload-content`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: ticket,
      },
    });
  } catch (error) {
    console.log(error);
    throw error; // Asegúrate de propagar el error para que el slice pueda manejarlo
  }
};

export const viewFile = async(path) => {
  try {
    const ticket = localStorage.getItem('ticket'); // Obtener el ticket desde AsyncStorage

    if (!ticket) {
      throw new Error('Ticket no encontrado'); // Manejar caso donde no haya ticket
    }
    const myheaders = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ticket,
      },
    };

    const response = await axios.get(`${urlBase}${path}`, myheaders);
    console.log(response);
    // return {
    //   alfrescoNodes: response.data.nodes.list.entries.map(e => e.entry),
    //   mongoNodes: response.data.nodesMongo
    // };
  } catch (error) {
    console.log(error);
    throw error; // Asegúrate de propagar el error para que el slice pueda manejarlo
  }
};

export const getOneNode = async(id) => {
  //crea carpetas
  try {
    const ticket = localStorage.getItem('ticket'); // Obtener el ticket desde AsyncStorage

    if (!ticket) {
      throw new Error('Ticket no encontrado'); // Manejar caso donde no haya ticket
    }

    // console.log(JSON.stringify(data));
    const response = await axios.get(`${urlBase}/nodes/one-node/${id}`, {
      headers: { Authorization: ticket },
    });
    return {
      nodeData: response.data.node.entry,
    };
  } catch (error) {
    console.log(error);
    throw error; // Asegúrate de propagar el error para que el slice pueda manejarlo
  }
};
