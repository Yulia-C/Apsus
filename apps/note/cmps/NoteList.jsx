
import { NotePreview } from "NotePreview.jsx";


export function NoteList({ notes, onRemoveNote }) {


    if (!notes || !notes.length) return <h1 className="loading-notes">Loading...</h1>


    return (
        <section className="note-list">

            {notes.map(note => {
                return <NotePreview
                    key={note.id}
                    note={note}
                    onRemoveNote={onRemoveNote}
                />
            })}

        </section>

    )


}
