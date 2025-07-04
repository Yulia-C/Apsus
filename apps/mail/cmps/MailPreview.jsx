import { LongTxt } from "./LongTxt.jsx"
const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail }) {
    const navigate = useNavigate()

    return (
        <tr onClick={() => navigate(`/mail/${mail.id}`)}
            key={mail.id} className={`${mail.isRead ? 'read' : 'unread'} mail-preview`}>

            <td className="icon-cell"><i className="icon outlined checkbox" /></td>
            <td className="icon-cell">{mail.isStarred ? <img className="starred" src="assets/icons/star.svg" /> : <i className="icon outlined star" />}
            </td>
            <td className="mail-from">{mail.from}</td>
            <td className="mail-subject">{mail.subject}</td>
            <td className="mail-body">
                <LongTxt txt={mail.body} minLength={3}
                    maxLength={50} />
            </td>
            <td className="mail-date">
                {new Date(mail.sentAt).toLocaleDateString('en-US')}
            </td>

        </tr>
    )
}