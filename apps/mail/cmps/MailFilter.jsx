import { mailService } from "../services/mail.service.js"
const { useEffect, useState } = React

export function MailFilter({ defaultFilter, onSetFilterBy, onToggleMenu }) {

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
        <section className="mail-search m-header">
            <i onClick={onToggleMenu} className="toggle-menu icon outlined menu"></i>
            <img className="mail-logo" src="assets/img/gmail.svg" title="mail" />

            <form onChange={handleChange} className="search-bar">
                <i className="icon outlined search"></i>
                <input onChange={handleChange} value={txt} id='txt' name='txt' type='text' placeholder="Search mail" />
            </form>

        </section>

    )
}

export function MailSort({ defaultFilter, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })
    const { sentAt, isRead, isStarred } = filterByToEdit

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

        if ( field === 'isStarred') {
            if (value === 'true') value = true
            else if (value === 'false') value = false
            else if (value = '') value = null
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="mail-filter">
            <form className="flex row">

                <label className={`${isRead ? 'active' : ''}`} htmlFor="isRead">
                Sort by read
                    <input id="isRead" onChange={handleChange} type="checkbox" value={isRead || ''} name="isRead"/>
                </label> 

                <select id="isStarred" name="isStarred" onChange={handleChange}>
                    <option value="">⭐ All mails</option>
                    <option value="true">Starred</option>
                    <option value="false">Unstarred</option>
                </select>

                <label htmlFor="sentAt" className={`${sentAt ? 'active' : ''}`}>
                    Sort by date
                    <input id="sentAt" onChange={handleChange} type="checkbox" value={sentAt || ''} name="sentAt" />
                </label>
            </form>
        </section>

    )
}