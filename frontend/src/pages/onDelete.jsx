// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';

// const OnDelete = ({ podcastId }) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const history = useHistory();

//     const handleDelete = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             // Replace with your actual API endpoint
//             await axios.delete(`/api/delete-podcast/${podcastId}`);
//             // Redirect or show a success message
//             history.push('/'); // Redirect to the home page or another page
//         } catch (err) {
//             setError('Failed to delete the podcast. Please try again.');
//             console.error("Error deleting podcast:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="on-delete">
//             <h1>Delete Podcast</h1>
//             <p>Are you sure you want to delete this podcast?</p>
//             {error && <p className="error">{error}</p>}
//             <button onClick={handleDelete} disabled={loading}>
//                 {loading ? 'Deleting...' : 'Yes, Delete it!'}
//             </button>
//             <button onClick={() => history.goBack()}>Cancel</button>
//         </div>
//     );
// };

// export default OnDelete;



































import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const OnDelete = () => {
    const { id } = useParams(); // Get the podcast ID from the URL
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            await axios.delete(`http://localhost:1000/api/v1/delete-podcast/${id}`, { withCredentials: true });
            navigate('/all-podcasts'); // Redirect to the all podcasts page after deletion
        } catch (err) {
            setError('Failed to delete the podcast. Please try again.');
            console.error("Error deleting podcast:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="on-delete">
            <h1>Delete Podcast</h1>
            <p>Are you sure you want to delete this podcast?</p>
            {error && <p className="error">{error}</p>}
            <button onClick={handleDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Yes, Delete it!'}
            </button>
            <button onClick={() => navigate(-1)}>Cancel</button> {/* Use navigate(-1) to go back */}
        </div>
    );
};

export default OnDelete;