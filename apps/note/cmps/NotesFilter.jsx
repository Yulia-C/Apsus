
const { useEffect, useState } = React

export function NotesFilter({ defaultFilter, onSetFilterBy }) {
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
        <form className="filter-form" onChange={handleChange}>
            <input id="txt" onChange={handleChange} value={txt || ''} className="search-input" placeholder="Search" type="text" name="txt" />
        </form>
    )

}