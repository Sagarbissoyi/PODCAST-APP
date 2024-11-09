// import React, { useEffect } from "react";
// import axios from "axios";
// import { useState } from "react";
// import PodcastCard from "../components/PodcastCard/PodcastCard";

// const AllPodcasts = () => {
//   const [Podcasts, setPodcasts] = useState();
//   useEffect(() => {
//     const fetch = async () => {
//       const res = await axios.get("http://localhost:1000/api/v1/get-podcasts");
//       setPodcasts(res.data.data);
//     };
//     fetch();
//   }, []);

//   return (
//     <div>
//     <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
//       {Podcasts &&
//         Podcasts.map((items, i) => (
//           <div key={i}>
//             <PodcastCard items={items} />
//           </div>
//         ))}
//     </div>
//     </div>
//   );
// };

// export default AllPodcasts;













// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PodcastCard from "../components/PodcastCard/PodcastCard";

// const AllPodcasts = () => {
//   const [Podcasts, setPodcasts] = useState([]);

//   useEffect(() => {
//     const fetchPodcasts = async () => {
//       try {
//         const res = await axios.get("http://localhost:1000/api/v1/get-podcasts");
//         setPodcasts(res.data.data);
//       } catch (error) {
//         console.error("Failed to fetch podcasts:", error);
//       }
//     };
//     fetchPodcasts();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:1000/api/v1/delete-podcast/${id}`, { withCredentials: true });
//       // Remove the deleted podcast from the state
//       setPodcasts((prevPodcasts) => prevPodcasts.filter((podcast) => podcast.id !== id));
//     } catch (error) {
//       console.error("Failed to delete podcast:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {Podcasts.length > 0 ? (
//           Podcasts.map((podcast) => (
//             <div key={podcast.id}>
//               <PodcastCard items={podcast} onDelete={handleDelete} /> {/* Pass onDelete function */}
//             </div>
//           ))
//         ) : (
//           <p>No podcasts available.</p> // Message when there are no podcasts
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllPodcasts;









































































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PodcastCard from "../components/PodcastCard/PodcastCard";

// const AllPodcasts = () => {
//   const [Podcasts, setPodcasts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPodcasts = async () => {
//       try {
//         const res = await axios.get("http://localhost:1000/api/v1/get-podcasts");
//         setPodcasts(res.data.data);
//       } catch (error) {
//         console.error("Failed to fetch podcasts:", error);
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
//         // Remove the deleted podcast from the state
//         setPodcasts((prevPodcasts) => prevPodcasts.filter((podcast) => podcast._id !== id));
//       } catch (error) {
//         console.error("Failed to delete podcast:", error);
//         alert("Failed to delete the podcast. Please try again.");
//       }
//     }
//   };

//   if (loading) {
//     return <div>Loading podcasts...</div>; // Loading message
//   }

//   if (error) {
//     return <div>{error}</div>; // Display error message
//   }

//   return (
//     <div className="w-full px-4 lg:px-12 py-4">
//       <h1 className="text-2xl font-bold mb-4">All Podcasts</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {Podcasts.length > 0 ? (
//           Podcasts.map((podcast) => (
//             <div key={podcast._id}>
//               <PodcastCard items={podcast} onDelete={handleDelete} /> {/* Pass onDelete function */}
//             </div>
//           ))
//         ) : (
//           <p>No podcasts available.</p> // Message when there are no podcasts
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllPodcasts;




































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PodcastCard from "../components/PodcastCard/PodcastCard";

// const AllPodcasts = () => {
//   const [Podcasts, setPodcasts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPodcasts = async () => {
//       try {
//         const res = await axios.get("http://localhost:1000/api/v1/get-podcasts");
//         setPodcasts(res.data.data);
//       } catch (error) {
//         console.error("Failed to fetch podcasts:", error);
//         setError("Failed to fetch podcasts. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPodcasts();
//   }, []);

//   if (loading) {
//     return <div>Loading podcasts...</div>; // Loading message
//   }

//   if (error) {
//     return <div>{error}</div>; // Display error message
//   }

//   return (
//     <div className="w-full px-4 lg:px-12 py-4">
//       <h1 className="text-2xl font-bold mb-4">All Podcasts</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {Podcasts.length > 0 ? (
//           Podcasts.map((podcast) => (
//             <div key={podcast._id}>
//               <PodcastCard items={podcast} /> {/* Removed onDelete prop */}
//             </div>
//           ))
//         ) : (
//           <p>No podcasts available.</p> // Message when there are no podcasts
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllPodcasts;






































import React, { useEffect, useState } from "react";
import axios from "axios";
import PodcastCard from "../components/PodcastCard/PodcastCard";

const AllPodcasts = () => {
  const [Podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-podcasts");
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Failed to fetch podcasts:", error);
        setError("Failed to fetch podcasts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  if (loading) {
    return <div>Loading podcasts...</div>; // Loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className="w-full px-4 lg:px-12 py-4">
      <h1 className="text-2xl font-bold mb-4">All Podcasts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Podcasts.length > 0 ? (
          Podcasts.map((podcast) => (
            <div key={podcast._id}>
              <PodcastCard items={podcast} /> {/* No delete functionality */}
            </div>
          ))
        ) : (
          <p>No podcasts available.</p> // Message when there are no podcasts
        )}
      </div>
    </div>
  );
};

export default AllPodcasts;