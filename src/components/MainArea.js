/**
 * Main Child component of App. Has ExerciseCard and MusicPlayer as its own Child components.
 */

import React, {Component} from "react"
import ExerciseCard from './ExerciseCard';
import MusicPlayer from "./MusicPlayer";

class MainArea extends Component {
    //The preferences are used to store the user choices. The Music one needs two in order to change only upon
    // submitting the form. Otherwise, it will be while switching options and before submitting.
    //The exercises array stores all exercises coming from the database. userExercises are the exercises filtered
    //through the business logic and displayed in the end via the ExerciseCard component
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
        //necessary binding for handleChange and handleSubmit
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //Special method used to load the data from the database onto the exercises array. Heroku link to other API app used here to connect.
    // The response comes as JSON.
    componentDidMount() {
        const that = this;
        fetch('https://iyengaryoga-api.herokuapp.com/api/exercises')
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        that.setState({
                            exercises: data
                        })
                    })
            })
    }

    //Special method used to change the state of the State preference attributes upon selecting different things from
    //the preference form. This is automatically and immediately done upon each new selection
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }


    // Special method used for handling submission which is done via the button.
    // Contains business logic - looks at preferences and based on the extracted excercises, does logic.
    handleSubmit(event) {
        event.preventDefault();
        this.setState({userExercises: []});
        const that = this;
        //loads locally the preferences. The other variables are used due to the fixed rules for yoga. Elapsed time
        //tracks how long the exercises are taking on the go and this is used for the business logic.
        let propsPreference = this.state.propsPreference;
        let typePreference = this.state.typePreference;
        let difficultyPreference = this.state.difficultyPreference;
        let lengthPreference;
        let siddhasanaExercise;
        let swastikasanaExercise;
        let tadasanaExercise;
        let dandasanaExercise;
        let firstExercise;
        let savasanaExercise;
        let sarvangasanaExercise;
        let elapsedTime = 0;

        //None should be 30
        if (this.state.lengthPreference === "none"){
            lengthPreference = 30;
        }
        else{
            lengthPreference = this.state.lengthPreference;
        }

// Upon each submit, the program gets all the exercises from the database allowing updates on the to be immediately reflected
        //(if they were to happen).
        let request = new Request('https://iyengaryoga-api.herokuapp.com/api/get-exercise', {
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

        //stores locally the exercises after the fetch
        let allExercises = this.state.exercises;

//finds the "fixed" exercises from the array
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
            if (allExercises[i].sanskritname === 'Dandasana') {
                dandasanaExercise = allExercises[i];
            }
            if (allExercises[i].sanskritname === 'Savasana') {
                savasanaExercise = allExercises[i];
            }
            if (allExercises[i].sanskritname === 'Sarvangasana') {
                sarvangasanaExercise = allExercises[i];
            }
        }

        //this decides the first exercise. 70% chance for swastikasanaExercise and 30% for siddhasanaExercise
        let randInteger = Math.floor(Math.random() * Math.floor(10));
        if (randInteger < 3) {
            firstExercise = siddhasanaExercise;
        } else {
            firstExercise = swastikasanaExercise;
        }
        //Note that elapsed time is tracked and the used exercises are added to the userExercises which will be the final list.
        //They are also removed from the array to avoid duplications.
        //This is done similarly for all other exercises to be used for the rest of the program.
        elapsedTime = elapsedTime + firstExercise.minutes + tadasanaExercise.minutes;
        this.setState(prevState => {
            return {
                userExercises: prevState.userExercises.concat(firstExercise).concat(tadasanaExercise)
            }
        });

        removeItem(allExercises, siddhasanaExercise);
        removeItem(allExercises, swastikasanaExercise);
        removeItem(allExercises, tadasanaExercise);
        removeItem(allExercises, dandasanaExercise);
        removeItem(allExercises, savasanaExercise);
        removeItem(allExercises, sarvangasanaExercise);

        //userExercises is then filtered by stages and each filtering makes a new array. This is used in order to
        //Show exercises with all filters if possible, and if not, remove filter by filter to show at least partially
        //filtered exercises. Preference is given to props given the low number of props exercises, then by type and
        //then by difficulty.

        //New array made which filters the remaining exercises by difficultyPreference (if any) and stored in the new
        //array allExercisesDifficultyFilter
        let allExercisesDifficultyFilter = allExercises;
        if (difficultyPreference !== 'none') {
            allExercisesDifficultyFilter = allExercises.filter(function (exercise) {
                return exercise.difficulty === difficultyPreference;
            });
        }

        //The filtered array by difficulty is then filtered by typePreference (if any) and stored in the new
        //array allExercisesDifficultyTypeFilter
        let allExercisesDifficultyTypeFilter = allExercisesDifficultyFilter;
        if (typePreference !== 'none') {
            allExercisesDifficultyTypeFilter = allExercisesDifficultyFilter.filter(function (exercise) {
                return exercise.exercisetype === typePreference;
            });
        }

        //The filtered array by difficulty and type is then filtered by propsPreference (if any) and stored in the new
        //array allExercisesDifficultyTypePropsFilter
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

//Separately, the exercises need to be split by "position" in order to make a balanced class. Each position type has
        //an equal proportion of time from the total time, the lengthPreference, minus all the exercises that are "fixed".
        //Or 1/6th of that. Local variables for the method customFilter of the arrays from before need to be created
        //which will be filtered again by position.
        let timeToSplit = lengthPreference - sarvangasanaExercise.minutes - savasanaExercise.minutes - firstExercise.minutes;
        let allExercisesDifficultyTypePropsFilterLocal;
        let allExercisesDifficultyTypeFilterLocal;
        let allExercisesDifficultyFilterLocal;
        let allExercisesLocal;

        while ((timeToSplit / 6) > (elapsedTime - firstExercise.minutes)) {
            customFilter('Standing Backwards Extension');
        }

        while (((timeToSplit / 6) * 2) > (elapsedTime - firstExercise.minutes)) {
            customFilter('Standing Forward Bend');
        }

        //Dandasana comes always first from seated poses
        elapsedTime = elapsedTime + dandasanaExercise.minutes;
        this.setState(prevState => {
            return {
                userExercises: prevState.userExercises.concat(dandasanaExercise)
            }
        });

        while (((timeToSplit / 6) * 3) > (elapsedTime - firstExercise.minutes)) {
            customFilter('Seated Twist');
        }

        while (((timeToSplit / 6) * 4) > (elapsedTime - firstExercise.minutes)) {
            customFilter('Seated Forward Bend');
        }

        while (((timeToSplit / 6) * 5) > (elapsedTime - firstExercise.minutes)) {
            customFilter('Seated Other');
        }

        while ((timeToSplit) > (elapsedTime - firstExercise.minutes)) {
            customFilter('Prone/Supine');
        }


        //Add the final two fixed exercises to the final array
        this.setState(prevState => {
            return {
                userExercises: prevState.userExercises.concat(sarvangasanaExercise).concat(savasanaExercise)
            }
        });

        //Also on submit, the music trigger wll be changed to whatever music type the user chose in order to display it
        if (this.state.musicPreference !== "Disabled") {
            this.setState(prevState => {
                    return {
                        musicPreferenceTrigger: this.state.musicPreference
                    }
                }
            );
        } else {
            this.setState({musicPreferenceTrigger: "Disabled"});
        }


        //Custom function used for the filtering on each of the 6 stages of the class by the passed position.
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

//Next, prioritize the most filtered array, if not empty choose a random index from it, add its time to elapsed time and
// remove it from all arrays to avoid duplicating it. If not, move to the next most filtered array and so on until reaching the initial array with no filtering.
            //The way the database is made right now, reaching the final array is impossible, but is good to have for potential future changes.
            if (allExercisesDifficultyTypePropsFilterLocal.length !== 0) {
                addedExercise = allExercisesDifficultyTypePropsFilterLocal[Math.floor(Math.random() * allExercisesDifficultyTypePropsFilterLocal.length)];
                elapsedTime = elapsedTime + addedExercise.minutes;
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

            //Finally, add the exercise itself to the final array.
            that.setState(prevState => {
                return {
                    userExercises: prevState.userExercises.concat(addedExercise)
                }
            });
        }

        //Helper function to remove an item from an array
        function removeItem(array, item) {
            const index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        //Helper function to remove an item from a list of arrays
        function removeItemFromArrays(arrays, item) {
            for (let i = 0; i < arrays.length; i++) {
                removeItem(arrays[i], item)
            }
        }
    }

// Note that with react, when the state changes, the render is invoked automatically. Visually, here, this happens only
    //with the handleSubmit because the userExercises are changed there as well as the musicPreferenceTrigger.
    // The rest of the state variables don't change anything visually upon being changed.
    render() {
        let exerciseCards = this.state.userExercises.map(exercise => {
            return (
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 justify-content-center">
                    <div className="test-card">
                        <ExerciseCard exercise={exercise} number={this.state.userExercises.indexOf(exercise)}
                                      key={exercise.exerciseid}/>
                    </div>
                </div>
            )

        });


        //The form has been purposefully not been made into a new component as it needs to store value and trigger the
        // onChange function within this Component (MainArea) and given that the form is relatively simple, it seems
        // like a better choice to keep it all together here instead of in new components.
        return (
            <div className="AppMain">
                <div className="container-fluid-form-and-music">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 align-items-center">
                            <div className="content-wrap">
                                <form className="yogaClass-form" onSubmit={this.handleSubmit}>

                                    <div className="dropdowns">
                                        <div className="form-title">
                                            Preferences
                                        </div>

                                        <table className="table-custom">
                                            <tbody>
                                            <tr className="tr-custom">
                                                <td className="table-first-column-text-form">
                                                    <label className="dropdown-label">Props Preference </label></td>
                                                <td className="table-second-column-text-form">
                                                    <select className="form-select"
                                                            value={this.state.propsPreference}
                                                            onChange={this.handleChange}
                                                            name="propsPreference">
                                                        <option className="dropdown-option" value='none'>None</option>
                                                        <option className="dropdown-option" value='props'>Props</option>
                                                        <option className="dropdown-option" value='no props'>No Props
                                                        </option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr className="tr-custom">
                                                <td className="table-first-column-text-form">
                                                    <label className="dropdown-label">Type Preference </label></td>
                                                <td className="table-second-column-text-form">
                                                    <select className="form-select"
                                                            value={this.state.typePreference}
                                                            onChange={this.handleChange}
                                                            name="typePreference">
                                                        <option className="dropdown-option" value='none'>None</option>
                                                        <option className="dropdown-option" value='Meditate'>Meditate
                                                        </option>
                                                        <option className="dropdown-option" value='Balance'>Balance
                                                        </option>
                                                        <option className="dropdown-option" value='Stretch'>Stretch
                                                        </option>
                                                        <option className="dropdown-option" value='Mix'>Mix</option>
                                                    </select></td>
                                            </tr>
                                            <tr className="tr-custom">
                                                <td className="table-first-column-text-form">
                                                    <label className="dropdown-label">Difficulty Preference </label>
                                                </td>
                                                <td className="table-second-column-text-form">
                                                    <select className="form-select"
                                                            value={this.state.difficultyPreference}
                                                            onChange={this.handleChange}
                                                            name="difficultyPreference">
                                                        <option className="dropdown-option" value='none'>None</option>
                                                        <option className="dropdown-option" value='Beginner'>Beginner
                                                        </option>
                                                        <option className="dropdown-option"
                                                                value='Intermediate'>Intermediate
                                                        </option>
                                                        <option className="dropdown-option" value='Advanced'>Advanced
                                                        </option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr className="tr-custom">
                                                <td className="table-first-column-text-form">
                                                    <label className="dropdown-label">Length Preference </label></td>
                                                <td className="table-second-column-text-form">
                                                    <select className="form-select"
                                                            value={this.state.lengthPreference}
                                                            onChange={this.handleChange}
                                                            name="lengthPreference">
                                                        <option className="dropdown-option" value='none'>None</option>
                                                        <option className="dropdown-option" value='15'>15 Minutes
                                                        </option>
                                                        <option className="dropdown-option" value='30'>30 Minutes
                                                        </option>
                                                        <option className="dropdown-option" value='60'>1 Hour</option>
                                                        <option className="dropdown-option" value='90'>1 Hour 30
                                                            Minutes
                                                        </option>
                                                        defaultValue={"30 Minutes"}
                                                    </select></td>
                                            </tr>
                                            <tr className="tr-custom">
                                                <td className="table-first-column-text-form">
                                                    <label className="dropdown-label">Music Preference </label></td>
                                                <td className="table-second-column-text-form">
                                                    <select className="form-select"
                                                            value={this.state.musicPreference}
                                                            onChange={this.handleChange}
                                                            name="musicPreference">
                                                        <option className="dropdown-option" value='Disabled'>Disabled
                                                        </option>
                                                        <option className="dropdown-option"
                                                                value='Classicalyogastyle'>Classical
                                                            Yoga Style
                                                        </option>
                                                        <option className="dropdown-option" value='Lofihiphop'>Lofi Hip
                                                            Hop
                                                        </option>
                                                        <option className="dropdown-option" value='Chill'>Chill</option>
                                                        <option className="dropdown-option" value='Nature'>Nature
                                                        </option>
                                                        defaultValue={"Disabled"}
                                                    </select></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="btn btn1">Generate Now</button>
                                </form>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 ">
                            <div className="music">
                                <MusicPlayer preference={this.state.musicPreferenceTrigger}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="container-fluid-cards align-items-center d-flex ">
                                <div className="row">
                                    {exerciseCards}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default MainArea