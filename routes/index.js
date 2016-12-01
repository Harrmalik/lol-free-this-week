let express = require('express');
let router = express.Router();
let _ = require('lodash');
let request = require('request');
let key = require('../keys') || process.env.api-key;

let champs = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    request(`https://na.api.pvp.net/api/lol/na/v1.2/champion?freeToPlay=true&api_key=${key}`, function (error, response, body) {
        let data = JSON.parse(body);
        champs = _.map(data.champions, function(champ) {
            return champ.id;
        })
        res.render('index', {
            'title': 'Free this week'
        });
    });
});

router.get('/champs', function(req, res, next) {
    request(`https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=tags&api_key=${key}`, function (error, response, body) {
        let data = JSON.parse(body);

        champions = _.map(data.data, function(champ) {
            if (_.indexOf(champs, champ.id) > 0) {
                return {
                    id: champ.id,
                    name: champ.name,
                    title: champ.title,
                    tags: champ.tags,
                    image: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.key}_0.jpg`,
                    avatar: `http://ddragon.leagueoflegends.com/cdn/6.23.1/img/champion/${champ.key}.png`,
                    sound: `/sounds/${champ.key}.mp3`
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
