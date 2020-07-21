import React, {Component} from "react"
import ExerciseCardUI from "./ExerciseCard";
import ExerciseCard from './ExerciseCard';

class MainArea extends Component {
    constructor() {
        super();
        this.state = {
            propsPreference: 'none',
            typePreference: 'none',
            difficultyPreference: 'none',
            lengthPreference: '30',
            exercises: [],
            userExercises: []
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //Needs API LINK
    componentDidMount() {
        console.log('MOUNTED');
        const that = this;
        fetch('http://localhost:3001/api/exercises')
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        that.setState({
                            exercises: data
                        })
                    })
            })
    }


    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })

    }


    // business logic - look at preferences and based on extracted excercises, do logic
    handleSubmit(event) {
        event.preventDefault();
        this.setState({userExercises: []});
        // this.setState({
        //     propsPreference: 'none',
        //     typePreference: 'none',
        //     difficultyPreference: 'none',
        //     lengthPreference: '30',
        // });


        // console.log("ALL EXERCISES");
        // console.log(allExercises);
        let userExercises = [];
        const that = this;

        let propsPreference = this.state.propsPreference;
        let typePreference = this.state.typePreference;
        let difficultyPreference = this.state.difficultyPreference;
        let lengthPreference = this.state.lengthPreference;
        let siddhasanaExercise;
        let swastikasanaExercise;
        let tadasanaExercise;
        let firstExercise;
        let savasanaExercise;
        let sarvangasanaExercise;
        let elapsedTime = 0;


        let request = new Request('http://localhost:3001/api/get-exercise', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
        });

        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        that.setState({
                            exercises: data
                        })
                    })
            })
            .catch(function (err) {
                console.log(err)
            });

        let allExercises = this.state.exercises;


        // let siddhasanaExercise = allExercises.filter(function(exercise) {
        //     return exercise.sanskritname  === 'Siddhasana';
        // });


        for (let i = 0; i < allExercises.length; i++) {
            if (allExercises[i].sanskritname === 'Siddhasana') {
                siddhasanaExercise = allExercises[i];
            }
            if (allExercises[i].sanskritname === 'Swastikasana') {
                swastikasanaExercise = allExercises[i];
            }
            if (allExercises[i].sanskritname === 'Tadasana') {
                tadasanaExercise = allExercises[i];
            }
            if (allExercises[i].sanskritname === 'Savasana') {
                savasanaExercise = allExercises[i];
            }
            if (allExercises[i].sanskritname === 'Sarvangasana') {
                sarvangasanaExercise = allExercises[i];
            }
        }

        let randInteger = Math.floor(Math.random() * Math.floor(10));
        console.log("random integer ");
        console.log(randInteger)
        console.log("siddhasanaExercise ");
        console.log(siddhasanaExercise);
        console.log("allExercises.length");
        console.log(allExercises.length);
        if (randInteger < 3) {
            firstExercise = siddhasanaExercise;
        } else {
            firstExercise = swastikasanaExercise;
        }
        console.log("first exercise");
        console.log(firstExercise)
        elapsedTime = elapsedTime + firstExercise.minutes + tadasanaExercise.minutes;
        this.setState(prevState => {
            return {
                userExercises: prevState.userExercises.concat(firstExercise).concat(tadasanaExercise)
            }
        });

        removeItem(allExercises, siddhasanaExercise);
        removeItem(allExercises, swastikasanaExercise);
        removeItem(allExercises, tadasanaExercise);
        removeItem(allExercises, savasanaExercise);
        removeItem(allExercises, sarvangasanaExercise);


        let allExercisesDifficultyFilter = allExercises;
        if (difficultyPreference !== 'none') {
            allExercisesDifficultyFilter = allExercises.filter(function (exercise) {
                return exercise.difficulty === difficultyPreference;
            });
        }
        console.log("filtertest1");
        console.log(allExercisesDifficultyFilter);

        let allExercisesDifficultyTypeFilter = allExercisesDifficultyFilter;
        if (typePreference !== 'none') {
            allExercisesDifficultyTypeFilter = allExercisesDifficultyFilter.filter(function (exercise) {
                return exercise.exercisetype === typePreference;
            });
        }
        console.log("filtertest2");
        console.log(allExercisesDifficultyTypeFilter);

        console.log("filtertest2size");
        console.log(allExercisesDifficultyTypeFilter.length);


        // filterArrayToNewArray(difficultyPreference, allExercises, allExercisesDifficultyFilter, "difficulty ");
        //
        // console.log("filter1");
        // console.log(allExercisesDifficultyFilter);
        // filterArrayToNewArray(typePreference, allExercisesDifficultyFilter, allExercisesDifficultyTypeFilter, 'exercisetype');
        //
        // console.log("filter2");
        // console.log(allExercisesDifficultyTypeFilter);

        let allExercisesDifficultyTypePropsFilter = allExercisesDifficultyTypeFilter;
        if (propsPreference === 'none') {
            allExercisesDifficultyTypePropsFilter = allExercisesDifficultyTypeFilter;
        } else if (propsPreference === 'no props') {
            allExercisesDifficultyTypePropsFilter = allExercisesDifficultyTypeFilter.filter(function (exercise) {
                return exercise.exerciseprops === null;
            });
        } else if (propsPreference === 'props') {
            allExercisesDifficultyTypePropsFilter = allExercisesDifficultyTypeFilter.filter(function (exercise) {
                return exercise.exerciseprops !== null;
            });
        }

        console.log("filtertest3");
        console.log(allExercisesDifficultyTypePropsFilter);


        // if (difficultyPreference === 'none') {
        //     allExercisesDifficultyFilter = allExercises;
        // } else {
        //     allExercisesDifficultyFilter = allExercises.filter(function (exercise) {
        //         return exercise.exerciseposition === difficultyPreference;
        //     });
        // }
        //
        // if (typePreference === 'none') {
        //     allExercisesDifficultyTypeFilter = allExercisesDifficultyFilter;
        // } else {
        //     allExercisesDifficultyFilter = allExercises.filter(function (exercise) {
        //         return exercise.exercisetype  === typePreference;
        //     });
        // }


        let timeToSplit = lengthPreference - sarvangasanaExercise.minutes - savasanaExercise.minutes - firstExercise.minutes - tadasanaExercise.minutes;
        console.log('timebeforeSarv');
        console.log(timeToSplit);
        console.log('lengthPreference');
        console.log(lengthPreference);
        console.log('sarvangasanaExercise.minutes');
        console.log(sarvangasanaExercise.minutes);
        console.log('savasanaExercise.minutes');
        console.log(savasanaExercise.minutes);
        console.log('firstExercise.minutes');
        console.log(firstExercise.minutes);
        console.log('tadasanaExercise.minutes');
        console.log(tadasanaExercise.minutes);

        let allExercisesDifficultyTypePropsFilterLocal;
        let allExercisesDifficultyTypeFilterLocal;
        let allExercisesDifficultyFilterLocal;
        let allExercisesLocal;

        while ((timeToSplit / 6) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Standing Backwards Extension');
        }
        console.log('after first while while');
        while (((timeToSplit / 6) * 2) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Standing Forward Bend');
        }
        console.log('after second while while');
        while (((timeToSplit / 6) * 3) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Seated Twist');
        }
        console.log('after third while while');
        while (((timeToSplit / 6) * 4) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Seated Forward Bend');
        }
        console.log('after fourth while while');
        while (((timeToSplit / 6) * 5) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Seated Other');
        }
        console.log('after fifth while while');
        while ((timeToSplit) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Prone/Supine');
        }
        console.log('after sixth while while');


        this.setState(prevState => {
            return {
                userExercises: prevState.userExercises.concat(sarvangasanaExercise).concat(savasanaExercise)
            }
        });


        // if (propsPreference === 'none') {
        //     let userExercisesRandomStanding;
        //     let userExercisesRandomOnFloor;
        //     console.log("in IF");
        //     userExercisesRandomStanding = allExercises.filter(function (exercise) {
        //         return exercise.exerciseposition === 'Standing';
        //     });
        //
        //     console.log("after first filter");
        //     console.log(userExercisesRandomStanding);
        //     console.log(userExercisesRandomStanding.length - 1);
        //
        //     while (((lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2) > (elapsedTime - siddhasanaExercise.minutes)) {
        //         let addedExercise = userExercisesRandomStanding[Math.floor(Math.random() * userExercisesRandomStanding.length)];
        //         elapsedTime = elapsedTime + addedExercise.minutes;
        //         console.log("WHAT IS SUPPOSED TO BE DELETED");
        //         console.log(addedExercise);
        //
        //         const index = userExercisesRandomStanding.indexOf(addedExercise);
        //         if (index > -1) {
        //             userExercisesRandomStanding.splice(index, 1);
        //         }
        //
        //         this.setState(prevState => {
        //             return {
        //                 userExercises: prevState.userExercises.concat(addedExercise)
        //             }
        //         });
        //
        //
        //         console.log("IN FIRST LOOP");
        //         console.log(userExercisesRandomStanding);
        //
        //         console.log("userExercises");
        //
        //         console.log(userExercises);
        //         console.log(userExercises.length);
        //
        //         console.log("lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2");
        //         console.log((lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2);
        //
        //         console.log("elapsedTime - siddhasanaExercise.minutes");
        //         console.log(elapsedTime - siddhasanaExercise.minutes);
        //
        //         console.log("elapsedTime ");
        //         console.log(elapsedTime);
        //     }
        //
        //     userExercisesRandomOnFloor = allExercises.filter(exercise =>
        //         exercise.exerciseposition === 'On Floor' &&
        //         exercise.sanskritname !== 'Siddhasana'
        //         && exercise.sanskritname !== 'Savasana'
        //     );
        //
        //     console.log("before 2nd loop");
        //     console.log(userExercisesRandomOnFloor);
        //
        //
        //     while ((lengthPreference - siddhasanaExercise.minutes) > elapsedTime) {
        //         // let rand = getRandomInt(0, userExercisesRandomOnFloor.length - 1);
        //         // this.setState(prevState => {
        //         //     return {
        //         //         userExercises: prevState.userExercises.concat(userExercisesRandomOnFloor[rand])
        //         //     }
        //         // });
        //         // elapsedTime = elapsedTime + userExercisesRandomOnFloor[rand].minutes;
        //         // userExercisesRandomOnFloor.splice(rand, 1);
        //         // console.log("IN SECOND LOOP");
        //         // console.log(userExercisesRandomOnFloor);
        //         let addedExercise = userExercisesRandomOnFloor[Math.floor(Math.random() * userExercisesRandomOnFloor.length)];
        //         elapsedTime = elapsedTime + addedExercise.minutes;
        //         console.log("WHAT IS SUPPOSED TO BE DELETED");
        //         console.log(addedExercise);
        //
        //         const index = userExercisesRandomOnFloor.indexOf(addedExercise);
        //         if (index > -1) {
        //             userExercisesRandomOnFloor.splice(index, 1);
        //         }
        //
        //         this.setState(prevState => {
        //             return {
        //                 userExercises: prevState.userExercises.concat(addedExercise)
        //             }
        //         });
        //
        //
        //         console.log("IN FIRST LOOP");
        //         console.log(userExercisesRandomOnFloor);
        //
        //         console.log("userExercises");
        //
        //         console.log(userExercises);
        //         console.log(userExercises.length);
        //
        //         console.log("lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2");
        //         console.log((lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2);
        //
        //         console.log("elapsedTime - siddhasanaExercise.minutes");
        //         console.log(elapsedTime - siddhasanaExercise.minutes);
        //
        //         console.log("elapsedTime ");
        //         console.log(elapsedTime);
        //
        //
        //     }
        //
        //
        //     console.log("elapsedtime at end of whole thing");
        //     console.log(elapsedTime);
        //
        //
        //     // this.setState({userExercises: [...this.state.userExercises, savasanaExercise]});
        //
        //
        //     function getRandomInt(min, max) {
        //         min = Math.ceil(min);
        //         max = Math.floor(max);
        //         return Math.floor(Math.random() * (max - min)) + min;
        //     }
        //
        //
        //     //adding sarvangasana and savasana
        //     this.setState(prevState => {
        //         return {
        //             userExercises: prevState.userExercises.concat(sarvangasanaExercise).concat(savasanaExercise)
        //         }
        //     })
        // }

        function customFilter(exercisePosition) {
            let addedExercise;
            allExercisesDifficultyTypePropsFilterLocal = allExercisesDifficultyTypePropsFilter.filter(function (exercise) {
                return exercise.exerciseposition === exercisePosition;
            });
            allExercisesDifficultyTypeFilterLocal = allExercisesDifficultyTypeFilter.filter(function (exercise) {
                return exercise.exerciseposition === exercisePosition;
            });
            allExercisesDifficultyFilterLocal = allExercisesDifficultyFilter.filter(function (exercise) {
                return exercise.exerciseposition === exercisePosition;
            });
            allExercisesLocal = allExercises.filter(function (exercise) {
                return exercise.exerciseposition === exercisePosition;
            });

            console.log("allExercisesDifficultyTypePropsFilterLocal.length");
            console.log(allExercisesDifficultyTypePropsFilterLocal.length);
            console.log("allExercisesDifficultyTypeFilterLocal.length");
            console.log(allExercisesDifficultyTypeFilterLocal.length);
            console.log("allExercisesDifficultyFilterLocal.length ");
            console.log(allExercisesDifficultyFilterLocal.length);
            console.log("allExercisesLocal.length");
            console.log(allExercisesLocal.length);

            if (allExercisesDifficultyTypePropsFilterLocal.length !== 0) {
                addedExercise = allExercisesDifficultyTypePropsFilterLocal[Math.floor(Math.random() * allExercisesDifficultyTypePropsFilterLocal.length)];
                elapsedTime = elapsedTime + addedExercise.minutes;
                removeItem(allExercisesDifficultyTypePropsFilterLocal, addedExercise);
                let AllArrays = [allExercises, allExercisesDifficultyFilter, allExercisesDifficultyTypeFilter,
                    allExercisesDifficultyTypePropsFilter, allExercisesLocal, allExercisesDifficultyFilterLocal, allExercisesDifficultyTypeFilterLocal,
                    allExercisesDifficultyTypePropsFilterLocal];
                removeItemFromArrays(AllArrays, addedExercise);
            } else if (allExercisesDifficultyTypeFilterLocal.length !== 0) {
                addedExercise = allExercisesDifficultyTypeFilterLocal[Math.floor(Math.random() * allExercisesDifficultyTypeFilterLocal.length)];
                elapsedTime = elapsedTime + addedExercise.minutes;
                let AllArrays = [allExercises, allExercisesDifficultyFilter, allExercisesDifficultyTypeFilter, allExercisesLocal,
                    allExercisesDifficultyFilterLocal, allExercisesDifficultyTypeFilterLocal];
                removeItemFromArrays(AllArrays, addedExercise);
            } else if (allExercisesDifficultyFilterLocal.length !== 0) {
                addedExercise = allExercisesDifficultyFilterLocal[Math.floor(Math.random() * allExercisesDifficultyFilterLocal.length)];
                elapsedTime = elapsedTime + addedExercise.minutes;
                let AllArrays = [allExercises, allExercisesDifficultyFilter, allExercisesLocal,
                    allExercisesDifficultyFilterLocal];
                removeItemFromArrays(AllArrays, addedExercise);
            } else if (allExercisesLocal.length !== 0) {
                addedExercise = allExercisesLocal[Math.floor(Math.random() * allExercisesLocal.length)];
                elapsedTime = elapsedTime + addedExercise.minutes;
                let AllArrays = [allExercises, allExercisesLocal];
                removeItemFromArrays(AllArrays, addedExercise);
            } else {
                addedExercise = allExercises[Math.floor(Math.random() * allExercises.length)];
                elapsedTime = elapsedTime + addedExercise.minutes;
                removeItem(allExercises, addedExercise);
            }
            console.log("WHAT IS SUPPOSED TO BE DELETED");
            console.log(addedExercise);
            console.log("elapsedTime");
            console.log(elapsedTime);
            that.setState(prevState => {
                return {
                    userExercises: prevState.userExercises.concat(addedExercise)
                }
            });
        }

        function removeItem(array, item) {
            const index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        function removeItemFromArrays(arrays, item) {
            for (let i = 0; i < arrays.length; i++) {
                removeItem(arrays[i], item)
            }
        }

        function filterArrayToNewArray(filter, oldArray, newArray, databaseFilter) {
            if (filter === 'none') {
                newArray = oldArray;
            } else {
                newArray = oldArray.filter(function (exercise) {
                    return exercise.difficulty === filter;
                });
            }
        }


    }

