


const { useState } = React;

export function CreateContainer() {

    const [createMode, setCreateMode] = useState('txt');

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


    return (
        <section className="create-container">
            <DynamicCreateInput createMode={createMode} />

            <div className="create-icons">
                <button id="NoteTxt" title="Text note" className="fa txt-icon active" onClick={onHandleCreateMode}></button>
                <button id="NoteImg" title="Image note" className="fa img-icon" onClick={onHandleCreateMode}></button>
                <button id="NoteVideo" title="Video note" className="fa film-icon" onClick={onHandleCreateMode}></button>
                <button id="list" title="Todos note" className="fa list-icon" onClick={onHandleCreateMode}></button>
            </div>

        </section>
    );

}

function DynamicCreateInput({ createMode }) {
    switch (createMode) {
        case 'txt':
            return <TxtInput createMode={createMode} />;
        case 'img':
            return <ImgInput createMode={createMode} />;
        case 'list':
            return <TodosInput createMode={createMode} />;
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
        </form>
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
