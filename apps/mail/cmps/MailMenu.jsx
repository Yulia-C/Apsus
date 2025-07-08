import { mailService } from "../services/mail.service.js"
const { useState } = React

export function MailMenu({ isMenuOpen, onOpenModal }) {
    const [activeItem, setActiveItem] = useState('inbox')
    const [mailStatus, setMailStatus] = useState('inbox')

    const itemsMap = [
        { key: 'inbox' },
        { key: 'star' },
        { key: 'sent' },
        { key: 'draft' },
        { key: 'delete' },
    ]



    return (
        <section className={`${isMenuOpen ? 'open' : ''} mail-menu aside flex column`}>
            <button onClick={()=>onOpenModal()} className="menu-btn">
                <i title="compose" className="icon outlined compose active" />
                <span className="item-name">Compose</span>
            </button>

            {itemsMap.map(item => {
                const isActive = activeItem === item.key

                return isActive ?
                    (<button key={item.key} className="menu-btn">

                        <img onClick={() => setActiveItem(item.key)}
                            title={item.key}
                            className={`m-${item.key} active`}
                            src={`assets/icons/m-${item.key}.svg`} />

                        <span className="item-name">{item.key}</span>
                        <span className="item-count"></span>
                    </button>)
                    : (<button key={item.key} className="menu-btn">
                        <i title={item.key}
                            className={`icon outlined ${item.key}`}
                            onClick={() => setActiveItem(item.key)} />

                        <span className="item-name">{item.key}</span>
                        <span className="item-count"></span></button>)
            })}
            {/* <i title="inbox" className="icon outlined inbox" />
            <i title="star" className="icon outlined star" />
            <i title="sent" className="icon outlined sent" />
            <i title="draft" className="icon outlined draft" />
            <i title="delete" className="icon outlined delete" /> */}
        </section>
    )
}