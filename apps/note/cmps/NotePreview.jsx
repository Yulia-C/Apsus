
import { CardBtnsBar } from 'CardBtnsBar.jsx';
const { Fragment } = React;

export function NotePreview({ note }) {

    console.log(note)


    return (
            <DynamicCard note={note} />
    )
}

function DynamicCard({ note }) {
    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxt note={note} />;
        case 'NoteImg':
            return <NoteImg note={note} />;
        case 'NoteTodos':
            return <NoteTodos note={note} />;
    }
}

function NoteTxt({ note }) {
    return (
        <div className="note-txt card" >
            <button>X</button>
            <p>{note.info.txt}</p>
            <CardBtnsBar />
        </div>
    );
}

function NoteImg({ note }) {

    return (
        <div className="note-txt card" >
            <button>X</button>
            <h3 className="img-title">{note.info.title}</h3>
            <img src={note.info.url} />
            <CardBtnsBar />
        </div>

    );
}

function NoteTodos({ note }) {
    return (
        <div className="note-todos card" >
            <button>X</button>
            <h3>{note.info.title}</h3>
            <ul>
                {note.info.todos.map((todo, idx) => (
                    <li key={idx} className={todo.doneAt ? 'done' : ''}>
                        {todo.txt}
                    </li>
                ))}
            </ul>
            <CardBtnsBar />
        </div>
    );
}