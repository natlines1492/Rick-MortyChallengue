import charCounter from "./charCounter";

test("charCounter counts the number of times a letter appears in a name's property", () => {
    const charCounterOuput = charCounter([{name: "Ricka Sanchez"}], "a")
    expect(charCounterOuput).toBe(2);
  }
);

test("Saves the execution time of the function in the local storage", () => {
    charCounter([{name: "Ricka Sanchez"}], "a");
    expect(localStorage.getItem('timeCharCounter')).not.toBeNull();
  }
);



