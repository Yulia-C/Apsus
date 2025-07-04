
import { notes } from "../services/note.service.js";
import { NotePreview } from "NotePreview.jsx";


export function NoteList() {


    return (
        <section className="note-list">
            
        {notes.map(note => <NotePreview key={note.id} note={note} />)}
            
        </section>

    )


}
