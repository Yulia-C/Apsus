

const { useState, Fragment, useEffect, useRef } = React;

const { useState } = React;

export function CreateContainer() {

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    useEffect(() => {

    }, [createMode]);

    function onHandleCreateMode(event) {
        const currMode = event.target.id;
        if (currMode === createMode) return;

        const activeElement = document.querySelector('.create-icons .active');
        if (activeElement) {
            activeElement.classList.remove('active');
        }

        event.target.classList.add('active');
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
        setNoteToEdit(prevNote => ({
            ...prevNote, type: createMode, info: {
                ...prevNote.info,
                [field]: value,
            }
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
                <button id="list" title="Todos note" className="fa list-icon" onClick={onHandleCreateMode}></button>
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
        case 'list':
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
            <input ref={inputRef1} type="txt" name="title" placeholder="Title..." onChange={handleChange} />
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
            <input ref={inputRef2} type="text" name="todos.txt" placeholder="Todos..." onChange={handleChange} />
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
