export const miSite = async() => {
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

    const response = await fetch(
      `http://localhost:4000/api/sites/all`,
      myheaders,
    ).then((response) => response.json());
    return response;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: 'Ticket no encontrado',
    };
  }
};
