let express = require('express');
let router = express.Router();
let _ = require('lodash');
let request = require('request');
let key = process.env.leagueApiKey;

let champs = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('yooooo');
    console.log(key);
    request({
        url: `https://na1.api.riotgames.com/lol/platform/v3/champion-rotations`,
        headers: {
          "X-Riot-Token": key
        }
    }, function (error, response, body) {
        let data = JSON.parse(body);
        console.log(body);
        champs = data.freeChampionIds;
        console.log(champs);
        res.render('index', {
            'title': 'Free this week'
        });
    });
});

router.get('/champs', function(req, res, next) {
    request(`http://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion.json`, function (error, response, body) {
        let data = JSON.parse(body);
        champions = _.map(data.data, function(champ) {

            console.log(champ.key);
            if (_.indexOf(champs, parseInt(champ.key)) > 0) {
                return {
                    id: champ.id,
                    name: champ.name,
                    title: champ.title,
                    tags: champ.tags,
                    image: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
                    avatar: `http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/${champ.id}.png`,
                    sound: `/sounds/${champ.id}.mp3`
                }
            } else {
                return '';
            }
        });
        champions = _.filter(champions, 'id');
        res.send(champions);
    });
});

module.exports = router;
