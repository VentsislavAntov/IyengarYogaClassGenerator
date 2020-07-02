import React, {Component} from "react"
import GetExercise from 'pg-api/server.js'

class MainArea extends Component {
    constructor() {
        super();
        this.state = {
            typePreference: 'none',
            difficultyPreference: 'none',
            lengthPreference: 'none',
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

    // business logic - look at preferences and based on extracted excercises, do logic
    handleSubmit(event) {
        let type = this.state.typePreference
        let difficulty = this.state.difficultyPreference
        if (this.state.typePreference === 'none'){
             type = '%'
        }
        if (this.state.difficultyPreference === 'none'){
            difficulty = '%'
        }
        let queryProps = [type, difficulty]
        GetExercise(queryProps)
    }

    //Needs API LINK
    componentDidMount() {
    }

    render() {
        return (
            <div className="AppMain">
                <form className="yogaClass-form" onSubmit={this.handleSubmit}>
                    <br/>
                    <label>Type Preference </label>
                    <select value={this.state.typePreference}
                        onChange={this.handleChange}
                        name="typePreference">
                        <option value='none'>None</option>
                        <option value='standing'>Standing</option>
                        <option value='seated'>Seated</option>
                        <option value='stretching'>Stretching</option>
                    </select>

                    <br/>
                    <label>Difficulty Preference </label>
                    <select value={this.state.difficultyPreference}
                        onChange={this.handleChange}
                        name="difficultyPreference">
                        <option value='none'>None</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>

                    <br/>
                    <label>Length Preference </label>
                    <select value={this.state.lengthPreference}
                        onChange={this.handleChange}
                        name="lengthPreference">
                        <option value='none'>None</option>
                        <option value='15-minutes'>15 Minutes</option>
                        <option value='30-minutes'>30 Minutes</option>
                        <option value='1-hour'>1 Hour</option>
                        <option value='1-hour-30-minutes'>1 Hour 30 Minutes</option>
                        <option value='2-hours'>2 Hours</option>
                    </select>
                    <br/>

                    <button>Create</button>
                    <div className="excercises">
                    </div>
                </form>

            </div>
        );
    }
}


export default MainArea