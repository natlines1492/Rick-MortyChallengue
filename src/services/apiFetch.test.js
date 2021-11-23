import {fetchData} from "./apiFetch";

test("Fetch data from API, with an specific length", async () => {
    const data = await fetchData("character", 10);
    expect(data.length).toBe(10);
  }
);

test("Return error if the API is not available", async () => {
  const data = await fetchData("characters", 10);
  expect(data.error).toBe("There is nothing here.");
});

