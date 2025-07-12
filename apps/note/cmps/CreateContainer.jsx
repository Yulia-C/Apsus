
import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, Fragment, useEffect, useRef } = React;

export function CreateContainer({ loadNotes }) {

    const [createMode, setCreateMode] = useState('NoteTxt');
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote(createMode));

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    useEffect(() => {

    }, [createMode]);

    function onHandleCreateMode(event) {
        const currMode = event.target.id;
        // console.log(currMode);

        if (currMode === createMode) return;

        const activeElement = document.querySelector('.create-icons .active');
        if (activeElement) {
            activeElement.classList.remove('active');
        }

        event.target.classList.add('active');
        setCreateMode(currMode)
        setNoteToEdit(noteService.getEmptyNote(currMode));
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                loadNotes()
                showSuccessMsg('Note saved successfully')
            })
            .catch(err => {
                console.log(err);
                showErrorMsg('Cannot save note!')
            })
            .finally(() => {

                inputRef1.current.value = '';
                inputRef2.current.value = '';
            })


    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        if (field === 'list') {
            const todos = value.split(',').map(txt => ({ txt: txt.trim(), doneAt: null }));
            setNoteToEdit(prevNote => ({
                ...prevNote,
                info: {
                    ...prevNote.info,
                    todos
                }
            }))
            console.log('yes');
            
            return;
        }


        setNoteToEdit(prevNote => ({
            ...prevNote,
             type: createMode,
              info: {
                ...prevNote.info,
                [field]: value,
            },
            todos: {...prevNote.todos, txt: value, doneAt: null }
        }))
        console.log('noteToEdit:', noteToEdit);

    }


    return (
        <section className="create-container">
            <form action="submit" className="create-form" onSubmit={onSaveNote}>
                <DynamicCreateInput
                    createMode={createMode}
                    handleChange={handleChange}
                    inputRef1={inputRef1}
                    inputRef2={inputRef2}
                />
                <button type="submit" style={{ display: 'none' }}></button>
            </form>

            <div className="create-icons">
                <button id="NoteTxt" title="Text note" className="fa txt-icon active" onClick={onHandleCreateMode}></button>
                <button id="NoteImg" title="Image note" className="fa img-icon" onClick={onHandleCreateMode}></button>
                <button id="NoteVideo" title="Video note" className="fa film-icon" onClick={onHandleCreateMode}></button>
                <button id="NoteTodos" title="Todos note" className="fa list-icon" onClick={onHandleCreateMode}></button>
            </div>

        </section>
    );

}

function DynamicCreateInput({ createMode, handleChange, inputRef1, inputRef2 }) {
    switch (createMode) {
        case 'NoteTxt':
            return <TxtInput
                handleChange={handleChange}
                inputRef1={inputRef1}
                inputRef2={inputRef2}
            />;
        case 'NoteImg':
            return <ImgInput
                handleChange={handleChange}
                inputRef1={inputRef1}
                inputRef2={inputRef2}
            />;
        case 'NoteTodos':
            return <TodosInput
                handleChange={handleChange}
                inputRef1={inputRef1}
                inputRef2={inputRef2}
            />;
        case 'NoteVideo':
            return <VideoInput
                handleChange={handleChange}
                inputRef1={inputRef1}
                inputRef2={inputRef2}
            />;
    }
}

function TxtInput({ handleChange, inputRef1, inputRef2 }) {

    return (
        <Fragment>
            <input ref={inputRef1} type="text" name="title" placeholder="Title..." onChange={handleChange} />
            <input ref={inputRef2} type="text" name="txt" placeholder="Note..." onChange={handleChange} />
        </Fragment>
    )
}
function ImgInput({ handleChange, inputRef1, inputRef2 }) {
    return (
        <Fragment>
            <input ref={inputRef1} type="text" name="title" placeholder="Title..." onChange={handleChange} />
            <input ref={inputRef2} type="text" name="url" placeholder="Image URL..." onChange={handleChange} />
        </Fragment>
    );
}
function TodosInput({ handleChange, inputRef1, inputRef2 }) {
    return (
        <Fragment>
            <input ref={inputRef1} type="text" name="title" placeholder="Title..." onChange={handleChange} />
            <input ref={inputRef2} type="text" name="list" placeholder="Todos..." onChange={handleChange} />
        </Fragment>
    );
}
function VideoInput({ handleChange, inputRef1, inputRef2 }) {
    return (
        <Fragment>
            <input ref={inputRef1} type="text" name="title" placeholder="Title..." onChange={handleChange} />
            <input ref={inputRef2} type="text" name="url" placeholder="Video URL..." onChange={handleChange} />
        </Fragment>
    );
}
