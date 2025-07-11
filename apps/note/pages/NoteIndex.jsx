
import { CreateContainer } from "../cmps/CreateContainer.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { noteService } from "../services/note.service.js";
const { useState, useEffect } = React;


export function NoteIndex() {

    const [notes, setNotes] = useState()
    // const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(err => console.log('err:', err))
    }

    function toggleSideBar() {
        document.querySelector('.note-index').classList.toggle('open')
        document.querySelector('.side-bar').classList.toggle('open-side-bar')

        document.querySelectorAll('.side-bar button span').forEach(element => {
            element.classList.toggle('opacity-1')
        })
    }


    return (
        <section className="note-index">
            <button title="Menu" className="fa burger-icon" onClick={toggleSideBar}></button>
            <input className="search-input" placeholder="Search" type="text" />

            <CreateContainer />
            <NoteList notes={notes} />
            <SideBar />



        </section>
    )
}
