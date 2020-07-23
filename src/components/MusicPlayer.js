import React, {Component} from 'react'
import './ExerciseCard-Style.css'
import ReactPlayer from "react-player"
import YouTubeLinks from './YouTubeLinks.json'


class MusicCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let randURL;
        let YouTubeLinksStringified = JSON.stringify(YouTubeLinks)
        if (this.props.preference === "Disabled") {
            return null;
        } else if (this.props.preference === "Classicalyogastyle") {
            randURL = YouTubeLinksStringified.classicalyogastyle[Math.floor(Math.random() * YouTubeLinks.classicalyogastyle.length)];
        } else if (this.props.preference === "Lofihiphop") {
            randURL = YouTubeLinksStringified.lofihiphop[Math.floor(Math.random() * YouTubeLinks.lofihiphop.length)];
        } else if (this.props.preference === "Chill") {
            randURL = YouTubeLinksStringified.chill[Math.floor(Math.random() * YouTubeLinks.chill.length)];
        } else if (this.props.preference === "Nature") {
            randURL = YouTubeLinksStringified.nature[Math.floor(Math.random() * YouTubeLinks.nature.length)];
        }
        return (
            <div className="music-container ">
                <div className="music-title text-center">
                    What is playing:
                    <div className="musicPlayer">
                        <ReactPlayer url={randURL} playing='true' loop='true'
                                     controls='true'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MusicCard