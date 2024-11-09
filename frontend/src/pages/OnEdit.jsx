import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const OnEdit = () => {
    const { id } = useParams(); // Get the podcast ID from the URL
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [podcast, setPodcast] = useState({ title: '', description: '', image: null });
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        const fetchPodcast = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/podcast/${id}`, { withCredentials: true });
                setPodcast(response.data);
                setImagePreview(response.data.image); // Assuming your API returns the image URL
            } catch (err) {
                setError('Failed to fetch podcast details. Please try again.');
                console.error("Error fetching podcast:", err);
            }
        };

        fetchPodcast();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPodcast((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPodcast((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('title', podcast.title);
        formData.append('description', podcast.description);
        if (podcast.image) {
            formData.append('image', podcast.image); // Append the image file if it exists
        }

        try {
            await axios.put(`http://localhost:1000/api/v1/edit-podcast/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            navigate('/all-podcasts'); // Redirect to the all podcasts page after editing
        } catch (err) {
            setError('Failed to edit the podcast. Please try again.');
            console.error("Error editing podcast:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="on-edit">
            <h1>Edit Podcast</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleEdit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={podcast.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={podcast.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />}
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button> {/* Use navigate(-1) to go back */}
            </form>
        </div>
    );
};

export default OnEdit;