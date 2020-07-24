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
        // let YouTubeLinksStringified = JSON.stringify(YouTubeLinks)

        // console.log("YouTubeLinksStringified")
        // console.log(YouTubeLinksStringified)
        //
        // console.log("YouTubeLinks.classicalyogastyle")
        // console.log(YouTubeLinks.classicalyogastyle)
        //
        // console.log("YouTubeLinks.classicalyogastyle[0]")
        // console.log(YouTubeLinks.classicalyogastyle[0])


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