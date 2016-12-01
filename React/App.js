import React from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'
import Champion from './Champion'
import Sound from 'react-sound'

var Champs = React.createClass({
    getInitialState() {
        return {
            champs: []
        }
    },
    componentWillMount() {
        this.getChamps()
    },
    componentDidMount() {

    },
    getChamps() {
        var url = `/champs`
        fetch(url)
           .then(results => results.json())
           .then(champs => this.setState({champs}))
           .then(champs => this.selectedChamp(this.state.champs[0].id))
           .catch(function(err) {
               console.log(err)
              console.log('couldn\'t get data')
           })
    },
    selectedChamp(id) {
        let thisChamp = _.filter(this.state.champs, {'id': id})
        this.setState({selectedChamp: thisChamp[0]})
        document.body.style.backgroundImage = `url(${thisChamp[0].image})`
    },
    render() {
        var component = this
        console.log(this.state)
        return (
            <div className="ui grid container">
                <h2 className="ui header">
                  League of Legends
                  <div className="sub header">Free rotation this week</div>
                </h2>
                <div className="ui tiny images">
                {component.state.champs ?
                    _.map(component.state.champs, function(champ) {
                        return (
                            <Champion
                                key={champ.id}
                                champ={champ}
                                parent={component}></Champion>
                        )
                    })
                : <div>no</div>
                }
                {component.state.selectedChamp ?
                    <Sound
                        url={component.state.selectedChamp.sound}
                        playStatus={Sound.status.PLAYING} /> : null
                }
                </div>
            </div>
        )
    }
})


ReactDom.render(<Champs/>,
document.getElementById('react-container'))
