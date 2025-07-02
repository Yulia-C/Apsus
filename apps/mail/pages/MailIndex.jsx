
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailMenu } from "../cmps/MailMenu.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM


export function MailIndex() {
    const [mails, setMails] = useState()


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

