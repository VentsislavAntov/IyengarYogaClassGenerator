import React, {Component} from "react"

class MainArea extends Component {
    constructor() {
        super();
        this.state = {
            propsPreference: 'none',
            typePreference: 'none',
            difficultyPreference: 'none',
            lengthPreference: '30',
            exercises: [],
            // userExercises: [{"exerciseid":1,"sanskritname":"Siddhasana ","englishname":"Auspicious Pose","exerciseposition":"On Floor","exercisetype":"Meditate","difficulty":"Beginner","minutes":6,"url":"https://media.giphy.com/media/H3Buk8Po6el46FwnSJ/giphy.gif","exerciseprops":null,"description":"Sitting cross-legged on the floor, place the left toe on the right knee fold. Put your right foot on the left knee fold. Svastikasana is calm sitting with upright (upper) body. Stretch the legs forward. Bend the left leg in the way that you place the foot near the right thigh muscle. Bend, as it were, the right leg and press it into the space between the left thigh and calf muscles. So you will now find the two feet placed between thighs and calves of the legs."}]
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
        this.setState({
            propsPreference: 'none',
            typePreference: 'none',
            difficultyPreference: 'none',
            lengthPreference: '30',
        });


        let allExercises = this.state.exercises;
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

        // fetch(request)
        //     .then(function (response) {
        //         response.json()
        //             .then(function (data) {
        //                 console.log(data)
        //             })
        //     })
        //     .catch(function (err) {
        //         console.log(err)
        //     });


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


        let timeBeforeSarvangasana = lengthPreference - sarvangasanaExercise.minutes - savasanaExercise.minutes;

        while ((((timeBeforeSarvangasana - firstExercise) / 6) * 1) > (elapsedTime - firstExercise)) {

        }
        while ((((timeBeforeSarvangasana - firstExercise) / 6) * 2) > (elapsedTime - firstExercise)) {

        }
        while ((((timeBeforeSarvangasana - firstExercise) / 6) * 3) > (elapsedTime - firstExercise)) {

        }
        while ((((timeBeforeSarvangasana - firstExercise) / 6) * 4) > (elapsedTime - firstExercise)) {

        }
        while ((((timeBeforeSarvangasana - firstExercise) / 6) * 5) > (elapsedTime - firstExercise)) {

        }
        while ((((timeBeforeSarvangasana - firstExercise) / 6) * 6) > (elapsedTime - firstExercise)) {

        }


        if (propsPreference === 'none') {
            let userExercisesRandomStanding;
            let userExercisesRandomOnFloor;
            console.log("in IF");
            userExercisesRandomStanding = allExercises.filter(function (exercise) {
                return exercise.exerciseposition === 'Standing';
            });

            console.log("after first filter");
            console.log(userExercisesRandomStanding);
            console.log(userExercisesRandomStanding.length - 1);

            while (((lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2) > (elapsedTime - siddhasanaExercise.minutes)) {
                let addedExercise = userExercisesRandomStanding[Math.floor(Math.random() * userExercisesRandomStanding.length)];
                elapsedTime = elapsedTime + addedExercise.minutes;
                console.log("WHAT IS SUPPOSED TO BE DELETED");
                console.log(addedExercise);

                const index = userExercisesRandomStanding.indexOf(addedExercise);
                if (index > -1) {
                    userExercisesRandomStanding.splice(index, 1);
                }

                this.setState(prevState => {
                    return {
                        userExercises: prevState.userExercises.concat(addedExercise)
                    }
                });


                console.log("IN FIRST LOOP");
                console.log(userExercisesRandomStanding);

                console.log("userExercises");

                console.log(userExercises);
                console.log(userExercises.length);

                console.log("lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2");
                console.log((lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2);

                console.log("elapsedTime - siddhasanaExercise.minutes");
                console.log(elapsedTime - siddhasanaExercise.minutes);

                console.log("elapsedTime ");
                console.log(elapsedTime);
            }

            userExercisesRandomOnFloor = allExercises.filter(exercise =>
                exercise.exerciseposition === 'On Floor' &&
                exercise.sanskritname !== 'Siddhasana'
                && exercise.sanskritname !== 'Savasana'
            );

            console.log("before 2nd loop");
            console.log(userExercisesRandomOnFloor);


            while ((lengthPreference - siddhasanaExercise.minutes) > elapsedTime) {
                // let rand = getRandomInt(0, userExercisesRandomOnFloor.length - 1);
                // this.setState(prevState => {
                //     return {
                //         userExercises: prevState.userExercises.concat(userExercisesRandomOnFloor[rand])
                //     }
                // });
                // elapsedTime = elapsedTime + userExercisesRandomOnFloor[rand].minutes;
                // userExercisesRandomOnFloor.splice(rand, 1);
                // console.log("IN SECOND LOOP");
                // console.log(userExercisesRandomOnFloor);
                let addedExercise = userExercisesRandomOnFloor[Math.floor(Math.random() * userExercisesRandomOnFloor.length)];
                elapsedTime = elapsedTime + addedExercise.minutes;
                console.log("WHAT IS SUPPOSED TO BE DELETED");
                console.log(addedExercise);

                const index = userExercisesRandomOnFloor.indexOf(addedExercise);
                if (index > -1) {
                    userExercisesRandomOnFloor.splice(index, 1);
                }

                this.setState(prevState => {
                    return {
                        userExercises: prevState.userExercises.concat(addedExercise)
                    }
                });


                console.log("IN FIRST LOOP");
                console.log(userExercisesRandomOnFloor);

                console.log("userExercises");

                console.log(userExercises);
                console.log(userExercises.length);

                console.log("lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2");
                console.log((lengthPreference - siddhasanaExercise.minutes - savasanaExercise.minutes) / 2);

                console.log("elapsedTime - siddhasanaExercise.minutes");
                console.log(elapsedTime - siddhasanaExercise.minutes);

                console.log("elapsedTime ");
                console.log(elapsedTime);


            }


            console.log("elapsedtime at end of whole thing");
            console.log(elapsedTime);


            // this.setState({userExercises: [...this.state.userExercises, savasanaExercise]});


            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            }


            //adding sarvangasana and savasana
            this.setState(prevState => {
                return {
                    userExercises: prevState.userExercises.concat(sarvangasanaExercise).concat(savasanaExercise)
                }
            })
        }

        function removeItem(array, item) {
            const index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }

            // this.setState({userExercises:userExercisesLocal});

        }
    }

    render() {
        let userExercises = this.state.userExercises;
        let exercises = this.state.exercises;
        return (
            <div className="AppMain">
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
                        <option value='meditate'>Meditate</option>
                        <option value='balance'>Balance</option>
                        <option value='stretch'>Stretch</option>
                        <option value='mix'>Mix</option>
                    </select>

                    <br/>
                    <br/>
                    <label>Difficulty Preference </label>
                    <select value={this.state.difficultyPreference}
                            onChange={this.handleChange}
                            name="difficultyPreference">
                        <option value='none'>None</option>
                        <option value='beginner'>Beginner</option>
                        <option value='intermediate'>Intermediate</option>
                        <option value='hard'>Hard</option>
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

                    <ul>
                        {userExercises.map(exercise => <li key={exercise.exerciseid}>{exercise.sanskritname} </li>)}
                    </ul>
                    <br/>
                    <br/>

                    {/*<ul>*/}
                    {/*    {exercises.map(exercise => <li key={exercise.exerciseid}>{exercise.sanskritname} </li>)}*/}
                    {/*</ul>*/}

                    {/*    <div className="exercises">*/}
                    {/*</div>*/}
                </form>

            </div>
        );
    }

}


export default MainArea