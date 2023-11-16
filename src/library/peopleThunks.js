import axios from 'axios';
import { urlBase } from '../App';

const ticket = localStorage.getItem('ticket');

export const getPeople = async() => {
  const myheaders = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ticket,
    },
  };
  try {
    const response = await axios.get(
      `${urlBase}/people/all-people`,
      myheaders,
    );

    const people = response.data.people.list.entries;
    console.log(people);
    return people;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const createPeople = async (data) => {
    const myheaders = {
        headers: {
            "Content-Type": "application/json",
            Authorization: ticket,
        },
    };
    try {
        const response = await axios.post(
            `${url_base}/people/create`,
            data,
            myheaders
        );

        const peopleCreated = response.data.newPerson;
        return peopleCreated;
    } catch (error) {
        console.error("Error fetching people", error);
        return null;
    }
}

