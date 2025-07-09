


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
        setCreateMode(currMode);


    }


    return (
        <section className="create-container">
            <DynamicCreateInput createMode={createMode} />

            <div className="create-icons">
                <button id="txt" title="Text note" className="fa txt-icon active" onClick={onHandleCreateMode}></button>
                <button id="img" title="Image note" className="fa img-icon" onClick={onHandleCreateMode}></button>
                <button id="film" title="Video note" className="fa film-icon" onClick={onHandleCreateMode}></button>
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
        case 'film':
            return <VideoInput createMode={createMode} />;
    }
}

function TxtInput({ createMode }) {
    return (
        <form action="submit" className="create-form">
            <input type="text" name="title-input" placeholder="Title..." />
            <input type="text" name="content-input" placeholder="Note..." onClick={console.log(createMode)} />
        </form>
    );
}
function ImgInput({ createMode }) {
    return (
        <form action="submit" className="create-form">
            <input type="text" name="title-input" placeholder="Title..." />
            <input type="text" name="title-input" placeholder="Image URL..." />
        </form>
    );
}
function TodosInput({ createMode }) {
    return (
        <form action="submit" className="create-form">
            <input type="text" name="title-input" placeholder="Title..." />
            <input type="text" name="content-input" placeholder="Todos..." onClick={console.log(createMode)} />
        </form>
    );
}
function VideoInput({ createMode }) {
    return (
        <form action="submit" className="create-form">
            <input type="text" name="title-input" placeholder="Title..." />
            <input type="text" name="title-input" placeholder="Video URL..." />
        </form>
    );
}
