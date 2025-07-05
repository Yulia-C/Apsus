
import { NotePreview } from "NotePreview.jsx";


export function NoteList({ notes }) {
    if (!notes || !notes.length) return <h1 className="loading-notes">Loading...</h1>


    return (
        <section className="note-list">
            
        {notes.map(note => <NotePreview key={note.id} note={note} />)}
            
        </section>

    )


}
