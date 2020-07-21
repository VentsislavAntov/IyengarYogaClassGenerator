import React, {Component} from 'react'
import './ExerciseCard-Style.css'

// function ExerciseCardUI(props) {
//     // sanskritname 	englishname 	exerciseposition 	exercisetype 	difficulty 	minutes 	url 	exerciseprops 	description
//
//     return (
//         <div className="exerciseCards">
//             Sanskritname: {props.sanskritname}
//             Englishname: {props.englishname}
//             Exercise Group : {props.exerciseposition}
//             Type: {props.exercisetype}
//             Difficulty : {props.difficulty}
//             Length: {props.minutes}
//             Props: {props.exerciseprops}
//             Description: {props.description}
//             Illustration: <img src={props.url} alt="new"/>
//         </div>
//     )
// }

class ExerciseCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            < div className="card text-center border-secondary mb-3">
                <div className="card-title">
                    <h4> {this.props.number+1 + ". " +this.props.exercise.sanskritname}</h4>
                </div>
                < div
                    className="overflow">
                    < img
                        src={this.props.exercise.url}
                        alt="New"
                        className="card-img-top"/>

                </div>

                <div className="card-body text-dark text-lg-left">

                    <h5>English Name: {this.props.exercise.englishname}</h5>
                    <h5>Exercise Group: {this.props.exercise.exerciseposition}</h5>
                    <h5>Type: {this.props.exercise.exercisetype}</h5>
                    <h5>Difficulty: {this.props.exercise.difficulty}</h5>
                    <h5>Length: {this.props.exercise.minutes} Minutes</h5>
                    <h5>Props: {this.props.exercise.exerciseprops}</h5>
<br/>
                        <p className="text-secondary text-justify">
                            Description: {this.props.exercise.description}
                        </p>
                    </div>

                </div>



        )
    }
}

export default ExerciseCard