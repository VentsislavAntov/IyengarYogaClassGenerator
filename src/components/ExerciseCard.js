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
            <div class="card-container">
                < div className="card card-front text-center border-secondary mb-3">
                    <div className="card-title">
                         {this.props.number + 1 + ". " + this.props.exercise.sanskritname}
                    </div>
                    < div
                        className="overflow">
                        < img
                            src={this.props.exercise.url}
                            alt="New"
                            className="card-img-top"/>
                    </div>
                    <div className="card-body text-dark text-lg-left">

                        <h6>English Name: {this.props.exercise.englishname}</h6>
                        <h6>Exercise Group: {this.props.exercise.exerciseposition}</h6>
                        <h6>Type: {this.props.exercise.exercisetype}</h6>
                        <h6>Difficulty: {this.props.exercise.difficulty}</h6>
                        <h6>Length: {this.props.exercise.minutes} Minutes</h6>
                        <h6>Props: {this.props.exercise.exerciseprops}</h6>
                    </div>
                </div>
                < div className="card card-back text-center border-secondary mb-3">
                    <div className="card-title-back">
                        <h4> Description </h4>
                    </div>
                    <div className="card-body-back text-dark text-lg-left">
                        <p className="text-secondary text-justify">
                            Description: {this.props.exercise.description}
                        </p>
                    </div>
                </div>
            </div>


        )
    }
}

export default ExerciseCard