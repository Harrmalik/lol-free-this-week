import React from 'react'
import Sound from 'react-sound'

var Champion = React.createClass({
    getInitialState() {
        return {

        }
    },
    fullscreenView() {

    },
    avatarView() {

    },
    selectChamp() {
        this.props.parent.selectedChamp(this.props.champ.id)
    },
    render() {
        return (
            <img className="ui medium image" onClick={this.selectChamp} src={this.props.champ.avatar}></img>
        )
    }
})

export default Champion
