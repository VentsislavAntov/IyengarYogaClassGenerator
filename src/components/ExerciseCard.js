import React from "react"

function ExerciseCard(props) {
    // sanskritname 	englishname 	exerciseposition 	exercisetype 	difficulty 	minutes 	url 	exerciseprops 	description

    return (
        <div className="exerciseCards">
            Sanskritname: {props.sanskritname}
            Englishname: {props.englishname}
            Exercise Group : {props.exerciseposition}
            Type: {props.exercisetype}
            Difficulty : {props.difficulty}
            Length: {props.minutes}
            Props: {props.exerciseprops}
            Description: {props.description}
            Illustration: <img src={props.url} alt="new"/>
        </div>
    )
}

export default ExerciseCard