import { mailService } from "../../mail/services/mail.service.js"
import { MailMenu } from "../cmps/MailMenu.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";

const { useState, useEffect } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())


    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
    }, [mailId, filterBy])

    function loadMails() {
        mailService.get(mailId)
            .then(mail => {
                setMail(mail)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onBack() {
        navigate('/mail')
    }
    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onRemove(mailId) {
        mailService.remove(mailId)
            .then(() => {
                navigate('/mail')
                // Need to move it to trash
                showSuccessMsg('Mail moved to trash!')
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Problem moving mail to trash...`)
            })
    }

    if (!mail) return <div>Loading...</div>

    return (

        <section className="mail-details">
            <MailFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />
            <section className="flex row">
                <MailMenu />
                <section>

                    <div className="mail-d-actions flex space-between">
                        <div onClick={onBack}><i title="back" className="icon outlined arrow-back" /></div>
                        <div>
                            <i title="reply" className="icon outlined reply" />
                            <i title="mark-unread" className="icon outlined mark-unread" />
                            <i onClick={() => onRemove(mailId)} title="send to trash" className="icon outlined delete" />
                        </div>
                    </div>
                    <div className="mail-details-content container">
                        <p className="mail-subject-content">Subject: {mail.subject}</p>
                        <p className="mail-from-content">From: {mail.from}</p>
                        <p className="mail-to-content">To: {mail.to}</p>
                        <p className="mail-body-content">{mail.body}</p>
                    </div>
                </section>
            </section>
        </section>
    )
}