export const calcularTiempoCreacion = ({ fechaCreado }) => {
  const createdAt = new Date(fechaCreado);
  const now = new Date();
  const diferenciaTiempo = now - createdAt;
  const diferenciaSegundos = Math.floor(diferenciaTiempo / 1000);
  const minutos = Math.floor(diferenciaSegundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  // Calcula el residuo para obtener las horas y minutos restantes
  const remainingHours = horas % 24;
  const remainingMinutes = minutos % 60;

  let timeMessage = '';

  if (dias > 0) {
    timeMessage += `${dias} día${dias > 1 ? 's' : ''} `;
  }

  if (remainingHours > 0) {
    timeMessage += `${remainingHours} hora${remainingHours > 1 ? 's' : ''} `;
  }

  if (remainingMinutes > 0) {
    timeMessage += `${remainingMinutes} minuto${
      remainingMinutes > 1 ? 's' : ''
    }`;
  }
  return {
    dias,
    horas,
    minutos,
    timeMessage,
  };
};

export const calcularBytesAMbyes = ({ bytes }) => {
  return {
    mbytes: (bytes / 1024 / 1024).toFixed(2),
  };
};
