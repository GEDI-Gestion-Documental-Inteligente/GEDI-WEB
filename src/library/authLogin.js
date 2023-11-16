import { urlBase } from '../App';

export const AuthLogin = async(data) => {
  const { userId, password } = data;
  try {
    const response = await fetch(`${urlBase}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }
    const data = await response.json();
    const ticket = data.token;

    // Almacenar el ticket en el almacenamiento local del navegador (localStorage).
    localStorage.setItem('ticket', ticket);

    return ticket;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const infoUser = async({ setUserInfo }) => {
  const token = localStorage.getItem('ticket');
  const response = await fetch(`${urlBase}/people/one-person/-me-`, {
    headers: {
      Authorization: token,
    },
  });
  const userInfo = await response.json();
  const userData = userInfo.person.entry;
  setUserInfo(userData);
};
