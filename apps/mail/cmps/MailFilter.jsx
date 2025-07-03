import { mailService } from "../services/mail.service.js"
const { useEffect, useState } = React

export function MailFilter({ defaultFilter, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })
    const { txt } = filterByToEdit

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

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
        <section className="mail-search">
            <div className="flex row align-center" >
                <i className="icon outlined menu"></i>
                <img className="mail-logo" src="assets/img/gmail.svg" title="mail" />
                <div onChange={handleChange} className="search-bar">
                    <form>
                        <i className="icon outlined search"></i>
                        <input onChange={handleChange} value={txt} id='txt' name='txt' type='text' placeholder="Search mail" />
                    </form>
                </div>
            </div>
        </section>
    )
}