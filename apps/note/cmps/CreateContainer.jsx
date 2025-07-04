

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
        console.log(createMode);
             
    }



    return (
        <section className="create-container">
            <input type="text" name="input" placeholder="Note..." />

            <div className="create-icons">
            <button id="txt" className="fa txt-icon active" onClick={onHandleCreateMode}></button>
            <button id="img" className="fa img-icon" onClick={onHandleCreateMode}></button>
            <button id="film" className="fa film-icon" onClick={onHandleCreateMode}></button>
            <button id="list" className="fa list-icon" onClick={onHandleCreateMode}></button>
            </div>

        </section>
    );
}