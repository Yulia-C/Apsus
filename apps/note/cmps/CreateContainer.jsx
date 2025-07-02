

export function CreateContainer() {
    return (
        <section className="create-container">
            <input type="text" name="input" placeholder="type..." />
            <div className="create-icons">
            <button className="fa msg-icon"  onClick={() => console.log('click')}></button>
            <button className="fa img-icon"></button>
            <button className="fa film-icon"></button>
            <button className="fa list-icon"></button>
            </div>

        </section>
    );
}