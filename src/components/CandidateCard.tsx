import React, { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { searchGithubUser } from '../api/API';

type Candidate = {
    name: string | null;
    login: string;
    location: string | null;
    avatar_url: string;
    email: string | null;
    html_url: string;
    company: string | null;
    bio?: string | null;
};

const CandidateCard: React.FC<Candidate> = ({ name, login, location, avatar_url, email, html_url, company, bio }) => {
    const defaultAvatar = './assets/images/placeholderimage.png'; 
    const avatarSrc = avatar_url || defaultAvatar; // Use default image if avatar_url is not available

    return (
        <div className="card">
            <img src={avatarSrc} alt={name || login} />
            <div className="card-body">
                <h2>{name || login}</h2>
                <p>Location: {location || 'Not specified'}</p>
                <p>Email: {email || 'Not available'}</p>
                <p>Company: {company || 'Not specified'}</p>
                <p>Bio: {bio || 'Not Specified'}</p>
                <a href={html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
            </div>
        </div>
    );
};

const CandidateSearch: React.FC = () => {
    const [currentCard, setCurrentCard] = useState<Candidate | null>(null);
    const [savedCards, setSavedCards] = useState<Candidate[]>([]);

    const fetchNewCard = async () => {
        try {
            const users = await searchGithub(); // Fetch random users
            if (users.length > 0) {
                const user = users[0]; // Get the first user
                const userData = await searchGithubUser(user.login); // Call searchGithubUser with the user's login

                const candidateData: Candidate = {
                    name: userData.name || null,
                    login: userData.login,
                    location: userData.location || null,
                    avatar_url: userData.avatar_url || null, // Allow null for avatar_url
                    email: userData.email || null, // This may still be null if not public
                    html_url: userData.html_url,
                    company: userData.company || null, // Get company directly from user data
                    bio: userData.bio || null, // Get bio directly from user data
                };

                setCurrentCard(candidateData);
            } else {
                console.error("No users found.");
            }
        } catch (error) {
            console.error("Error fetching new card:", error);
        }
    };

    const handleSaveCard = () => {
        if (currentCard) {
            const updatedSavedCards = [...savedCards, currentCard];
            setSavedCards(updatedSavedCards);
            localStorage.setItem('savedCards', JSON.stringify(updatedSavedCards));
            fetchNewCard(); // Fetch a new card after saving
        }
    };

    const handleRemoveCard = () => {
        fetchNewCard(); // Just fetch a new card without saving
    };

    useEffect(() => {
        const saved = localStorage.getItem('savedCards');
        if (saved) {
            setSavedCards(JSON.parse(saved));
        }
        fetchNewCard(); // Fetch the first card when the component mounts
    }, []);

    return (
        <div>
            <h1>Candidate Search</h1>
            {currentCard && <CandidateCard {...currentCard} />}
            <br />
            <div className="button-container">
                <button className="ButtonA" onClick={handleRemoveCard}>-</button>
                <button className="ButtonB" onClick={handleSaveCard}>+</button>
            </div>
        </div>
    );
};

export default CandidateSearch;