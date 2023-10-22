export const AuthLogin = async (data) => {
    const { userId, password } = data;
    try {
        const response = await fetch("http://localhost:4000/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                password,
            }),
        });


        if (!response.ok) {
            throw new Error("Error al iniciar sesión");
        }
        const data = await response.json();
        const ticket = data.token;
        console.log('Cookies recibidas:', ticket);

        // Almacenar el ticket en el almacenamiento local del navegador (localStorage).
        localStorage.setItem('ticket', ticket);

        return ticket;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

