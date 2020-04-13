import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Sound from 'react-sound'

function App() {
  const [freeChamps, setFreeChampions] = useState([
        7,
        26,
        32,
        35,
        36,
        48,
        62,
        67,
        79,
        84,
        91,
        110,
        122,
        143,
        240
    ]);
  useEffect(() => {
    if (!freeChamps || champions.length === 0) {
      getChampions(freeChamps);
      fetch('/dev/league/getChampionRotations')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // setFreeChampions(response.champs)
        // getChampions(response.champs);
      });
    }
  })

  const [champions, setChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [championsByTags, setChampionsByTags] = useState({});
  function getChampions(freeChamps) {
    fetch('http://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion.json')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let tags = [];
        let champs = _.map(response.data, champ => {
          if (_.indexOf(freeChamps, parseInt(champ.key)) > 0) {
            const cleanedChampion = {
              id: champ.id,
              name: champ.name,
              title: champ.title,
              tags: champ.tags,
              description: champ.blurb,
              info: champ.info,
              image: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
              avatar: `http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/${champ.id}.png`,
              sound: `/sounds/${champ.id}.mp3`
            }

            for (var i = 0; i < champ.tags.length; i++) {
              const currentTag = champ.tags[i];
              if (tags[currentTag]) {
                tags[currentTag].push(cleanedChampion);
              } else {
                tags[currentTag] = [cleanedChampion]
              }
            }

            return cleanedChampion;
          } else {
              return '';
          }
        })

        champs = _.filter(champs, 'id');
        setChampions(champs);
        setFilteredChampions(champs);
        setCurrentChamp(champs[0]);
        setChampionsByTags(tags);
      });
  };

  const [currentChamp, setCurrentChamp] = useState({})
  function selectChamp(champ) {
    setCurrentChamp(champ);
  }

  useEffect(() => {
    document.body.style.backgroundImage = `url(${currentChamp.image})`;
    document.title = currentChamp.name;
  })

  function filterChampions(e) {
    const filteredChampions = e.target.value ? championsByTags[e.target.value] : champions
    setFilteredChampions(filteredChampions)
    selectChamp(filteredChampions[0])
  }

  return (
    <div className="ui grid">
      <div className="images">
        <label>Filter:</label>

        <select onChange={filterChampions}>
          <option value="">All</option>
          {Object.keys(championsByTags).map(tag => {
            return (
              <option key={tag} value={tag}>{tag}</option>
            )
          })}
        </select>

        {filteredChampions.map(champ => {
          return (
            <img key={champ.id} className="ui tiny image circular" onClick={() => { selectChamp(champ) }} src={champ.avatar}></img>
          )
        })}
      </div>

      <div id="page">
        <i className="ui icon inverted huge black settings"></i>

        <div>
          <div className="ui icon settings"></div>
          <Sound
          url={currentChamp.sound}
          playStatus={Sound.status.PLAYING} />

          <footer>
            <h2 className="ui header inverted left aligned">
              {currentChamp.name}
              <div className="ui sub header"><b>{currentChamp.title}</b> - {currentChamp.description}</div>
            </h2>

            <h3 className="ui header inverted right aligned">
              League of Legends
              <div className="sub header">Free rotation this week</div>
            </h3>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
