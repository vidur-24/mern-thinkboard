import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import RateLimitedUI from '../components/RateLimitedUI.jsx';
// import axios from "axios"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard.jsx"
import api from '../lib/axios.js';
import NotesNotFound from "../components/NotesNotFound.jsx"

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { // for rate limit ui
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes")

                // const res = await axios.get("http://localhost:5000/api/notes")

                // const res = await fetch("http://localhost:5000/api/notes")
                // const data = await res.json();
                console.log(res.data);

                setNotes(res.data);
                setIsRateLimited(false);
            } catch(e) {
                console.log("Error fetching notes.", e);
                
                if(e.response?.status == 429){
                    setIsRateLimited(true);
                }
                else{
                    toast.error("Failed to load notes.")
                }
            }
            finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, []);

    return (
        <div className='min-h-screen'>
            <Navbar />
            {isRateLimited && <RateLimitedUI />}

            {notes.length === 0 && !isRateLimited && <NotesNotFound />}

            <div className='max-w-7xl mx-auto p-4 mt-4'>
                {loading && <div className='text-center text-primary py-10'>Loading Notes...</div> }

                {notes.length > 0 && !isRateLimited && (
                    // <div> {note.title} | {note.content} </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map((note) => (
                            <NoteCard  key={note._id} note={note} setNotes={setNotes}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage;