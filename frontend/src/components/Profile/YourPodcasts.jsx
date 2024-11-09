// import React,{useState,useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import  axios from 'axios';
// import PodcastCard from '../PodcastCard/PodcastCard';
//  const YourPodcasts = () => {
//   const [Podcasts, setPodcasts] = useState()
//   useEffect(() => {
//     const  fetch = async () => {
// const res = await axios.get("http://localhost:1000/api/v1/get-user-podcasts",
//   {withCredentials:true}
// );
// setPodcasts(res.data.data)
// };
// fetch();
//   }, []);
//   return (
//     <div className='px-4 lg:px-12 my-4'>
//         <div className='flex items-center justify-between gap-4'>
//             <h1 className='text-xl font-semibold md:font-bold'> Your Podcasts</h1>
//         <Link 
//         to="/add-podcast"
//          className='px-4 py-2 bg-zinc-800 text-white rounded font-semibold'>
//         Add Podcast
//         </Link>
//         </div>
//         <div className="w-full my-4  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
//       {Podcasts &&
//         Podcasts.map((items, i) => (
//           <div key={i}>
//             <PodcastCard items={items} />
//           </div>
//         ))}
//     </div>
//     </div>
//   )
// }

// export default YourPodcasts;








//////////////////////////////////////    TRAIL A NEW FEATURES ///////////////////////////







// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import PodcastCard from '../PodcastCard/PodcastCard';

// const YourPodcasts = () => {
//   const [Podcasts, setPodcasts] = useState([]);
//   const [loading, setLoading] = useState(true); // State to manage loading
//   const [error, setError] = useState(null); // State to manage errors

//   useEffect(() => {
//     const fetchPodcasts = async () => {
//       try {
//         const res = await axios.get("http://localhost:1000/api/v1/get-user-podcasts", {
//           withCredentials: true,
//         });
//         setPodcasts(res.data.data);
//       } catch (error) {
//         console.error("Error fetching podcasts:", error);
//         setError("Failed to fetch podcasts. Please try again later.");
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchPodcasts();
//   }, []);

//   if (loading) {
//     return <div>Loading your podcasts...</div>; // Loading state
//   }

//   if (error) {
//     return <div>{error}</div>; // Error state
//   }

//   return (
//     <div className='px-4 lg:px-12 my-4'>
//       <div className='flex items-center justify-between gap-4'>
//         <h1 className='text-xl font-semibold md:font-bold'>Your Podcasts</h1>
//         <Link 
//           to="/add-podcast"
//           className='px-4 py-2 bg-zinc-800 text-white rounded font-semibold'>
//           Add Podcast
//         </Link>
//       </div>
//       <div className="w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {Podcasts.length > 0 ? (
//           Podcasts.map((items) => (
//             <div key={items._id}>
//               <PodcastCard items={items} />
//             </div>
//           ))
//         ) : (
//           <div>No podcasts available.</div> // Message when there are no podcasts
//         )}
//       </div>
//     </div>
//   );
// }

// export default YourPodcasts;

















































// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import PodcastCard from '../PodcastCard/PodcastCard';

// const YourPodcasts = () => {
//   const [Podcasts, setPodcasts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPodcasts = async () => {
//       try {
//         const res = await axios.get("http://localhost:1000/api/v1/get-user-podcasts", {
//           withCredentials: true,
//         });
//         setPodcasts(res.data.data);
//       } catch (error) {
//         console.error("Error fetching podcasts:", error);
//         setError("Failed to fetch podcasts. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPodcasts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this podcast?")) {
//       try {
//         await axios.delete(`http://localhost:1000/api/v1/delete-podcast/${id}`, { withCredentials: true });
//         setPodcasts((prevPodcasts) => prevPodcasts.filter((podcast) => podcast._id !== id));
//       } catch (error) {
//         console.error("Error deleting podcast:", error);
//         alert("Failed to delete the podcast. Please try again.");
//       }
//     }
//   };

//   if (loading) {
//     return <div>Loading your podcasts...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className='px-4 lg:px-12 my-4'>
//       <div className='flex items-center justify-between gap-4'>
//         <h1 className='text-xl font-semibold md:font-bold'>Your Podcasts</h1>
//         <Link 
//           to="/add-podcast"
//           className='px-4 py-2 bg-zinc-800 text-white rounded font-semibold'>
//           Add Podcast
//         </Link>
//       </div>
//       <div className="w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {Podcasts.length > 0 ? (
//           Podcasts.map((items) => (
//             <div key={items._id}>
//               <PodcastCard items={items} onDelete={handleDelete} /> {/* Pass onDelete here */}
//             </div>
//           ))
//         ) : (
//           <div>No podcasts available.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default YourPodcasts;










































































import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PodcastCard from '../PodcastCard/PodcastCard';

const YourPodcasts = () => {
  const [Podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-user-podcasts", {
          withCredentials: true,
        });
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        setError("Failed to fetch podcasts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this podcast?")) {
      try {
        await axios.delete(`http://localhost:1000/api/v1/delete-podcast/${id}`, { withCredentials: true });
        setPodcasts((prevPodcasts) => prevPodcasts.filter((podcast) => podcast._id !== id));
      } catch (error) {
        console.error("Error deleting podcast:", error);
        alert("Failed to delete the podcast. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading your podcasts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='px-4 lg:px-12 my-4'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-xl font-semibold md:font-bold'>Your Podcasts</h1>
        <Link 
          to="/add-podcast"
          className='px-4 py-2 bg-zinc-800 text-white rounded font-semibold'>
          Add Podcast
        </Link>
      </div>
      <div className="w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Podcasts.length > 0 ? (
          Podcasts.map((items) => (
            <div key={items._id}>
              <PodcastCard items={items} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          <div>No podcasts available.</div>
        )}
      </div>
    </div>
  );
}

export default YourPodcasts;