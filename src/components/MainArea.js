import React, {Component} from "react"

class MainArea extends Component {
    constructor() {
        super();
        this.state = {
            positionPreference: 'none',
            typePreference: 'none',
            difficultyPreference: 'none',
            lengthPreference: '30',
            exercises: {},
            userExercises: {}
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })

    }


    // business logic - look at preferences and based on extracted excercises, do logic
    handleSubmit(event) {
        let allExercises = this.state.exercises;
        const that = this;

        console.log("start of handlesubmit")
        let typePreference = this.state.typePreference
        let difficultyPreference = this.state.difficultyPreference
        if (this.state.typePreference === 'none'){
            typePreference = '%'
        }
        if (this.state.difficultyPreference === 'none'){
            difficultyPreference = '%'
        }
        let exercise_data ={j : 'posttest'} ;
        let request = new Request('http://localhost:3001/api/get-exercise', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(exercise_data)
        });
        let exercises = that.state.exercises;
        // exercises.push(exercise_data);
        that.setState({
            userExercises:exercises
        })

        fetch(request)
            .then(function(response){
                response.json()
                    .then(function(data){
                        console.log(data)
                    })
                console.log(" after data")
            })
            .catch(function(err){
                console.log(err)
            })
    }


    //Needs API LINK
    componentDidMount() {
        console.log('MOUNTED');
        const that = this;
        fetch('http://localhost:3001/api/exercises')
            .then(function(response){
                response.json()
                    .then(function(data){
                        that.setState({
                            exercises : data
                        })
                    })
            })
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
                        defaultValue={ "30 Minutes" }
                    </select>
                    <br/>
                    <br/>

                    <button>Create</button>
                    {console.log("before JSON STRINGIFY")}
                    <pre>{JSON.stringify(exercises[0])}</pre>
                    {console.log(JSON.stringify(this.state.exercises))}

                    {/*    <div className="exercises">*/}
                {/*</div>*/}
                </form>

            </div>
        );
    }
}




export default MainArea