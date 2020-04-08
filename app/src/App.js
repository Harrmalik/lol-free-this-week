import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Sound from 'react-sound'

function App() {
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    if (champions.length === 0) {
      fetch('http://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion.json')
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          let champs = _.map(response.data, champ => {
            return {
                id: champ.id,
                name: champ.name,
                title: champ.title,
                tags: champ.tags,
                image: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
                avatar: `http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/${champ.id}.png`,
                sound: `/sounds/${champ.id}.mp3`
            }
            // if (_.indexOf(champs, parseInt(champ.key)) > 0) {
            //     return {
            //         id: champ.id,
            //         name: champ.name,
            //         title: champ.title,
            //         tags: champ.tags,
            //         image: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
            //         avatar: `http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/${champ.id}.png`,
            //         sound: `/sounds/${champ.id}.mp3`
            //     }
            // } else {
            //     return '';
            // }
          })

          setChampions(champs.splice(0,8));
          setCurrentChamp(champs[0]);
        });
    }

  });

  const [currentChamp, setCurrentChamp] = useState({})
  function selectChamp(champ) {
    setCurrentChamp(champ);
  }

  useEffect(() => {
    document.body.style.backgroundImage = `url(${currentChamp.image})`;
    document.title = currentChamp.name;
  })

  return (
    <div className="ui grid">
        <div className="images">
          {champions.map(champ => {
            return (
              <img className="ui tiny image circular" onClick={() => { selectChamp(champ) }} src={champ.avatar}></img>
            )
          })}

          <div>
              <Sound
                  url={currentChamp.sound}
                  playStatus={Sound.status.PLAYING} />

              <footer>
                  <h2 className="ui header inverted left aligned">
                      {currentChamp.name}
                      <div className="ui sub header">{currentChamp.title}</div>
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
