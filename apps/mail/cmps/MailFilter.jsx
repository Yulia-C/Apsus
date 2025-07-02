
export function MailFilter() {
    // const [filterByToEdit, setFilterByToEdit] = useState()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {

            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="mail-filter">
            <div className="flex row align-center" >
                <i className="icon outlined menu"></i>
                <img className="mail-logo" src="assets/img/gmail.svg" title="mail" />
                <div onChange={handleChange} className="search-bar">
                    <form>
                        <i className="icon outlined search"></i>
                        <input id='txt' name='txt' type='text' placeholder="Search mail" />
                    </form>
                </div>
            </div>
        </section>
    )
}