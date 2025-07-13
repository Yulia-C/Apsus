
import { mailService } from "../services/mail.service.js"
import { getTruthyValues } from "../../../services/util.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailMenu } from "../cmps/MailMenu.jsx"
import { MailFilter, MailSort } from "../cmps/MailFilter.jsx"
import { MailDetails } from "../cmps/MailDetails.jsx"
import { MailEdit } from "../cmps/MailEdit.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, Fragment } = React
const { Link, useSearchParams, useParams, useNavigate } = ReactRouterDOM


export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [searchParams, setSearchParams] = useSearchParams()
    const [categoryCounts, setCategoryCounts] = useState({})
    const navigate = useNavigate()


    const { mailId } = useParams()

    const truthyFilter = getTruthyValues(filterBy)

    function updateCategoryCounts() {
        mailService.getCategoryCount()
            .then(categoryCounts => setCategoryCounts(categoryCounts))
            .catch(err => console.error('Failed to load category counts', err))
    }
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category')
        if (categoryFromUrl !== filterBy.category) {
            setFilterBy(prev => ({ ...prev, category: categoryFromUrl }))
        }
    }, [])

    useEffect(() => {
        loadMails()
        updateCategoryCounts()
        setSearchParams(getTruthyValues(filterBy))

    }, [mailId, filterBy])

    function loadMails() {
            mailService.query(filterBy)
            .then(setMails).catch(err => console.log('err:', err))       }

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
                    if (mail.isStarred && !mail.isRead) updateCategoryCounts()

                    return updatedMail
                }
                return mail
            })
            return upDatedMails
        })

    }

    function onMoveToTrash(mailId) {
        mailService.get(mailId).then(mail => {
            if (mail.status === 'trash')
                mailService.remove(mailId).then(() => {
                    showSuccessMsg('Mail deleted successfully')
                    setMails(mails => mails.filter(mail => mail.id !== mailId))
                })
        }).catch(err => showErrorMsg('Had a problem deleting mail...'))

        mailService.moveToTrash(mailId)
            .then(mail => mailService.save(mail))
            .then(() => {
                showSuccessMsg('Mail moved to trash')
                setMails(mails => mails.filter(mail => mail.id !== mailId))
            })
            .catch(err => showErrorMsg('Had a problem trashing mail...'))
        updateCategoryCounts()

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
        updateCategoryCounts()
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleMenuToggle(isMenuOpen) {
        document.querySelector('.mail-index').classList.toggle('openn')

        setIsMenuOpen(prev => !prev)
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [replyMailId, setReplyMailId] = useState(null)

    function onReply(mailId) {
        setReplyMailId(mailId)
        openModal()
        updateCategoryCounts()
    }

    useEffect(() => {
    }, [isModalOpen])

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setReplyMailId(null)
        setIsModalOpen(false)
    }

    if (!mails) return <div>Loading...</div>
    return (
        <Fragment>
            <section className="mail-index container">

                <MailMenu isMenuOpen={isMenuOpen}
                    onOpenModal={openModal}
                    defaultFilter={filterBy}
                    onSetFilterBy={onSetFilterBy}
                    categoryCounts={categoryCounts}
                    updateCategoryCounts={updateCategoryCounts} />

                <MailEdit isModalOpen={isModalOpen}
                    onCloseModal={closeModal}
                    mailId={replyMailId} />

                <MailFilter defaultFilter={filterBy}
                    onSetFilterBy={onSetFilterBy}
                    onToggleMenu={() => handleMenuToggle(isMenuOpen)} />

                <MailSort defaultFilter={filterBy}
                    onSetFilterBy={onSetFilterBy} />

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
