import { urlBase } from '../App';
// TODO: PASAR TODO A POO, por una sola clase que trabaje
export const AuthLogin = async(data) => {
  // TODO: Manejar bien la respuesta, para que realmente sea veridico el user
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
    const data = await response.json();
    if (!data.ok) {
      return data;
    }
    const ticket = data.token;

    // Almacenar el ticket en el almacenamiento local del navegador (localStorage).
    localStorage.setItem('ticket', ticket);

    return { ticket };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const infoUser = async({ setUserInfo }) => {
  try {
    const token = localStorage.getItem('ticket');
    const response = await fetch(`${urlBase}/people/one-person/-me-`, {
      headers: {
        Authorization: token,
      },
    });
    const userInfo = await response.json();
    const userData = userInfo?.person?.entry;
    if (setUserInfo) {
      setUserInfo(userData);
    }
    return userData;
  } catch (error) {
    console.log(error);
  }
};
