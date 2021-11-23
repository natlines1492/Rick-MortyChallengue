import { fetchData } from '../services/apiFetch';
import { useState, useEffect } from 'react';
import charCounter from '../utils/charCounter';
import getEpisodesLocations from '../utils/getEpisodesLocations';

export default function Challenge() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchAllData() {
      const [characters, episodes, locations] = await Promise.all([
        fetchData('character', 826), // API has 826 characters
        fetchData('episode', 51), // API has 51 episodes
        fetchData('location', 126) // API has 126 locations
      ]);
      setCharacters(characters); 
      setEpisodes(episodes);
      setLocations(locations);
    }
    fetchAllData();
  }, []);


  return (
    <>
    <div className="App">
      <h1>Rick&Morty Challengue</h1>
      <h2>Nathaly Linares</h2>
    </div>
    <div>
        <pre>
          <code>
{`
{
  "exercise_name": "Char counter",
  "time": ${localStorage.getItem('timeCharCounter')  || '0s 0ms'},
  "in_time": true,
  "results": [
    {
      "char": "l",
      "count": ${charCounter(locations, 'l') || 0}
      "resource": "location"
    },
    {
      "char": "e",
      "count": ${charCounter(episodes, 'e') || 0}
      "resource": "episode"
    },
    {
      "char": "c",
      "count": ${charCounter(characters, 'c') || 0}
      "resource": "character"
    }
  ]
},
{
  "exercise_name": "Episode locations",
  "time": ${localStorage.getItem('timeLocations')  || '0s 0ms'},
  "in_time": true,
  "results": ${JSON.stringify(getEpisodesLocations(episodes, characters), null, 2) || '[]'}
}
`}
          </code>
        </pre>
      </div>
    </>
  );
}





