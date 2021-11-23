export  default function getEpisodesLocations(episodes, characters){
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
          episodeLocations.push(character.origin.name);  //add the character's location name to the episodeLocations array
        }
      })

      locationsArray.push({  //push the episode's locations name to the locationsArray array
        "name": episodeName,
        "episode": episodeCode,
        "locations": episodeLocations.filter((v, i, a) => a.indexOf(v) === i) // filter for unique values in locations
      })
    }
    let t1 = performance.now();
    let totalTimeLocations = JSON.stringify(t1 - t0).slice(0,1) + 's ' + JSON.stringify(t1 - t0).slice(2,10) + 'ms';

    localStorage.setItem('timeLocations', totalTimeLocations);  //save the function execution time in the local storage

    return locationsArray
  };