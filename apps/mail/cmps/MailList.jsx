import { mailService } from "../services/mail.service.js"
import { getFullYear, getMonthName } from "../../../services/util.service.js"
import { LongTxt } from "./LongTxt.jsx"
const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM


export function MailList({ mails, onToggleCheckbox, onToggleStar, onReply, onToggleRead, onMoveToTrash }) {
    const navigate = useNavigate()
    const [isMailHovered, setIsMailHovered] = useState(true)


    const handleMouseEnter = (mailId) => {
        setIsMailHovered(mailId)
    }
    const handleMouseLeave = () => {
        setIsMailHovered(null)
    }

    if (!mails) return <div>Loading...</div>
    return (
        <table className="mail-list main">
            <tbody>
                {mails.map((mail) => (
                    <tr key={mail.id} className={`${mail.isRead ? 'read' : 'unread'} mail-preview`}
                        onMouseEnter={() => handleMouseEnter(mail.id)} onMouseLeave={handleMouseLeave}
                    >

                        <td className="icon-cell">{mail.isChecked ?
                            <i onClick={() => onToggleCheckbox(mail.id)} className="icon outlined checkbox-checked" /> :
                            <i onClick={() => onToggleCheckbox(mail.id)} className="icon outlined checkbox" />}</td>
                        <td className="icon-cell">{mail.isStarred ?
                            <img onClick={() => onToggleStar(mail.id)} className="starred" src="assets/icons/star.svg" />
                            : <i onClick={() => onToggleStar(mail.id)} className="icon outlined star" />}
                        </td>
                        <td onClick={() => navigate(`/mail/${mail.id}`)} className="mail-from">{mail.from}</td>
                        <td onClick={() => navigate(`/mail/${mail.id}`)} className="mail-subject">{mail.subject}</td>
                        <td onClick={() => navigate(`/mail/${mail.id}`)} className="mail-body">
                            {mail.body && <LongTxt txt={mail.body} minLength={3} maxLength={50} />}
                        </td>

                        {(isMailHovered === mail.id) ? <td className="mail-actions">
                            <i onClick={() => onReply(mail.id)} title="reply" className="icon outlined reply" />
                            {mail.isRead ? <i onClick={() => onToggleRead(mail.id)} title="mark-unread" className="icon outlined mark-unread" /> :
                                <i onClick={() => onToggleRead(mail.id)} title="mark-read" className="icon outlined mark-read" />}
                            <i onClick={() => onMoveToTrash(mail.id)} title="send to trash" className="icon outlined delete" />
                        </td> : <td className="mail-date">{getMonthName(mail.sentAt)} {getFullYear(mail.sentAt)}</td>

                        }

                    </tr>
                ))}
            </tbody>
        </table>
    )
}
