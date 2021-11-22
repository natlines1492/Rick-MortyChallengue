import { fetchData } from '../services/apiFetch';
import { useState, useEffect } from 'react';

export default function Challengue() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [timeCharCount, setTimeCharCount] = useState(0);
  const [timeEpisodesLocations, setTimeEpisodesLocations] = useState(0);

  // function array(length) {
  //   let array = [];
  //   for (let i = 1; i <= length; i++) {
  //     array.push(i);
  //   }
  //   return array;
  // }

  function counterLetters(data, letter){
    t0 = performance.now();
    let counterLetter = 0;
  
    for(let episode in data){
        let name = data[episode].name;
        for (let i in name){
          counterLetter += (name[i].toLowerCase() === letter ? 1 : 0);
        }
    }
    t1 = performance.now();
    totalTimeCharCounter += t1 - t0;

    return counterLetter;
  };

  let t0;
  let t1;
  let totalTimeCharCounter = 0;

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

    return locationsArray
  };

  let t2;
  let t3;
  let totalTimeLocations = 0;

  useEffect(() => {
    async function fetchAllData() {
      const [characters, episodes, locations] = await Promise.all([
        fetchData('character', 826),
        fetchData('episode', 51),
        fetchData('location', 126)
      ]);
      setCharacters(characters);
      setEpisodes(episodes);
      setLocations(locations);
      setTimeCharCount(totalTimeCharCounter);
      setTimeEpisodesLocations(totalTimeLocations);
    }
    fetchAllData();
  }, []);


  return (
    <>
    <div className="App">
      <h1>Rick&Morty Challengue!</h1>
      <h2>Nathaly Linares</h2>
      <h3>{characters.length} characters</h3>
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
      "count": ${counterLetters(locations, 'l')}
      "resource": "location"
    },
    {
      "char": "e",
      "count": ${counterLetters(episodes, 'e')}
      "resource": "episode"
    },
    {
      "char": "c",
      "count": ${counterLetters(characters, 'c')}
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





