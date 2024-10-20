import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Candidate from '../interfaces/Candidate.interface';

const PotentialCandidates: React.FC = () => {
    const location = useLocation();
    const [savedCards, setSavedCards] = useState<Candidate[]>([]);

    useEffect(() => {
        // Check local storage for saved candidates
        const saved = localStorage.getItem('savedCards');
        if (saved) {
            setSavedCards(JSON.parse(saved));
        }

        // If there are saved cards passed from the location state, merge them
        if (location.state?.savedCards) {
            setSavedCards((prevCards) => [
                ...prevCards,
                ...location.state.savedCards,
            ]);
        }
    }, [location.state]);

    // Handler to delete a candidate
    const handleDeleteCandidate = (index: number) => {
        const updatedSavedCards = savedCards.filter((_, i) => i !== index);
        setSavedCards(updatedSavedCards); // Update state
        localStorage.setItem('savedCards', JSON.stringify(updatedSavedCards)); // Update local storage
    };
    console.log(savedCards);
    return (
        <div>
            <h1>Potential Candidates</h1>
            {savedCards.length === 0 ? (
                <p>No candidates saved.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Bio</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedCards.map((candidate: Candidate, index: number) => (
                            <tr key={index}>
                                <td>
                                    <img 
                                        src={candidate.avatar_url} 
                                        alt={`${candidate.name}'s avatar`} 
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                                    />
                                </td>
                                <td>{candidate.login}</td>
                                <td>{candidate.location}</td>
                                <td>{candidate.email}</td>
                                <td>{candidate.company}</td>
                                <td>{candidate.bio}</td>
                                <td>
                                    <button 
                                        className="circle-button" 
                                        onClick={() => handleDeleteCandidate(index)} // Call delete handler with the index
                                    >
                                        -
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PotentialCandidates;