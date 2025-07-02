
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailMenu } from "../cmps/MailMenu.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM


export function MailIndex() {
    const [mails, setMails] = useState()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    console.log('mails:', mails)

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
    }
    if (!mails) return <div>Loading...</div>
    return (
        <Fragment>
            <section className="mail-index container">
                <MailFilter />
                <MailMenu />
                <MailList mails={mails} />
            </section>
        </Fragment>
    )
}

