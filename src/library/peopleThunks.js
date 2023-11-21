import axios from 'axios';
import { urlBase } from '../App';

export const getAllPeople = async() => {
  const ticket = localStorage.getItem('ticket');
  const myheaders = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ticket,
    },
  };
  try {
    const response = await axios.get(`${urlBase}/people/all-people`, myheaders);

    const people = response.data.people.list.entries;
    return people;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const createPeople = async(data) => {
  const ticket = localStorage.getItem('ticket');

  const myheaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: ticket,
    },
  };
  try {
    const response = await axios.post(
      `${urlBase}/people/create`,
      JSON.stringify(data),
      myheaders,
    );

    const peopleCreated = response.data.newPerson;
    return peopleCreated;
  } catch (error) {
    console.error('Error fetching people', error);
    return null;
  }
};

export const getPeople = async({ id }) => {
  const token = localStorage.getItem('ticket');
  const response = await fetch(`${urlBase}/people/one-person/${id || '-me-'}`, {
    headers: {
      Authorization: token,
    },
  });
  const userInfo = await response.json();
  const useerData = {
    id: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
  };
  const userData = userInfo.person.entry;
  return userData;
};
