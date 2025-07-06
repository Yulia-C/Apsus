
import { mailService } from "../services/mail.service.js"
import { getTruthyValues } from "../../../services/util.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailMenu } from "../cmps/MailMenu.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, Fragment } = React
const { Link, useSearchParams, useParams } = ReactRouterDOM


export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [searchParams, setSearchParams] = useSearchParams()

    const { mailId } = useParams()


    const truthyFilter = getTruthyValues(filterBy)

    useEffect(() => {
        loadMails()
        setSearchParams(getTruthyValues(filterBy))
    }, [mailId, filterBy])


    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails.filter(mail => mail.status.includes('inbox'))))
            .catch(err => console.log('err:', err))
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    // function handleChange({ target }) {
    //     const field = target.name
    //     let value = target.value
    //     switch (target.type) {

    //         case 'range':
    //             value = +value
    //             break;

    //         case 'checkbox':
    //             value = target.checked
    //             break

    //     }

    //     setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

    function onToggleCheckbox(mailId) {
        setMails(prevMails => {
            const upDatedMails = prevMails.map(mail => {
                if (mail.id === mailId) {
                    const updatedMail = { ...mail, isChecked: !mail.isChecked }
                    mailService.save(updatedMail)
                    return updatedMail
                }
                return mail
            })
            return upDatedMails
        })
    }

    function onToggleStar(mailId) {
        setMails(prevMails => {
            const upDatedMails = prevMails.map(mail => {
                if (mail.id === mailId) {
                    const updatedMail = { ...mail, isStarred: !mail.isStarred }
                    mailService.save(updatedMail)
                    return updatedMail
                }
                return mail
            })
            return upDatedMails
        })
    }

    function onMoveToTrash(mailId) {
           console.log('onMoveToTrash');
    //     setMails(prevMails => {
    //         const upDatedMails = prevMails.map(mail => {
    //             if (mail.id === mailId) {
    //                 const updatedMail = { ...mail, status: 'trash' }
    //                 mailService.save(updatedMail)
    //                 return updatedMail
    //             }
    //             return mail
    //         })
    //         return upDatedMails
    //     })
    }

    function onReply(mailId) {

    }

    function onToggleRead(mailId) {
        setMails(prevMails => {
            const upDatedMails = prevMails.map(mail => {
                if (mail.id === mailId) {
                    const updatedMail = { ...mail, isRead: !mail.isRead }
                    mailService.save(updatedMail)
                    return updatedMail
                }
                return mail
            })
            return upDatedMails
        })
    }

    if (!mails) return <div>Loading...</div>
    return (
        <Fragment>
            <section className="mail-index container">

                <MailFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />

                <section className="flex row">
                    <MailMenu />
                    {mailId ? (
                        <MailDetails onReply={onReply}
                            onToggleRead={onToggleRead}
                            onMoveToTrash={onMoveToTrash} />
                    ) : (
                        <MailList mails={mails}
                            onToggleCheckbox={onToggleCheckbox}
                            onToggleStar={onToggleStar}
                            onReply={onReply}
                            onToggleRead={onToggleRead}
                            onMoveToTrash={onMoveToTrash} />
                    )}
                </section>
            </section>
        </Fragment>
    )
}
