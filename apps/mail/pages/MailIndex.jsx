
import { mailService } from "../services/mail.service.js"
import { getTruthyValues } from "../../../services/util.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailMenu } from "../cmps/MailMenu.jsx"
import { MailFilter, MailSort } from "../cmps/MailFilter.jsx"
import { MailDetails } from "../cmps/MailDetails.jsx"
import { MailEdit } from "../cmps/MailEdit.jsx"
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
            .then(mails => setMails(mails))
            // .then(mails=> setMails(mails =>mails.filter(mail=> mail.status === 'inbox')))
            .catch(err => console.log('err:', err))
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

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
        console.log('onMoveToTrash', mails);
        mailService.moveToTrash(mailId)
            .then(mail => mailService.save(mail))
            .then(() => {
                showSuccessMsg('Mail moved to trash')
                setMails(mails => mails.filter(mail => mail.id !== mailId))
            })
            .catch(err => showErrorMsg('Had a problem trashing mail...'))
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

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleMenuToggle(isMenuOpen) {
        setIsMenuOpen(prev => !prev)
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
    }, [isModalOpen])

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    if (!mails) return <div>Loading...</div>
    return (
        <Fragment>
            <section className="mail-index container">

                <MailMenu isMenuOpen={isMenuOpen} onOpenModal={openModal} defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />
                <MailEdit isModalOpen={isModalOpen} onCloseModal={closeModal} />
                <MailFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} onToggleMenu={() => handleMenuToggle(isMenuOpen)} />
                <MailSort defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />

                {mailId ? (
                    <MailDetails onReply={onReply}
                        onToggleRead={onToggleRead}
                        onMoveToTrash={onMoveToTrash} />
                ) : (
                    <Fragment>
                        <MailList mails={mails}
                            onToggleCheckbox={onToggleCheckbox}
                            onToggleStar={onToggleStar}
                            onReply={onReply}
                            onToggleRead={onToggleRead}
                            onMoveToTrash={onMoveToTrash} />
                    </Fragment>
                )}
            </section>
        </Fragment>
    )
}
