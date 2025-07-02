

const { useState } = React;

export function CreateContainer() {

    const [inputValue, setInputValue] = useState('hello');

    function onHandleState(event) {
        console.log(event.target.id);
        event.target.classList.remove
        
    }



    return (
        <section className="create-container">
            <input type="text" name="input" placeholder="Note..." />
            <div className="create-icons">
            <button id="txt" className="fa msg-icon" onClick={onHandleState}></button>
            <button id="img" className="fa img-icon" onClick={onHandleState}></button>
            <button id="film" className="fa film-icon" onClick={onHandleState}></button>
            <button id="list" className="fa list-icon" onClick={onHandleState}></button>
            </div>

        </section>
    );
}