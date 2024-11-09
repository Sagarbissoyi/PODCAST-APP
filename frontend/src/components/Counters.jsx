// // src/components/Counters.jsx
// import React from 'react';

// class Counter extends React.Component {
//     render() {
//         const { id, value, onDelete } = this.props;
//         return (
//             <div>
//                 <span>{value}</span>
//                 <button onClick={() => onDelete(id)}>Delete</button>
//             </div>
//         );
//     }
// }

// class Counters extends React.Component {
//     state = {
//         counters: [
//             { id: 1, value: 4 },
//             { id: 2, value: 0 },
//             { id: 3, value: 0 },
//             { id: 4, value: 0 },
//         ],
//     };

//     handleDelete = (counterId) => {
//         const counters = this.state.counters.filter(c => c.id !== counterId);
//         this.setState({ counters });
//     };

//     render() {
//         return (
//             <div>
//                 {this.state.counters.map(c => (
//                     <Counter key={c.id} id={c.id} value={c.value} onDelete={this.handleDelete} />
//                 ))}
//             </div>
//         );
//     }
// }

// export default Counters;