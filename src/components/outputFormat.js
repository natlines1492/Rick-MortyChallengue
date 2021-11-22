
export default function challengueJson (charCountLocations, charCountEpisodes, charCountCharacter, getEpisodesLocations, timeCharCount, timeEpisodesLocations ) {
  
  const jsonObject = [
    {
        "exercise_name": "Char counter",
        "time": timeCharCount,
        "in_time": true,
        "results": [
            {
                "char": "l",
                "count": charCountLocations,
                "resource": "location"
            },
            {
                "char": "e",
                "count": charCountEpisodes,
                "resource": "episode"
            },
            {
                "char": "c",
                "count": charCountCharacter,
                "resource": "character"
            }
        ]
    },
    {
      "exercise_name": "Episode locations",
      "time": timeEpisodesLocations,
      "in_time": true,
      "results":  getEpisodesLocations
    }
  ]
  
  return jsonObject;

}
