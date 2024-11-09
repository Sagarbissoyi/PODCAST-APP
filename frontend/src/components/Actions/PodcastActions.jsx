import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeletePodcast } from '../../pages/DeletePodcast'; // Assume this is your action to delete a podcast

const DeletePodcastForm = () => {
    const [podcastId, setPodcastId] = useState('');
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        if (podcastId) {
            dispatch(deletePodcast(podcastId)); // Dispatch the delete action
            setPodcastId(''); // Clear the input field after deletion
        }
    };

    return (
        <form onSubmit={handleDelete}>
            <h2>Delete Podcast</h2>
            <input
                type="text"
                placeholder="Enter Podcast ID"
                value={podcastId}
                onChange={(e) => setPodcastId(e.target.value)}
                required
            />
            <button onClick={() => onDelete(counter)}>Delete</button>
        </form>
    );
};

export default DeletePodcastForm;