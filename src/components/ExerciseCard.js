/**
 * Class component used to represent cards for individual exercises. Has a separate css file. Its parent is MainArea.
 */

import React, {Component} from 'react'
import './ExerciseCard-Style.css'

//Card details passed via props. The image is also passed down as a GIF link.
class ExerciseCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card-container">
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
                        <table>
                            <tbody>
                                <tr>
                                    <td className="table-first-column-text">English Name:</td>
                                    <td className="table-second-column-text text-left align-items-sm-start">{this.props.exercise.englishname}</td>
                                </tr>
                                <tr>
                                    <td className="table-first-column-text">Exercise Group:</td>
                                    <td className="table-second-column-text text-left align-items-sm-start">{this.props.exercise.exerciseposition}</td>
                                </tr>
                                <tr>
                                    <td className="table-first-column-text">Type:</td>
                                    <td className="table-second-column-text text-left align-items-sm-start">{this.props.exercise.exercisetype}</td>
                                </tr>
                                <tr>
                                    <td className="table-first-column-text">Difficulty:</td>
                                    <td className="table-second-column-text text-left align-items-sm-start">{this.props.exercise.difficulty}</td>
                                </tr>
                                <tr>
                                    <td className="table-first-column-text">Length:</td>
                                    <td className="table-second-column-text text-left align-items-sm-start">{this.props.exercise.minutes} minutes</td>
                                </tr>
                                <tr>
                                    <td className="table-first-column-text">Props:</td>
                                    <td className="table-second-column-text text-left align-items-sm-start">{this.props.exercise.exerciseprops}</td>
                                </tr>
                            </tbody>
                        </table>
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