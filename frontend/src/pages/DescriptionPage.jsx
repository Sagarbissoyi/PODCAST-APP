import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const DescriptionPage = () => {
  const {id} = useParams();

  const [Podcasts, setPodcasts] = useState();
  useEffect(() => {
    const  fetch = async () => {
const res = await axios.get(
  `http://localhost:1000/api/v1/get-podcast/${id}`,
  {withCredentials:true}
);
setPodcasts(res.data.data)
};
fetch();
  }, []);

  return (
    <div className='px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start justify-between gap-4'>
      {Podcasts && (
        <>
        <div className='w-2/6 flex items-center justify-center md:justify-start md:items-start '>
      <img src={`http://localhost:1000/${Podcasts.frontImage}`}
       alt='/' 
      className='rounded w-full h-[50vh] object-cover'
      />
      </div>
      <div className='w-4/6'>
        <div className='text-4xl font-semibold'>
{Podcasts.title}
        </div>
        <h4 className='mt-4 '> {Podcasts.description}</h4>
        <div className='mt-2 w-fit bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center'>
         {Podcasts.category.categoryName}
      </div>
        </div> 
      </>
      )}
    </div>
  )
}

export default DescriptionPage;




































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const DescriptionPage = () => {
//   const { id } = useParams();
//   const [Podcasts, setPodcasts] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await axios.get(`http://localhost:1000/api/v1/get-podcast/${id}`, { withCredentials: true });
//         console.log(res.data); // Log the entire response
//         if (res.data.data) {
//           setPodcasts(res.data.data);
//         } else {
//           setError("Podcast not found.");
//         }
//       } catch (error) {
//         console.error("Error fetching podcast:", error);
//         setError("Failed to fetch podcast data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, [id]);

//   // Handle loading state
//   if (loading) {
//     return <div>Loading...</div>; // Show loading indicator
//   }

//   // Handle error state
//   if (error) {
//     return <div>{error}</div>; // Show error message
//   }

//   // Render podcast data
//   return (
//     <div className='px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start justify-between gap-4'>
//       {Podcasts ? (
//         <div className='w-2/6 flex items-center justify-center md:justify-start md:items-start'>
//           <img src={`http://localhost:1000/${Podcasts.frontImage}`} alt='Podcast Cover' />
//         </div>
//       ) : (
//         <div>No podcast data available.</div>
//       )}
//     </div>
//   );
// };

// export default DescriptionPage;