import React from "react"
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

const ExerciseCard = props => {
    return (

        <div className="row">
            <div className="col col-sm-12">
                < div
                    className="card text-center">
                    {/*<div className="overflow">*/}
                    {/*    <img src={props.url} alt="New" className="card-img-top"/>*/
                    }
                    {/*</div>*/
                    }
                    <div className="card-body test-dark">
                        <h4 className="card-title">Sanskritname: {props.sanskritname}</h4>
                        <h4 className="card-title">Englishname: {props.englishname}</h4>
                        <p className="card-test text-secondary">
                            test
                        </p>
                        <a href="#" className="btn btn-outline-success">Next</a>
                    </div>
                </div>
            </div>
        </div>

    )
        ;
};

export default ExerciseCard