import { fetchData } from '../services/apiFetch';
import { useState, useEffect } from 'react';

export default function Challengue() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
    
  useEffect(() => {
    fetchData('character').then(data => setCharacters(data.results));
    fetchData('episode').then(data => setEpisodes(data.results));
    fetchData('location').then(data => setLocations(data.results));
  }, []);

  return (
    <div className="App">
      <h1>Challengue</h1>
      <h2>Characters</h2>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
      <h2>Episodes</h2>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>{episode.name}</li>
        ))}
      </ul>
      <h2>Locations</h2>
      <ul>
        {locations.map(location => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    </div>
  );
}

