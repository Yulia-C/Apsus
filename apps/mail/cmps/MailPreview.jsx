export function MailPreview({ mail }) {

    return (
        <tr key={mail.id} className={`${mail.isRead ? 'read' : 'unread'} mail-preview`}>
            <td classNAme="icon-cell"><i className="icon outlined checkbox" /></td>
            <td classNAme="icon-cell"><i className="icon outlined star" /></td>
            <td className="mail-subject">{mail.subject}</td>
            <td className="mail-body">{mail.body}</td>
            <td className="mail-date">
                {new Date(mail.sentAt).toLocaleDateString('en-US')}
            </td>
        </tr>
    )
}