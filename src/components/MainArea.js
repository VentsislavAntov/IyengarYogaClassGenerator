import React, {Component} from "react"

class MainArea extends Component {
    constructor() {
        super();
        this.state = {
            positionPreference: 'none',
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
        this.setState({userExercises: []});
        // this.setState ({
        //     positionPreference: 'none',
        //     typePreference: 'none',
        //     difficultyPreference: 'none',
        //     lengthPreference: '30',
        //     exercises: [],
        //     userExercises: []
        // })


        event.preventDefault();

        let allExercises = this.state.exercises;
        let userExercises;
        const that = this;

        let positionPreference = this.state.positionPreference;
        let typePreference = this.state.typePreference;
        let difficultyPreference = this.state.difficultyPreference;
        let lengthPreference = this.state.lengthPreference;
        let siddhasana;
        let savasana;
        let elapsedTime = 0;


        let request = new Request('http://localhost:3001/api/get-exercise', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
        });

        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        console.log(data)
                    })
            })
            .catch(function (err) {
                console.log(err)
            });


        // let siddhasana = allExercises.filter(function(exercise) {
        //     return exercise.sanskritname  === 'Siddhasana ';
        // });


        for (let i = 0; i < allExercises.length; i++) {
            if (allExercises[i].sanskritname === 'Siddhasana ') {
                siddhasana = allExercises[i];
            }
        }
        elapsedTime = elapsedTime + siddhasana.minutes;
        this.setState({userExercises: [...this.state.userExercises, siddhasana]});


        for (let i = 0; i < allExercises.length; i++) {
            if (allExercises[i].sanskritname === 'Savasana') {
                savasana = allExercises[i];
            }
        }
        elapsedTime = elapsedTime + savasana.minutes;

        if (positionPreference === 'none') {
            let userExercisesRandomSitting;
            let userExercisesRandomStanding;
            console.log("in IF");
            userExercisesRandomSitting = allExercises.filter(function (exercise) {
                return exercise.exerciseposition === 'On Floor';
            });

            console.log("after first filter");
            console.log(userExercisesRandomSitting);

            while (((lengthPreference - siddhasana.minutes - savasana.minutes) / 2) > (elapsedTime - siddhasana.minutes)) {
                console.log("in first while");
                let rand = getRandomInt(0, userExercisesRandomSitting.length - 1);
                console.log("rand");
                console.log(rand);
                this.setState({userExercises: [...this.state.userExercises, userExercisesRandomSitting[rand]]});
                elapsedTime = elapsedTime + userExercisesRandomSitting[rand].minutes;
                console.log("elapsedtime first loop");
                console.log(elapsedTime);
            }
            userExercisesRandomStanding = allExercises.filter(function (exercise) {
                return exercise.exerciseposition === 'Standing';
            });

            while ((lengthPreference - siddhasana.minutes) > elapsedTime) {
                let rand = getRandomInt(0, userExercisesRandomStanding.length - 1);
                this.setState({userExercises: [...this.state.userExercises, userExercisesRandomStanding[rand]]});
                elapsedTime = elapsedTime + userExercisesRandomStanding[rand].minutes;
                console.log("elapsedtime first loop");
                console.log(elapsedTime);
            }


            console.log("elapsedtime at end of whole thing");
            console.log(elapsedTime);


            this.setState({userExercises: [...this.state.userExercises, savasana]});


            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
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
                    <label>Position Preference </label>
                    <select value={this.state.positionPreference}
                            onChange={this.handleChange}
                            name="positionPreference">
                        <option value='none'>None</option>
                        <option value='onFloor'>On Floor</option>
                        <option value='standing'>Standing</option>
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