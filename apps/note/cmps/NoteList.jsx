
import { NotePreview } from "NotePreview.jsx";


export function NoteList({ notes }) {
    if (!notes || !notes.length) return <div className="empty-note-list">Loading...</div>


    return (
        <section className="note-list">
            
        {notes.map(note => <NotePreview key={note.id} note={note} />)}
            
        </section>

    )


}
