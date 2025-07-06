import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";

const { useState, useEffect } = React
const { useParams, useNavigate} = ReactRouterDOM

export function MailDetails({ onMoveToTrash, onReply, onToggleRead }) {

    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => {
                mail = { ...mail, isRead: true }
                mailService.save(mail)
                setMail(mail)
            })
            .catch(err => {
                showErrorMsg('Had an unexpected problem')
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>

    return (

        <section className="mail-details">
            <section className="flex row">
                <section>

                    <div className="mail-d-actions flex space-between">
                        <div onClick={onBack}><i title="back" className="icon outlined arrow-back" /></div>
                        <div>
                            <i onClick={() => onReply(mailId)} title="reply" className="icon outlined reply" />
                            <i onClick={() => onToggleRead(mailId)} title="mark-unread" className="icon outlined mark-unread" />
                            <i onClick={() => {
                                onMoveToTrash(mailId)
                                setTimeout(onBack, 500)
                            }} title="send to trash" className="icon outlined delete" />
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