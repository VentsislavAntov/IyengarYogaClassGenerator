/**
 * Component used for the youtube player. Its parent is MainArea.
 * Note this file uses the YouTubeLinks JSON file to get the URLs
 */

import React, {Component} from 'react'
import './ExerciseCard-Style.css'
import ReactPlayer from "react-player"
import YouTubeLinks from './YouTubeLinks.json'


class MusicCard extends Component {
    constructor(props) {
        super(props);
    }

    //The component chooses a random URL from the music type chosen by the user.
    render() {
        let randURL;
        if (this.props.preference === "Disabled") {
            return null;
        } else if (this.props.preference === "Classicalyogastyle") {
            randURL = YouTubeLinks.classicalyogastyle[Math.floor(Math.random() * YouTubeLinks.classicalyogastyle.length)];
        } else if (this.props.preference === "Lofihiphop") {
            randURL = YouTubeLinks.lofihiphop[Math.floor(Math.random() * YouTubeLinks.lofihiphop.length)];
        } else if (this.props.preference === "Chill") {
            randURL = YouTubeLinks.chill[Math.floor(Math.random() * YouTubeLinks.chill.length)];
        } else if (this.props.preference === "Nature") {
            randURL = YouTubeLinks.nature[Math.floor(Math.random() * YouTubeLinks.nature.length)];
        }

        //Note the return specifies the volume to be 0.5 which is 50%. Controls allow the user to use the component
        //as if it was straight out of youtube. Looping is technically not necessary as the chosen URLs are all
        //infinite videos ("Live")
        return (
            <div className="music-container ">
                <div className="music-title text-center">
                    Currently playing
                    <div className="musicPlayer">
                        <ReactPlayer url={randURL}
                                     playing='true'
                                     loop='true'
                                     volume='0.5'
                                     controls='true'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MusicCard