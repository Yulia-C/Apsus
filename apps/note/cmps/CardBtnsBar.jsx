

export function CardBtnsBar({ noteId, onRemoveNote }) {


    return (

        <div className="card-btns-container">
            <button id={noteId} className="btn btn-edit fa edit-icon" title="Edit"></button>
            <button id={noteId} className="btn btn-pin fa pin-icon" title="Pin"></button>
            <button id={noteId} className="btn btn-share fa palette-icon" title="Share"></button>
            <button id={noteId} className="btn btn-delete fa delete-icon" title="Delete" onClick={(ev) => onRemoveNote(ev.target.id)}></button>
        </div>
    )
}