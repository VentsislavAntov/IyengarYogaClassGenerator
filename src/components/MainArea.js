import React, {Component} from "react"

class MainArea extends Component {
    constructor() {
        super();
        this.state = {
            typePreference: "None",
            difficultyPreference: "None",
            lengthPreference: "None",
            excercises: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    //business logic - look at preferences and based on extracted excercises, do logic
    handleSubmit(event) {
    }

    //Needs API LINK
    componentDidMount() {
        console.log('Component successfully mounted')
        fetch("APILINK")
            .then(response => response.json())
            .then(response => {
                const {fetchedExcercises} = response.data
                this.setState({excercises: fetchedExcercises})
            })
    }

    addExercise(event){
       event.preventDefault();
       let data = {
            // sanskrit_name: this.refs.sanskrit_name.value,
            // english_name: this.refs.english_name.value,
            // exercise_type: this.refs.exercise_type.value,
            // difficulty: this.refs.difficulty.value,
            // exercise_length: this.refs.exercise_length.value,
            // url: this.refs.url.value,
            // description: this.refs.description.value,
        };
       var request = new Request("http://localhost:3000/api/new-exercise", {
           method: "POST",
           header: new Headers({"Content-Type":"application/json"}),
           body:JSON.stringify(data)
       });

       fetch(request)
           .then(function(response){
               response.json()
                   .then(function(data){
                       console.log(data)
                   })
           })
    }

    render() {
        return (
            <div>
                <form className="yogaClass-form" onSubmit={this.handleSubmit}>
                    <br/>
                    <label>Type Preference </label>
                    <select value={this.state.typePreference}>
                        onChange={this.handleChange}
                        name = typePreference
                        >
                        <option value="none">None</option>
                        <option value="standing">Standing</option>
                        <option value="seated">Seated</option>
                        <option value="stretching">Stretching</option>
                    </select>

                    <br/>
                    <label>Difficulty Preference </label>
                    <select value={this.state.difficultyPreference}>
                        onChange={this.handleChange}
                        name = difficultyPreference
                        >
                        <option value="none">None</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <br/>
                    <label>Length Preference </label>
                    <select value={this.state.lengthPreference}>
                        onChange={this.handleChange}
                        name = lengthPreference
                        >
                        <option value="none">None</option>
                        <option value="15-minutes">15 Minutes</option>
                        <option value="30-minutes">30 Minutes</option>
                        <option value="1-hour">1 Hour</option>
                        <option value="1-hour-30-minutes">1 Hour 30 Minutes</option>
                        <option value="2-hours">2 Hours</option>
                    </select>
                    <br/>

                    <button>Create</button>
                    <div className="excercises">
                    </div>
                </form>
                <form ref="exerciseAddForm">
                    <br/>
                    <br/>
                    <input type ="text" ref="sanskrit_name" placeholder="Sanskrit Name"/>
                    <br/>
                    <input type ="text" ref="english_name" placeholder= "English Name"/>
                    <br/>
                    <input type ="text" ref="exercise_type" placeholder= "Exercise Type"/>
                    <br/>
                    <input type ="text" ref="difficulty" placeholder= "Difficulty"/>
                    <br/>
                    <input type ="text" ref="exercise_length" placeholder= "Exercise Length"/>
                    <br/>
                    <input type ="text" ref="url" placeholder= "Picture URL"/>
                    <br/>
                    <input type ="text" ref="description" placeholder= "Description"/>
                    <br/>
                    <button onClick={this.addExercise.bind(this)}>Add Exercise</button>
                </form>
            </div>
        );
    }
}


export default MainArea