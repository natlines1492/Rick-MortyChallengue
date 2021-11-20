const API_URL = "https://rickandmortyapi.com/api";

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};