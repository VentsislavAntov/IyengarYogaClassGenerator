const {Client} = require('pg')
const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'exercises',
    max: 15
})

function GetExercise(props) {
    client.connect()
        .then(() => console.log("Connected successfully"))
        .then(() => client.query("SELECT * from exercise WHERE englishname LIKE $1 AND sanskritname LIKE $2", props))
        .then(results => console.table(results.rows))
        .catch(e => console.log(e))
        .finally(() => client.end())
}

export default GetExercise