// <ExerciseCardUI key={exercise.exerciseid}*/}
// sanskritname={exercise.sanskritname}*/}
// englishname={exercise.englishname}*/}
// exerciseposition={exercise.exerciseposition}*/}
// exercisetype={exercise.exercisetype}*/}
// difficulty={exercise.difficulty}*/}
// minutes={exercise.minutes}*/}
// exerciseprops={exercise.exerciseprops}*/}
// description={exercise.description}*/}
// url={exercise.url}/>)

    render() {
        let userExercises = this.state.userExercises;
        let exerciseCards = this.state.userExercises.map(exercise => {
            return (

                <div className="col-sm-4">
                    <ExerciseCard exercise={exercise}/>
                </div>
            )
        });


        return (
            <div className="AppMain">
                <div className="content-wrap">
                    <form className="yogaClass-form" onSubmit={this.handleSubmit}>
                        <br/>
                        <label>Props Preference </label>
                        <select value={this.state.propsPreference}
                                onChange={this.handleChange}
                                name="propsPreference">
                            <option value='none'>None</option>
                            <option value='props'>Props</option>
                            <option value='no props'>No Props</option>
                        </select>
                        <br/>
                        <br/>
                        <label>Type Preference </label>
                        <select value={this.state.typePreference}
                                onChange={this.handleChange}
                                name="typePreference">
                            <option value='none'>None</option>
                            <option value='Meditate'>Meditate</option>
                            <option value='Balance'>Balance</option>
                            <option value='Stretch'>Stretch</option>
                            <option value='Mix'>Mix</option>
                        </select>

                        <br/>
                        <br/>
                        <label>Difficulty Preference </label>
                        <select value={this.state.difficultyPreference}
                                onChange={this.handleChange}
                                name="difficultyPreference">
                            <option value='none'>None</option>
                            <option value='Beginner'>Beginner</option>
                            <option value='Intermediate'>Intermediate</option>
                            <option value='Advanced'>Advanced</option>
                        </select>

                        <br/>
                        <br/>
                        <label>Length Preference </label>
                        <select value={this.state.lengthPreference}
                                onChange={this.handleChange}
                                name="lengthPreference">
                            <option value='none'>None</option>
                            <option value='15'>15 Minutes</option>
                            <option value='30'>30 Minutes</option>
                            <option value='60'>1 Hour</option>
                            <option value='90'>1 Hour 30 Minutes</option>
                            defaultValue={"30 Minutes"}
                        </select>
                        <br/>
                        <br/>


                        <button>Create</button>
                        {/*<pre>{JSON.stringify(exercises)}</pre>*/}



                        <div className="container-fluid d-flex justify-content-center">
                            <div className="row">
                                {exerciseCards}
                            </div>
                        </div>
                        <br/>
                        <br/>


                    </form>
                </div>
            </div>
        );
    }

}


export default MainArea