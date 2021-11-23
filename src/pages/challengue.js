import { fetchData } from '../services/apiFetch';
import { useState, useEffect } from 'react';

export default function Challengue() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);

  //counterLetter function return the number of characters than are equal to the letter passed as argument:

  function counterLetters(data, letter){
    let t0 = performance.now();
    let counterLetter = 0;
  
    for(let episode in data){  //for each episode in the data
        let name = data[episode].name;  //get the name of the episode
        for (let i in name){  //for each letter in the name
          counterLetter += (name[i].toLowerCase() === letter ? 1 : 0);  //if the letter is equal to the letter passed as argument, add 1 to the counterLetter
        }
    }
    let t1 = performance.now();
    let totalTimeCharCounter = t1 - t0;
    localStorage.setItem('timeCharCounter', totalTimeCharCounter);  //save the function execution time in the local storage

    return counterLetter; 
  };

  //getEpisodesLocations function return the locations name for each episode

  function getEpisodesLocations(){
    let t0 = performance.now();
    let locationsArray = [];  //array to store the locations name for each episode
  
    for (let episode in episodes){  //for each episode in episodes seted in the state
      const episodeName = episodes[episode].name;  //get the name of the episode
      const episodeCode = episodes[episode].episode;  //get the code of the episode
      let idCharacters = [];  //array to store the id of the characters in the episode
      let episodeLocations = [];  //array to store the locations name for each episode
  
      for (let url in episodes[episode].characters){  //for each url in the characters array of the episode
        idCharacters.push(parseInt(url.slice(url.lastIndexOf('/') + 1)));  //slice the url to get the character's id and push it to the idCharacters array
      }

      characters.map(character => {  //for each character in the characters seted in the state
        if(idCharacters.includes(character.id)){  //if character's id is in the idCharacters array
          episodeLocations.push(character.location.name);  //add the character's location name to the episodeLocations array
        }
      })

      locationsArray.push({  //push the episode's locations name to the locationsArray array
        "name": episodeName,
        "episode": episodeCode,
        "locations": episodeLocations.filter((v, i, a) => a.indexOf(v) === i) // filter for unique values in locations
      })
    }
    let t1 = performance.now();
    let totalTimeLocations = t1 - t0;
    localStorage.setItem('timeLocations', totalTimeLocations); //save the function execution time in the local storage

    return locationsArray
  };


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
  "time": ${localStorage.getItem('timeCharCounter').slice(0,1) + 's ' + localStorage.getItem('timeCharCounter').slice(2,10) + 'ms'},
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
  "time": ${localStorage.getItem('timeLocations').slice(0,1) + 's ' + localStorage.getItem('timeLocations').slice(2,10) + 'ms'},
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





