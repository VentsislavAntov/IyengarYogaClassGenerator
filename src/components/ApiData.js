// import {useState, useEffect} from 'react';
// import MainArea from "./MainArea";
//
// function ApiData() {
//     const [exercises, setExercises] = useState(null);
//     useEffect(() => {
//         getExercises('%','%');
//     }, []);
//     function getExercises() {
//         fetch('http://localhost:3001')
//             .then(response => {
//                 return response.text();
//             })
//             .then(data => {
//                 setExercises(data);
//
//             });
//     }
//     return exercises ? exercises : 'There is no data available';
// }
//
// export default ApiData