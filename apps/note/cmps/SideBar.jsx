

export function SideBar({ onHandleCreateMode }) {
    return (
        <section className="side-bar">
            <button id="txt" title="Note" className="fa bulb-icon" onClick={onHandleCreateMode}>
                <span>Note</span>
            </button>
            <button id="img" title="Edit" className="fa edit-icon" onClick={onHandleCreateMode}>
                <span>Edit</span>
            </button>
            <button id="film" title="Trash" className="fa delete-icon" onClick={onHandleCreateMode}>
                <span>Trash</span>
            </button>
        </section>
    );
}