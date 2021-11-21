import { fetchData } from '../services/apiFetch';
import { useState, useEffect } from 'react';
import challengueJson from '../components/outputFormat';

export default function Challengue() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
    
  useEffect(() => {
    fetchData('character').then(data => setCharacters(data.results));
    fetchData('episode').then(data => setEpisodes(data.results));
    fetchData('location').then(data => setLocations(data.results));
  }, []);
  

  function counterLetters(data){
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
    return [counterL, counterE, counterC];
  };

  function getEpisodesLocations(){
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
    return locationsArray;
  }

//   const chairCounter = [
//     {
//         "exercise_name": "Char counter",
//         "time": "2s 545.573272ms",
//         "in_time": true,
//         "results": [
//             {
//                 "char": "l",
//                 "count": counterLetters(locations).reduce((a, b) => a + b),
//                 "resource": "location"
//             },
//             {
//                 "char": "e",
//                 "count": counterLetters(episodes).reduce((a, b) => a + b),
//                 "resource": "episode"
//             },
//             {
//                 "char": "c",
//                 "count": counterLetters(characters).reduce((a, b) => a + b),
//                 "resource": "character"
//             }
//         ]
//     },
//     {
//       "exercise_name": "Episode locations",
//       "time": "1s 721.975698ms",
//       "in_time": true,
//       "results":  [
//         {
//             "name": "Pickle Rick",
//             "episode": "S03E03",
//             "locations": [
//               "Earth (C-137)",
//               "Earth (Replacement Dimension)",
//               "unknown"
//             ]
//         }
//     ]
//   }
// ]

var chairCounter = challengueJson(
  counterLetters(locations).reduce((a, b) => a + b),
  counterLetters(episodes).reduce((a, b) => a + b),
  counterLetters(characters).reduce((a, b) => a + b),
  getEpisodesLocations()
)


var strChairCounter = JSON.stringify(chairCounter, null, 2);
console.log(strChairCounter);


  return (
    <div className="App">
      <h1>Chair counter</h1>
      <p>{strChairCounter}</p>
    </div>
  );
}

