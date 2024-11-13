








//  import React from 'react';
// import { useSelector } from 'react-redux';
//  import { Link } from "react-router-dom";

// const PodcastCard = ({items}) => {
//     const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
//   return (
//     <div>
//         <Link to={`/description/${items._id}`} 
//         className='border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300'>
//         <div><img src={`http://localhost:1000/${items.frontImage}`} 
//         className="rounded size[42vh] object-cover"
//         />
//         </div>
//         <div className="mt-2 text-xl font-bold">
//             {items.title.slice(0,20) }
//             </div>
//             <div className='mt-2 leading-5 text-slate-500'>
//                 {items.description.slice(0,50) }
//                 </div>
//             <div className='mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center'>
//          {items.category.categoryName}
//       </div>

//       <div className='mt-2'>
//  <Link 
//  to={isLoggedIn ? "#" : "/signup"} 
//  className='bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300'>
//  Play Now
//  </Link>
//       </div>


//         </Link>
    
//     </div>
//   )
// }

// export default PodcastCard;













// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from "react-router-dom";

// const PodcastCard = ({ items, onDelete }) => {
//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//     const handleDelete = () => {
//         if (onDelete) {
//             onDelete(items._id); // Call the onDelete function passed as a prop
//         }
//     };

//     return (
//         <div>
//             <Link to={`/description/${items._id}`} 
//                 className='border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300'>
//                 <div>
//                     <img src={`http://localhost:1000/${items.frontImage}`} 
//                         className="rounded size[42vh] object-cover"
//                     />
//                 </div>
//                 <div className="mt-2 text-xl font-bold">
//                     {items.title.slice(0, 20)}
//                 </div>
//                 <div className='mt-2 leading-5 text-slate-500'>
//                     {items.description.slice(0, 50)}
//                 </div>
//                 <div className='mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center'>
//                     {items.category.categoryName}
//                 </div>
//                 <div className='mt-2'>
//                     <Link 
//                         to={isLoggedIn ? "#" : "/signup"} 
//                         className='bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300'>
//                         Play Now
//                     </Link>
//                 </div>
//             </Link>
//             {isLoggedIn && (
//                 <button 
//                     onClick={handleDelete} 
//                     className='mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-all duration-300'>
//                     Delete Podcast
//                 </button>
//             )}
//         </div>
//     );
// };

// export default PodcastCard;

















import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { playerActions } from '../../store/player';
const PodcastCard = ({ items, onDelete }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
const handlePlay = (e) =>{
    if(isLoggedIn) {
        e.preventDefault();
    dispatch(playerActions.setDiv());
    dispatch(playerActions.changeImage(`http://localhost:1000/${items.frontImage}`));
    dispatch(playerActions.changeSong(`http://localhost:1000/${items.audioFile}`));
    }
};
    const handleDelete = () => {
        if (onDelete) {
            onDelete(items._id); // Call the onDelete function passed as a prop
        }
    };

    // Check if items and its properties exist
    const hasCategory = items && items.category && items.category.categoryName;

    return (
        <div>
            <Link to={`/description/${items._id}`} 
                className='border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300'>
                <div>
                    <img src={`http://localhost:1000/${items.frontImage}`} 
                        className="rounded size[42vh] object-cover"
                    />
                </div>
                <div className="mt-2 text-xl font-bold">
                    {items.title.slice(0, 20)}
                </div>
                <div className='mt-2 leading-5 text-slate-500'>
                    {items.description.slice(0, 50)}
                </div>
                <div className='mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center'>
                    {hasCategory ? items.category.categoryName : 'No Category'}
                </div>
                <div className='mt-2'>
                    <Link 
                        to={isLoggedIn ? "#" : "/signup"} 
                        className='bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300'
                        onClick={handlePlay}>
                        Play Now
                    </Link>
                </div>
            </Link>
            {/* Render delete button only if onDelete prop is provided */}
            {onDelete && isLoggedIn && (
                <button 
                    onClick={handleDelete} 
                    className='mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-all duration-300'>
                    Delete Podcast
                </button>
            )}
        </div>
    );
};

export default PodcastCard;