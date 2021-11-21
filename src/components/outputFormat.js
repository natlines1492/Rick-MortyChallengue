
export default function challengueJson (charCountLocations, charCountEpisodes, charCountCharacter, getEpisodesLocations ) {
  return (
  [
    {
        "exercise_name": "Char counter",
        "time": "2s 545.573272ms",
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
      "time": "1s 721.975698ms",
      "in_time": true,
      "results":  getEpisodesLocations
    }
  ]
  )
};
