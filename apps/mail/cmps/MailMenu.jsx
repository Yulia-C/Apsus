export function MailMenu() {
const [activeItem, setActiveItem] = useState('inbox')
    const itemsMap = [
        { key: 'inbox' },
        { key: 'star' },
        { key: 'sent' },
        { key: 'draft' },
        { key: 'delete' },
    ]

    return (
        <section className={`${isMenuOpen ? 'open' : ''} mail-menu aside flex column`}>
            <i title="compose" className="icon outlined compose active" />
            {itemsMap.map(item => {
                const isActive = activeItem === item.key

                return isActive ? (<img onClick={() => setActiveItem(item.key)} key={item.key} title={item.key}
                    className={`m-${item.key} active`} src={`assets/icons/m-${item.key}.svg`} />)
                    : (<i key={item.key} title={item.key}
                        className={`icon outlined ${item.key}`}
                        onClick={() => setActiveItem(item.key)} />)
            })}
            {/* <i title="inbox" className="icon outlined inbox" />
            <i title="star" className="icon outlined star" />
            <i title="sent" className="icon outlined sent" />
            <i title="draft" className="icon outlined draft" />
            <i title="delete" className="icon outlined delete" /> */}
        </section>
    )
}