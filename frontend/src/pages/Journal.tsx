import React, { useState, useEffect } from 'react';

interface IJournal {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

interface IUser {
    _id: string;
    username: string;
    journals: IJournal[];
}

const Journal = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [journals, setJournals] = useState<IJournal[]>([]);
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:5000/api/auth/user", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                console.log("Fetched user data:", data);
                if (data && data._id) {
                    setUser(data);
                    setJournals(data.journals || []);
                }
            })
            .catch(err => console.error("Error fetching user:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/journal/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ content }),
        });
        
        if (response.ok) {
            const newEntry = await response.json();
            setJournals([...journals, newEntry]);
            setContent("");
        } else {
            console.error("Failed to save journal entry");
        }
    };

    const handleDelete = async (journalId: string) => {
        
        const response = await fetch(`http://localhost:5000/api/journal/${journalId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (response.ok) {
            setJournals(prevJournals => prevJournals.filter(journal => journal._id !== journalId));
        } else {
            console.error("Failed to delete journal entry");
        }
    };

    return (
        <div>
            <h2>Your Journal</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write your thoughts here..."
                />
                <button type="submit">Save Entry</button>
            </form>

            <ul>
                {journals.map(entry => (
                    <li key={entry._id}>
                        <p>{entry.content}</p>
                        <small>{new Date(entry.createdAt).toLocaleString()}</small>
                        <button onClick={() => handleDelete(entry._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Journal;