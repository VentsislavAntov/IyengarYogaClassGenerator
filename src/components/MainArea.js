import React, {Component} from "react"
import ExerciseCardUI from "./ExerciseCard";
import ExerciseCard from './ExerciseCard';
import Select from 'react-select'
import ReactPlayer from 'react-player/youtube'
import MusicPlayer from "./MusicPlayer";

class MainArea extends Component {
    constructor() {
        super();
        this.state = {
            propsPreference: 'none',
            typePreference: 'none',
            difficultyPreference: 'none',
            lengthPreference: '30',
            musicPreference: 'Disabled',
            musicPreferenceTrigger: 'Disabled',
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
        let musicPreference = this.state.musicPreference;
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
        if (randInteger < 3) {
            firstExercise = siddhasanaExercise;
        } else {
            firstExercise = swastikasanaExercise;
        }
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

        let allExercisesDifficultyTypeFilter = allExercisesDifficultyFilter;
        if (typePreference !== 'none') {
            allExercisesDifficultyTypeFilter = allExercisesDifficultyFilter.filter(function (exercise) {
                return exercise.exercisetype === typePreference;
            });
        }


        let allExercisesDifficultyTypePropsFilter = allExercisesDifficultyTypeFilter;
        if (propsPreference === 'none') {
            allExercisesDifficultyTypePropsFilter = allExercisesDifficultyTypeFilter;
        } else if (propsPreference === 'no props') {
            allExercisesDifficultyTypePropsFilter = allExercisesDifficultyTypeFilter.filter(function (exercise) {
                return exercise.exerciseprops === 'None';
            });
        } else if (propsPreference === 'props') {
            allExercisesDifficultyTypePropsFilter = allExercisesDifficultyTypeFilter.filter(function (exercise) {
                return exercise.exerciseprops !== 'None';
            });
        }


        let timeToSplit = lengthPreference - sarvangasanaExercise.minutes - savasanaExercise.minutes - firstExercise.minutes - tadasanaExercise.minutes;
        let allExercisesDifficultyTypePropsFilterLocal;
        let allExercisesDifficultyTypeFilterLocal;
        let allExercisesDifficultyFilterLocal;
        let allExercisesLocal;

        while ((timeToSplit / 6) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Standing Backwards Extension');
        }

        while (((timeToSplit / 6) * 2) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Standing Forward Bend');
        }

        while (((timeToSplit / 6) * 3) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Seated Twist');
        }

        while (((timeToSplit / 6) * 4) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Seated Forward Bend');
        }

        while (((timeToSplit / 6) * 5) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Seated Other');
        }

        while ((timeToSplit) > (elapsedTime - firstExercise.minutes - tadasanaExercise.minutes)) {
            customFilter('Prone/Supine');
        }


        this.setState(prevState => {
            return {
                userExercises: prevState.userExercises.concat(sarvangasanaExercise).concat(savasanaExercise)
            }
        });

        if (this.state.musicPreference !== "Disabled") {
            this.setState(prevState => {
                    return {
                        musicPreferenceTrigger: this.state.musicPreference
                    }
                }
            )
        }


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


    render() {
        let userExercises = this.state.userExercises;
        let exerciseCards = this.state.userExercises.map(exercise=> {
            return (
                <div className="col-sm-4" key={exercise.exerciseid}>
                    <ExerciseCard exercise={exercise} number={this.state.userExercises.indexOf(exercise)} key={exercise.exerciseid}/>
                </div>
            )
        });


        return (
            <div className="AppMain">
                <div className="content-wrap">
                    <form className="yogaClass-form" onSubmit={this.handleSubmit}>
                        <br/>
                        <div className="dropdowns">
                            <label className="dropdown-label">Props Preference </label>
                            <select className="form-select"
                                    value={this.state.propsPreference}
                                    onChange={this.handleChange}
                                    name="propsPreference">
                                <option className="dropdown-option" value='none'>None</option>
                                <option className="dropdown-option" value='props'>Props</option>
                                <option className="dropdown-option" value='no props'>No Props</option>
                            </select>
                            <br/>
                            <br/>
                            <label className="dropdown-label">Type Preference </label>
                            <select className="form-select"
                                    value={this.state.typePreference}
                                    onChange={this.handleChange}
                                    name="typePreference">
                                <option className="dropdown-option" value='none'>None</option>
                                <option className="dropdown-option" value='Meditate'>Meditate</option>
                                <option className="dropdown-option" value='Balance'>Balance</option>
                                <option className="dropdown-option" value='Stretch'>Stretch</option>
                                <option className="dropdown-option" value='Mix'>Mix</option>
                            </select>

                            <br/>
                            <br/>
                            <label className="dropdown-label">Difficulty Preference </label>
                            <select className="form-select"
                                    value={this.state.difficultyPreference}
                                    onChange={this.handleChange}
                                    name="difficultyPreference">
                                <option className="dropdown-option" value='none'>None</option>
                                <option className="dropdown-option" value='Beginner'>Beginner</option>
                                <option className="dropdown-option" value='Intermediate'>Intermediate</option>
                                <option className="dropdown-option" value='Advanced'>Advanced</option>
                            </select>
                            <br/>
                            <br/>
                            <label className="dropdown-label">Length Preference </label>
                            <select className="form-select"
                                    value={this.state.lengthPreference}
                                    onChange={this.handleChange}
                                    name="lengthPreference">
                                <option className="dropdown-option" value='none'>None</option>
                                <option className="dropdown-option" value='15'>15 Minutes</option>
                                <option className="dropdown-option" value='30'>30 Minutes</option>
                                <option className="dropdown-option" value='60'>1 Hour</option>
                                <option className="dropdown-option" value='90'>1 Hour 30 Minutes</option>
                                defaultValue={"30 Minutes"}
                            </select>
                            <br/>
                            <br/>
                            <label className="dropdown-label">Music Preference </label>
                            <select className="form-select"
                                    value={this.state.musicPreference}
                                    onChange={this.handleChange}
                                    name="musicPreference">
                                <option className="dropdown-option" value='Disabled'>Disabled</option>
                                <option className="dropdown-option" value='Classicalyogastyle'>Classical Yoga Style</option>
                                <option className="dropdown-option" value='Lofihiphop'>Lofi Hip Hop</option>
                                <option className="dropdown-option" value='Chill'>Chill</option>
                                <option className="dropdown-option" value='Nature'>Nature</option>
                                defaultValue={"Disabled"}
                            </select>
                            <br/>
                            <br/>
                        </div>

                        <button className="btn btn1">Generate Now</button>
                        {/*<pre>{JSON.stringify(exercises)}</pre>*/}


                        <div className="container-fluid d-flex justify-content-center">
                            <div className="row">
                                {exerciseCards}
                            </div>
                        </div>

                        <div className="music">
                            <MusicPlayer preference={this.state.musicPreference}/>
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