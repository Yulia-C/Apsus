
import { CreateContainer } from "../cmps/CreateContainer.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { NotesFilter } from "../cmps/NotesFilter.jsx"
import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
const { useState, useEffect } = React;


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
            .catch(err => console.log('err:', err))
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function toggleSideBar() {
        document.querySelector('.note-index').classList.toggle('open')
        document.querySelector('.side-bar').classList.toggle('open-side-bar')

        document.querySelectorAll('.side-bar button span').forEach(element => {
            element.classList.toggle('opacity-1')
        })
    }

    function onRemoveNote(noteId) {
        noteService.get(noteId).then(note => {

            if (note.isTrash === true)
                noteService.remove(noteId).then(() => {
                    showSuccessMsg('Note deleted successfully')
                    setMails(notes => notes.filter(note => note.id !== noteId))
                })

        }).catch(err => showErrorMsg('Had a problem deleting note...'))

        noteService.getNoteToTrash(noteId)
            .then(note => noteService.save(note))
            .then(() => {
                showSuccessMsg('Note Sent to trash')
                setNotes(notes => notes.filter(note => note.id !== noteId))
            })
            .catch(err => showErrorMsg('Had a problem trashing note...'))
    }

    if (notes === null) return <h1 className="loading-notes">Loading...</h1>

    return (
        <section className="note-index" >
            <button title="Menu" className="fa burger-icon" onClick={toggleSideBar}></button>
            <NotesFilter defaultFilter={filterBy}
                onSetFilterBy={onSetFilterBy} />
            <CreateContainer loadNotes={loadNotes} />
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
            />
            <SideBar />

        </section >
    )
}
