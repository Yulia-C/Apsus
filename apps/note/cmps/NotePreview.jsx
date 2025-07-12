
import { CardBtnsBar } from 'CardBtnsBar.jsx';
const { Fragment } = React;

export function NotePreview({ note, onRemoveNote }) {

    return (
        <DynamicCard
            note={note}
            onRemoveNote={onRemoveNote}
        />
    )
}

function DynamicCard({ note, onRemoveNote }) {
    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxt note={note} onRemoveNote={onRemoveNote} />;
        case 'NoteImg':
            return <NoteImg note={note} onRemoveNote={onRemoveNote} />;
        case 'NoteTodos':
            return <NoteTodos note={note} onRemoveNote={onRemoveNote} />;
        case 'NoteVideo':
            return <NoteVideo note={note} onRemoveNote={onRemoveNote} />;
    }
}

function NoteTxt({ note, onRemoveNote }) {
    return (
        <div className="note-txt card" >
            <h3>{note.info.title}</h3>
            <p>{note.info.txt}</p>
            <CardBtnsBar
                noteId={note.id}
                onRemoveNote={onRemoveNote}
            />
        </div>
    );
}

function NoteImg({ note, onRemoveNote }) {

    return (
        <div className="note-img card" >
            <h3 className="img-title">{note.info.title}</h3>
            <img src={note.info.url} />
            <CardBtnsBar
                noteId={note.id}
                onRemoveNote={onRemoveNote}
            />
        </div>

    );
}

function NoteVideo({ note, onRemoveNote }) {

    function getFormattedUrl(url) {
        const newVideoUrl = url.replace('watch?v=', 'embed/');
        return newVideoUrl;
    }

    return (
        <div className="note-film card" >
            <h3 className="film-title">{note.info.title}</h3>
            <iframe className="video-frame" src={getFormattedUrl(note.info.url)} width="300" height="200"></iframe>
            <CardBtnsBar
                noteId={note.id}
                onRemoveNote={onRemoveNote}
            />
        </div>

    );
}

function NoteTodos({ note, onRemoveNote }) {

    const todos = note.info.todos

    function toggleTodoDone(ev,todo) {
        ev.target.classList.toggle('done')
        todo.doneAt = Date.now()
    }


    return (
        <div className="note-todos card" >
            <h3 className="todos-title">{note.info.title}</h3>

            <ul>
                {note.info.todos.map((todo,idx) => {
                    return (
                        <li key={idx} className="todo" onClick={() => toggleTodoDone(event,todo)}>{todo.txt}</li>
                    )
                })}
            </ul>
            <CardBtnsBar
                noteId={note.id}
                onRemoveNote={onRemoveNote}
            />
        </div>
    )
}