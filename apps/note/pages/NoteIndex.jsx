
import { CreateContainer } from "../cmps/CreateContainer.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
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


    return (
        <section className="note-index">

            <CreateContainer />
            <NoteList notes={notes} />



        </section>
    )
}
