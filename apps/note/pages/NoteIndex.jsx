
import { CreateContainer } from "../cmps/CreateContainer.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
const { useState, useEffect } = React;


export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    // const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


    useEffect(() => {
        loadNotes()
        
    }, [setNotes])

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

    function onRemoveNote(noteId) {
        console.log('noteId:', noteId);
        

        noteService.remove(noteId)
            .then(() => {
                showSuccessMsg('Note removed successfully')
                setNotes(notes => notes.filter(note => note.id !== noteId))
            })
            // .catch(err => showErrorMsg('problem'))
            .catch(console.log)
    }


    return (
        <section className="note-index" >
            <button title="Menu" className="fa burger-icon" onClick={toggleSideBar}></button>
            <input className="search-input" placeholder="Search" type="text" />

            <CreateContainer loadNotes={loadNotes}/>
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}

            />
            <SideBar />



        </section>
    )
}
