import getEpisodesLocations from "./getEpisodesLocations";
import {fetchData} from "../services/apiFetch";

test("getEpisodeLocations returns an array of locations, with properties name, episode and locations", async () => {
  const [episodes, character] = await Promise.all([
    fetchData("episode", 10),
    fetchData("character", 10)
  ]);
  const locations = getEpisodesLocations(episodes, character);
  expect(locations).toBeInstanceOf(Array);
  expect(locations).toHaveLength(10);
  expect(locations[0]).toHaveProperty("name");
  expect(locations[0]).toHaveProperty("episode");
  expect(locations[0]).toHaveProperty("locations");
  expect(localStorage.getItem('timeLocations')).not.toBeNull();
});



