
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
            <p>{note.info.txt}</p>

        </div>
    );
}

function NoteImg({ note }) {

    return (
        <div className="note-txt card" >
            <h3 className="img-title">{note.info.title}</h3>
            <img src={note.info.url} />
        </div>

    );
}

function NoteTodos({ note }) {
    return (
        <div className="note-todos card" >
            <h3>{note.info.title}</h3>
            <ul>
                {note.info.todos.map((todo, idx) => (
                    <li key={idx} className={todo.doneAt ? 'done' : ''}>
                        {todo.txt}
                    </li>
                ))}
            </ul>
        </div>
    );
}