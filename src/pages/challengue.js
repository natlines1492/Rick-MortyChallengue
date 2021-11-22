import { fetchData } from '../services/apiFetch';
import { useState, useEffect } from 'react';

export default function Challengue() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [timeCharCount, setTimeCharCount] = useState(0);
  const [timeEpisodesLocations, setTimeEpisodesLocations] = useState(0);

  function counterLetters(data){
    t0 = performance.now();
    let counterE = 0;
    let counterL = 0;
    let counterC = 0;
  
    for(let episode in data){
        let name = data[episode].name;
        for (let i in name){
          counterE = counterE + (name[i].toLowerCase() === 'e' ? 1 : 0);
          counterL = counterL + (name[i].toLowerCase() === 'l' ? 1 : 0);
          counterC = counterC + (name[i].toLowerCase() === 'c' ? 1 : 0);
        }
    }
    t1 = performance.now();
    totalTime += t1 - t0;
    return [counterL, counterE, counterC];
  };

  let t0;
  let t1;
  let totalTime = 0;

  function getEpisodesLocations(){
    t2 = performance.now();
    let locationsArray = [];
  
    for (let episode in episodes){
      const episodeName = episodes[episode].name;
      const episodeCode = episodes[episode].episode;
      let idCharacters = [];
      let episodeLocations = [];
  
      for (let id in episodes[episode].characters){
        idCharacters.push(parseInt(episodes[episode].characters[id].slice(episodes[episode].characters[id].lastIndexOf('/') + 1)));
      }
      characters.map(character => {
        if(idCharacters.includes(character.id)){
          episodeLocations.push(character.location.name);
        }
      })
      locationsArray.push({
        "name": episodeName,
        "episode": episodeCode,
        "locations": episodeLocations.filter((v, i, a) => a.indexOf(v) === i)
      })
    }
    t3 = performance.now();
    totalTimeLocations += t3 - t2;
    console.log(`Time to get locations: ${t3 - t2} ms`);
    console.log(`Time to get locations: ${totalTimeLocations} ms`);

    return locationsArray
  };

  let t2;
  let t3;
  let totalTimeLocations = 0;

  useEffect(() => {
    async function fetchAllData() {
      const [characters, episodes, locations] = await Promise.all([
        fetchData('character'),
        fetchData('episode'),
        fetchData('location')
      ]);
      setCharacters(characters.results);
      setEpisodes(episodes.results);
      setLocations(locations.results);
      setTimeCharCount(totalTime);
      setTimeEpisodesLocations(totalTimeLocations);
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
  "time": ${timeCharCount},
  "in_time": true,
  "results": [
    {
      "char": "l",
      "count": ${counterLetters(locations).reduce((a, b) => a + b)},
      "resource": "location"
    },
    {
      "char": "e",
      "count": ${counterLetters(episodes).reduce((a, b) => a + b)},
      "resource": "episode"
    },
    {
      "char": "c",
      "count": ${counterLetters(characters).reduce((a, b) => a + b)},
      "resource": "character"
    }
  ]
},
{
  "exercise_name": "Episode locations",
  "time": ${timeEpisodesLocations},
  "in_time": true,
  "results": ${JSON.stringify(getEpisodesLocations(), null, 2)}
}
`}
          </code>
        </pre>
      </div>
    </>
  );
}





