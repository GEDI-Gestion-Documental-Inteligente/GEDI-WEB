import axios from 'axios';
import { urlBase } from '../App';

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
    return response.data.nodes.list.entries;
  } catch (error) {
    console.log(error);
    throw error; // Asegúrate de propagar el error para que el slice pueda manejarlo
  }
};
export const createNode = async (id,data) => {
  try {
    const ticket = localStorage.getItem('ticket'); // Obtener el ticket desde AsyncStorage

    if (!ticket) {
      throw new Error('Ticket no encontrado'); // Manejar caso donde no haya ticket
    }
    const myheaders = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ticket,
      },
      body: JSON.stringify(data),
    };
console.log(JSON.stringify(data))
    const response = await axios.post(
      `${urlBase}/nodes/${id}/create-folder`,
      myheaders,
    );
    return response.data.nodes.list.entries;
  } catch (error) {
    console.log(error);
    throw error; // Asegúrate de propagar el error para que el slice pueda manejarlo
  }
}