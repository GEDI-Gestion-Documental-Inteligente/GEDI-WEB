import axios from "axios";
const url_base = "localhost";
const ticket = localStorage.getItem('ticket');

export const getPeople =
    async () => {
        const myheaders = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: ticket,
            },
        };

        try {
            const response = await axios.get(
                `http://${url_base}:4000/api/people/all-people`,
                myheaders
            );

            const people = response.data.people.list.entries;
            console.log(people);
            return people;
        } catch (error) {
            console.log(error);
            throw Error;
        }
    };