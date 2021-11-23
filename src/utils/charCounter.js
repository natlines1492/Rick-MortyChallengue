export default function charCounter(data, letter){
    let t0 = performance.now();
    let counterLetter = 0;
  
    for(let item in data){  //for each item in the data
        let name = data[item].name;  //get the name of the item
        for (let i in name){  //for each letter in the name
          counterLetter += (name[i].toLowerCase() === letter ? 1 : 0);  //if the letter is equal to the letter passed as argument, add 1 to the counterLetter
        }
    }
    let t1 = performance.now();
    let totalTimeCharCounter = JSON.stringify(t1 - t0).slice(0,1) + 's ' + JSON.stringify(t1 - t0).slice(2,10) + 'ms';
    localStorage.setItem('timeCharCounter', totalTimeCharCounter);  //save the function execution time in the local storage

    return counterLetter; 
  };