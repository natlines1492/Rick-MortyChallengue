const API_URL = "https://rickandmortyapi.com/api";

// This function is used to fetch data from the API and need 2 arguments: the endpoint and length of the data to be fetched.

export const fetchData = async (endpoint, length) => {

  function array(length) {
    let array = [];
    for (let i = 1; i <= length; i++) {
      array.push(i);
    }
    return array;
  }

  try {
    const response = await fetch(`${API_URL}/${endpoint}/${array(length)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};